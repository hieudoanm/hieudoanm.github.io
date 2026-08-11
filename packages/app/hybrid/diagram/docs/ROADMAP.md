# Diagram — Roadmap

## Phase 1 — Core Editor

> Foundation: text editing, live preview, export

- [x] Text editor with line numbers and gutter
- [x] Strict line-level parsing with error highlighting
- [x] Deterministic auto-layout (layered longest-path ranking)
- [x] Live SVG preview (rect, round, ellipse, diamond, cylinder)
- [x] Edge labels and back-edge (cycle) routing
- [x] Title support
- [x] Dark / light theme
- [x] localStorage persistence (text, zoom, theme)
- [x] New / Open / Save (.diagram) / Export SVG
- [x] Zoom in / out / reset
- [x] Syntax help modal
- [x] PWA / static export
- [x] Unit + integration tests
- [x] Playwright smoke tests

## Phase 2 — Editing Quality of Life

> Structure: better editing, more expressiveness

- [x] Built-in tech icons on nodes (`[icon=database]`)
- [x] Built-in example diagrams (Uber, Twitter, Netflix, Instagram, WhatsApp,
      Amazon, URL shortener, Google Docs) with interview questions
- [x] Undo / redo history (toolbar + Ctrl/Cmd+Z, Ctrl/Cmd+Y, Ctrl/Cmd+Shift+Z)
- [ ] Click-to-select and drag nodes on the canvas
- [ ] Undirected edges (`--`) and self-loops
- [ ] Ranked layout hints (`node x: X [rank]`) for fine control
- [ ] Copy as Markdown/PlantUML/Mermaid snippets
- [ ] Multiple layouts (DAG vertical, layered) as options

## Phase 3 — Polishing & Packaging

> Ship quality: native apps, export fidelity

- [ ] Desktop + mobile Tauri builds (see `docs/PACKAGING.md`)
- [ ] Print-friendly and A4-oriented SVG export
- [ ] Export PNG (via canvas rasterization)
- [ ] More shapes / custom icon glyphs
- [ ] Localization-ready UI strings
