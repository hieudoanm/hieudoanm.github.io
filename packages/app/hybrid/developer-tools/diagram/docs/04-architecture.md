# Architecture

## Goals

- Minimal flowchart / diagram editor for a plain-text diagram DSL that runs as a
  **web app** (browser), **desktop app** (Tauri), and **mobile app** (Tauri
  Mobile)
- Static export for offline-first PWA support
- Local-first storage (no server required)
- Strict diagram parsing with helpful, line-level error messages
- Deterministic auto-layout so the same text always produces the same diagram
- SVG export (single file, no external assets)
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer     | Technology                             |
| --------- | -------------------------------------- |
| Framework | Next.js 16 (App Router, static export) |
| Language  | TypeScript 6 (strict)                  |
| Styling   | Tailwind CSS 4 + DaisyUI 5             |
| Icons     | react-icons (Fi set)                   |
| Desktop   | Tauri 2                                |

## Text DSL

The editor operates on a plain-text description of the diagram:

```txt
title: Web App Architecture
node api: API Server [round, icon=server]
node db: PostgreSQL [cylinder, icon=database]
edge api -> db: reads
```

- `title: <text>` — diagram title (optional, single line)
- `node <id>: <label> [shape, icon=<name>]` — a node; shape defaults to `rect`,
  icon is optional
- `edge <from> -> <to>: <label>` — a directed edge

See `docs/SYNTAX.md` for the full reference.

## Pipeline

The core is a pure, side-effect-free pipeline so every stage can be unit tested
and the layout is deterministic:

```txt
source text
   │  parseDiagram()        → Diagram + ParseError[]
   │
   ▼
parsed diagram
   │  computeLayout()       → Layout (positions, sizes, paths)
   │
   ▼
layout
   │  <Canvas/> renders SVG  |  buildSvg() → standalone SVG string
   ▼
diagram
```

### `src/lib/parser.ts`

A line-oriented, strict parser. Each line must match the grammar. Invalid lines
produce an `{ line, message }` error instead of being silently dropped. Labels
may contain any text after the required `:` or `->` token.

### `src/lib/layout.ts`

Implements a deterministic layered (longest-path) ranking:

1. Assign every node a rank by longest path from the root (nodes without
   predecessors).
2. Order nodes within a rank by their id for determinism.
3. Position ranks left-to-right with a fixed gap, sized by the widest node.
4. Stack nodes vertically in a rank, then center the rank.
5. Route forward edges as straight `M … L …` lines and back edges (cycles) as
   downward `C` curves.

All measurements (node padding, rank gap, font sizes, icon size) live in
`src/lib/layout.ts` so SVG rendering and `buildSvg` export stay in sync.

### `src/lib/export.ts`

`buildSvg` produces a standalone, self-contained SVG string (the same shapes the
canvas draws, including node icons) so exported files match the on-screen
diagram. `downloadDiagram` and `downloadSvg` trigger browser downloads via
`file-saver`.

### `src/lib/icons.ts`

A curated set of hand-drawn, stroke-based tech icons (`alert`, `auth`,
`browser`, `cache`, `cloud`, `compute`, `database`, `file`, `mail`, `message`,
`queue`, `search`, `server`, `shield`, `sync`, `users`, `worker`, and more).
Each icon is a 24×24 viewBox body shared by the canvas renderer and the SVG
exporter so both stay visually identical. Nodes can also embed raw SVG path data
as a custom glyph (`icon=glyph:<path>`).

### `src/lib/examples.ts`

A library of built-in examples — system-design interviews (Uber, Twitter/X,
Netflix, Instagram, WhatsApp, Amazon, …) plus sequence, state machine,
flowchart, and ER diagrams — each with interview questions and a `text` source
that parses cleanly. Browsed from the searchable **Examples** modal
(`ExamplesModal.tsx`) opened from the toolbar.

## Storage & State

- `src/hooks/useDiagramState.ts` — source text, zoom, help, and open/export
  handlers. Text is debounced and persisted to `localStorage`
  (`diagram-editor:text`); zoom persists as `diagram-editor:zoom`.
- `src/hooks/useTheme.ts` — dark/light theme, persisted as
  `diagram-editor:theme` and applied to `<html data-theme="…">`.

## Modules

- `src/components/editor/` — `DiagramApp` (composition root), `Toolbar`,
  `TextPane`, `Canvas`, `StatusBar`, `ErrorStrip`, `HelpModal`.
- `src/app/` — Next.js App Router pages. Exporting to static HTML is handled by
  `export const dynamic = 'force-static'` and the PWA metadata.
- `e2e/` — Playwright smoke tests against the built app.
