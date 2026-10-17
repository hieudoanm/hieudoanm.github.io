# FEATURE-01: TCP Server

## User-visible behavior
- Accepts TCP connections on `:<port>` (default 6379)
- Handles one connection per goroutine
- Responds to inline Redis-style commands with line-based responses

## Commands
- `PING` → `PONG`
- `SET key value` → `OK` (value preserves internal spaces)
- `GET key` → `bar` or `(nil)` if missing
- `KEYS` → space-separated list of keys (or empty string if none)
- `DEL key` → `1` if deleted, `0` if not found

Case-insensitive. Empty/whitespace lines produce no response.
