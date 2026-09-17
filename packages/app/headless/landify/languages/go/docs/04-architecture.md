# Architecture

Landify builds a flat landing page from a single YAML file. Everything is
expressed through the YAML content file and CLI flags; there are no environment
variables, no network calls, and no external services.

## Tech Stack

| Layer        | Choice                                    |
| ------------ | ----------------------------------------- |
| Language     | Go 1.27+ (module `landify`)               |
| CLI          | `github.com/spf13/cobra`                  |
| YAML parsing | `gopkg.in/yaml.v3` (strict `KnownFields`) |
| Rendering    | `html/template` (stdlib)                  |
| Desktop GUI  | `fyne.io/fyne/v2` (behind the `gui` tag)  |
| Terminal UI  | charmbracelet bubbletea + bubbles         |
| Assets       | `embed.FS` via `//go:embed`               |
| MCP          | Hand-rolled JSON-RPC 2.0 over stdio        |
| Testing      | Standard `go test`, table-driven tests    |

The default `landify` binary is pure static (no CGO); it ships the `tui`
terminal editor in every build, while the optional `landify-gui` studio binary
is built with `-tags gui` and CGO enabled (fyne), everything else behind the
tag is stubbed.

## Directory Structure

```txt
go/
├── main.go              # Entrypoint (package main) → cmd.Execute()
├── cmd/                 # Cobra command wiring
│   ├── root.go          # rootCmd, --file persistent flag, subcommand registration
│   ├── new.go           # landify new [-t type] [-F]
│   ├── validate.go      # landify validate [-f file]
│   ├── build.go         # landify build [-f file] [-o output] [-t theme]
│   ├── themes.go        # landify themes
│   ├── preview.go       # landify preview [-d dir] [-p port] — static preview
│   ├── serve.go         # landify serve [--root] [-p port] — JSON API server
│   ├── tui.go           # landify tui [path] — terminal editor
│   ├── studio.go        # landify studio [path]
│   └── mcp.go           # landify mcp serve [--root]
├── internal/landify/    # Schema, validation, rendering, themes, scaffolding
│   ├── config.go        # Config/Theme structs, Load/LoadFile (strict decode)
│   ├── sections.go      # Per-page-type section types (Pricing, App, FAQ, …)
│   ├── validate.go      # KnownTypes, Errors/Valid/ValidateFile
│   ├── color.go         # Tokens(): 19 :root tokens derived from 8 base colors
│   ├── themes.go        # namedThemes: exactly 64 presets + lookup helpers
│   ├── build.go         # Render, BuildFile, themeCSS, @LANDIFY_THEME@ splice
│   ├── og.go            # OGCard model, RenderOG, the resolution pipeline
│   ├── ogpalette.go     # OGColor: the card palette derived from Tokens
│   ├── ogtext.go        # card geometry, rune-width estimate, wrapping, monogram
│   ├── oglayout.go      # optical centring of the copy block and the chip stack
│   ├── color_test.go    # contrastRatio, readableOn, blend
│   ├── placeholder.go   # WritePlaceholder (landify new scaffolding)
│   └── serve.go         # Serve(ctx, dir, ln): static file server
├── internal/gui/        # Desktop studio (fyne, gated behind gui build tag)
│   ├── gui.go           # !gui stub: Run → ErrUnavailable
│   ├── gui_fyne.go      # gui build: Run (opens editor window)
│   ├── doc.go           # Doc model, YAML ↔ Config, scaffold / save / render
│   ├── nodeops.go       # yaml.v3 node-level collection ops (add/remove/move/set)
│   ├── schema.go        # collection catalog, section forms, field templates
│   ├── wcag.go          # WCAG 2.1 contrast ratio + level helpers
│   ├── studio.go       # controller: AppTabs, menus, toolbar, status, watch loop
│   ├── page.go          # per-tab editor / preview / type-scaffold widgets
│   ├── actions.go       # add / close / open / save / save-as actions
│   ├── forms.go         # per-section labelled field forms (forms mode)
│   ├── collections.go   # generic collection editors (add/remove/reorder)
│   ├── themestudio.go   # theme studio: presets, color pickers, token + WCAG
│   └── build.go         # one-click build + preview server + browser open
├── internal/tui/        # Terminal editor (bubbletea, ships in every build)
│   ├── tui.go           # model, Run, Update/View loop, editor + command modes
│   └── action.go        # :command parsing, save/validate/build/generate/theme
├── internal/mcp/       # Model Context Protocol server (no SDK dependency)
│   ├── protocol.go      # JSON-RPC 2.0 envelope + MCP result types
│   ├── transport.go     # newline-delimited stdio framing, ctx-aware read loop
│   ├── server.go        # method dispatch, tools/list, tools/call
│   ├── workspace.go     # Workspace: root-confined Read/Write/Exists
│   ├── tools.go         # tool catalogue (names, descriptions, JSON Schemas)
│   ├── args.go          # argument decoding + yaml/path source resolution
│   ├── handlers.go      # scaffold, validate handlers + result helpers
│   ├── handlers_catalog.go # types, themes handlers + layout descriptions
│   └── handlers_build.go# build, theme_tokens handlers
├── static/              # Embedded templates, partials, examples
│   ├── templates/       # template-<type>.tmpl — one per page type (12)
│   ├── partials/        # base-css, header, footer
│   ├── examples/        # example-<type>.yaml — annotated placeholders (12)
│   └── og.tmpl          # the social card SVG
└── docs/                # This documentation set
```

## Pipeline

```txt
landify.yaml ─(Load)────────► Config ─(Errors)─────────────────────► valid?
                │ strict decode     │  per-type required-field checks      │
                │ + theme merge     └──── invalid ─► exit 1, list all      │
                └────────────────────────────────────────────────────┘
valid Config ─(Render)──► pick template-<type>.tmpl ─(html/template)─► HTML
                │ ParseFS(templates, partials)         splice @LANDIFY_THEME@
                └────────────── Tokens(Theme) ──► themeCSS ────────┘
HTML ─(BuildFile)──► write index.html (or -o path)
        └─ site.og set ─(RenderOG)──► write og/og.svg beside the page
```

## Modules

### Config (`internal/landify/config.go`)

`Config` holds the shared sections (`site`, `theme`, `footer`) plus one struct
per page type (all `*T`, nil when absent). `Theme` is exactly eight colors +
`radius`; empty fields merge from `DefaultTheme()`. `Load` uses
`yaml.NewDecoder` with `dec.KnownFields(true)`, so unknown YAML fields are
rejected.

### Social metadata (`internal/landify/config.go`)

`Site.OpenGraph` (YAML `site.og`) holds eight optional strings — `title`,
`description`, `image`, `image_alt`, `url`, `type`, `site_name`,
`twitter_card` — plus two card-only fields, `kicker` (a string) and `tags`
(a `[]string`), which have no Open Graph counterpart because the meta tags
have no room for them. `OpenGraph.Resolved(site)` fills the empty ones from the
site block (`type` → `website`, `twitter_card` → `summary_large_image`), and
`Config.Social()` is the method the templates call.

### Social card

`RenderOG(cfg)` fills `static/og.tmpl` with an `OGCard`: the copy resolved from
`site.og`, the palette derived from `Tokens`, and the geometry the template
draws. The card is a fixed two-column composition in a 1200 × 630 frame.

### Validation (`internal/landify/validate.go`)

`KnownTypes()` returns the 12 page types sorted. `Errors()` returns one string
per problem: global required fields (`site.name`, `site.description`,
`site.nav` ≥ 1, `footer.copyright`), per-type requirements, and theme hex
parsing (`#RRGGBB`). `linktree` is the only type that never requires a hero.

### Color tokens (`internal/landify/color.go`)

`Tokens(t Theme)` derives 19 `:root` tokens — tints/shades for `base-*`,
WCAG-contrast text (`*content`), `border`/`border-soft`/`neutral-faint` tinted
mixes. Dark canvases use different tint/shade strengths. Everything is plain
hex.

### Themes (`internal/landify/themes.go`)

`namedThemes` is a fixed gallery of 64 presets (ocean … frost). `Themes()`
returns gallery order, `ThemeByName` is case-insensitive, `ThemeNames()` sorted.

### Rendering (`internal/landify/build.go`)

`Render` parses `templates/*.tmpl` + `partials/*.tmpl` via `ParseFS`, executes
`template-<kind>.tmpl` with the `Config`, generates `:root` declarations from
`Tokens`, then splices them into the `@LANDIFY_THEME@` slot. `BuildFile`
loads, optionally overrides the theme, validates, renders, creates parent dirs
and writes the output with `0644`.

### Scaffolding (`internal/landify/placeholder.go`)

`WritePlaceholder(path, typ)` rejects unknown types, reads the embedded
`examples/example-<typ>.yaml`, and writes it (refuses to overwrite by default —
the `--force` flag overrides).

### Static server (`internal/landify/serve.go`)

`Serve` wraps `http.FileServer(http.Dir(dir))`, serves on the provided
`net.Listener` (bound to `127.0.0.1`), and shuts down with a 5s timeout on
context cancellation (`SIGINT`/`SIGTERM`). Used only for previewing built
pages.

### Desktop studio (`internal/gui/`)

The studio is a fyne app compiled only with the `gui` build tag (`make
build-gui`, CGO enabled). The default build ships `gui.go` with `//go:build
!gui` — `Run(path)` returns `ErrUnavailable` — so CI, tests and the static CLI
never pull in fyne.

### Terminal editor (`internal/tui/`)

`landify tui [path]` is a bubbletea app that ships in every build (no build
tag, no CGO). The `model` owns a `textarea` YAML pane, a `textinput` command
line, and an `active` mode selecting which widget receives keystrokes.

### Model Context Protocol (`internal/mcp/`)

`landify mcp serve` runs an MCP server on stdio so an LLM client can drive the
same pipeline the CLI uses. The transport is newline-delimited
JSON-RPC 2.0: one JSON object per line in each direction, with `initialize`,
`ping`, `tools/list` and `tools/call` implemented by hand. There is no MCP SDK
dependency.

The six tools map onto the existing pipeline: `landify_scaffold` →
`Placeholder`, `landify_validate` → `Load` + `Errors`, `landify_build` →
`Render`, `landify_themes`/`landify_theme_tokens` → `Themes`/`Tokens`, and
`landify_types` returns the 12 layouts with a one-line description each.

## Configuration

| Flag (command)            | Default        | Purpose                       |
| ------------------------- | -------------- | ----------------------------- |
| `--file` / `-f` (all)     | `landify.yaml` | YAML content file             |
| `--output` / `-o` (build) | `index.html`   | Generated page path           |
| `--theme` / `-t` (build)  | (YAML theme)   | Override with a named preset  |
| `--type` / `-t` (new)     | `product`      | Page type to scaffold         |
| `--force` / `-F` (new)    | `false`        | Overwrite existing file       |
| `--dir` / `-d` (preview)  | `.`            | Directory to serve statically |
| `--root` / `-r` (serve)   | `.`            | Directory the API is confined to |
| `--port` / `-p` (server)  | `8080`         | Listen port (127.0.0.1)       |
| `[path]` (studio)         | (new product)  | YAML file to open in the GUI  |
| `[path]` (tui)            | `landify.yaml` | YAML file to open in terminal |
| `--root` (mcp serve)      | `.`            | Directory the MCP tools may touch |
