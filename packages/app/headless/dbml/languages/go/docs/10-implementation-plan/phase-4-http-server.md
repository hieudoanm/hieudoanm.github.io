# dbml (Go) — Phase 4: HTTP Server

## Goal

Expose the same conversion pipeline as a REST API for programmatic use, served from the same binary.

Status: complete (implementation snapshot 2026-10-17, see [`docs/README.md`](../README.md) §8).

## Deliverables

| Deliverable | Location |
| ----------- | -------- |
| `serve` command (`--port`, `--debug`) | `cmd/serve.go` |
| HTTP server with REST routes | `internal/server/server.go` |
| OpenAPI 3 document and Swagger UI | `internal/server/openapi.go` |

## Routes

| Method | Path | Purpose |
| ------ | ---- | ------- |
| GET | `/api/v1/health` | Health check (`{"status":"ok","version":"dev"}`) |
| POST | `/api/v1/convert` | Convert DBML to requested formats |
| POST | `/api/v1/convert/sql` | Convert DBML to SQL only |
| POST | `/api/v1/convert/mermaid` | Convert DBML to Mermaid only |
| GET | `/api/v1/openapi.json` | OpenAPI 3 document |
| GET | `/api/v1/docs` | Swagger UI |

## Request and response

- Request bodies are JSON (`{"dbml": "...", "formats": ["sql", "mermaid"]}`) or `multipart/form-data` with a `file` upload or a `dbml` form field.
- Empty `dbml` and parse failures return HTTP 400 with a JSON `error` field; the default format set is `["sql", "mermaid"]`.
- The server logs via `slog`; `--debug` raises the level to debug.
- `SIGINT`/`SIGTERM` trigger a shutdown message and process exit.
- The listener binds to `:port` (all interfaces); network exposure is an operator decision — see [`12-operations/security.md`](../12-operations/security.md).

## Acceptance criteria

- [ ] `dbml serve --port 8080` starts and `/api/v1/health` returns 200.
- [ ] Convert endpoints return JSON with `sql`/`mermaid`/`svg` fields for valid input.
- [ ] Invalid input returns 400 with a JSON `error` message.
- [ ] `/api/v1/openapi.json` and `/api/v1/docs` serve the API contract (see [`06-api-specification.md`](../06-api-specification.md)).

## Cross-references

- Plan: [`10-implementation-plan.md`](../10-implementation-plan.md)
- API specification: [`06-api-specification.md`](../06-api-specification.md)
- Architecture: [`04-architecture.md`](../04-architecture.md)
