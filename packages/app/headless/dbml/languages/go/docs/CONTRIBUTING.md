# Contributing

## Setup

```bash
# repo root — the Go module lives under packages/app/headless/dbml/go
cd packages/app/headless/dbml/go
go build ./...
```

## Commands

| Command          | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `go build ./...` | Compile all packages                          |
| `go test ./...`  | All unit tests                                |
| `go vet ./...`   | Static analysis                               |
| `gofmt -w .`     | Format all Go files                           |
| `go mod tidy`    | Tidy dependencies                             |
| `make build`     | Build `bin/dbml`                              |
| `make build-all` | Cross-compile 4 platforms into `bin/`         |
| `make test`      | `go test ./...`                               |
| `make lint`      | `go vet ./...`                                |
| `make format`    | `go fmt ./...`                                |
| `make coverage`  | Generate HTML coverage report in `./coverage` |
| `make tidy`      | `go mod tidy`                                 |
| `make install`   | Build to `~/bin/dbml`                         |
| `make clean`     | Remove `./bin` and `./coverage`               |

`make all` (format + lint + test + build) is the gate before handoff.

## Coding Conventions

Follow the repo-wide [Go conventions](../../../../../AGENTS.md) — in short:

- `error` as the last return value; handle errors explicitly, never `_ = err`
- Prefer `var` zero-initialization (`var s string`) over `s := ""`
- `context.Context` as the first parameter for any I/O work
- No global state — dependencies passed explicitly via struct fields / function
  parameters
- Return early, avoid deep nesting; small, focused files
- No comments in code unless explaining non-obvious logic

Package layout:

```txt
main.go                  # entrypoint (package main)
cmd/                     # cobra command wiring (thin — delegate to internal)
internal/dbml/           # parser, SQL generator, Mermaid generator
internal/server/         # HTTP server with REST API
```

- Commands in `cmd/*.go` only parse flags and call into `internal/dbml` or
  `internal/server`.
- Keep the strict separation: parser, generators, CLI, and HTTP are separate
  layers. Do not mix HTTP logic into the parser; do not hard-code output
  formats into the parser.
- `internal/dbml/parser.go` holds the DBML parser and both generators (SQL and
  Mermaid). The parser builds an internal AST, then the generators walk it to
  produce output.
- `internal/server/server.go` is the HTTP server; it uses the parser and
  generators but does not contain business logic.

## Testing Conventions

- Colocate `*_test.go` with the code they test; use table-driven tests
  (`[]struct{...}` + `t.Run`) and behaviour-spec test names
- Important areas to test:
  - DBML parsing (tables, columns, references, enums, indexes)
  - SQL generation (types, constraints, foreign keys)
  - Mermaid generation (syntax, relationships)
  - CLI commands
  - HTTP API endpoints
  - Error handling
- Keep tests isolated; never depend on the real `bin/dbml` or generated output
  files

## Error Handling

Errors should be actionable.

Bad:

```text
Error
```

Better:

```text
dbml: failed to parse schema.dbml: line 5: unknown column type "foobar"
```

CLI errors should identify:

- what failed
- which file/path was involved
- enough context for the user to fix it

HTTP API errors return JSON with `error` field.

Do not silently ignore malformed input.

## Docs

Update `docs/ARCHITECTURE.md` when the pipeline, parser, or API changes.
Update `README.md` when commands or flags change. Keep `docs/ROADMAP.md`
checkboxes in sync with what actually ships.
