# Diagram

> Draw diagrams by typing plain text — auto-layout renders them for you. Runs on
> your phone, tablet, laptop, or desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────────┐
│  DIAGRAM                ⚙  👤     │
├─────────────────────────────────────┤
│  A ──▶ B ──▶ C                     │
│       ╲           ╱                │
│        ╲         ╱                 │
│         ▼       ▼                  │
│          [  D  ]                   │
│                                     │
│  ┌────────────────────────────────┐ │
│  │  Live preview   │  Text editor │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-developer-tools-diagram-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform and you're good to go.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Fedora | amd64        | 40.+         | [Download `.rpm`][download-rpm]            |                  |
| 5   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 6   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 7   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |
| 8   | Windows  |        | x64          | 10.+         | [Download `.exe`][download-exe]            | Portable         |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/diagram.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-diagram-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/developer-tools/diagram
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Type a diagram DSL and watch it render — a minimal text-based editor with
deterministic auto-layout, live SVG preview, and 16 built-in examples.

---

## Features

Everything from syntax parsing to sequence diagrams, all auto-laid-out for you.

### 📝 Core

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

### 🔤 Language

- Built-in tech icons on nodes (`[icon=database]`)
- Built-in example diagrams (16: Uber, Twitter/X, Netflix, Instagram, and more)
- Undirected edges (`--`) and self-loops
- Ranked layout hints (`node x: X [rank=n]`) for fine control
- Diagram `kind` (flow / sequence) parsed from a `kind:` directive
- Subgraph / cluster grouping (`subgraph`-style containment) for containers
- Per-edge styles: dashed / dotted / colored / thickness / arrowheads
- Node fill colors and categories (`color=` / `style=` attribute)
- Multi-line and rich node labels (class bodies, notes)

### 🖱️ Interaction

- Undo / redo history (toolbar + Ctrl/Cmd+Z, Ctrl/Cmd+Y, Ctrl/Cmd+Shift+Z)
- Click-to-select and drag nodes on the canvas
- Copy as Markdown/PlantUML/Mermaid snippets
- Multiple layouts (DAG vertical, layered) as options

### 🔀 Sequence & Special Diagrams

- Sequence layout (lifeline columns, time-ordered rows)
- Sequence rendering in Canvas: participant headers, dashed lifelines, messages
- State machine examples + syntax docs (states as `round`/`ellipse` nodes)
- Flowchart / ER examples (`diamond` decisions, `cylinder` tables)
- Timeline / Gantt diagram `kind` with date columns and horizontal bars
- Venn / set diagrams with overlapping regions
- Full UML sequence rendering: activation bars, combined fragments (`alt` etc.)
- Force-directed / arbitrary-graph layout option

### 📤 Export

- Print-friendly and A4-oriented SVG export
- Export PNG (via canvas rasterization)
- More shapes / custom icon glyphs
- StatusBar shows detected diagram kind

---

# First run

- **macOS:** Right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x diagram.AppImage && ./diagram.AppImage`
- **Windows SmartScreen:** Click **More info → Run anyway** if prompted.
- **Android Play Protect:** Tap **Install anyway** if the warning appears.

---

## First run

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and how
  to run tests.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).
