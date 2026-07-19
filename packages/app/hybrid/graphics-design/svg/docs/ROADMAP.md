# Roadmap

## Phase 1 — Core UI

> Foundation: canvas, basic shapes, selection, fill/stroke

- [x] Document library with grid view
- [x] Canvas workspace with pan and zoom
- [x] Rectangle and ellipse tools
- [x] Line tool
- [x] Selection with bounding box and resize handles
- [x] Fill and stroke color pickers
- [x] Grid overlay and snap-to-grid
- [x] Undo/redo (snapshots before every shape/layer edit; toolbar + Ctrl+Z /
      Ctrl+Shift+Z)
- [x] Demo SVGs seed data
- [x] Responsive layout

## Phase 2 — Enhanced UX

> Polish: keyboard shortcuts, rulers, guides, properties panel

- [x] Keyboard shortcuts (V, R, E, L, P, T)
- [x] Rulers on canvas edges
- [x] Drag guides from rulers (drag a vertical/horizontal guide onto the canvas;
      drag to move, drag off or double-click to remove)
- [x] Smart alignment guides (edges/centers snap to nearby shapes while moving
      or resizing)
- [x] Properties panel (x, y, width, height, rotation)
- [x] Snap to grid toggle
- [x] Preview mode (hide UI elements)
- [x] Page transition animations (Framer Motion)
- [x] Skeleton loading states

## Phase 3 — Path & Text

> Drawing: pen tool, freehand, text

- [x] Pen tool (point-click paths; curve conversion via path edit mode)
- [x] Path point editing (double-click a path to edit points: drag to move,
      click a segment to add a point, alt+click to remove, double-click a point
      to convert corner to curve)
- [x] Freehand pencil tool (path simplification pending)
- [x] Close path on first point click
- [x] Point text tool
- [x] Area text with word wrap (drag with the text tool to define a text box;
      rendered as wrapped `<tspan>` lines)
- [x] Font selector and text properties
- [x] Letter spacing and line height (per-text props; `letter-spacing` attribute
      and tspan line spacing in exports)
- [x] Path boolean operations (mock union merges path data; subtract and
      intersect show a mock toast)

## Phase 4 — Layers & Organization

> Structure: layers, groups, arrange, alignment

- [x] Layer panel with visibility and lock
- [x] Drag to reorder layers
- [x] Group and ungroup objects (Ctrl+G / Ctrl+Shift+G)
- [x] Arrange (bring to front, send to back, etc.)
- [x] Align tools (left, center, right, top, middle, bottom)
- [x] Distribute tools (horizontal, vertical)
- [x] Duplicate (Ctrl+D)
- [x] Layer renaming (double-click to rename inline)
- [x] Group folders (create, collapse, move layers in/out)

## Phase 5 — Advanced Fill & Stroke

> Style: gradients, patterns, effects

- [x] Linear and radial gradient editor (rendering exists, no editor UI)
- [x] Gradient stops with color picker
- [x] Gradient handles on canvas
- [x] Stroke dash array editor
- [x] Stroke cap and join styles
- [x] Eyedropper tool (icon only, no handler)
- [x] Color palette with saved swatches
- [x] Recent colors
- [x] Opacity per object

## Phase 6 — Symbols & Export

> Reuse: symbols, export optimization

- [x] Create symbol from selection
- [x] Symbol library panel
- [x] Instance placement from library
- [x] Edit master symbol
- [x] Detach instance
- [x] Export as optimized SVG
- [x] Export as PNG (1x, 2x, 4x)
- [x] Export as JPEG with quality
- [x] Export selection only
- [x] Copy SVG to clipboard
- [x] SVG code editor view

## Phase 7 — Platform & Integration

> Ecosystem: native, plugins, collaboration

- [x] Tauri desktop app build (bundling configured; signing not yet)
- [x] iOS/Android native shells (Tauri mobile entry point wired)
- [ ] SVG code editor with syntax highlighting
- [ ] Plugin system for custom tools
- [ ] Import from Figma/Sketch (mock)
- [ ] Real-time collaboration cursors (mock)
- [ ] Version history with branching
- [x] Component library (shared symbols across documents)
- [ ] SVG animation timeline (mock)
