# Landify (Go)

Build a flat landing page from a single YAML file. Read the repo-root
`AGENTS.md` for the project-wide coding conventions; this file only adds the
commands, layout and content rules specific to this Go module.

## Commands

| Command          | Description                                        |
| ---------------- | -------------------------------------------------- |
| `make all`       | `format` + `lint` + `test` + `build`               |
| `make build`     | Compile the CLI to `./bin/landify`                 |
| `make build-gui` | Build `./bin/landify-gui` (fyne studio, needs CGO) |
| `make build-all` | Cross-compile 4 platforms into `bin/`              |
| `make test`      | `go test ./...`                                    |
| `make lint`      | `go vet ./...`                                     |
| `make format`    | `go fmt ./...`                                     |
| `make coverage`  | Generate HTML coverage report in `./coverage`      |
| `make tidy`      | `go mod tidy`                                      |
| `make install`   | Build to `~/bin/landify`                           |
| `make clean`     | Remove `./bin`, `./coverage` and `index.html`      |

Verification before handoff: `make all` passes — `go fmt` produces no diff,
`go vet` exits 0, and `go test ./...` is green.

## Key Conventions

- Entrypoint is the module root `main.go` (`package main`) — it only calls
  `cmd.Execute()`. All command wiring lives in `cmd/` (cobra), all logic in
  `internal/landify/`.
- Standard Go layout: `main.go` + `cmd/` + `internal/landify/`. Keep commands
  thin: `cmd/*.go` parse flags and delegate to `internal/landify` (e.g.
  `BuildFile`, `ValidateFile`, `WritePlaceholder`).
- The `cmd/` files register exactly seven subcommands on the root: `new`,
  `validate`, `build`, `themes`, `serve`, `tui`, `studio`. `--file` (`-f`,
  default `landify.yaml`) is a persistent root flag; `build` adds
  `--output`/`-o` (`index.html`) and `--theme`/`-t`; `new` adds `--type`/`-t`
  (`product`) and `--force`/`-F`; `serve` adds `--dir`/`-d` (`.`), `--bind`/`-b`
  (`127.0.0.1`) and `--port`/`-p` (`8080`).
  `serve` shuts down gracefully on `SIGINT`/`SIGTERM`.
- `tui` takes an optional positional `[path]` (defaults to `landify.yaml`)
  and delegates to `internal/tui.Run`. It is a bubbletea editor that ships in
  **every** build with no build tag: a `textarea` YAML pane plus a `:`
  command line (`save`, `reload`, `validate`, `build [out]`,
  `generate <type>`, `theme <name>`, `help`, `quit`), Esc toggles modes,
  Ctrl-C/Ctrl-Q quit. Pure logic lives in `internal/tui/action.go`
  (`parseCommand`, `renderConfig`) so the editor's pipeline is unit-tested;
  `cmd/tui.go` only parses the optional argument.
- `studio` takes an optional positional `[path]` (defaults to a new blank
  product scaffold) and delegates to `internal/gui.Run`. It is the only
  subcommand gated by a build tag: the default build ships a stub that returns
  `gui.ErrUnavailable`, while `-tags gui` (via `make build-gui`, CGO enabled)
  compiles the fyne desktop app. Pure logic in `internal/gui` (doc.go,
  nodeops.go, schema.go, wcag.go) must never import fyne so the default build
  and tests stay CGO-free.
- Follow repo-wide Go rules from the root [AGENTS.md](../../../../../AGENTS.md):
  `error` last, handle errors explicitly, `var` zero-init over `:=`, no global
  state, table-driven tests, return early.
- Tests: colocated `*_test.go`, table-driven, behaviour-spec names.
  `config_test.go`, `build_test.go`, `themes_test.go`, `placeholder_test.go`,
  `serve_test.go` and `internal/tui/tui_test.go` cover parsing, rendering,
  themes, scaffolding, the file server and the terminal editor.
- `.gitignore` excludes `bin/`, `index.html`, and `landify.yaml` (all build
  output or generated scaffolding) plus `.DS_Store`.

## Content Rules

- `landify.yaml` is decoded with `yaml.Decoder.KnownFields(true)` — unknown
  fields are parse errors. Required fields are per-type and enforced in
  `internal/landify/validate.go`; missing required fields and invalid theme
  hex are listed together (`Errors() []string`), and `validate`/`build` exit 1
  on failure.
- The top-level `type:` field selects the layout. `KnownTypes()` returns
  exactly 12 types. Empty type defaults to `product`. The 12 types are:
  `app` (store badges, ratings, portrait 9:16 screenshot gallery), `docs`
  (topic card links, optional code sample), `download` (version/license
  badges, per-OS buttons, install snippet), `event` (date/venue strip, agenda
  timeline, speaker grid), `faq` (native `<details>` rows, no JavaScript),
  `linktree` (compact profile with big link cards — the only type without a
  hero), `portfolio` (avatar, skills chips, project grid), `pricing` (tier
  cards with a "most popular" plan), `product` (hero + features + demo video +
  CTA, the original/default layout), `status` (state banner, uptime stats,
  incident log), `team` (values strip, member cards), `waitlist` (email
  capture, launch date, social links).
- Only `product` requires media assets: `hero.image.src` and `demo.video.src`,
  both rendered in the shared 16:9 frame (1280 × 720). App screenshots use
  `aspect-ratio: 9 / 16`.
- `theme` stores exactly eight base colors (`base`, `primary`, `secondary`,
  `neutral`, `info`, `warning`, `success`, `error`) plus `radius`. Empty
  fields merge from `DefaultTheme()` (primary `#0d9488`, radius `10px`, base
  `#f7f8fa`, etc.).
- `internal/landify/color.go` derives all other `:root` tokens from those
  eight colors — tints/shades for `base-200`/`base-300`, WCAG contrast for
  `*-content` and `base-content`, `border`/`border-soft`/`neutral-faint` via
  tinted mixes. Output is plain hex (`#rrggbb`), never `color-mix()`.
- `internal/landify/themes.go` holds exactly 64 `NamedTheme` presets (the
  `namedThemes` slice). Keep the count at 64 — add/remove entries via that
  slice. `Themes()` returns gallery order; `ThemeByName` is case-insensitive;
  `ThemeNames()` is sorted.
- Rendering is `html/template` over embedded assets (`static/` via
  `//go:embed`): select `static/templates/template-<type>.tmpl` by normalized
  type (falling back to `product` for unknown types — validation is what
  rejects them), execute with partials `base-css`, `header`, `footer`, then
  splice the derived theme tokens into the `@LANDIFY_THEME@` slot inside the
  template's `<style> :root { ... }` (handled in `build.go`).
- Page type galleries (in the parent `packages/app/headless/landify/`) build
  the 12 examples under `examples/templates/<type>/` (with `slate` preset) and
  one folder per theme under `examples/themes/` (`showcase.yaml` + embedded
  `demo.*` media). Regenerate them with `landify build`.
- `landify build` writes `index.html` in the current directory by default
  (`-o` to override); parent directories are auto-created (`os.MkdirAll`).

## Data

- Files read: `landify.yaml` (`-f/--file` to override); `static/` templates,
  partials and `examples/` are embedded at build time, not read from disk.
- Files written: `index.html` (default `build` output), `landify.yaml`
  (created by `new`, refuses to overwrite without `--force`).
- No environment variables; no network calls; no external services.

## Documentation

| Document                                       | Description                                               |
| ---------------------------------------------- | --------------------------------------------------------- |
| [docs](./docs/)                                | Architecture, contributing, downloads, packaging, roadmap |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Pipeline, types, themes, CLI wiring                       |
| [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Setup, commands, conventions, testing                     |
| [docs/DOWNLOADS.md](./docs/DOWNLOADS.md)       | Get the binary or build from source                       |
| [docs/PACKAGING.md](./docs/PACKAGING.md)       | Build + CI artifact pipeline                              |
| [docs/ROADMAP.md](./docs/ROADMAP.md)           | Phased feature roadmap                                    |
