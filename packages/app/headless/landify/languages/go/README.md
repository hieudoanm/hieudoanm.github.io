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
- **Open Graph card** — an optional `site.og` block renders the social meta
  tags (and a Twitter card) that make a shared link show your page's image
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
./bin/landify mcp serve     # expose Landify to LLM clients over MCP

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
- `mcp serve --root` — directory the MCP server may read and write (default `.`)

## MCP (Model Context Protocol)

`landify mcp serve` speaks newline-delinated
[JSON-RPC 2.0](https://www.jsonrpc.org/specification) on stdin/stdout — the
transport MCP clients expect. Logs go to stderr so stdout carries only protocol
frames. There is no MCP SDK dependency: the protocol is a few hundred lines of
`encoding/json` over two pipes.

```bash
# Let the server work inside the current directory
./bin/landify mcp serve

# Confine it to a project subdirectory
./bin/landify mcp serve --root ./site
```

Point an MCP client at the binary:

```json
{
  "mcpServers": {
    "landify": {
      "command": "/absolute/path/to/landify",
      "args": ["mcp", "serve", "--root", "/absolute/path/to/project"]
    }
  }
}
```

### Tools

| No | Tool                   | Description                                                       |
| -- | ---------------------- | ----------------------------------------------------------------- |
| 1  | `landify_scaffold`     | Return an annotated starter config for one of the 12 page types   |
| 2  | `landify_validate`     | Schema-check a config, reporting every problem at once            |
| 3  | `landify_build`        | Render a config to a self-contained HTML page                     |
| 4  | `landify_types`        | List the 12 page types and what each layout contains              |
| 5  | `landify_themes`       | List the 64 theme presets, optionally filtered by a substring     |
| 6  | `landify_theme_tokens` | Resolve a theme into its 19 derived `:root` CSS custom properties |

`landify_validate` and `landify_build` read either an inline `yaml` string or a
`path` inside `--root`, and fall back to `landify.yaml` when given neither.

### Sandboxing

A model chooses every path that reaches the server, so file access is confined
to `--root`. Absolute paths and anything that escapes via `..` are rejected
rather than rewritten — a caller that means to leave the sandbox has a bug, and
quietly serving a different file would hide it. Symlinks are resolved before the
check, so a link inside the root that points out of it is refused while a link
that stays inside keeps working. `landify_scaffold` also refuses to replace an
existing file unless `overwrite` is set.

## Content

Every type has a dedicated section schema plus shared site/theme/footer
sections. Both media slots render in the same 16:9 frame (1280 × 720):

- `hero.image.src` — the hero image (required for `product`)
- `demo.video.src` — an MP4 walkthrough (required for `product`);
  `demo.video.poster` is an optional still shown before playback

### Open Graph

`site.og` is optional and shared by every layout: it fills the `<head>` so a
shared link renders a card. Every field falls back to the matching `site`
value, and `url` and `image` are only emitted when you set them — a config
with no `og` block still gets `og:title`, `og:description`, `og:type`,
`og:site_name` and `twitter:card`.

```yaml
site:
  og:
    title: 'A flat landing page from one YAML file.'
    kicker: 'One file, one page'
    tags:
      - 'Zero build step'
      - '12 layouts'
      - 'HTML + CSS only'
    image: 'https://example.com/og/og.png'
    image_alt: 'Landify — a flat landing page from one YAML file.'
    url: 'https://example.com/'
```

`kicker` and `tags` are the two card-only fields: they have no Open Graph
counterpart because the meta tags have no room for them, and they are what
makes each card read as its own product. Everything else is standard.

`landify build` draws that card for you. With an `og` block present it writes a
1200 × 630 `og/og.svg` beside the page, colored from `theme`: a gradient
background, an accent rail, the header row (monogram, site name, host), the
copy column (kicker, title, description — wrapped, truncated and optically
centred) and the identity panel on the right (monogram over up to four tag
chips). Every color comes from the theme, and accent-colored text is shifted
until it clears 4.5:1 contrast on the background.

Rasterize it with any SVG renderer and point `image` at the result:

```bash
landify build -o public/index.html
rsvg-convert -o public/og/og.png public/og/og.svg
```

Then set `image: '/og/og.png'` (or the absolute URL) in the config and rebuild
so the tag points at the PNG you just made.

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
- **Social card:** `internal/landify/og.go` resolves the 1200 × 630 `og.svg`
  from `static/og.tmpl`; `ogtext.go` holds the card geometry and wraps the copy
  to fit it
- **MCP:** `internal/mcp` is a hand-rolled newline-delimited JSON-RPC 2.0 stdio
  server; `workspace.go` is the sandbox that confines tool file access to one
  root directory
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
