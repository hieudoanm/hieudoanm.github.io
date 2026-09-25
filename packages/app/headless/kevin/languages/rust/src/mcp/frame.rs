//! Bounded newline-delimited frame reading.
//!
//! [`BufRead::lines`] grows its buffer without bound, so a client that never
//! sends a newline could exhaust memory. [`FrameReader`] caps each frame and
//! discards the rest of an oversized line, resynchronising on the next newline
//! so one hostile frame does not wedge the stream.

use anyhow::Result;
use std::io::BufRead;

/// Caps a single JSON-RPC frame at 8 MiB.
pub const MAX_FRAME_BYTES: usize = 8 << 20;

/// How much of an oversized frame is read before the reader gives up on it.
const CHUNK: usize = 64 * 1024;

/// One decoded frame, or the reason a line was dropped.
#[derive(Debug, PartialEq, Eq)]
pub enum Frame {
    /// A complete line, without its terminator.
    Line(String),

    /// A line longer than [`MAX_FRAME_BYTES`], consumed and discarded.
    TooLong { bytes: usize },
}

/// Reads newline-delimited frames, skipping blank lines and dropping oversize
/// ones so the caller decides how to report them.
pub struct FrameReader<R> {
    input: R,
}

impl<R: BufRead> FrameReader<R> {
    /// Wraps `input`, which is usually a stdin lock.
    pub fn new(input: R) -> Self {
        Self { input }
    }

    /// Returns the next non-blank frame, or `None` at end of input.
    pub fn next_frame(&mut self) -> Result<Option<Frame>> {
        loop {
            match self.read_one()? {
                None => return Ok(None),
                Some(Frame::Line(line)) if line.trim().is_empty() => continue,
                Some(frame) => return Ok(Some(frame)),
            }
        }
    }

    /// Reads one line, giving up and resynchronising once it exceeds the cap.
    ///
    /// `None` means genuine end of input with nothing buffered. A blank line is
    /// returned as an empty [`Frame::Line`] so the caller can skip it instead of
    /// treating it as a closed stream.
    ///
    /// At most `MAX_FRAME_BYTES + 1` bytes are ever retained, so the bound
    /// holds no matter how much a single `fill_buf` hands back — a slice-backed
    /// reader returns the entire remaining input in one call.
    fn read_one(&mut self) -> Result<Option<Frame>> {
        let mut line: Vec<u8> = Vec::new();
        loop {
            let available = self.input.fill_buf()?;
            if available.is_empty() {
                return Ok(match line.is_empty() {
                    true => None,
                    false => Some(Frame::Line(decode(&line))),
                });
            }
            let newline = available.iter().position(|byte| *byte == b'\n');
            let end = newline.unwrap_or(available.len());
            let room = (MAX_FRAME_BYTES + 1).saturating_sub(line.len());
            line.extend_from_slice(&available[..end.min(room)]);
            self.input.consume(end + usize::from(newline.is_some()));
            if line.len() > MAX_FRAME_BYTES {
                // The terminator is still ahead of us only when this chunk did
                // not contain it; otherwise the frame already ends here.
                if newline.is_none() {
                    self.discard_line()?;
                }
                return Ok(Some(Frame::TooLong { bytes: line.len() }));
            }
            if newline.is_some() {
                return Ok(Some(Frame::Line(decode(&line))));
            }
        }
    }

    /// Drops the remainder of an oversized line so the next read starts on a
    /// frame boundary.
    fn discard_line(&mut self) -> Result<()> {
        let mut sink = [0u8; CHUNK];
        loop {
            let available = self.input.fill_buf()?;
            if available.is_empty() {
                return Ok(());
            }
            match available.iter().position(|byte| *byte == b'\n') {
                Some(index) => {
                    self.input.consume(index + 1);
                    return Ok(());
                }
                None => {
                    let read = available.len();
                    self.input.consume(read);
                    if std::io::Read::read(&mut self.input, &mut sink)? == 0 {
                        return Ok(());
                    }
                }
            }
        }
    }
}

/// Decodes a frame, dropping the carriage return a CRLF client leaves behind.
/// Invalid UTF-8 is replaced rather than rejected, so a malformed frame still
/// becomes a parse error instead of an I/O failure.
fn decode(line: &[u8]) -> String {
    String::from_utf8_lossy(line)
        .trim_end_matches('\r')
        .to_string()
}
