# Architecture

## Tech Stack

| Layer        | Choice                                    |
| ------------ | ----------------------------------------- |
| Language     | Go 1.27+ (module `landify`)               |
| CLI          | `github.com/spf13/cobra`                  |
| YAML parsing | `gopkg.in/yaml.v3` (strict `KnownFields`) |
| Rendering    | `html/template` (stdlib)                  |
| Assets       | `embed.FS` via `//go:embed`               |
| Testing      | Standard `go test`, table-driven tests    |

No CGO, no network calls, no external services. The binary is pure static.

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
│   └── serve.go         # landify serve [-d dir] [-p port]
├── internal/landify/    # Schema, validation, rendering, themes, scaffolding
│   ├── config.go        # Config/Theme structs, Load/LoadFile (strict decode)
│   ├── sections.go      # Per-page-type section types (Pricing, App, FAQ, …)
│   ├── validate.go      # KnownTypes, Errors/Valid/ValidateFile
│   ├── color.go         # Tokens(): 19 :root tokens derived from 8 base colors
│   ├── themes.go        # namedThemes: exactly 64 presets + lookup helpers
│   ├── build.go         # Render, BuildFile, themeCSS, @LANDIFY_THEME@ splice
│   ├── placeholder.go   # WritePlaceholder (landify new scaffolding)
│   └── serve.go         # Serve(ctx, dir, ln): static file server
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

## Configuration

Landify reads no environment variables and writes no config files. Everything
is expressed through the YAML content file and CLI flags:

| Flag (command)            | Default        | Purpose                      |
| ------------------------- | -------------- | ---------------------------- |
| `--file` / `-f` (all)     | `landify.yaml` | YAML content file            |
| `--output` / `-o` (build) | `index.html`   | Generated page path          |
| `--theme` / `-t` (build)  | (YAML theme)   | Override with a named preset |
| `--type` / `-t` (new)     | `product`      | Page type to scaffold        |
| `--force` / `-F` (new)    | `false`        | Overwrite existing file      |
| `--dir` / `-d` (serve)    | `.`            | Directory to serve           |
| `--port` / `-p` (serve)   | `8080`         | Listen port (127.0.0.1)      |
