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
│   └── studio.go        # landify studio [path]
├── internal/landify/    # Schema, validation, rendering, themes, scaffolding
│   ├── config.go        # Config/Theme structs, Load/LoadFile (strict decode)
│   ├── sections.go      # Per-page-type section types (Pricing, App, FAQ, …)
│   ├── validate.go      # KnownTypes, Errors/Valid/ValidateFile
│   ├── color.go         # Tokens(): 19 :root tokens derived from 8 base colors
│   ├── themes.go        # namedThemes: exactly 64 presets + lookup helpers
│   ├── build.go         # Render, BuildFile, themeCSS, @LANDIFY_THEME@ splice
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
├── static/              # Embedded templates, partials, examples
│   ├── templates/       # template-<type>.tmpl — one per page type (12)
│   ├── partials/        # base-css, header, footer
│   └── examples/        # example-<type>.yaml — annotated placeholders (12)
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
```

## Modules

### Config (`internal/landify/config.go`)

`Config` holds the shared sections (`site`, `theme`, `footer`) plus one struct
per page type (all `*T`, nil when absent). `Theme` is exactly eight colors +
`radius`; empty fields merge from `DefaultTheme()`. `Load` uses
`yaml.NewDecoder` with `dec.KnownFields(true)`, so unknown YAML fields are
rejected.

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
