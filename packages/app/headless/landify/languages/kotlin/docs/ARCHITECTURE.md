# Architecture

> The HTML is the contract. This port is validated by byte-comparing its output
> against the Rust reference implementation; see [Parity](#parity).

## Tech Stack

| Layer        | Choice                                                  |
| ------------ | ------------------------------------------------------- |
| Language     | Kotlin 2.4 / JVM 21                                     |
| CLI          | `com.github.ajalt.clikt`                                |
| Terminal     | `com.github.ajalt.mordant`                              |
| YAML         | `com.charleskorn.kaml` + `kotlinx.serialization`        |
| Templating   | Hand-written Jinja-compatible engine (`template/`)      |
| Desktop GUI  | Compose Multiplatform (Desktop)                         |
| Assets       | Classpath resources under `src/main/resources/assets`    |
| Testing      | `kotlin.test` on the JUnit Platform                     |

No network calls and no external services. Every build — including the Compose
studio — ships in a single `installDist` launcher.

## Directory Structure

```txt
kotlin/
├── build.gradle.kts        # deps, Compose distribution, JaCoCo
├── settings.gradle.kts     # rootProject.name = "landify"
├── Makefile                # build / lint / test / install / coverage
└── src/
    ├── main/
    │   ├── kotlin/io/github/hieudoanm/landify/
    │   │   ├── Main.kt              # Clikt root + subcommand registration
    │   │   ├── cli/                 # one file per command group + shared options
    │   │   ├── color/               # hex math + the 19 derived :root tokens
    │   │   ├── config/              # serializable schema, strict loader, dumper
    │   │   ├── render/              # assets, render, build, scaffold
    │   │   ├── serve/               # blocking static file server
    │   │   ├── studio/              # Compose entry, immutable state, window
    │   │   ├── template/            # lexer, parser, AST, renderer, escaping
    │   │   ├── themes/              # 64 presets, split across 7 files
    │   │   ├── tui/                 # terminal editor (state, keys, view, exec)
    │   │   └── validate/            # per-type required-field requirements
    │   └── resources/assets/
    │       ├── templates/           # template-<type>.j2 (12) + base
    │       ├── partials/            # base-css, header, footer
    │       └── examples/            # example-<type>.yaml, annotated (12)
    └── test/
        ├── kotlin/...               # 12 files, 103 tests
        └── resources/golden/        # 14 canonical HTML outputs
```

## Pipeline

```txt
landify.yaml ─(load)──────► Config ─(errors)────────────────────► valid?
                 │ strict     │  per-type required-field checks  │
                 │ + theme    └──── invalid ─► exit 1, list all  │
                 │ merge                                           │
                 └────────────────────────────────────────────────┘
valid Config ─(render)─► template-<type>.j2 ─(template engine)──► HTML
                 │                                   │
                 └──────── Tokens(theme) ──► @LANDIFY_THEME@ splice
HTML ─(build)──► write index.html (or -o path)
```

## Modules

### Config (`config/`)

`Config` holds the shared sections (`site`, `theme`, `footer`) plus one
nullable model per page type. `Theme` is exactly eight colors plus `radius`;
empty fields merge from `defaultTheme()`. `Loader` decodes with kaml and
rejects unknown YAML fields, then re-encodes through `dump()` so the editors
can round-trip a document without losing the user's field order.

### Validation (`validate/`)

`knownTypes()` returns the 12 page types sorted. `errors()` returns one string
per problem: global required fields (`site.name`, `site.description`,
`site.nav` ≥ 1, `footer.copyright`), per-type requirements (each type has its
own branch; `product` additionally requires `hero.image.src` and
`demo.video.src`), and theme hex parsing (`#RRGGBB`). `linktree` is the only
type that never requires a hero. The requirements are split across
`RequirementsA.kt` and `RequirementsB.kt` to stay within the file-size budget.

### Color tokens (`color/`)

`tokens(theme)` derives 19 `:root` tokens — tints/shades for `base-*`,
WCAG-contrast text (`*content`, via `contrastingText`, threshold luminance
≥ 0.5 → `#181d25` or `#fff`), and `border`/`border-soft`/`neutral-faint`
tinted mixes. Dark canvases (base luminance < 0.35) use different tint/shade
strengths. Everything is plain hex; no color library is involved beyond basic
sRGB math.

### Themes (`themes/`)

`Presets1.kt` … `Presets7.kt` hold exactly 64 named presets. `Themes.kt` owns
the gallery order, the case-insensitive lookup, and the sorted name list.
`build --theme <name>` replaces the YAML theme with a preset and re-validates.

### Template engine (`template/`)

A deliberately small Jinja subset, hand-written to keep the output
byte-identical to the reference implementation:

- `Parser.kt` turns source into the `Node` AST: text, `{{ expr }}` output,
  `{% if %}` / `{% else %}` / `{% endif %}`, and `{% for x in y %}…{% endfor %}`
- `Context.kt` resolves dotted paths and the small builtin set against a nested
  map, with `loop`-less iteration over lists and objects
- `Escape.kt` matches the reference escaping exactly: `<`, `>`, `&`, `"`, `'`,
  `+` and `=` are entity-escaped, `/` is **not**
- No filters, macros, blocks, `raw`, comments, or includes — the templates do
  not use them

`Engine.kt` walks the AST. `render/Assets.kt` loads templates, partials and
examples from the classpath.

### Rendering (`render/`)

`render()` picks `templates/template-<type>.j2`, executes it with the config,
generates the `:root` declarations from `tokens()`, then splices them into the
`@LANDIFY_THEME@` slot. `build()` loads, applies the optional theme override,
validates, renders, creates parent directories and writes the output.

### Scaffolding (`render/Scaffold.kt`)

`scaffold()` rejects unknown types, reads
`assets/examples/example-<type>.yaml` and writes it, refusing to overwrite
unless `--force` is set.

### Static server (`serve/`)

`StaticServer` wraps `com.sun.net.httpserver.HttpServer` in a
`CountDownLatch` so the owning command can block. `start()` binds and returns
so `landify serve` can print `boundPort` — the real port, which differs from
the requested one when `--port 0` lets the OS choose. `awaitShutdown()` then
blocks until interrupted. The root is normalized to an absolute path at
construction; every request is resolved against it and rejected if it escapes,
so `..` traversal returns 404. Content types come from a small extension map.
The TUI and the studio reuse it for previews.

### Terminal editor (`tui/`)

`landify tui [path]` is a Mordant raw-mode editor that ships in every build.
`EditorState.kt` is an immutable value (text, cursor, viewport, dirty flag) with
pure transition functions, so the whole editor is unit-testable without a
terminal. `Keys.kt` maps raw input to transitions, `View.kt` renders the panes
and the `:` command line, `Commands.kt` parses `:command` lines, and
`Executor.kt` runs them through the same validate → render → write pipeline the
CLI uses. When stdin is not a TTY, `Editor.kt` prints a single non-interactive
pane and exits instead of blocking.

### Desktop studio (`studio/`)

`StudioMain.kt` opens the Compose window, `StudioWindow.kt` composes the
split editor/preview frame and toolbar, and `StudioState.kt` is an immutable
data class with a pure `reduce(action)` returning the next state plus any
message. Every action (buffer edit, validate, build, reload, save, generate,
apply theme) calls the same core pipeline the CLI uses, so the studio cannot
render something `landify build` cannot.

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
| `[path]` (tui / studio)   | `landify.yaml` | YAML file to open             |

## Parity

`src/test/resources/golden/` holds the 14 canonical outputs: one per page type
plus `product` with the `midnight` preset and `linktree` with `abyss`.
`GoldenTest` renders each and compares bytes. The assets under
`src/main/resources/assets/` are byte-identical to the Rust reference, which
is why the same YAML produces the same HTML down to the trailing newline —
`partials/header.j2` and `partials/footer.j2` intentionally have no final
newline. Any change to a template, partial, escaping rule, token order or theme
value must keep all 14 comparisons passing.
