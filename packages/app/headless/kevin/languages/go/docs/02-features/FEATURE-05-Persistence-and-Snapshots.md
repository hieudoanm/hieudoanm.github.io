# FEATURE-05: Persistence and Snapshots

## User-visible behavior
- `serve --data <file>` loads snapshot on startup, saves on graceful shutdown (SIGINT/SIGTERM)
- `mcp serve --data <file>` persists server-owned in-process store to snapshot file
- Atomic temp-file write for safety
