# Landify (Kotlin)

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
- **Desktop studio** — a Compose Multiplatform window (`landify studio`) with
  live edit/preview and one-click build
- **Terminal editor** — `landify tui`, a portable in-terminal editor that
  ships with every build and covers the same authoring loop (edit, validate,
  build, scaffold, theme) without a display server
- **Zero runtime deps** — the built page is static HTML + CSS, no JavaScript,
  no CDN
- **Local preview** — a small HTTP file server for reviewing the built page
- **Byte-identical output** — every generated page matches the Go and Rust
  implementations exactly (see [Parity](#parity))

## Requirements

- JDK 21 or newer (the Gradle wrapper bootstraps everything else)

## Development

```bash
make build        # build dist/bin/landify + dist/lib
make lint         # compile the sources as a lint pass
make test         # run the unit tests
make all          # test + build
make install      # install to ~/bin/landify
make coverage     # HTML coverage report
make clean        # remove build artifacts
```

## Usage

```sh
./dist/bin/landify new           # create landify.yaml with annotated placeholder content
./dist/bin/landify new -t docs   # scaffold a docs layout instead of product
./dist/bin/landify validate      # check the schema (strict: unknown fields are errors)
./dist/bin/landify build         # write index.html from landify.yaml
./dist/bin/landify themes        # list the 64 built-in theme presets
./dist/bin/landify serve -p 8080 # preview the built page locally
./dist/bin/landify tui           # open the terminal editor (ships with every build)
./dist/bin/landify studio        # open the desktop editor (needs a display)
```

### Studio

`landify studio [path]` opens a Compose Multiplatform desktop window that
packs the authoring loop into one frame:

- **Split editor / preview** — type in the YAML, see validation issues and the
  rendered page update
- **Commands** — save, reload, validate, build, generate a scaffold, and apply
  one of the 64 presets, all from the toolbar
- **Scaffold switcher** — regenerate the document as any of the 12 layouts
- **One-click build** — render the buffer through the same pipeline the CLI
  uses, so the studio can never produce something `landify build` cannot

### Terminal editor

`landify tui [path]` is an in-terminal YAML editor that ships in every build,
so the full authoring loop works over SSH or in CI logs. Esc toggles the `:`
command line, Ctrl-C quits:

- **Edit** — arrow keys, Home/End, Page Up/Down; a `•` marks unsaved changes
- **save / reload** — write the buffer, or re-read the file from disk
- **validate** — check the buffer against the schema
- **build [file]** — render the buffer to `index.html` (or a custom path),
  honouring the `theme` override
- **generate <type>** — replace the buffer with any of the 12 scaffolds
- **theme <name>** — set a built-in preset (or `yaml` to use the YAML theme)
- **help / quit**

Without a TTY the editor degrades gracefully and prints a single non-interactive
pane, so it is safe in scripts.

The terminal editor and `studio` are two front-ends to the same pipeline:
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

- **Parsing:** kaml (YAML) with strict unknown-field rejection, decoded into
  `kotlinx.serialization` models
- **Rendering:** a small hand-written Jinja-compatible engine
  (`template/`) over the assets in `src/main/resources/assets`
- **Theming:** `color/Tokens.kt` derives 19 `:root` tokens from the eight base
  colors; `themes/` holds the 64 presets
- **CLI:** Clikt (subcommands, help, version); terminal output via Mordant
- **Packaging:** `installDist` — a launcher script plus `lib/*.jar`, including
  the TUI and the Compose studio in every build

## Parity

The HTML is the contract. `src/test/resources/golden/` holds 14 canonical
outputs (12 page types, plus `product` with the `midnight` preset and
`linktree` with `abyss`), and the templates, partials and examples are
byte-identical to the Rust reference assets.

## Documentation

| Document                               | Description                           |
| -------------------------------------- | ------------------------------------- |
| [Architecture](./docs/ARCHITECTURE.md) | Schema, rendering, themes, CLI wiring |
| [Contributing](./docs/CONTRIBUTING.md) | Setup, commands, conventions, testing |
| [Downloads](./docs/DOWNLOADS.md)       | Build from source                     |
| [Packaging](./docs/PACKAGING.md)       | Distribution layout and artifact      |
| [Roadmap](./docs/ROADMAP.md)           | Phased feature roadmap                |
