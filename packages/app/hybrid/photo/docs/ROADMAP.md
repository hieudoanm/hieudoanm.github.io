# Roadmap

## Phase 1 — Core UI

> Foundation: library, canvas viewer, basic tools

- [x] Image library with grid/list view
- [x] Image upload with drag-and-drop
- [x] Canvas editor workspace
- [x] Zoom controls (slider, presets, fit-to-screen)
- [ ] Pan with Space+drag
- [x] Canvas info bar (zoom, coordinates, dimensions)
- [ ] Undo/redo (Ctrl+Z / Ctrl+Shift+Z)
- [x] Demo images seed data
- [x] Responsive layout

## Phase 2 — Enhanced UX

> Polish: keyboard shortcuts, before/after, history panel

- [ ] Keyboard shortcuts (V, C, B, T for tools)
- [x] Before/after comparison (split view or toggle)
- [ ] History panel with named states
- [ ] Full-screen editor mode
- [ ] Image info/metadata panel
- [ ] Page transition animations (Framer Motion)
- [x] Skeleton loading states
- [ ] Multi-select in library

## Phase 3 — Adjustments & Filters

> Color: brightness, contrast, saturation, presets

- [x] Brightness, contrast, saturation sliders
- [x] Hue and temperature controls
- [x] Exposure, highlights, shadows
- [x] Clarity, vibrance, sharpness
- [x] Noise reduction slider
- [x] Vignette effect
- [ ] RGB histogram display
- [x] 20+ preset filters with intensity slider
- [ ] Custom preset save/load
- [x] Reset per adjustment and reset all

## Phase 4 — Retouching & Selection

> Tools: healing, clone, blur, sharpen, selections

- [ ] Healing brush (blemish removal)
- [ ] Clone stamp (area duplication)
- [ ] Blur and sharpen brush tools
- [ ] Dodge and burn tools
- [ ] Brush settings (size, hardness, opacity, flow)
- [ ] Rectangle and elliptical selection
- [ ] Lasso and magic wand selection
- [ ] Selection modify (expand, feather, border)
- [ ] Quick mask mode

## Phase 5 — Text & Shapes

> Design: text tool, shape tools, effects

- [x] Text tool with font selector
- [x] Text properties (size, color, bold, italic, alignment)
- [ ] Text effects (shadow, outline, background)
- [ ] Shape tools (rectangle, ellipse, line, arrow)
- [ ] Shape properties (fill, stroke, opacity, corner radius)
- [ ] Shape layers for independent editing
- [ ] Text layers

## Phase 6 — Layers & Compositing

> Advanced: layers, blend modes, masking

- [x] Layer panel with thumbnails
- [ ] Drag to reorder layers
- [x] Per-layer opacity slider
- [x] Blend modes (Normal, Multiply, Screen, Overlay, etc.)
- [x] Layer visibility toggle and lock
- [ ] Merge down and flatten
- [x] New empty layer
- [x] Layer naming
- [x] Crop and transform tools
- [ ] Perspective correction

## Phase 7 — Platform & Integration

> Ecosystem: native, batch, RAW, plugins

- [x] Tauri desktop app build (bundling configured; signing not yet)
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Batch processing (resize, filter, export multiple)
- [ ] RAW image support (mock)
- [x] Image resizing and canvas size adjustment
- [x] Background removal (mock AI tool)
- [x] AI-enhance (mock: auto-levels, auto-color)
- [ ] Plugin system for custom filters
- [x] Social media export presets (Instagram, Twitter, Facebook sizes)
