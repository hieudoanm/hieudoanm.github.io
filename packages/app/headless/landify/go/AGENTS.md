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

- `static/` — input assets embedded at build time: `templates/` (one
  `template-<type>.tmpl` page template per landing-page type), `partials/`
  (shared blocks: `base-css`, `header`, `footer`), and `examples/` (one
  annotated `example-<type>.yaml` placeholder per page type, written by
  `landify new -t <type>`)
- `internal/landify/` — config schema, strict parsing, validation, rendering
- `cmd/` — cobra command wiring

## Content rules

- `landify.yaml` feeds a `static/templates/template-<type>.tmpl` via
  `html/template`; unknown YAML fields are parse errors (strict decoding via
  `KnownFields(true)`). The `theme` section takes only the eight base colors +
  `radius`; all other `:root` tokens are derived (shades, tints, WCAG contrast)
  in `internal/landify/color.go`.
- The top-level `type:` field selects the page layout:
  `product` (default, the original hero + features + demo-video + CTA layout),
  `waitlist` (email-capture panel with launch date and social links),
  `event` (date/venue strip, agenda timeline, speaker grid), `download`
  (version/license badges, per-OS download buttons, install snippet), `app`
  (store badges, ratings, portrait screenshot gallery), `pricing` (tier cards
  with a tagged "most popular" plan), `portfolio` (avatar, skills chips,
  project grid), `docs` (topic card links, code sample), `faq` (native
  `<details>` question/answer rows, no JavaScript), `team` (values strip and
  member card grid), `status` (state banner colored by
  `status.state`, uptime stats, incident log), and `linktree` (compact profile
  with big link cards and social pills — the only layout without a hero
  section). Required fields are per-type and enforced in
  `internal/landify/validate.go` (`KnownTypes()`). Only `product` requires
  `hero.image.src` and `demo.video.src`; all media shares the 1280 × 720
  (16:9) frame.
- `Render` selects the template by type, falling back to `product` for
  unknown types (validation is what rejects them); the `@LANDIFY_THEME@` slot
  inside each template's `<style>` is spliced by build.go after execution.
- Built-in theme presets live in `internal/landify/themes.go` (keep exactly 64,
  add/remove via `namedThemes`); the theme gallery lives in
  `landify/examples/themes` — one folder per theme with `<name>.html` (built
  from `themes/showcase.yaml`) and `<name>.png`, sharing `demo.*` media at the
  folder root — and the page-type gallery in `landify/examples/templates/<type>/`
  (one `<type>.yaml` + built `<type>.html` + captured `<type>.png` per type, all
  rendered with the `slate` preset, sharing `media/`).
- `landify build` writes to `index.html` in the current directory by default
  (`-o` to override).

## CLI

- `landify new -t <type>` — create `landify.yaml` from the annotated example
  of the given page type (default `product`); refuses to overwrite without `-F`
- `landify validate -f <file>` — schema check, exits 1 listing every problem
- `landify build -f <file> -o <output> --theme <name>` — render and write the
  page; `--theme` replaces the YAML `theme:` section with a built-in preset
  (see `internal/landify/themes.go`), and validates the name against it
- `landify themes` — list the sixty-four built-in theme presets
- `landify serve -d <dir> -p <port>` — serve a directory of static files over
  HTTP and shut down gracefully on Ctrl+C (used to preview the built page)