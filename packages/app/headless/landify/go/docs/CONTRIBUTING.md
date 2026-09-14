# Contributing

## Setup

```bash
# repo root — the Go module lives under packages/app/headless/landify/go
cd packages/app/headless/landify/go
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
| `make build`     | Build `bin/landify`                           |
| `make build-all` | Cross-compile 4 platforms into `bin/`         |
| `make test`      | `go test ./...`                               |
| `make lint`      | `go vet ./...`                                |
| `make format`    | `go fmt ./...`                                |
| `make install`   | Install to `~/bin/landify`                    |
| `make clean`     | Remove `./bin`, `./coverage` and `index.html` |

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
internal/landify/        # schema, validation, color tokens, themes, rendering
static/                  # embedded templates, partials, examples
```

- Commands in `cmd/*.go` only parse flags and call into `internal/landify`
  (e.g. `BuildFile`, `ValidateFile`, `WritePlaceholder`, `Themes`, `Serve`).
- Keep the strict contract in place: `yaml.Decoder` with `KnownFields(true)` in
  `config.go`; per-type required checks in `validate.go`; exactly 64 theme
  presets in `themes.go`. `Render` falls back to `product` for unknown types —
  validation is what rejects them, so don't add rejections inside `Render`.
- All templates, partials and examples live in `static/` and are embedded with
  `//go:embed`. Add a new page type by adding its section types in
  `sections.go`, a validation branch in `validate.go`, a
  `static/templates/template-<type>.tmpl`, and an
  `static/examples/example-<type>.yaml`.

## Testing Conventions

- Colocate `*_test.go` with the code they test; use table-driven tests
  (`[]struct{...}` + `t.Run`) and behaviour-spec test names
- `config_test.go` — strict parsing (unknown field rejected) and theme merge
- `build_test.go` — rendering, `@LANDIFY_THEME@` splice, default/override theme
- `themes_test.go` — 64 presets, lookup, sorted names
- `placeholder_test.go` — scaffolding writes the right annotated example
- `serve_test.go` — file server serves bytes and shuts down on cancel
- Keep tests isolated; never depend on the real `bin/landify` or `index.html`

## Docs

Update `docs/ARCHITECTURE.md` when the pipeline, type list or theme logic
changes. Update `README.md` when commands or flags change. Keep
`docs/ROADMAP.md` checkboxes in sync with what actually ships.
