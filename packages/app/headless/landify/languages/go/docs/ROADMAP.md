# Roadmap

> Phased roadmap. Shipped items map to the landify feature surface described
> in [ARCHITECTURE](ARCHITECTURE) and [DOWNLOADS](DOWNLOADS).

## Phase 1 — Foundation (shipped)

- [x] Go module layout (`main.go` + `cmd/` + `internal/landify/`)
- [x] Strict YAML parsing (`KnownFields(true)`)
- [x] Cobra CLI (`new`, `validate`, `build`, `themes`, `serve`)
- [x] Embedded asset pipeline (`static/` via `//go:embed`)
- [x] Shared `base-css`/`header`/`footer` partials

## Phase 2 — Layouts (shipped)

- [x] `product` — the default hero/features/demo-video/CTA layout
- [x] 16:9 media frame for hero image and demo video (1280 × 720)
- [x] Derived `:root` design tokens from the eight base colors
- [x] `@LANDIFY_THEME@` splice during render
- [x] Other page types: waitlist, event, download, app, pricing, portfolio,
      docs, faq, team, status, linktree — 12 layouts total

## Phase 3 — Themes & delivery (shipped)

- [x] Exactly 64 built-in theme presets (`internal/landify/themes.go`)
- [x] `landify themes` listing command
- [x] `build --theme <name>` preset override + validation
- [x] Annotated `landify new` scaffolding per page type
- [x] `landify serve` local preview server (127.0.0.1)
- [x] Theme gallery (64 built pages + screenshots) and page-type gallery in
      the parent `landify/examples/` directory
- [x] Rolling GitHub Release via the reusable Go CI template

## Phase 4 — Desktop studio (shipped)

- [x] `landify studio` fyne app behind the `gui` build tag (`make build-gui`)
- [x] Split YAML editor / live HTML preview with inline validation issues
- [x] Theme studio: 64 presets, color pickers, derived-token and WCAG contrast
      readouts
- [x] Forms mode with per-section labelled fields
- [x] Generic collection editors (add / remove / reorder) wired to the YAML
- [x] 12 page-type selector with scaffold/apply per type
- [x] One-click build + preview server + browser open + file-watch auto-rebuild
- [x] Multi-document tabs (new / open / close / save / save-as)

## Phase 5 — Polish

- [ ] Configurable favicon / social meta (Open Graph, Twitter cards)
- [ ] Custom fonts and typography scale options in `theme:`
- [ ] Analytical components (countdown, announcement bar, lead form handler)
- [ ] Accessibility audit (keyboard nav, focus states, contrast ratios)

## Phase 6 — Ecosystem

- [ ] Multi-page site builds (a directory of `landify.yaml` files → sitemap)
- [ ] JSON schema export (`landify schema`) for editor tooling
- [ ] Visual theme browser in the CLI (`landify themes --preview`)
- [ ] Third-party template packs installable via `landify get <pack>`
