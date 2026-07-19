# Contributing

## Setup

```bash
# repo root — the Go module lives under packages/app/headless/backbone/go
cd packages/app/headless/backbone/go
go build ./...
```

## Commands

| Command            | Purpose                               |
| ------------------ | ------------------------------------- |
| `go build ./...`   | Compile all packages                  |
| `go test ./...`    | Unit tests (all packages)             |
| `go test ./tests/` | End-to-end tests against the binary   |
| `go vet ./...`     | Static analysis                       |
| `gofmt -w .`       | Format all Go files                   |
| `go mod tidy`      | Tidy dependencies                     |
| `make build`       | Build `bin/backbone` (CGO disabled)   |
| `make build-all`   | Cross-compile 4 platforms into `bin/` |
| `make test`        | `go test ./...`                       |
| `make lint`        | `go vet ./...`                        |
| `make format`      | `go fmt ./...`                        |
| `make coverage`    | HTML coverage report                  |
| `make install`     | Install to `~/bin/backbone`           |

## Coding Conventions

Follow the repo-wide [Go conventions](../../../../../AGENTS.md) — in short:

- `error` as the last return value; handle errors explicitly, never `_ = err`
- Prefer `var` zero-initialization (`var s string`) over `s := ""`
- `context.Context` as the first parameter for any I/O work
- No global state — dependencies passed explicitly (store, hubs, logger)
  via struct fields / function parameters
- Return early, avoid deep nesting; small, focused files

Package layout follows the standard Go layout:

```
main.go                  # entrypoint (package main)
internal/
  httpapi/               # Server, routes, handlers, middleware
  <feature>/             # store, auth, cache, cron, log, notification,
                         # pubsub, realtime, secrets, webhook, rbac, ...
tests/                   # black-box E2E tests of the built binary
```

Port each feature as a self-contained `internal/<feature>` package:

- Persistence → `internal/<feature>` + `internal/store` (SQLite funcs) or the
  feature's own store funcs
- Handlers live in `internal/httpapi`; register routes in `routes.go`
- Feature packages export payload builders used by webhook delivery /
  HTTP handlers (e.g. `WebhookRecordData`), never `internal/httpapi` types

## Testing Conventions

- Colocate `*_test.go` with the code they test; use table-driven tests
  (`[]struct{...}` + `t.Run`) and behaviour-spec test names
- Each feature package owns its handler/hub integration tests; `httpapi`
  tests exercise the full HTTP surface through `newTestServer`
- `main_test.go` runs `TestMain` which re-executes the binary against a real
  port via the `GO_MAIN_TEST=1` subprocess pattern (guards against hanging
  the test binary in `main()`)
- `tests/` builds the real binary (`go build ./..`) and runs end-to-end CRUD
  flows over HTTP — keep these green before committing
- Keep tests isolated: each test uses a fresh `t.TempDir()` for
  `BACKBONE_DATA`; never share mutable state between cases

## Docs

Update `docs/ARCHITECTURE.md` when the module layout or a feature's internals
change. Update `README.md` when adding or changing public API endpoints.
Keep `docs/ROADMAP.md` checkboxes in sync with what actually ships.
