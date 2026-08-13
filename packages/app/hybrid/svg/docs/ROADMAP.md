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
- [ ] Undo/redo (history infra exists but is not wired to edits)
- [x] Demo SVGs seed data
- [x] Responsive layout

## Phase 2 — Enhanced UX

> Polish: keyboard shortcuts, rulers, guides, properties panel

- [x] Keyboard shortcuts (V, R, E, L, P, T)
- [x] Rulers on canvas edges
- [ ] Drag guides from rulers
- [ ] Smart alignment guides
- [x] Properties panel (x, y, width, height, rotation)
- [x] Snap to grid toggle
- [x] Preview mode (hide UI elements)
- [ ] Page transition animations (Framer Motion)
- [x] Skeleton loading states

## Phase 3 — Path & Text

> Drawing: pen tool, freehand, text

- [x] Pen tool (point-click paths; bezier handles pending)
- [ ] Path point editing (add, remove, convert)
- [x] Freehand pencil tool (path simplification pending)
- [x] Close path on first point click
- [x] Point text tool
- [ ] Area text with word wrap
- [x] Font selector and text properties
- [ ] Letter spacing and line height
- [ ] Path boolean operations (mock)

## Phase 4 — Layers & Organization

> Structure: layers, groups, arrange, alignment

- [x] Layer panel with visibility and lock
- [ ] Drag to reorder layers
- [ ] Group and ungroup objects (Ctrl+G / Ctrl+Shift+G)
- [ ] Arrange (bring to front, send to back, etc.)
- [ ] Align tools (left, center, right, top, middle, bottom)
- [ ] Distribute tools (horizontal, vertical)
- [x] Duplicate (Ctrl+D)
- [ ] Layer renaming (function exists, no rename UI)
- [ ] Group folders

## Phase 5 — Advanced Fill & Stroke

> Style: gradients, patterns, effects

- [ ] Linear and radial gradient editor (rendering exists, no editor UI)
- [ ] Gradient stops with color picker
- [ ] Gradient handles on canvas
- [x] Stroke dash array editor
- [x] Stroke cap and join styles
- [ ] Eyedropper tool (icon only, no handler)
- [ ] Color palette with saved swatches
- [ ] Recent colors
- [x] Opacity per object

## Phase 6 — Symbols & Export

> Reuse: symbols, export optimization

- [x] Create symbol from selection
- [x] Symbol library panel
- [x] Instance placement from library
- [ ] Edit master symbol
- [ ] Detach instance
- [x] Export as optimized SVG
- [ ] Export as PNG (1x, 2x, 4x) — util + settings exist, not wired to UI
- [ ] Export as JPEG with quality
- [ ] Export selection only
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
