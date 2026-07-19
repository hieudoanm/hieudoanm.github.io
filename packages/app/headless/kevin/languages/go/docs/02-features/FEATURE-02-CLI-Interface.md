# FEATURE-02: CLI Interface

## User-visible behavior
- Built with cobra
- `serve` starts TCP server; optionally runs UI in parallel
- `mcp serve` runs MCP server over stdio

## Flags
- `serve --port` (default 6379), `--bind` (default 0.0.0.0), `--gui`, `--tui`, `--data <file>`
- `mcp serve --data <file>`, `--addr <host:port>` (mutually exclusive)
- `--gui` and `--tui` mutually exclusive

## Behavior
- Without UI flags, blocks until SIGINT/SIGTERM
- With UI flags, server runs in goroutine; UI on main thread
