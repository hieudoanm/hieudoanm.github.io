# pagify — Data Model: server package

The `server` package runs preview and serve.

## Files

- `preview.go` — rebuilds on every request; honours `basePath`; serves static files only.
- `serve.go` — runs the JSON API (`/api/v1/build`, `/api/v1/health`, `/api/v1/openapi.json`, `/api/v1/docs`).

## Responsibilities

- Preview: rebuild per request, no filesystem watching.
- Serve: render one page in memory; nothing written to disk.
- Confine all file access to `--root` via `internal/workspace`.
