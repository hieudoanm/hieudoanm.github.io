# Contributing

## Setup

```bash
cd packages/app/headless/kevin/go
go build ./...
```

## Commands

| Command          | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `go build ./...` | Compile all packages                           |
| `go test ./...`  | Unit tests (all packages)                      |
| `go vet ./...`   | Static analysis                                |
| `gofmt -w .`     | Format all Go files                            |
| `go mod tidy`    | Tidy dependencies                              |
| `make build`     | Build `bin/kevin` (CGO disabled, includes TUI) |
| `make build-gui` | Build `bin/kevin-gui` with fyne (`--gui`)      |
| `make build-all` | Cross-compile 4 platforms into `bin/`          |
| `make test`      | `go test ./...`                                |
| `make lint`      | `go vet ./...`                                 |
| `make format`    | `go fmt ./...`                                 |
| `make coverage`  | HTML coverage report                           |
| `make install`   | Install to `~/bin/kevin`                       |

## Coding Conventions

Follow the repo-wide [Go conventions](../../../../../AGENTS.md) — in short:

- `error` as the last return value; handle errors explicitly, never `_ = err`
- Prefer `var` zero-initialization over `:=` for zero values
- `context.Context` as the first parameter for any I/O work
- No global state — dependencies passed explicitly via struct fields
- Return early, avoid deep nesting; small, focused files

Package layout:

```
main.go                  # entrypoint (package main) → cmd
cmd/                     # cobra CLI (root + serve subcommand)
internal/
  db/                    # key/value store (RWMutex + map)
  gui/                   # fyne key/value manager (`gui` build tag)
  tui/                   # bubbletea terminal key/value manager
  server/                # TCP server, protocol handler
```

## Testing Conventions

- Colocate `*_test.go` with the code they test
- Use table-driven tests (`[]struct{...}` + `t.Run`) and behaviour-spec names
- `internal/db` tests exercise the store directly (set/get/del/keys/concurrency)
- `internal/server/handler_test.go` exercises `handleLine` without TCP overhead
- `internal/server/server_test.go` runs end-to-end tests over a real TCP
  connection to verify the full protocol round-trip
- Each test creates its own `db.New()` — no shared mutable state between tests

## Docs

Update `docs/ARCHITECTURE.md` when the module layout or protocol changes.
Update `README.md` when adding or changing commands.
Keep `docs/ROADMAP.md` checkboxes in sync with what actually ships.
