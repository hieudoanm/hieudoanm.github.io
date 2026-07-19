# Contributing

## Setup

```bash
# the Go module lives under packages/app/headless/dbml/languages/go
cd packages/app/headless/dbml/languages/go
make build          # → bin/dbml
./bin/dbml sql examples/schema.dbml
```

No code generation, no external services, no CGO — a Go toolchain and `make` are enough.

## Commands

| Command          | Purpose                                          |
| ---------------- | ------------------------------------------------ |
| `make all`       | `format` + `lint` + `test` + `build`             |
| `make format`    | `go fmt ./...`                                   |
| `make lint`      | `go vet ./...`                                   |
| `make test`      | `go test ./...`                                  |
| `make build`     | Build `bin/dbml` with `CGO_ENABLED=0`            |
| `make build-all` | Cross-compile 4 platforms into `bin/`            |
| `make coverage`  | HTML coverage report in `coverage/`              |
| `make tidy`      | `go mod tidy`                                    |
| `make install`   | Install to `~/bin/dbml`                          |
| `make clean`     | Remove `bin/` and `coverage/`                    |

Handoff gate: `make all` passes — `go fmt` produces no diff, `go vet` exits 0,
and `go test ./...` is green. There is no `golangci-lint` dependency here.

## Coding Conventions

Follow [AGENTS.md](AGENTS.md) for the full conventions — in short:

- `error` as the last return value; handle errors explicitly, never `_ = err`
- Prefer `var` zero-initialization over `:=` with an empty value
- No global state — dependencies are passed explicitly
- Return early, avoid deep nesting; small, focused files
- Cobra: use `RunE` (never `Run`), keep `cmd/*.go` thin, lowercase error
  messages, and delegate all work to `internal/`

Package layout:

```
main.go              # entrypoint (package main) → cmd.Execute()
cmd/                 # one file per command: sql, mermaid, svg, all, serve,
                     # mcp — flags and delegation only (box.go is the
                     # startup box serve renders, not a subcommand)
internal/dbml/       # parser.go (DBML → AST) + SQL/Mermaid/SVG generators
internal/server/     # HTTP API, health check, OpenAPI document
internal/mcp/        # MCP tools over JSON-RPC 2.0 (stdio transport)
```

Architectural rules that reviews should enforce (see
[`04-architecture.md`](04-architecture.md)):

- The parser knows nothing about flags, routes or transports.
- Generators take the AST and return strings — no files, no networks.
- Transports stay thin: parse input, call parser + generators, write output.

## Testing Conventions

- Colocate `*_test.go` with the code it tests; table-driven tests
  (`[]struct{...}` + `t.Run`) with behaviour-spec names
- Existing suites: `internal/dbml/svg_test.go`,
  `internal/mcp/tools_test.go`, `internal/server/openapi_test.go`
- Tests are hermetic: no network calls, no writes outside `t.TempDir()`
- Keep `make coverage` meaningful — generators and error paths are what break

## Documentation

- Update [`docs/04-architecture.md`](04-architecture.md) when the pipeline,
  modules or transports change
- Update [`docs/06-api-specification.md`](06-api-specification.md) when the
  HTTP contract changes
- Update [`README.md`](README.md) when user-facing commands change
- Keep [`docs/10-implementation-plan.md`](10-implementation-plan.md)
  checkboxes in sync with what actually ships

## Review Checklist

- [ ] `make all` passes locally
- [ ] New behaviour has a test with a behaviour-spec name
- [ ] Errors are actionable: what failed, which file/path, enough context
- [ ] Docs updated where the change touches the contracts above
- [ ] No generated output committed (`bin/`, `coverage/`, `*.sql` artefacts)
