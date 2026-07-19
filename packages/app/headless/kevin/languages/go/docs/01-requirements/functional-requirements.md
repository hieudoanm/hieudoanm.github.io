# KeVIN (Go) — Functional Requirements

## FR-001: TCP Protocol Parity
- The server MUST implement PING, SET, GET, KEYS, DEL with identical behavior to C/C++ reference
- Commands MUST be case-insensitive
- SET MUST preserve internal spaces in values
- GET/DEL MUST require exactly one argument as specified

## FR-002: In-Memory Store
- The store MUST be in-memory using `map[string]string` guarded by `sync.RWMutex`
- Keys and values are strings; no external persistence required by default

## FR-003: CLI Interface
- CLI MUST be built with cobra
- MUST expose `serve` subcommand with flags: `--port` (default 6379), `--gui`, `--tui`, `--bind`
- MUST expose `mcp serve` subcommand with flags: `--data`, `--addr` (mutually exclusive)

## FR-004: UI Support
- `serve --tui` MUST open bubbletea terminal UI (pure Go, compiled into every build)
- `serve --gui` MUST open fyne GUI (behind `gui` build tag, requires CGO)
- `--gui` and `--tui` MUST be mutually exclusive

## FR-005: MCP Server
- MCP server MUST speak newline-delimited JSON-RPC 2.0 on stdio
- Logs MUST go to stderr; protocol frames MUST go to stdout only
- MUST support tools: kevin_ping, kevin_set, kevin_get, kevin_del, kevin_keys, kevin_len, kevin_ttl, kevin_expire, kevin_flush
- Tool failures MUST return ToolResult with IsError true
- Notifications (nil ID) MUST never be answered
- Backends: in-process store and TCP proxy (`--addr`)

## FR-006: Persistence Support
- `serve --data <file>` MUST support snapshot load on start and save on shutdown (atomic writes)
- `mcp serve --data <file>` MUST support snapshot persistence for server-owned store
