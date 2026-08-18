# Features

> SVG — minimal Adobe Illustrator-style vector editor.

## Document & Canvas

- Document library with grid view
- Canvas workspace with pan and zoom
- Demo SVGs seed data
- Responsive layout
- Rulers on canvas edges
- Grid overlay and snap-to-grid
- Skeleton loading states

## Tools

- Rectangle and ellipse tools
- Line tool
- Pen tool (point-click paths; bezier handles pending)
- Freehand pencil tool (path simplification pending)
- Close path on first point click
- Point text tool
- Selection with bounding box and resize handles
- Duplicate (Ctrl+D)

## Properties

- Fill and stroke color pickers
- Properties panel (x, y, width, height, rotation)
- Font selector and text properties
- Stroke dash array editor
- Stroke cap and join styles
- Opacity per object

## Layers & Symbols

- Layer panel with visibility and lock
- Create symbol from selection
- Symbol library panel
- Instance placement from library
- Edit master symbol (updates all instances)
- Detach symbol instance
- Component library (shared symbols across documents)

## Export & Platform

- Export as optimized SVG
- Export as PNG (1x, 2x, 4x)
- Export as JPEG with quality presets (high / medium / low)
- Selection-only export
- Copy SVG to clipboard
- SVG code editor view
- Preview mode (hide UI elements)
- Keyboard shortcuts (V, R, E, L, P, T)
- Snap to grid toggle
- Tauri desktop app build (bundling configured; signing not yet)
- iOS/Android native shells (Tauri mobile entry point wired)

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
