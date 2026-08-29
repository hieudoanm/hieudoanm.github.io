# Diagram

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/SHA256SUMS.txt

## About

Diagram — minimal diagram editor with text-based, auto-laid-out diagrams.

## Features

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

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
