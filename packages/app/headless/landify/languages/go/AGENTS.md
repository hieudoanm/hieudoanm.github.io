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

The binary also exposes `landify mcp serve`; see [MCP](#mcp-model-context-protocol).

Verification before handoff: `make all` passes — `go fmt` produces no diff,
`go vet` exits 0, and `go test ./...` is green.

## Key Conventions

- Entrypoint is the module root `main.go` (`package main`) — it only calls
  `cmd.Execute()`. All command wiring lives in `cmd/` (cobra), all logic in
  `internal/landify/`.
- Standard Go layout: `main.go` + `cmd/` + `internal/landify/`. Keep commands
  thin: `cmd/*.go` parse flags and delegate to `internal/landify` (e.g.
  `BuildFile`, `ValidateFile`, `WritePlaceholder`).
- The `cmd/` files register exactly eight subcommands on the root: `new`,
  `validate`, `build`, `themes`, `serve`, `tui`, `studio`, `mcp`. `--file` (`-f`,
  default `landify.yaml`) is a persistent root flag; `build` adds
  `--output`/`-o` (`index.html`) and `--theme`/`-t`; `new` adds `--type`/`-t`
  (`product`) and `--force`/`-F`; `serve` adds `--dir`/`-d` (`.`), `--bind`/`-b`
  (`127.0.0.1`) and `--port`/`-p` (`8080`); `mcp serve` adds `--root` (`.`).
  `serve` shuts down gracefully on `SIGINT`/`SIGTERM`.
- `tui` takes an optional positional `[path]` (defaults to `landify.yaml`)
  and delegates to `internal/tui.Run`. It is a bubbletea editor that ships in
  **every** build with no build tag: a `textarea` YAML pane plus a `:`
  command line (`save`, `reload`, `validate`, `build [out]`,
  `generate <type>`, `theme <name>`, `help`, `quit`), Esc toggles modes,
  Ctrl-C/Ctrl-Q quit. Pure logic lives in `internal/tui/action.go`
  (`parseCommand`, `renderConfig`) so the editor's pipeline is unit-tested;
  `cmd/tui.go` only parses the optional argument. Styling lives in
  `internal/tui/styles.go` (Lip Gloss) per the bubbletea design skill in
  `packages/app/headless/skills/go/bubbletea.md`: an adaptive dark/light
  palette, a rounded border whose colour tracks the active mode (editor vs
  `:command`), bold-primary title, and a status bar coloured by meaning
  (red errors, green successes, muted hints).
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
- MCP: `landify mcp serve` speaks newline-delimited JSON-RPC 2.0 over stdio.
  `internal/mcp` is a parallel tree — `protocol.go` (JSON-RPC envelope) +
  `transport.go` (newline framing) + `server.go` (dispatch) + `workspace.go`
  (sandboxed file access) + `tools.go` (catalogue) + `args.go` (argument
  decoding) + `handlers.go` / `handlers_build.go` (tool handlers). Keep it
  hand-rolled — do not add an MCP SDK, and do not convert the CLI off cobra.
  - Tools: `landify_scaffold`, `landify_validate`, `landify_build`,
    `landify_types`, `landify_themes`, `landify_theme_tokens`.
  - A model chooses every path that reaches a tool, so `workspace.go` confines
    all file access to one root directory. Absolute paths and `..` escapes are
    **rejected, not rewritten** — a caller that means to leave the sandbox has a
    bug, and quietly serving a different file would hide it. Do not add a tool
    that touches the filesystem without going through `Workspace`.
  - Containment is checked on the **resolved** path, not the joined one: the root
    is canonicalised with `filepath.EvalSymlinks` at startup and `Resolve`
    re-resolves symlinks (`resolveExisting` walks up to the longest existing
    prefix) so a link inside the root pointing out of it is refused. A symlink
    that stays inside the root is still allowed. Keep it that way — a lexical
    check alone is trivially bypassed by a symlink the model can create.
  - `landify_scaffold` refuses to replace an existing file unless `overwrite` is
    set, so a model cannot silently destroy a config the user is editing.
  - `handleBuild` resolves the `output` path _before_ rendering, so a bad path
    fails fast instead of after the whole page has been built.
  - Tool failures return a `ToolResult` with `isError`. JSON-RPC errors are only
    for framing problems: bad JSON, wrong jsonrpc version, unknown method,
    unknown tool, undecodable params. A config that fails validation is **not** a
    transport failure — return the `validateResult` payload so the model can
    read and fix the problems.
  - A notification (a request with a nil `ID`) is never answered, whatever the
    method. `handleMessage` returns before the dispatch switch; do not move that
    check into individual cases.
  - Every `text` block is built with `json.MarshalIndent` on a typed struct —
    never `fmt.Sprintf` on raw values, which breaks on quotes and newlines.
  - `typeDescriptions` in `handlers_catalog.go` is the only place the 12 layouts are
    described in prose. A model picking a type has no other way to know which
    layout fits, so every entry needs a real sentence.
  - Tests: `internal/mcp` drives the real wire protocol against a temp-dir
    workspace (`helpers_test.go`), so framing, dispatch, sandboxing and every
    tool are covered end to end. `cmd/mcp_test.go` covers flag wiring.
- Tests: colocated `*_test.go`, table-driven, behaviour-spec names.
  `config_test.go`, `build_test.go`, `og_test.go`, `themes_test.go`,
  `placeholder_test.go`, `serve_test.go` and `internal/tui/tui_test.go` cover
  parsing, rendering, social metadata, themes, scaffolding, the file server and
  the terminal editor.
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
- The optional `site.og` block is the social-card input, shared by every layout
  (no per-type requirements, nothing added to `Errors()`). `Config.Social()`
  resolves it once — `title`/`description`/`site_name` fall back to the site
  values, `type` → `website`, `twitter_card` → `summary_large_image` — and every
  template renders the result with one `$og := .Social` block. `og:url`,
  `og:image` (+ `:width`/`:height`/`:alt`) and `twitter:image` are emitted only
  when configured, so a config without an image gets no broken image tag.
- `og.kicker` (a string) and `og.tags` (`[]string`, first 4 drawn) are
  card-only: no meta tag corresponds to them, and they are what gives each
  card its own content. `site.name` supplies the monogram on the two accent
  tiles, since `site.mark` is emoji and does not survive rasterising.
- The same block is what makes `build` write `og/og.svg` next to the page:
  `RenderOG` fills `static/og.tmpl` from the card copy and the theme tokens,
  and `ogtext.go` + `oglayout.go` hold every card measurement — the two-column geometry, the
  wrapping (estimated rune width, generous on purpose, capped at three lines
  with an ellipsis), the optical centring of the copy block and the chip stack.
  Accent-colored text goes through `readableOn`, which shifts it until it
  clears 4.5:1 on the background. The PNG is left to an external rasterizer —
  `site.og.image` points at it, so
  `landify build && rsvg-convert -o public/og/og.png public/og/og.svg` is the
  full loop (the headless apps keep the result in `public/og/`).
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
  (`-o` to override); parent directories are auto-created (`os.MkdirAll`). It
  returns a `*BuildResult` so the command can report the page and the card.

## Data

- Files read: `landify.yaml` (`-f/--file` to override); `static/` templates,
  partials and `examples/` are embedded at build time, not read from disk.
- Files written: `index.html` (default `build` output), `og/og.svg` beside it
  (only when the config has a `site.og` block), `landify.yaml` (created by
  `new`, refuses to overwrite without `--force`). The MCP tools read and write
  only inside the `--root` given to `mcp serve` (default `.`).
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
