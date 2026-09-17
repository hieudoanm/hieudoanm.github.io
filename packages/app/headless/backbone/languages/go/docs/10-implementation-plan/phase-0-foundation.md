# Backbone — Phase 0: Foundation

## Goal

Establish the Go module, SQLite storage, HTTP server, and project conventions.

## Deliverables

- Go module (`go.mod`, `main.go`)
- `internal/store` — SQLite schema, migrations
- `internal/httpapi` — server, routes, handlers, middleware
- `make all` targets (`format`, `lint`, `test`, `build`)
- CI workflow

## Acceptance criteria

- `go build ./...` succeeds.
- `./backbone` starts and serves on `:8080`.
- `GET /api/health` returns `{"status":"ok"}`.
- `gofmt`, `go vet`, `go test` are clean.
