# Architecture

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

No network calls, no external services. The default `landify` binary is pure
static (no CGO); it ships the `tui` terminal editor in every build, while the
optional `landify-gui` studio binary is built with `-tags gui` and CGO
enabled (fyne), everything else behind the tag is stubbed.

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
│   ├── serve.go         # landify serve [-d dir] [-p port]
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
`Config.Social()` is the method the templates call. Keeping the fallbacks in
Go rather than in the template means all 12 layouts share one rule, and
`og:url`/`og:image` are emitted only when configured. `Configured()` reports
whether a card was asked for; it is a method rather than a struct comparison
because `Tags` is a slice.

### Social card

`RenderOG(cfg)` fills `static/og.tmpl` with an `OGCard`: the copy resolved from
`site.og`, the palette derived from `Tokens`, and the geometry the template
draws. The card is a fixed two-column composition in a 1200 × 630 frame:

| Region                    | Contents                                                      |
| ------------------------- | ------------------------------------------------------------- |
| Background                | `base-100`→`base-200` gradient, accent glow, 12px accent rail |
| Header (y 84)             | Monogram tile, site name, host of `og:url`, hairline at y 176 |
| Copy column (96…700)      | Kicker, title (3 lines), description (3 lines)                |
| Identity panel (748…1104) | Monogram tile over up to 4 tag chips                          |

All of the numbers live in `ogtext.go`, and the two placement functions in
`oglayout.go`. Advance widths are estimated per rune class (`iljtIf` narrow,
`mwMW` wide, uppercase mid) because the card has to wrap text without a font
library, and the estimate is deliberately generous. `ogCenterText` centres the
painted box — not the baselines — inside the copy region, so a one-line and a
three-line card land in the same optical spot; `ogPills` centres the chip stack
in the panel and clamps a tag that cannot fit rather than dropping it. The tile
and the chips share the panel's padding edge (`Panel.TileX`), so the stack reads
as one left-aligned column instead of a tile bleeding into the panel border.
`ogMonogram` derives the
tile letter from `site.name` (emoji do not survive rasterising, so `site.mark`
is not used). Accent-colored text goes through `readableOn`, which shifts the
color until it clears 4.5:1 on the background, so a theme's `primary` can carry
small type without an accessibility failure.

`BuildFile` writes the card to `og/og.svg` next to the page — only when
`site.og` is configured (`OpenGraph.Configured`) — and `OGCardPath` is the
single source of truth for that path. The PNG is left to an external
rasterizer.

### Validation (`internal/landify/validate.go`)

`KnownTypes()` returns the 12 page types sorted. `Errors()` returns one string
per problem: global required fields (`site.name`, `site.description`,
`site.nav` ≥ 1, `footer.copyright`), per-type requirements (each type has its
own switch branch; `product` additionally requires the media slots
`hero.image.src` and `demo.video.src`), and theme hex parsing (`#RRGGBB`).
`linktree` is the only type that never requires a hero.

### Color tokens (`internal/landify/color.go`)

`Tokens(t Theme)` derives 19 `:root` tokens — tints/shades for `base-*`,
WCAG-contrast text (`*content` from `contrastingText`, threshold luminance ≥
0.5 → `#181d25` or `#fff`), `border`/`border-soft`/`neutral-faint` tinted
mixes. Dark canvases (base luminance < 0.35) use different tint/shade
strengths. Everything is plain hex.

### Themes (`internal/landify/themes.go`)

`namedThemes` is a fixed gallery of 64 presets (ocean … frost). `Themes()`
returns gallery order, `ThemeByName` is case-insensitive, `ThemeNames()` sorted.
`build --theme <name>` replaces the YAML theme with a preset (validated).

### Rendering (`internal/landify/build.go`)

`Render` parses `templates/*.tmpl` + `partials/*.tmpl` via `ParseFS`, executes
`template-<kind>.tmpl` with the `Config`, generates `:root` declarations from
`Tokens`, then splices them into the `@LANDIFY_THEME@` slot. `BuildFile` loads,
optionally overrides the theme, validates, renders, creates parent dirs and
writes the output with `0644`.

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

The studio is a fyne app compiled only with the `gui` build tag
(`make build-gui`, CGO enabled). The default build ships `gui.go` with
`//go:build !gui` — `Run(path)` returns `ErrUnavailable` — so CI, tests and the
static CLI never pull in fyne. Pure logic shared with the GUI (`doc.go`,
`nodeops.go`, `schema.go`, `wcag.go`) must stay fyne-free so it compiles and
tests in both builds.

The `Doc` model in `doc.go` is the single source of truth: it keeps the raw
YAML plus a decoded `landify.Config`, and every mutation (type scaffold,
`SetTheme`, `ApplySectionFields`, collection edits) rewrites the YAML through
the yaml.v3 node helpers in `nodeops.go` while `Replace` round-trips any raw
editor text through parse → validate → re-serialize. The controller in
`studio.go` owns a `container.DocTabs` of pages plus the theme-studio / forms
panes; a background file-watcher reloads the active document and rebuilds the
preview server on disk changes. `build.go` composes `landify.Render`,
`landify.Serve`-style on-demand preview (writes `index.html` into a per-tab
temp dir, serves it, opens the browser) — exactly the same pipeline the CLI
uses, so the GUI can never render something the CLI can't.

### Terminal editor (`internal/tui/`)

`landify tui [path]` is a bubbletea app that ships in every build (no build
tag, no CGO). The `model` owns a `textarea` YAML pane, a `textinput` command
line, and an `active` mode selecting which widget receives keystrokes: editor
(typing edits the buffer) or command (Esc toggles, Enter runs). Ctrl-C/Ctrl-Q
quit. A dirty `•` marks unsaved edits (buffer vs. the last save/reload point).
Pure helpers in `action.go` keep the pipeline testable: `parseCommand` splits
`:command` lines, `renderConfig` runs load → optional theme override →
validate → render (the same path as `landify build`), and `doSave` /
`doGenerate` / `doTheme` mutate state. Like the studio, the TUI is a front-end
to the CLI pipeline — anything it builds passes strict validation first.

### Model Context Protocol (`internal/mcp/`)

`landify mcp serve` runs an MCP server on stdio so an LLM client can drive the
same pipeline the CLI uses. The transport is newline-delimited
[JSON-RPC 2.0](https://www.jsonrpc.org/specification): one JSON object per line
in each direction, with `initialize`, `ping`, `tools/list` and `tools/call`
implemented by hand. There is no MCP SDK dependency.

```txt
MCP client → stdin line (JSON-RPC 2.0)
  → Server.handleMessage: validate envelope, drop notifications
  → tools/call: decode args → Workspace (root-confined) → internal/landify
  ← ToolResult{content:[{type:"text",text:<indented JSON>}],isError?}
```

A model chooses every path that reaches a tool, so `workspace.go` is the
security boundary: the root is canonicalised once at startup and every read,
write and stat must stay inside it. Absolute paths and `..` escapes are rejected
rather than rewritten, so a bug in a client surfaces as an error instead of
silently serving a different file. Symlinks are resolved before the containment
check — a link inside the root pointing out of it is refused, a link that stays
inside is allowed — because a lexical prefix check is otherwise bypassable with
a single symlink. `landify_scaffold` additionally refuses to replace an existing
file without `overwrite`.

Failures are split by audience. Framing problems — bad JSON, a wrong `jsonrpc`
version, an unknown method or tool, undecodable params — are JSON-RPC errors. A
tool that fails for a domain reason (an unknown theme, an escaping path) returns
`isError: true` with readable text, and a config that fails validation returns
the same `validateResult` payload `landify validate` produces, so the model can
read the problems and fix them.

The six tools map onto the existing pipeline: `landify_scaffold` →
`Placeholder`, `landify_validate` → `Load` + `Errors`, `landify_build` →
`Render`, `landify_themes`/`landify_theme_tokens` → `Themes`/`Tokens`, and
`landify_types` returns the 12 layouts with a one-line description each.

## Configuration

Landify reads no environment variables and writes no config files. Everything
is expressed through the YAML content file and CLI flags:

| Flag (command)            | Default        | Purpose                       |
| ------------------------- | -------------- | ----------------------------- |
| `--file` / `-f` (all)     | `landify.yaml` | YAML content file             |
| `--output` / `-o` (build) | `index.html`   | Generated page path           |
| `--theme` / `-t` (build)  | (YAML theme)   | Override with a named preset  |
| `--type` / `-t` (new)     | `product`      | Page type to scaffold         |
| `--force` / `-F` (new)    | `false`        | Overwrite existing file       |
| `--dir` / `-d` (serve)    | `.`            | Directory to serve            |
| `--port` / `-p` (serve)   | `8080`         | Listen port (127.0.0.1)       |
| `[path]` (studio)         | (new product)  | YAML file to open in the GUI  |
| `[path]` (tui)            | `landify.yaml` | YAML file to open in terminal |
| `--root` (mcp serve)      | `.`            | Directory the MCP tools may touch |
