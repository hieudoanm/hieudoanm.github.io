# KeVIN (Go) — API Specification

## 1. TCP Protocol (Inline)

Line-based protocol over TCP. Commands terminated by `\n` (with optional `\r\n`).

| Command | Syntax | Response | Notes |
| ------- | ------ | -------- | ----- |
| PING | `PING` | `PONG` | Case-insensitive |
| SET | `SET key value...` | `OK` | All tokens after key form value (spaces preserved) |
| GET | `GET key` | `value` or `(nil)` | Requires exactly 1 key |
| KEYS | `KEYS` | space-separated keys or empty | Lists all keys |
| DEL | `DEL key` | `1` or `0` | Requires exactly 1 key (variadic variants exist in extended features) |

Error responses: `ERR unknown command` or `ERR usage: ...`

## 2. MCP Protocol (JSON-RPC 2.0)

Newline-delimited JSON-RPC 2.0 over stdio. See `internal/mcp/protocol.go` and `tools.go` for schemas.
