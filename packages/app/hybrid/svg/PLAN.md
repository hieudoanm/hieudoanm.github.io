# SVG — Vector Editor

## Table of Contents

- [SVG — Vector Editor](#svg--vector-editor)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Business Features](#business-features)
        - [Document Management](#document-management)
        - [Canvas Workspace](#canvas-workspace)
        - [Shape Tools](#shape-tools)
        - [Path \& Pen Tool](#path--pen-tool)
        - [Text Tool](#text-tool)
        - [Selection \& Transform](#selection--transform)
        - [Fill \& Stroke](#fill--stroke)
        - [Layers](#layers)
        - [Alignment \& Distribution](#alignment--distribution)
        - [Symbols \& Reuse](#symbols--reuse)
        - [Export](#export)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [SVG Rendering](#svg-rendering)
        - [Navigation \& Routing](#navigation--routing)
        - [Code Quality](#code-quality)
        - [Keyboard Shortcuts](#keyboard-shortcuts)
        - [Responsive Layout](#responsive-layout)
        - [Page Transitions](#page-transitions)
        - [Offline Support](#offline-support)
        - [Accessibility](#accessibility)
  - [Design](#design)
    - [UX for Mobile](#ux-for-mobile)
  - [Roadmap](#roadmap)
    - [Product Roadmap](#product-roadmap)
      - [Phase 1 — Core UI](#phase-1--core-ui)
      - [Phase 2 — Enhanced UX](#phase-2--enhanced-ux)
      - [Phase 3 — Path \& Text](#phase-3--path--text)
      - [Phase 4 — Layers \& Organization](#phase-4--layers--organization)
      - [Phase 5 — Advanced Fill \& Stroke](#phase-5--advanced-fill--stroke)
      - [Phase 6 — Symbols \& Export](#phase-6--symbols--export)
      - [Phase 7 — Platform \& Integration](#phase-7--platform--integration)

---

## Overview

### Tech Stack

1. **pnpm** (always pin dependencies version)
2. **ESLint** (with next)
3. **Prettier** (with tailwindcss)
4. **Jest** (coverage >= 80%)
5. **Playwright** (coverage all page level)
6. **Next.js 16** (App Router, static export)
7. **TypeScript 6** (strict mode)
8. **Tailwind CSS 4** + **DaisyUI 5** (32 themes, dark default)
9. **Tauri 2** (desktop shell)
10. **Mock data** with IndexedDB persistence

### Pages

| #   | Route             | Page            | Key Features                                            |
| --- | ----------------- | --------------- | ------------------------------------------------------- |
| 1   | `/`               | Documents       | Recent SVGs, upload, templates, grid/list toggle        |
| 2   | `/edit/[id]`      | Canvas Editor   | Full vector workspace with tools, layers, properties    |
| 3   | `/edit/[id]/code` | SVG Code Editor | Raw SVG code editing with syntax highlighting           |
| 4   | `/settings`       | Settings        | Theme, grid settings, snap preferences, export defaults |
| 5   | `/profile`        | Profile         | User info                                               |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages
  components/
    atoms/            # ToolButton, ColorSwatch, LayerItem, HandlePoint
    molecules/        # ShapeProps, FillPanel, StrokePanel, AlignToolbar
    organisms/        # Sidebar, Canvas, LayerPanel, Toolbar, CodeEditor
    templates/        # EditorTemplate, SettingsTemplate
    RouteGuard.tsx    # Auth route protection
  data/               # Mock SVGs, templates, color palettes
  hooks/              # useCanvas, useSelection, useLayers, useHistory
  lib/                # IndexedDB wrapper (db.ts), SVG parser mock
  providers/          # DataProvider, Providers, ToastProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces
  utils/              # svgExport, generateId, snapToGrid
src-tauri/            # Tauri desktop (Rust)
e2e/                  # Playwright E2E tests
```

---

## Development

### Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `input`, etc.)
- Dark theme as default
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms to molecules to organisms to templates
- `console.*` with `[Module]` prefix for structured debug logging
- `console.*` stripped in production via `compiler.removeConsole`
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` env var (default 800ms)

### Features

#### Business Features

##### Document Management

- **Document grid**: Thumbnail preview, filename, dimensions, last modified
- **Upload SVG**: File picker for `.svg` import; parse and display on canvas
- **Create from template**: Blank canvas, icon set, illustration, logo templates
- **Rename**: Inline edit on document title
- **Delete**: Confirmation modal
- **Recent documents**: Last 5 opened SVGs at top of library

##### Canvas Workspace

- **Infinite canvas**: Pan and zoom without limits
- **Grid overlay**: Configurable grid (10px, 20px, 50px); toggle visibility
- **Snap to grid**: Objects snap to grid when dragging/resizing
- **Guides**: Horizontal and vertical guides; drag from rulers
- **Rulers**: Pixel rulers on top and left of canvas
- **Zoom**: Scroll wheel, pinch-to-zoom, zoom slider, fit-to-artboard, 100%
- **Pan**: Space+drag or middle-click
- **Artboard**: Configurable canvas size (preset: A4, Letter, 1920x1080, custom)
- **Preview mode**: Toggle to hide grid, guides, handles; show final output
- **Grid color**: Light or dark grid dots/lines based on theme

##### Shape Tools

- **Rectangle**: Click-drag to create; hold Shift for square; corner radius
  slider
- **Ellipse**: Click-drag to create; hold Shift for circle
- **Line**: Click-drag for straight line; hold Shift for 45-degree snaps
- **Polygon**: Click to place vertices; close path on first point click;
  configurable sides
- **Star**: Click-drag with configurable inner/outer radius and points
- **Rounded rectangle**: Corner radius control in properties panel
- **Shape properties**: Width, height, x, y, rotation, corner radius, opacity

##### Path & Pen Tool

- **Pen tool**: Click to place corner points; click-drag for bezier curves
- **Path editing**: Direct select individual anchor points; drag handles for
  curve adjustment
- **Add/remove points**: Add point on path segment; remove existing point
- **Convert point**: Toggle between corner and smooth (bezier) point
- **Close path**: Click first point to close path
- **Freehand draw**: Pencil tool for freeform paths; auto-simplify on release
- **Path boolean operations**: Union, subtract, intersect, exclude (mock)

##### Text Tool

- **Point text**: Click to place; type inline
- **Area text**: Click-drag text box; text wraps within bounds
- **Font selector**: Web-safe fonts (Arial, Helvetica, Georgia, Courier,
  Verdana, Impact, Comic Sans)
- **Text properties**: Size, color, bold, italic, underline, alignment
- **Letter spacing**: Character spacing adjustment
- **Line height**: Row spacing for multi-line text
- **Text on path**: Attach text to a path element (mock)

##### Selection & Transform

- **Select tool**: Click to select; Shift+click for multi-select; marquee
  selection
- **Direct select**: Select individual points/segments within a path
- **Bounding box**: Resize handles on selected objects; Shift+drag for
  proportional
- **Rotation**: Rotation handle above bounding box; snap to 15-degree increments
- **Skew**: Hold Ctrl while dragging edge handle for skew transform
- **Transform panel**: Precise x, y, width, height, rotation, skew inputs
- **Group**: Ctrl+G to group selected objects; Ctrl+Shift+G to ungroup
- **Arrange**: Bring to front, send to back, bring forward, send backward

##### Fill & Stroke

- **Fill color**: Color picker with hex input, opacity slider; no-fill toggle
- **Stroke color**: Separate color picker for outline; no-stroke toggle
- **Stroke width**: 0-20px slider with numeric input
- **Stroke style**: Solid, dashed, dotted with configurable dash array
- **Stroke cap**: Butt, round, square
- **Stroke join**: Miter, round, bevel
- **Gradient fill**: Linear and radial gradient editor with stops; drag gradient
  handles on canvas
- **Opacity**: Per-object opacity slider (0-100%)
- **Color palette**: Recent colors, saved swatches, HSL/RGB/Hex inputs
- **Eyedropper**: Click on canvas to sample color

##### Layers

- **Layer panel**: List of all objects with thumbnail, name, visibility eye,
  lock icon
- **Layer order**: Drag to reorder (top renders on top)
- **Visibility toggle**: Eye icon to show/hide individual layers
- **Lock layer**: Prevent selection and editing
- **Rename**: Double-click to rename layer
- **New layer**: Add empty layer for organized composition
- **Delete layer**: Remove with confirmation
- **Group layers**: Nest layers within group folders
- **Layer blending**: Normal, multiply, screen, overlay per layer

##### Alignment & Distribution

- **Align**: Left, center, right, top, middle, bottom — align to selection or
  artboard
- **Distribute**: Horizontal or vertical equal spacing
- **Smart guides**: Pink alignment guides showing center/edge alignment with
  nearby objects
- **Snap to objects**: Snap to edges and centers of other objects

##### Symbols & Reuse

- **Create symbol**: Convert selected objects to reusable symbol
- **Symbol library**: Sidebar panel showing all symbols in document
- **Instance placement**: Drag symbol from library to canvas
- **Edit symbol**: Edit master; all instances update
- **Detach instance**: Break symbol link to make independent copy

##### Export

- **Export as SVG**: Download clean SVG with optional optimization (remove
  metadata, minify)
- **Export as PNG**: Rasterize at 1x, 2x, or 4x resolution
- **Export as JPEG**: Rasterize with quality slider
- **Export selection**: Export only selected objects
- **Export as component**: Generate React/HTML component code (mock)
- **Copy as SVG**: Copy SVG markup to clipboard

#### Technical Features

##### Data & Persistence

- **IndexedDB storage**: SVG documents, symbols, settings, history in `svg-db`
- **Seed on first load**: Demo SVGs (logo, icon set, illustration) with
  pre-built shapes
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
- **Optimistic UI**: Edits apply immediately on canvas; persist in background
- **CRUD operations**: Full create/read/update/delete for documents and symbols

##### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle with visual theme picker
- **Skeleton loading**: Canvas and library skeletons during load
- **Toast notifications**: Auto-dismiss with success/error/info variants
- **Responsive layout**: Full workspace on desktop; simplified toolbar on mobile

##### SVG Rendering

- **Native SVG**: All shapes rendered as SVG elements in browser
- **Transform matrix**: CSS transform for rotation, scale, translation
- **Path data**: SVG path `d` attribute for custom shapes
- **Gradient rendering**: SVG `linearGradient` and `radialGradient` elements

##### Navigation & Routing

- **Route groups**: `(editor)`, `(settings)` for code organization
- **Dynamic routes**: `/edit/[id]` for canvas editor
- **Back navigation**: Consistent back button on sub-pages

##### Code Quality

- **Arrow functions**: All function declarations use arrow syntax
- **Debug logging**: `[Module]` prefix; stripped from production
- **Testing**: Jest (unit) + Playwright (E2E) framework ready
- **Atomic design**: atoms to molecules to organisms to templates

##### Keyboard Shortcuts

- **V**: Select tool
- **R**: Rectangle tool
- **E**: Ellipse tool
- **L**: Line tool
- **P**: Pen tool
- **T**: Text tool
- **Ctrl+Z / Ctrl+Shift+Z**: Undo / redo
- **Ctrl+G / Ctrl+Shift+G**: Group / ungroup
- **Ctrl+C / Ctrl+V**: Copy / paste
- **Delete**: Remove selected
- **Ctrl+A**: Select all
- **Ctrl+D**: Duplicate
- **Ctrl+Shift+E**: Export dialog
- **Escape**: Deselect all

##### Responsive Layout

- **Desktop**: Full workspace with left tools, right panels, top toolbar
- **Tablet**: Collapsible panels; floating tool palette
- **Mobile**: Full-screen canvas with bottom toolbar; panels as slide-up sheets
- **Breakpoints**: Panels collapse below `lg:` (1024px)

##### Page Transitions

- **Framer Motion**: Fade + slide-up variants (200ms ease-out)

##### Offline Support

- **OfflineBanner**: Listens to online/offline events
- **Cached documents**: All SVGs in IndexedDB; fully functional offline
- **PWA manifest**: Standalone display, portrait orientation

##### Accessibility

- **Focus-visible**: Global focus-visible:outline-primary
- **ARIA labels**: Canvas, tools, layers, properties panel
- **Keyboard navigation**: Full tool and layer panel navigation
- **Screen reader**: Object count and selection state announced

---

## Design

### UX for Mobile

- **Full-screen canvas** on mobile; tools as bottom toolbar icons
- **Panels** slide up from bottom as sheets (layers, fill/stroke, align)
- **Pinch-to-zoom** and **two-finger pan** on canvas
- Minimum 44px tap targets for all interactive elements
- **Selection** via tap; multi-select via tap with Shift held
- **Properties panel** as slide-up sheet for precise editing
- **Dark mode default** (`data-theme="night"`) for color-accurate work
- **Color picker** as full-screen overlay on mobile

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI

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

#### Phase 2 — Enhanced UX

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

#### Phase 3 — Path & Text

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

#### Phase 4 — Layers & Organization

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

#### Phase 5 — Advanced Fill & Stroke

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

#### Phase 6 — Symbols & Export

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

#### Phase 7 — Platform & Integration

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
