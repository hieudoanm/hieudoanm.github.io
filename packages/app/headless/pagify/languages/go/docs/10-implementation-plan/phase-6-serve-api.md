# pagify — Phase 6: Serve API

## Goal

JSON API for rendering individual pages over HTTP.

## Deliverables

- `internal/server/serve.go` — JSON API server
- `POST /api/v1/build` — render one page in memory
- `GET /api/v1/health`, `/api/v1/openapi.json`, `/api/v1/docs`
- `internal/workspace` — path confinement to `--root`

## Acceptance criteria

- `GET /api/v1/health` returns healthy.
- `GET /api/v1/openapi.json` returns valid OpenAPI.
- `POST /api/v1/build` returns rendered HTML; nothing written to disk.
- Requests cannot read outside `--root`.
