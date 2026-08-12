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
- [x] Built-in example diagrams (16: Uber, Twitter/X, Netflix, Instagram,
      WhatsApp, Amazon, URL shortener, Google Docs, Slack, Dropbox, Spotify,
      DoorDash, Stripe, web crawler, Airbnb, API rate limiter) with interview
      questions
- [x] Undo / redo history (toolbar + Ctrl/Cmd+Z, Ctrl/Cmd+Y, Ctrl/Cmd+Shift+Z)
- [x] Click-to-select and drag nodes on the canvas
- [x] Undirected edges (`--`) and self-loops
- [x] Ranked layout hints (`node x: X [rank=n]`) for fine control
- [x] Copy as Markdown/PlantUML/Mermaid snippets
- [x] Multiple layouts (DAG vertical, layered) as options

## Phase 3 — Diagram Types

> Expressiveness: sequence diagrams, state machines, flowcharts

- [x] Diagram `kind` (flow / sequence) parsed from a `kind:` directive
- [x] Sequence layout (`layoutSequence`): lifeline columns, time-ordered rows
- [x] Sequence rendering in Canvas: participant headers, dashed lifelines,
      horizontal message arrows
- [x] State machine examples + syntax docs (states as `round`/`ellipse` nodes,
      labeled transitions) — works with current parser/layout
- [x] Flowchart / ER examples (`diamond` decisions, `cylinder` tables)
- [x] StatusBar shows detected diagram kind

## Phase 4 — Polishing & Packaging

> Ship quality: native apps, export fidelity

- [ ] Desktop + mobile Tauri builds (see `docs/PACKAGING.md`)
- [x] Print-friendly and A4-oriented SVG export
- [x] Export PNG (via canvas rasterization)
- [x] More shapes / custom icon glyphs
- [ ] Localization-ready UI strings
