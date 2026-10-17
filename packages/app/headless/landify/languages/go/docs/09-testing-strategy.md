# Testing Strategy

## Conventions

- Colocate `*_test.go` with the code they test; use table-driven tests
  (`[]struct{...}` + `t.Run`) and behaviour-spec test names.
- `config_test.go` — strict parsing (unknown field rejected) and theme merge
- `build_test.go` — rendering, `@LANDIFY_THEME@` splice, default/override theme
- `themes_test.go` — 64 presets, lookup, sorted names
- `placeholder_test.go` — scaffolding writes the right annotated example
- `serve_test.go` — file server serves bytes and shuts down on cancel
- `internal/tui/tui_test.go` — editor command parsing, validate/build/theming
  via `renderConfig`, dirty tracking and scaffold generation
- `internal/mcp/*_test.go` — the MCP server is tested through its real wire
  protocol: `helpers_test.go` drives a full session against a temp-directory
  workspace, and the per-tool files (`scaffold_test.go`, `validate_test.go`,
  `build_test.go`, `theme_tokens_test.go`, `catalog_test.go`, `tools_test.go`)
  cover one tool each. `workspace_escape_test.go` covers the sandbox, including
  symlinks that point out of the root.
- Keep tests isolated; never depend on the real `bin/landify` or `index.html`

## Commands

| Command          | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `go test ./...`  | All unit tests                                |
| `go vet ./...`   | Static analysis                               |
| `gofmt -w .`     | Format all Go files                           |
| `make test`      | `go test ./...`                               |
| `make lint`      | `go vet ./...`                                |
| `make format`    | `go fmt ./...`                                |
| `make all`       | format + lint + test + build (gate before handoff) |

## Quality gates

`make all` (format + lint + test + build) is the gate before handoff:
`go fmt` produces no diff, `go vet` exits 0, and `go test ./...` is green.
