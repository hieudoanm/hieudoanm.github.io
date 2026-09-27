//! A [`Store`] that speaks the inline protocol to a running `kevin serve` over
//! one TCP connection, so the MCP server can drive an already-running store
//! instead of owning an in-process one.

use super::store::{Store, TtlState};
use anyhow::{bail, Context, Result};
use std::io::{BufRead, BufReader, Write};
use std::net::TcpStream;
use std::sync::Mutex;

/// Reply the protocol uses for a missing value.
const NIL: &str = "(nil)";

/// Command line terminator; the server strips a trailing `\r\n`.
const EOL: &str = "\r\n";

/// The connection split into a reading and a writing half.
struct Conn {
    reader: BufReader<TcpStream>,
    writer: TcpStream,
}

/// A `Store` proxied to a remote `kevin serve`.
///
/// The socket sits behind a `Mutex` because a command needs exclusive use of
/// the connection for its write-then-read exchange. The MCP dispatcher answers
/// one request at a time, so the lock is never contended in practice.
pub struct TcpStore {
    conn: Mutex<Conn>,
}

impl TcpStore {
    /// Connects to a `kevin serve` listening on `addr`. The caller owns the
    /// returned store and should close it when done.
    pub fn connect(addr: &str) -> Result<Self> {
        let stream = TcpStream::connect(addr).with_context(|| format!("dial kevin at {addr}"))?;
        let writer = stream.try_clone().context("clone kevin connection")?;
        Ok(Self {
            conn: Mutex::new(Conn {
                reader: BufReader::new(stream),
                writer,
            }),
        })
    }

    /// Sends one command line and returns the trimmed reply. A Redis-style
    /// `ERR ...` reply is surfaced as an error so callers never inspect the
    /// protocol text themselves.
    fn command(&self, request: &str) -> Result<String> {
        let mut conn = self
            .conn
            .lock()
            .map_err(|_| anyhow::anyhow!("the kevin connection lock was poisoned"))?;
        conn.writer
            .write_all(format!("{request}{EOL}").as_bytes())
            .with_context(|| format!("send {request:?}"))?;
        conn.writer
            .flush()
            .with_context(|| format!("send {request:?}"))?;

        let mut reply = String::new();
        let read = conn
            .reader
            .read_line(&mut reply)
            .with_context(|| format!("read reply to {request:?}"))?;
        if read == 0 {
            bail!("kevin closed the connection during {request:?}");
        }
        let reply = reply.trim_end_matches(['\r', '\n']).to_string();
        if reply.starts_with("ERR ") {
            bail!("{reply}");
        }
        Ok(reply)
    }
}

impl Store for TcpStore {
    /// A no-op: dropping the socket closes the connection.
    fn close(&self) -> Result<()> {
        Ok(())
    }

    fn ping(&self) -> Result<()> {
        self.command("PING").map(|_| ())
    }

    fn get(&self, key: &str) -> Result<(String, bool)> {
        validate_token("key", key)?;
        let value = self.command(&format!("GET {key}"))?;
        if value == NIL {
            return Ok((String::new(), false));
        }
        Ok((value, true))
    }

    fn set(&self, key: &str, value: &str, ttl_seconds: i64) -> Result<()> {
        validate_token("key", key)?;
        validate_token("value", value)?;
        self.command(&format!("SET {key} {value}"))?;
        if ttl_seconds <= 0 {
            return Ok(());
        }
        self.command(&format!("EXPIRE {key} {ttl_seconds}"))
            .map(|_| ())
    }

    fn del(&self, keys: &[String]) -> Result<usize> {
        if keys.is_empty() {
            bail!("keys must not be empty");
        }
        for key in keys {
            validate_token("key", key)?;
        }
        Ok(parse_count(&self.command(&format!("DEL {}", keys.join(" ")))?)? as usize)
    }

    fn exists(&self, key: &str) -> Result<bool> {
        validate_token("key", key)?;
        Ok(parse_count(&self.command(&format!("EXISTS {key}"))?)? > 0)
    }

    fn keys(&self) -> Result<Vec<String>> {
        Ok(self
            .command("KEYS")?
            .split_whitespace()
            .map(str::to_string)
            .collect())
    }

    fn len(&self) -> Result<usize> {
        let count = parse_count(&self.command("LEN")?)?;
        Ok(count.max(0) as usize)
    }

    fn flush(&self) -> Result<usize> {
        let before = self.len()?;
        self.command("FLUSHALL")?;
        Ok(before)
    }

    fn ttl(&self, key: &str) -> Result<(i64, TtlState)> {
        validate_token("key", key)?;
        let seconds = parse_count(&self.command(&format!("TTL {key}"))?)?;
        Ok((seconds, state_from_seconds(seconds)))
    }

    fn expire(&self, key: &str, seconds: i64) -> Result<bool> {
        validate_token("key", key)?;
        Ok(parse_count(&self.command(&format!("EXPIRE {key} {seconds}"))?)? > 0)
    }
}

/// Maps the signed integer returned by the `TTL` command onto a [`TtlState`].
/// The protocol encodes a missing key as -2 and a key with no expiry as -1.
fn state_from_seconds(seconds: i64) -> TtlState {
    if seconds <= -2 {
        TtlState::Missing
    } else if seconds < 0 {
        TtlState::NoExpiry
    } else {
        TtlState::Expiring
    }
}

/// Parses a plain integer reply.
fn parse_count(reply: &str) -> Result<i64> {
    reply
        .parse()
        .with_context(|| format!("unexpected reply {reply:?}"))
}

/// Rejects keys and values the inline protocol cannot carry: it tokenises on
/// single spaces and terminates lines on newlines, so an embedded space or
/// newline would silently split one value into two arguments.
fn validate_token(name: &str, value: &str) -> Result<()> {
    if value.is_empty() {
        bail!("{name} must not be empty");
    }
    if value.contains([' ', '\r', '\n']) {
        bail!("{name} must not contain spaces or newlines when kevin is reached over TCP, got {value:?}");
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn rejects_empty_tokens() {
        let err = validate_token("key", "").unwrap_err().to_string();
        assert!(err.contains("must not be empty"), "got {err}");
    }

    #[test]
    fn rejects_tokens_the_protocol_cannot_carry() {
        for value in ["a key", "a\nb", "a\r\nb", "a b"] {
            let err = validate_token("value", value).unwrap_err().to_string();
            assert!(err.contains("must not contain spaces"), "got {err}");
        }
    }

    #[test]
    fn accepts_an_ordinary_token() {
        assert!(validate_token("key", "kevin:user:1").is_ok());
    }

    #[test]
    fn maps_the_ttl_sentinels() {
        assert_eq!(state_from_seconds(-2), TtlState::Missing);
        assert_eq!(state_from_seconds(-3), TtlState::Missing);
        assert_eq!(state_from_seconds(-1), TtlState::NoExpiry);
        assert_eq!(state_from_seconds(0), TtlState::Expiring);
        assert_eq!(state_from_seconds(30), TtlState::Expiring);
    }

    #[test]
    fn parses_integer_replies() {
        assert_eq!(parse_count("0").unwrap(), 0);
        assert_eq!(parse_count("-2").unwrap(), -2);
        assert_eq!(parse_count("42").unwrap(), 42);
        assert!(parse_count("PONG").is_err());
        assert!(parse_count("(nil)").is_err());
    }

    #[test]
    fn connecting_to_a_closed_port_fails() {
        let err = TcpStore::connect("127.0.0.1:1")
            .err()
            .expect("dialling a closed port must fail")
            .to_string();
        assert!(err.contains("dial kevin"), "got {err}");
    }
}
