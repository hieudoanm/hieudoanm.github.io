# Landify

Build a flat landing page from a single YAML file. Read the repo-root
`AGENTS.md` for the project-wide coding conventions; this file only adds the
commands and layout specific to this Go module.

## Commands

Run from `packages/app/headless/landify/go`:

- `make build` — compile the CLI to `./bin/landify`
- `make test` — `go test ./...`
- `make vet` — `go vet ./...`
- `make fmt` — `gofmt -l -w .` (should report no files afterwards)
- `make clean` — remove `./bin` and the generated `index.html`

Verification before handoff: `make fmt` produces no output, `make vet` exits 0,
and `make test` passes.

## Layout

- `static/` — input assets embedded at build time: `template.tmpl` (the page
  template) and `example.yaml` (annotated placeholder written by `landify new`)
- `internal/landify/` — config schema, strict parsing, validation, rendering
- `cmd/` — cobra command wiring

## Content rules

- `landify.yaml` feeds `static/template.tmpl` via `html/template`; unknown
  YAML fields are parse errors (strict decoding via `KnownFields(true)`). The
  `theme` section takes only the eight base colors + `radius`; all other `:root`
  tokens are derived (shades, tints, WCAG contrast) in `internal/landify/color.go`.
- The hero always renders an image (`hero.image.src` required) and the demo
  always renders a video (`demo.video.src` required); both share the same
  1280 × 720 (16:9) frame.
- Built-in theme presets live in `internal/landify/themes.go` (keep exactly 8,
  add/remove via `namedThemes`); a gallery of the rendered pages and captured
  images lives in `landify/themes/html` and `landify/themes/images`.
- `landify build` writes to `index.html` in the current directory by default
  (`-o` to override).

## CLI

- `landify new` — create `landify.yaml`; refuses to overwrite without `-F`
- `landify validate -f <file>` — schema check, exits 1 listing every problem
- `landify build -f <file> -o <output> --theme <name>` — render and write the
  page; `--theme` replaces the YAML `theme:` section with a built-in preset
  (see `internal/landify/themes.go`), and validates the name against it
- `landify serve -d <dir> -p <port>` — serve a directory of static files over
  HTTP and shut down gracefully on Ctrl+C (used to preview the built page)