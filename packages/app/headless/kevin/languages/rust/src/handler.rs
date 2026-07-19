//! Redis-style inline protocol handler, behaviour-identical to the Go
//! implementation. Users send lines like `SET key value\n` and receive a
//! single response line; empty/whitespace lines are ignored.

use crate::db::{ttl::TTL, DB};
use std::time::Duration;

/// Parses one protocol line and returns the response plus whether a reply
/// should be sent. Empty/whitespace-only lines return `false`.
pub fn handle_line(line: &str, kv: &DB) -> (String, bool) {
    let line = line.trim_end_matches(['\r', '\n']);
    if line.trim().is_empty() {
        return (String::new(), false);
    }

    let (cmd, rest) = split_token(line);
    match cmd.to_ascii_uppercase().as_str() {
        "PING" => ("PONG\n".to_string(), true),
        "SET" => handle_set(rest, kv),
        "GET" => handle_get(rest, kv),
        "DEL" => handle_del(rest, kv),
        "KEYS" => (kv.keys().join(" ") + "\n", true),
        "EXISTS" => handle_exists(rest, kv),
        "LEN" => handle_len(rest, kv),
        "FLUSHALL" | "FLUSHDB" => handle_flush(rest, kv),
        "EXPIRE" => handle_expire(rest, kv),
        "TTL" => handle_ttl(rest, kv),
        _ => ("ERR unknown command\n".to_string(), true),
    }
}

fn handle_set(rest: &str, kv: &DB) -> (String, bool) {
    let (key, after) = split_token(rest);
    let value = after.trim_start_matches(' ');
    if key.is_empty() || value.is_empty() {
        return ("ERR usage: SET key value [EX seconds]\n".to_string(), true);
    }
    if let Some(idx) = value.to_uppercase().rfind(" EX ") {
        let seconds = value[idx + 4..].trim_start_matches(' ');
        if let Ok(ttl) = seconds.parse::<u64>() {
            if ttl > 0 {
                kv.set_with_ttl(key, &value[..idx], Duration::from_secs(ttl));
                return ("OK\n".to_string(), true);
            }
        }
        return ("ERR invalid expire time\n".to_string(), true);
    }
    kv.set(key, value);
    ("OK\n".to_string(), true)
}

fn handle_get(rest: &str, kv: &DB) -> (String, bool) {
    let (key, after) = split_token(rest);
    if key.is_empty() || !after.trim().is_empty() {
        return ("ERR usage: GET key\n".to_string(), true);
    }
    match kv.get(key) {
        Some(value) => (value + "\n", true),
        None => ("(nil)\n".to_string(), true),
    }
}

fn handle_del(rest: &str, kv: &DB) -> (String, bool) {
    let keys = split_all(rest);
    if keys.is_empty() {
        return ("ERR usage: DEL key [key ...]\n".to_string(), true);
    }
    (kv.del_many(&keys).to_string() + "\n", true)
}

fn handle_exists(rest: &str, kv: &DB) -> (String, bool) {
    let (key, after) = split_token(rest);
    if key.is_empty() || !after.trim().is_empty() {
        return ("ERR usage: EXISTS key\n".to_string(), true);
    }
    let n = if kv.exists(key) { "1" } else { "0" };
    (n.to_string() + "\n", true)
}

fn handle_len(rest: &str, kv: &DB) -> (String, bool) {
    if !rest.trim().is_empty() {
        return ("ERR usage: LEN\n".to_string(), true);
    }
    (kv.len().to_string() + "\n", true)
}

fn handle_flush(rest: &str, kv: &DB) -> (String, bool) {
    if !rest.trim().is_empty() {
        return ("ERR usage: FLUSHALL\n".to_string(), true);
    }
    kv.flush();
    ("OK\n".to_string(), true)
}

fn handle_expire(rest: &str, kv: &DB) -> (String, bool) {
    let Some((key, seconds)) = split_two(rest) else {
        return ("ERR usage: EXPIRE key seconds\n".to_string(), true);
    };
    match seconds.parse::<u64>() {
        Ok(0) | Err(_) => ("ERR invalid expire time\n".to_string(), true),
        Ok(ttl) => {
            let n = if kv.expire(key, Duration::from_secs(ttl)) {
                "1"
            } else {
                "0"
            };
            (format!("{n}\n"), true)
        }
    }
}

fn handle_ttl(rest: &str, kv: &DB) -> (String, bool) {
    let (key, after) = split_token(rest);
    if key.is_empty() || !after.trim().is_empty() {
        return ("ERR usage: TTL key\n".to_string(), true);
    }
    let value = match kv.ttl(key) {
        TTL::Missing => -2,
        TTL::NoExpiry => -1,
        TTL::Remaining(secs) => secs,
    };
    (value.to_string() + "\n", true)
}

/// Returns the first space-delimited token of `s` and everything after it,
/// mirroring the C reference's `strtok_r` splitting: leading spaces skipped,
/// trailing separator (single space) preserved in `rest`.
pub fn split_token(s: &str) -> (&str, &str) {
    let bytes = s.as_bytes();
    let mut start = 0;
    while start < bytes.len() && bytes[start] == b' ' {
        start += 1;
    }
    let mut end = start;
    while end < bytes.len() && bytes[end] != b' ' {
        end += 1;
    }
    (&s[start..end], &s[end..])
}

/// Returns every space-delimited token of `s`.
pub fn split_all(s: &str) -> Vec<String> {
    let mut tokens = Vec::new();
    let mut rest = s;
    loop {
        let (token, after) = split_token(rest);
        if token.is_empty() {
            break;
        }
        tokens.push(token.to_string());
        rest = after;
    }
    tokens
}

/// Consumes exactly two space-delimited tokens of `s`.
pub fn split_two(s: &str) -> Option<(&str, &str)> {
    let (first, rest) = split_token(s);
    if first.is_empty() {
        return None;
    }
    let (second, rest) = split_token(rest);
    if second.is_empty() || !rest.trim().is_empty() {
        return None;
    }
    Some((first, second))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn reply(line: &str, kv: &DB) -> String {
        handle_line(line, kv).0
    }

    #[test]
    fn ping_and_case() {
        let db = DB::new();
        assert_eq!(reply("PING", &db), "PONG\n");
        assert_eq!(reply("ping", &db), "PONG\n");
    }

    #[test]
    fn empty_lines_ignored() {
        let db = DB::new();
        assert_eq!(handle_line("", &db), (String::new(), false));
        assert_eq!(handle_line("   \r\n", &db), (String::new(), false));
    }

    #[test]
    fn set_get_del_usage() {
        let db = DB::new();
        assert_eq!(reply("SET", &db), "ERR usage: SET key value [EX seconds]\n");
        assert_eq!(
            reply("SET k", &db),
            "ERR usage: SET key value [EX seconds]\n"
        );
        assert_eq!(reply("GET", &db), "ERR usage: GET key\n");
        assert_eq!(reply("GET a b", &db), "ERR usage: GET key\n");
        assert_eq!(reply("DEL", &db), "ERR usage: DEL key [key ...]\n");
    }

    #[test]
    fn value_with_spaces_preserved() {
        let db = DB::new();
        assert_eq!(reply("SET k hello world", &db), "OK\n");
        assert_eq!(reply("GET k", &db), "hello world\n");
    }

    #[test]
    fn set_ex_ttl_and_errors() {
        let db = DB::new();
        assert_eq!(reply("SET k v EX 10", &db), "OK\n");
        assert_eq!(reply("TTL k", &db), "10\n");
        assert_eq!(reply("SET k v EX 0", &db), "ERR invalid expire time\n");
        assert_eq!(reply("SET k v EX abc", &db), "ERR invalid expire time\n");
        // a value containing " EX " is a TTL, not part of the value
        assert_eq!(
            reply("SET k the EX 5 secret", &db),
            "ERR invalid expire time\n"
        );
    }

    #[test]
    fn del_multiple_exists_len() {
        let db = DB::new();
        assert_eq!(reply("SET a 1", &db), "OK\n");
        assert_eq!(reply("SET b 2", &db), "OK\n");
        assert_eq!(reply("EXISTS a", &db), "1\n");
        assert_eq!(reply("EXISTS missing", &db), "0\n");
        assert_eq!(reply("LEN", &db), "2\n");
        assert_eq!(reply("DEL a b missing", &db), "2\n");
        assert_eq!(reply("LEN", &db), "0\n");
    }

    #[test]
    fn flush_and_unknown() {
        let db = DB::new();
        assert_eq!(reply("SET a 1", &db), "OK\n");
        assert_eq!(reply("FLUSHALL", &db), "OK\n");
        assert_eq!(reply("LEN", &db), "0\n");
        assert_eq!(reply("NOSUCH", &db), "ERR unknown command\n");
        assert_eq!(reply("SET a 1", &db), "OK\n");
        assert_eq!(reply("FLUSHDB extra", &db), "ERR usage: FLUSHALL\n");
    }

    #[test]
    fn expire_and_ttl_sentinels() {
        let db = DB::new();
        assert_eq!(reply("EXPIRE missing 10", &db), "0\n");
        assert_eq!(reply("SET k v", &db), "OK\n");
        assert_eq!(reply("TTL k", &db), "-1\n");
        assert_eq!(reply("EXPIRE k 30", &db), "1\n");
        assert_eq!(reply("TTL k", &db), "30\n");
        assert_eq!(reply("EXPIRE k 0", &db), "ERR invalid expire time\n");
        assert_eq!(reply("TTL missing", &db), "-2\n");
    }
}
