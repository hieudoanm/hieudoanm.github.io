# Landify (Go)

> Build a flat landing page from a single YAML file. The output is plain HTML
> and CSS with no runtime dependencies — open `index.html` in a browser or
> serve it from any static host.

## Features

- **12 page layouts** — `product`, `waitlist`, `event`, `download`, `app`,
  `pricing`, `portfolio`, `docs`, `faq`, `team`, `status`, `linktree`
- **64 built-in theme presets** — pick a named palette or set the eight base
  colors yourself
- **Derived design tokens** — shades, tints, borders and WCAG-readable
  text-on-accent colors are computed from your base colors, so the whole page
  restyles from a handful of entries
- **Strict validation** — unknown YAML fields and missing required fields are
  errors that list every problem at once
- **Desktop studio** — an optional fyne GUI (`landify studio`) with live
  edit/preview, a theme studio, section forms and one-click build & preview
- **Terminal editor** — `landify tui`, a portable in-terminal editor that
  ships with every build and covers the same authoring loop (edit, validate,
  build, scaffold, theme) without CGO or a GUI
- **Zero runtime deps** — the built page is static HTML + CSS, no JavaScript,
  no CDN
- **Local preview** — a small HTTP file server for reviewing the built page

See [docs/](./docs/) for architecture, contributing, downloads, packaging and
roadmap.

## Development

```bash
make build        # build bin/landify
make test         # go test ./...
make lint         # go vet ./...
make format       # go fmt ./...
make all          # format + lint + test + build
make clean        # remove ./bin, ./coverage and the generated index.html
```

## Usage

```sh
./bin/landify new           # create landify.yaml with annotated placeholder content
./bin/landify new -t docs   # scaffold a docs layout instead of product
./bin/landify validate      # check the schema (strict: unknown fields are errors)
./bin/landify build         # write index.html from landify.yaml
./bin/landify themes        # list the 64 built-in theme presets
./bin/landify serve -p 8080 # preview the built page locally
./bin/landify tui           # open the terminal editor (ships with every build)

# the desktop studio (requires a GUI build, see below)
make build-gui              # build ./bin/landify-gui
./bin/landify-gui studio site.yaml   # edit + preview a file live
./bin/landify-gui studio             # start with a new product scaffold
```

### Studio

`landify studio` is a fyne desktop app bundled as a separate binary
(`bin/landify-gui`, built with `make build-gui` — it needs CGO, the fyne UI
layer is behind the `gui` build tag and absent from the plain `landify`
binary). It packs the whole authoring loop into one window:

- **Split editor / preview** — type in the YAML, see inline validation issues
  and live rendered HTML
- **Theme studio** — start from any of the 64 presets, pick the eight base
  colors with a color dialog, and watch every derived `:root` token plus the
  WCAG contrast for the important text/background pairs update live
- **Forms mode** — edit every section through labelled fields instead of raw
  YAML, with generic collection editors (add / remove / reorder) for nav,
  feature cards, pricing tiers, FAQ rows, and more
- **Page type scaffolding** — switch the whole document to any of the 12
  layouts with one click
- **One-click build & preview** — build the page, start a local server, open
  it in a browser, and auto-rebuild whenever the YAML changes

### Terminal editor

`landify tui [path]` is a ratatui-style, in-terminal YAML editor that ships in
every build, so the full authoring loop works without CGO or a display server.
Esc toggles the `:` command line, Ctrl-C quits:

- **Edit** — type in the YAML pane; a `•` marks unsaved changes
- **validate** — check the buffer against the schema
- **build [file]** — render the buffer to `index.html` (or a custom path),
  honouring the `theme` override
- **generate <type>** — replace the buffer with any of the 12 scaffolds
- **theme <name>** — set a built-in preset (or `yaml` to use the YAML theme)
- **save / reload** — write the buffer or re-read the file from disk

The terminal and `studio` editors are two front-ends to the same pipeline:
validate → render → write.

### Flags

- `-f, --file` — YAML content file (default `landify.yaml`)
- `-o, --output` — generated page, `build` only (default `index.html`)
- `build -t, --theme` — override the YAML `theme:` section with a named preset
  (default: use the YAML theme as-is)
- `new -t, --type` — page layout to scaffold: `product` (default) and the
  other 11 types
- `new -F, --force` — overwrite an existing `landify.yaml`
- `serve -d, --dir` — directory to serve (default `.`)
- `serve -p, --port` — port to listen on (default `8080`)
- `serve -b, --bind` — address to bind (default `127.0.0.1`; use `0.0.0.0` in containers)

## Content

Every type has a dedicated section schema plus shared site/theme/footer
sections. Both media slots render in the same 16:9 frame (1280 × 720):

- `hero.image.src` — the hero image (required for `product`)
- `demo.video.src` — an MP4 walkthrough (required for `product`);
  `demo.video.poster` is an optional still shown before playback

### Themes

`theme` takes only the eight base colors (plus the corner `radius`). Every
other token the page uses — surfaces, hairline borders, and text-on-accent
colors — is calculated from them (shades, tints, and WCAG contrast):

```yaml
theme:
  primary: '#0d9488'
  radius: '10px'
```

Fields you leave empty fall back to the defaults. The placeholder generated by
`landify new` lists every default and the full schema.

## Architecture

- **Parsing:** `gopkg.in/yaml.v3` with `KnownFields(true)` (strict)
- **Rendering:** `html/template` executing an embedded
  `static/templates/template-<type>.tmpl`
- **Theming:** `internal/landify/color.go` derives 19 `:root` tokens from the
  eight base colors; `internal/landify/themes.go` holds the 64 presets
- **Packaging:** assets embedded via `//go:embed`; single static binary, no CGO
  (the `gui`-tagged fyne studio is the one CGO exception — use
  `make build-gui`; the `tui` terminal editor ships in the plain build)

## Documentation

| Document                               | Description                           |
| -------------------------------------- | ------------------------------------- |
| [Architecture](./docs/ARCHITECTURE.md) | Schema, rendering, themes, CLI wiring |
| [Contributing](./docs/CONTRIBUTING.md) | Setup, commands, conventions, testing |
| [Downloads](./docs/DOWNLOADS.md)       | Prebuilt binary or build from source  |
| [Packaging](./docs/PACKAGING.md)       | Build + CI artifact pipeline          |
| [Roadmap](./docs/ROADMAP.md)           | Phased feature roadmap                |
