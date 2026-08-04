# Roadmap

## Phase 1 — Core UI

> Foundation: canvas, basic shapes, selection, fill/stroke

- [ ] Document library with grid view
- [ ] Canvas workspace with pan and zoom
- [ ] Rectangle and ellipse tools
- [ ] Line tool
- [ ] Selection with bounding box and resize handles
- [ ] Fill and stroke color pickers
- [ ] Grid overlay and snap-to-grid
- [ ] Undo/redo
- [ ] Demo SVGs seed data
- [ ] Responsive layout

## Phase 2 — Enhanced UX

> Polish: keyboard shortcuts, rulers, guides, properties panel

- [ ] Keyboard shortcuts (V, R, E, L, P, T)
- [ ] Rulers on canvas edges
- [ ] Drag guides from rulers
- [ ] Smart alignment guides
- [ ] Properties panel (x, y, width, height, rotation)
- [ ] Snap to grid toggle
- [ ] Preview mode (hide UI elements)
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states

## Phase 3 — Path & Text

> Drawing: pen tool, freehand, text

- [ ] Pen tool with bezier curves
- [ ] Path point editing (add, remove, convert)
- [ ] Freehand pencil tool with path simplification
- [ ] Close path on first point click
- [ ] Point text tool
- [ ] Area text with word wrap
- [ ] Font selector and text properties
- [ ] Letter spacing and line height
- [ ] Path boolean operations (mock)

## Phase 4 — Layers & Organization

> Structure: layers, groups, arrange, alignment

- [ ] Layer panel with visibility and lock
- [ ] Drag to reorder layers
- [ ] Group and ungroup objects (Ctrl+G / Ctrl+Shift+G)
- [ ] Arrange (bring to front, send to back, etc.)
- [ ] Align tools (left, center, right, top, middle, bottom)
- [ ] Distribute tools (horizontal, vertical)
- [ ] Duplicate (Ctrl+D)
- [ ] Layer renaming
- [ ] Group folders

## Phase 5 — Advanced Fill & Stroke

> Style: gradients, patterns, effects

- [ ] Linear and radial gradient editor
- [ ] Gradient stops with color picker
- [ ] Gradient handles on canvas
- [ ] Stroke dash array editor
- [ ] Stroke cap and join styles
- [ ] Eyedropper tool
- [ ] Color palette with saved swatches
- [ ] Recent colors
- [ ] Opacity per object

## Phase 6 — Symbols & Export

> Reuse: symbols, export optimization

- [ ] Create symbol from selection
- [ ] Symbol library panel
- [ ] Instance placement from library
- [ ] Edit master symbol
- [ ] Detach instance
- [ ] Export as optimized SVG
- [ ] Export as PNG (1x, 2x, 4x)
- [ ] Export as JPEG with quality
- [ ] Export selection only
- [ ] Copy SVG to clipboard
- [ ] SVG code editor view

## Phase 7 — Platform & Integration

> Ecosystem: native, plugins, collaboration

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] SVG code editor with syntax highlighting
- [ ] Plugin system for custom tools
- [ ] Import from Figma/Sketch (mock)
- [ ] Real-time collaboration cursors (mock)
- [ ] Version history with branching
- [ ] Component library (shared symbols across documents)
- [ ] SVG animation timeline (mock)
