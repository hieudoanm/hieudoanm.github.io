# Contributing

## Setup

```bash
# repo root — the Go module lives under packages/app/headless/cv/languages/go
cd packages/app/headless/cv/languages/go
go build ./...
```

## Commands

| Command          | Purpose                                        |
| ---------------- | ---------------------------------------------- |
| `go build ./...` | Compile all packages                           |
| `go test ./...`  | All unit tests                                 |
| `go vet ./...`   | Static analysis                                |
| `gofmt -w .`     | Format all Go files                            |
| `go mod tidy`    | Tidy dependencies                              |
| `make build`     | Build `bin/cv` (CGO disabled)                  |
| `make build-all` | Cross-compile 4 platforms into `bin/`          |
| `make test`      | `go test ./...`                                |
| `make lint`      | `go vet ./...`                                 |
| `make format`    | `go fmt ./...`                                 |
| `make coverage`  | HTML coverage report in `./coverage`           |
| `make tidy`      | `go mod tidy`                                  |
| `make install`   | Build to `~/bin/cv`                            |
| `make clean`     | Remove `./bin` and `./coverage`                |

`make all` (format + lint + test + build) is the gate before handoff.

## Coding Conventions

Follow the repo-wide [Go conventions](../../../../../../../AGENTS.md) — in
short:

- `error` as the last return value; handle errors explicitly, never `_ = err`
- Prefer `var` zero-initialization (`var s string`) over `s := ""`
- `context.Context` as the first parameter for any I/O work
- No global state — dependencies passed explicitly via struct fields / function
  parameters
- Return early, avoid deep nesting; small, focused files
- No comments in code unless explaining non-obvious logic

Package layout:

```txt
main.go                  # entrypoint (package main) — calls cmd.Execute()
cmd/                     # cobra command wiring (thin — delegate to internal)
internal/cv/             # data model, loading, template rendering, PDF output
internal/mcp/            # JSON-RPC 2.0 server over stdio
templates/               # 64 HTML templates, grouped 8 × 8
```

- Commands in `cmd/*.go` only parse flags and call into `internal/cv`. Rendering
  logic does not belong in `cmd/`.
- `internal/cv/types.go` holds the data model; `internal/cv/cv.go` holds
  `LoadCV`, `WriteDefaultCV`, `ListTemplates`, `GeneratePDF`, and
  `renderTemplate`. Keep the model and the rendering in these two files until a
  clear split is needed.
- Templates are complete HTML documents with an inline `<style>` block. Use
  `text/template` actions (`{{.Personal.FullName}}`, `{{range .Experience}}`)
  exactly as the existing templates do — do not introduce partials or shared
  CSS files without updating `renderTemplate`.
- Every list section is optional: guard it with `{{if .Section}}`.

## Adding a template

1. Add `templates/<group>/<name>.html` (copy a sibling and restyle it).
2. The template is addressed as `<group>/<name>`; no registration is required
   because `ListTemplates` walks the directory.
3. Regenerate the example PDF and update `examples/themes/<group>/<name>.pdf`
   with `cv pdf -t <group>/<name> -i examples/cv.yaml -o examples/themes/<group>/<name>.pdf`.

## Testing Conventions

- Colocate `*_test.go` with the code they test; use table-driven tests
  (`[]struct{...}` + `t.Run`) and behaviour-spec test names
- Important areas to cover as tests are added:
  - `LoadCV` on valid, partial, and malformed YAML
  - `renderTemplate` resolution (`group/name`, fallbacks) and output
  - `validate` required-field rules
  - Markdown generation output
  - HTTP handlers (`POST /pdf`, `GET /health`) via `net/http/httptest`
  - MCP message handling for `initialize`, `tools/list`, `tools/call`
- Keep tests isolated; never depend on the real `bin/cv` or generated output
  files

> The repository currently ships no tests. Adding the `internal/cv` and
> `internal/mcp` suites above is the highest-value first contribution; see
> [ROADMAP](ROADMAP).

## Error Handling

Errors should be actionable.

Bad:

```text
Error
```

Better:

```text
cv: cv.yaml not found. Run 'cv init' first
```

CLI errors should identify what failed, which file was involved, and enough
context for the user to fix it. Validation errors name the offending field
(for example `experience[0].company is required`).

Do not silently ignore malformed input.

## Docs

Update `docs/ARCHITECTURE.md` when the pipeline, data model, or command surface
changes. Update `docs/DOWNLOADS.md` when commands or flags change. Keep
`docs/ROADMAP.md` checkboxes in sync with what actually ships.
