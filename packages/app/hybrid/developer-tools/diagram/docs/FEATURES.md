# Features

> Diagram — minimal diagram editor with text-based, auto-laid-out diagrams.

## Core

- Text editor with line numbers and gutter
- Strict line-level parsing with error highlighting
- Deterministic auto-layout (layered longest-path ranking)
- Live SVG preview (rect, round, ellipse, diamond, cylinder)
- Edge labels and back-edge (cycle) routing
- Title support
- Dark / light theme
- localStorage persistence (text, theme)
- New / Open / Save (.diagram) / Export SVG
- Zoom in / out / reset
- Syntax help modal
- PWA / static export
- Unit + integration tests
- Playwright smoke tests

## Language

- Built-in tech icons on nodes (`[icon=database]`)
- Built-in example diagrams (16: Uber, Twitter/X, Netflix, Instagram, and more)
- Undirected edges (`--`) and self-loops
- Ranked layout hints (`node x: X [rank=n]`) for fine control
- Diagram `kind` (flow / sequence) parsed from a `kind:` directive
- Subgraph / cluster grouping (`subgraph`-style containment) for containers
- Per-edge styles: dashed / dotted / colored / thickness / arrowheads
- Node fill colors and categories (`color=` / `style=` attribute)
- Multi-line and rich node labels (class bodies, notes)

## Interaction

- Undo / redo history (toolbar + Ctrl/Cmd+Z, Ctrl/Cmd+Y, Ctrl/Cmd+Shift+Z)
- Click-to-select and drag nodes on the canvas
- Copy as Markdown/PlantUML/Mermaid snippets
- Multiple layouts (DAG vertical, layered) as options

## Sequence & Special Diagrams

- Sequence layout (lifeline columns, time-ordered rows)
- Sequence rendering in Canvas: participant headers, dashed lifelines, messages
- State machine examples + syntax docs (states as `round`/`ellipse` nodes)
- Flowchart / ER examples (`diamond` decisions, `cylinder` tables)
- Timeline / Gantt diagram `kind` with date columns and horizontal bars
- Venn / set diagrams with overlapping regions
- Full UML sequence rendering: activation bars, combined fragments (`alt` etc.)
- Force-directed / arbitrary-graph layout option

## Export

- Print-friendly and A4-oriented SVG export
- Export PNG (via canvas rasterization)
- More shapes / custom icon glyphs
- StatusBar shows detected diagram kind

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
