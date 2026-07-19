# Development

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

Follow the repo-wide [Go conventions](../AGENTS.md) — in short:

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
