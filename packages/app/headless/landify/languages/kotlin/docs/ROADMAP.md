# Roadmap

> Phased roadmap. Shipped items map to the Landify feature surface described
> in [ARCHITECTURE](ARCHITECTURE.md) and [DOWNLOADS](DOWNLOADS.md).

## Phase 1 — Foundation (shipped)

- [x] Kotlin/Gradle module layout (`Main.kt` + `cli/`, `config/`, `render/`,
      `template/`, `themes/`, `validate/`, `serve/`, `tui/`, `studio/`)
- [x] Strict YAML parsing (kaml, unknown fields rejected)
- [x] Clikt CLI — `new`, `validate`, `build`, `themes`, `serve`, `tui`,
      `studio` — with `--version` and per-command help
- [x] Classpath asset pipeline (`src/main/resources/assets`)
- [x] Shared `base-css` / `header` / `footer` partials

## Phase 2 — Layouts (shipped)

- [x] `product` — the default hero/features/demo-video/CTA layout
- [x] 16:9 media frame for hero image and demo video (1280 × 720)
- [x] Derived `:root` design tokens from the eight base colors
- [x] `@LANDIFY_THEME@` splice during render
- [x] All 12 page types: product, waitlist, event, download, app, pricing,
      portfolio, docs, faq, team, status, linktree

## Phase 3 — Themes & delivery (shipped)

- [x] Exactly 64 built-in theme presets (`themes/Presets1..7.kt`)
- [x] `landify themes` listing command
- [x] `build --theme <name>` preset override + validation
- [x] Annotated `landify new` scaffolding per page type
- [x] `landify serve` local preview server (127.0.0.1, traversal-safe)
- [x] `make build` / `make install` distribution

## Phase 4 — Editors (shipped)

- [x] `landify tui` terminal editor (Mordant) — a portable, every-build editor:
      YAML pane, `:` command line (save, reload, validate, build, generate,
      theme) with dirty tracking, mirroring the studio's pipeline
- [x] Non-TTY fallback so `tui` never hangs a script or a CI log
- [x] `landify studio` Compose Multiplatform desktop editor — split YAML
      editor / preview with live validation
- [x] Studio toolbar: save, reload, validate, build, generate, apply theme
- [x] Both editors call the same core pipeline as the CLI

## Phase 5 — Parity & testing (shipped)

- [x] Hand-written Jinja-compatible template engine matching the reference
      escaping (`+` and `=` escaped, `/` untouched)
- [x] 14 golden outputs compared byte-for-byte (`GoldenTest`)
- [x] 103 tests across config, colors, templates, themes, validation,
      rendering, scaffolding, TUI state and the static server

## Phase 6 — Polish

- [ ] Configurable favicon / social meta (Open Graph, Twitter cards)
- [ ] Custom fonts and typography scale options in `theme:`
- [ ] Analytical components (countdown, announcement bar, lead form handler)
- [ ] Accessibility audit (keyboard nav, focus states, contrast ratios)

## Phase 7 — Ecosystem

- [ ] Multi-page site builds (a directory of `landify.yaml` files → sitemap)
- [ ] JSON schema export (`landify schema`) for editor tooling
- [ ] Visual theme browser in the CLI (`landify themes --preview`)
- [ ] Native executable via `jpackage` / GraalVM `native-image`
