# Contributing

## Setup

```bash
cd packages/app/headless/browserverless/languages/go
make all
```

## Commands

| Command          | Purpose                                   |
| ---------------- | ----------------------------------------- |
| `go build ./...` | Compile all packages                      |
| `go test ./...`  | Unit + integration tests                  |
| `go vet ./...`   | Static analysis                           |
| `gofmt -w .`     | Format all Go files                       |
| `go mod tidy`    | Tidy dependencies                         |
| `make build`     | Build `bin/browserverless` (CGO disabled) |
| `make build-all` | Cross-compile 4 platforms into `bin/`     |
| `make test`      | `go test ./...`                           |
| `make lint`      | `go vet ./...`                            |
| `make format`    | `go fmt ./...`                            |
| `make coverage`  | HTML coverage report                      |
| `make install`   | Install to `~/bin/browserverless`         |

## Coding Conventions

Follow the repo-wide [Go conventions](../../../../../AGENTS.md) — in short:

- `error` as the last return value; handle errors explicitly, never `_ = err`
- Prefer `var` zero-initialization over `:=` for zero values
- `context.Context` as the first parameter for any I/O work
- No global state — dependencies passed explicitly via struct fields
- Return early, avoid deep nesting; small, focused files

Package layout:

```
main.go                          # entrypoint (package main), CLI dispatch
internal/
  headless/                      # go-webengine wrapper
  server/                        # HTTP handler + serve lifecycle
  version/                       # version var (stampable via ldflags)
```

## Testing Conventions

- Colocate `*_test.go` with the code they test
- Use table-driven tests (`[]struct{...}` + `t.Run`) and behaviour-spec names
- `internal/headless` tests exercise the engine via a local `httptest.Server`
  serving static HTML — no external network, no race, fully hermetic
- `internal/server/handler_test.go` uses a fake `Renderer` to test every HTTP
  route (200/400/404/405/500/504) without touching the network
- `internal/server/server_test.go` covers `resolveBind` and `externalIPv4`
- `main_test.go` tests CLI dispatch, flag help, and the `health` subcommand
- `tests/integration_test.go` is the E2E gate: builds the real binary
  (`go build ./..`) and exercises the live `serve` API and the CLI against a
  local `httptest` fixture — hermetic, no external network
- Each test creates its own server or browser — no shared mutable state

## Docs

Update `docs/ARCHITECTURE.md` when the module layout or API changes.
Update `README.md` when adding or changing commands.
Keep `docs/ROADMAP.md` checkboxes in sync with what actually ships.
