//! A newline-delimited JSON-RPC stdio transport with a bounded frame size.

use anyhow::Result;
use std::io::{BufRead, BufReader, Read};

/// Caps a single JSON-RPC frame. A larger frame is reported as a parse error
/// instead of being buffered, so a client cannot grow the heap without bound.
/// It matches the cap the other headless MCP servers use.
pub const MAX_FRAME_BYTES: usize = 8 << 20;

/// One frame read off the wire.
#[derive(Debug, PartialEq)]
pub enum Frame {
    /// A complete frame, newline included.
    Line(String),
    /// A frame larger than [`MAX_FRAME_BYTES`], whose tail was discarded.
    TooLong,
}

/// Reads one newline-terminated frame, refusing anything larger than
/// [`MAX_FRAME_BYTES`] so a hostile or broken client cannot grow the heap
/// without bound.
///
/// An over-long frame leaves the reader on its remaining bytes, so the tail is
/// discarded as junk and the stream resynchronises on the next newline.
pub fn read_frame(reader: &mut impl BufRead) -> Result<Option<Frame>> {
    let mut frame: Vec<u8> = Vec::new();
    loop {
        let mut chunk = Vec::new();
        let read = match reader.read_until(b'\n', &mut chunk) {
            Ok(n) => n,
            Err(e) if e.kind() == std::io::ErrorKind::Interrupted => continue,
            Err(e) => return Err(e.into()),
        };
        if read == 0 {
            if frame.is_empty() {
                return Ok(None);
            }
            return Ok(Some(Frame::Line(
                String::from_utf8_lossy(&frame).into_owned(),
            )));
        }
        if frame.len() + chunk.len() > MAX_FRAME_BYTES {
            return Ok(Some(Frame::TooLong));
        }
        frame.extend_from_slice(&chunk);
        if chunk.ends_with(b"\n") {
            return Ok(Some(Frame::Line(
                String::from_utf8_lossy(&frame).into_owned(),
            )));
        }
    }
}

/// Reads every frame from `input` and hands each to `on_frame`.
///
/// Returning `Ok(())` on EOF is deliberate: a clean EOF is how MCP clients
/// signal shutdown, so it is not a failure.
pub fn serve(input: impl Read, mut on_frame: impl FnMut(&str) -> Result<()>) -> Result<()> {
    let mut reader = BufReader::new(input);
    while let Some(frame) = read_frame(&mut reader)? {
        let text = match frame {
            Frame::TooLong => {
                on_frame(TOO_LONG_MARKER)?;
                continue;
            }
            Frame::Line(line) => line,
        };
        let trimmed = text.trim();
        if trimmed.is_empty() {
            continue;
        }
        on_frame(trimmed)?;
    }
    Ok(())
}

/// The sentinel passed to the frame callback in place of an over-long frame,
/// so the transport stays free of JSON-RPC knowledge.
const TOO_LONG_MARKER: &str = "\u{0}frame-too-large";

/// Reports whether a frame handed to the callback by [`serve`] was over-long.
pub fn is_too_long(text: &str) -> bool {
    text == TOO_LONG_MARKER
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::io::Cursor;

    fn frames(input: &str) -> Vec<Frame> {
        let mut reader = BufReader::new(Cursor::new(input.as_bytes().to_vec()));
        let mut out = Vec::new();
        while let Some(frame) = read_frame(&mut reader).unwrap() {
            out.push(frame);
        }
        out
    }

    #[test]
    fn each_line_is_one_frame() {
        assert_eq!(
            frames("{\"a\":1}\n{\"b\":2}\n"),
            vec![
                Frame::Line("{\"a\":1}\n".to_string()),
                Frame::Line("{\"b\":2}\n".to_string()),
            ]
        );
    }

    #[test]
    fn a_final_frame_without_a_newline_is_still_returned() {
        assert_eq!(
            frames("{\"a\":1}"),
            vec![Frame::Line("{\"a\":1}".to_string())]
        );
    }

    #[test]
    fn an_oversized_frame_is_refused_and_the_stream_recovers() {
        let mut input = vec![b'x'; MAX_FRAME_BYTES + 1];
        input.push(b'\n');
        input.extend_from_slice(b"{\"b\":2}\n");

        let mut reader = BufReader::new(Cursor::new(input));
        assert_eq!(read_frame(&mut reader).unwrap(), Some(Frame::TooLong));
        assert_eq!(
            read_frame(&mut reader).unwrap(),
            Some(Frame::Line("{\"b\":2}\n".to_string()))
        );
    }

    #[test]
    fn blank_lines_are_skipped() {
        let mut seen = Vec::new();
        serve("\n  \n{\"a\":1}\n".as_bytes(), |frame| {
            seen.push(frame.to_string());
            Ok(())
        })
        .unwrap();
        assert_eq!(seen, vec!["{\"a\":1}".to_string()]);
    }
}
