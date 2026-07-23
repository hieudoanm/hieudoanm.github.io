# Photo — Image Editor

## Table of Contents

- [Photo — Image Editor](#photo--image-editor)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Business Features](#business-features)
        - [Image Library](#image-library)
        - [Canvas Editor](#canvas-editor)
        - [Adjustments](#adjustments)
        - [Filters \& Presets](#filters--presets)
        - [Crop \& Transform](#crop--transform)
        - [Retouching Tools](#retouching-tools)
        - [Text \& Shapes](#text--shapes)
        - [Layers](#layers)
        - [Selection \& Masking](#selection--masking)
        - [Export \& History](#export--history)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [Canvas Rendering](#canvas-rendering)
        - [Image Processing](#image-processing)
        - [Navigation \& Routing](#navigation--routing)
        - [Code Quality](#code-quality)
        - [Keyboard Shortcuts](#keyboard-shortcuts)
        - [Responsive Layout](#responsive-layout)
        - [Page Transitions](#page-transitions)
        - [Offline Support](#offline-support)
        - [Accessibility](#accessibility)
  - [Design](#design)
    - [UX for Mobile](#ux-for-mobile)
      - [Layout](#layout)
      - [Touch Targets](#touch-targets)
      - [Forms](#forms)
      - [Navigation Patterns](#navigation-patterns)
      - [Feedback](#feedback)
      - [Lists \& Scrolling](#lists--scrolling)
      - [Modals](#modals)
      - [Theming](#theming)
  - [Roadmap](#roadmap)
    - [Product Roadmap](#product-roadmap)
      - [Phase 1 — Core UI](#phase-1--core-ui)
      - [Phase 2 — Enhanced UX](#phase-2--enhanced-ux)
      - [Phase 3 — Adjustments \& Filters](#phase-3--adjustments--filters)
      - [Phase 4 — Retouching \& Selection](#phase-4--retouching--selection)
      - [Phase 5 — Text \& Shapes](#phase-5--text--shapes)
      - [Phase 6 — Layers \& Compositing](#phase-6--layers--compositing)
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

| #   | Route               | Page             | Key Features                                           |
| --- | ------------------- | ---------------- | ------------------------------------------------------ |
| 1   | `/`                 | Library          | Image grid, upload area, albums, search, sort          |
| 2   | `/edit/[id]`        | Canvas Editor    | Full editing workspace with tools, layers, adjustments |
| 3   | `/edit/[id]/crop`   | Crop & Transform | Crop, rotate, flip, perspective correction             |
| 4   | `/edit/[id]/layers` | Layer Manager    | Layer list, blend modes, opacity, visibility           |
| 5   | `/albums`           | Albums           | Album list with covers, create/edit/delete             |
| 6   | `/settings`         | Settings         | Theme, default export format, canvas preferences       |
| 7   | `/profile`          | Profile          | User info                                              |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages
  components/
    atoms/            # ImageThumbnail, ToolButton, SliderControl
    molecules/        # AdjustmentPanel, FilterGrid, CropOverlay
    organisms/        # Sidebar, Canvas, LayerPanel, Toolbar
    templates/        # EditorTemplate, LibraryTemplate, SettingsTemplate
    RouteGuard.tsx    # Auth route protection
  data/               # Mock images, filter presets, sample assets
  hooks/              # useCanvas, useImageProcess, useHistory, useZoom
  lib/                # IndexedDB wrapper (db.ts), image processing mock
  providers/          # DataProvider, Providers, ToastProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces
  utils/              # adjustColor, formatFileSize, exportImage
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
- Atomic design: atoms → molecules → organisms → templates
- `console.*` with `[Module]` prefix for structured debug logging
- `console.*` stripped in production via `compiler.removeConsole`
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` env var (default `800`ms) for
  simulating network latency; applied in `db.ts` before every query

### Features

#### Business Features

##### Image Library

- **Grid view**: Thumbnail grid with uniform card size; shows filename,
  dimensions, file size, date modified
- **List view**: Table view with columns for name, type, dimensions, size,
  modified date
- **Upload**: Drag-and-drop zone or file picker; accepts PNG, JPG, SVG, WebP;
  mock creates colored placeholder images
- **Albums**: Group images into named albums; default "All Photos", "Favorites",
  "Recent"
- **Search**: Filter by filename or tags
- **Sort**: By name, date, size, dimensions
- **Multi-select**: Checkbox mode to select multiple images for batch operations
- **Image info**: Detail panel showing EXIF-like metadata (mock: camera, date,
  ISO, focal length)
- **Favorites**: Star images for quick access; separate favorites view
- **Delete**: Move to trash with restore option (30-day purge)

##### Canvas Editor

- **Workspace layout**: Left toolbar, center canvas, right adjustment panel,
  bottom history/layers
- **Zoom**: Scroll wheel zoom, pinch-to-zoom on mobile, zoom slider, fit-to-
  screen, actual size (100%)
- **Pan**: Space+drag or middle-click to pan around zoomed canvas
- **Canvas background**: Checkerboard pattern for transparency visualization
- **Before/After**: Split-view or toggle to compare original vs edited
- **Info bar**: Current zoom level, cursor coordinates, image dimensions
- **Full screen**: Toggle full-screen editor mode hiding UI chrome

##### Adjustments

- **Brightness**: -100 to +100 slider; real-time preview
- **Contrast**: -100 to +100 slider
- **Saturation**: -100 to +100 slider
- **Hue**: -180 to +180 degree rotation
- **Temperature**: Cool (blue) ↔ Warm (orange) slider
- **Tint**: Green ↔ Magenta slider
- **Exposure**: -5 to +5 EV slider
- **Highlights**: Recover or boost highlight detail
- **Shadows**: Recover or boost shadow detail
- **Clarity**: Midtone contrast enhancement
- **Vibrance**: Selective saturation boost (protects skin tones)
- **Sharpness**: Amount + radius controls
- **Noise reduction**: Luminance and color noise sliders
- **Vignette**: Amount and midpoint controls
- **Reset per adjustment**: X button to reset individual slider
- **Reset all**: Button to reset all adjustments to defaults
- **Histogram**: RGB histogram display updating in real-time

##### Filters & Presets

- **Filter grid**: 20+ preset thumbnails showing filter preview on current image
- **Categories**: Warm, Cool, B&W, Vintage, Cinematic, Artistic, Dramatic
- **Filter intensity**: Slider (0-100%) to blend filter with original
- **Custom presets**: Save current adjustment stack as reusable preset
- **No filter**: Default option showing original image
- **Filter comparison**: Side-by-side before/after for selected filter

##### Crop & Transform

- **Free crop**: Drag handles on crop box corners and edges
- **Aspect ratio presets**: Original, 1:1, 4:3, 3:2, 16:9, 9:16, custom
- **Rule of thirds**: Overlay grid during crop
- **Rotate**: Slider -45° to +45° with auto-crop to remove empty edges
- **90° rotation**: Quick rotate left/right buttons
- **Flip**: Horizontal and vertical flip buttons
- **Perspective correction**: 4-corner drag for perspective adjustment (mock)
- **Straighten**: Horizon level tool with angle indicator
- **Apply/Cancel**: Confirm or discard transform changes

##### Retouching Tools

- **Healing brush**: Click to remove blemishes; mock blends surrounding area
- **Clone stamp**: Sample area → paint to duplicate; source point selector
- **Blur tool**: Paint to blur areas; brush size and strength sliders
- **Sharpen tool**: Paint to sharpen areas; brush size and strength sliders
- **Dodge tool**: Paint to lighten areas
- **Burn tool**: Paint to darken areas
- **Brush settings**: Size, hardness, opacity, flow sliders for all brush tools
- **Brush preview**: Circle cursor showing brush size on canvas

##### Text & Shapes

- **Text tool**: Click to place text; type in popup; drag to reposition
- **Font selector**: Dropdown with web-safe fonts (Arial, Helvetica, Georgia,
  Courier, Verdana, etc.)
- **Text properties**: Size, color, bold, italic, alignment (left/center/right)
- **Text effects**: Shadow, outline, background color
- **Shape tools**: Rectangle, ellipse, line, arrow, polygon
- **Shape properties**: Fill color, stroke color, stroke width, opacity, corner
  radius
- **Shape layers**: Shapes created as separate layers for independent editing
- **Text layers**: Text created as separate layers

##### Layers

- **Layer panel**: List of all layers with thumbnail preview, name, visibility
  eye icon
- **Layer order**: Drag to reorder (top layer renders on top)
- **Opacity**: Per-layer opacity slider (0-100%)
- **Blend modes**: Normal, Multiply, Screen, Overlay, Soft Light, Hard Light,
  Color Dodge, Color Burn
- **Visibility toggle**: Eye icon to show/hide individual layers
- **Lock layer**: Prevent accidental edits on completed layers
- **Merge down**: Combine layer with the one below
- **Flatten**: Merge all layers into single background
- **New layer**: Add empty transparent layer
- **Delete layer**: Remove layer with confirmation
- **Layer naming**: Double-click to rename

##### Selection & Masking

- **Rectangle selection**: Click-drag for rectangular selection
- **Elliptical selection**: Click-drag for oval selection
- **Lasso selection**: Freehand selection boundary
- **Magic wand**: Click to select contiguous area by color similarity
- **Select all / Deselect**: Quick selection commands
- **Selection modify**: Expand, contract, feather, border
- **Quick mask**: Toggle mask mode showing selection as red overlay
- **Apply mask**: Convert selection to layer mask

##### Export & History

- **Export as PNG**: Lossless with transparency support
- **Export as JPEG**: Quality slider (1-100), file size preview
- **Export as WebP**: Modern format with quality slider
- **Export as SVG**: For vector-friendly compositions (mock)
- **Batch export**: Export multiple images with format and quality settings
- **History panel**: Chronological list of all edits; click to revert to any
  point
- **Undo/redo**: Full undo/redo stack (Ctrl+Z / Ctrl+Shift+Z)
- **Version save**: Save snapshot of current state without overwriting original

#### Technical Features

##### Data & Persistence

- **IndexedDB storage**: Images (as base64 or blob), albums, presets, settings,
  edit history stored in `photo-db`
- **Seed on first load**: Demo images (8-10 colored placeholder images with
  different dimensions) and sample albums
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default 800ms) applied
  before every DB operation
- **Optimistic UI**: Adjustments preview instantly; persist in background
- **CRUD operations**: Full create/read/update/delete for images, albums,
  presets

##### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle with visual theme picker; persisted
  to `data-theme` attribute and localStorage
- **Skeleton loading**: Canvas and library skeletons during load
- **Toast notifications**: In-app toast system via `ToastProvider`; auto-dismiss
- **Responsive layout**: Full workspace on desktop; collapsed panels on mobile

##### Canvas Rendering

- **HTML Canvas API**: 2D canvas for image display and manipulation
- **Offscreen canvas**: Process adjustments on offscreen canvas for performance
- **Pixel manipulation**: Direct pixel access for filter and adjustment
  application (mock: CSS filter equivalents)
- **Zoom rendering**: High-quality scaling at all zoom levels

##### Image Processing

- **CSS filter chain**: Brightness, contrast, saturate, hue-rotate, blur, sepia,
  grayscale as CSS filters for real-time preview
- **Mock processing**: Adjustments simulated via CSS filter properties rather
  than pixel-level manipulation
- **Preset filters**: Predefined CSS filter combinations for one-click effects
- **Export simulation**: Mock export generates colored placeholder with metadata

##### Navigation & Routing

- **Route groups**: Pages organized into `(editor)`, `(library)`, `(settings)`
- **Dynamic routes**: `/edit/[id]` for canvas editor
- **Back navigation**: Consistent `FiArrowLeft` +
  `btn-neutral btn-sm btn-circle`

##### Code Quality

- **Arrow functions**: All function declarations and component exports use arrow
  syntax; test files excluded
- **Debug logging**: `console.*` with `[Module]` prefix throughout source;
  stripped from production via `compiler.removeConsole`
- **Testing**: Jest (unit) + Playwright (E2E) framework ready
- **Atomic design**: atoms → molecules → organisms → templates hierarchy

##### Keyboard Shortcuts

- **Ctrl+Z / Ctrl+Shift+Z**: Undo / redo
- **Ctrl+S**: Export / save
- **Ctrl+0**: Fit to screen
- **Ctrl+1**: Actual size (100%)
- **Ctrl++/-**: Zoom in/out
- **Space+drag**: Pan canvas
- **V**: Move tool
- **C**: Crop tool
- **B**: Brush tool
- **T**: Text tool
- **Ctrl+Shift+E**: Export dialog
- **Escape**: Deselect / cancel

##### Responsive Layout

- **Desktop**: Full workspace — left tools, center canvas, right panels
- **Tablet**: Collapsible panels; tools as floating toolbar
- **Mobile**: Full-screen canvas with bottom toolbar; panels as slide-up sheets
- **Breakpoints**: Panels collapse below `lg:` (1024px)

##### Page Transitions

- **`PageTransition` component**: Framer Motion wrapper with fade + slide-up
  variants (opacity 0→1, y 12→0, 200ms ease-out)

##### Offline Support

- **`OfflineBanner`**: Fixed top banner; listens to `online`/`offline` events
- **Cached images**: All images in IndexedDB; fully functional offline
- **PWA manifest**: Standalone display, portrait orientation

##### Accessibility

- **Focus-visible**: Global `focus-visible:outline-primary` on interactive
  elements
- **ARIA labels**: Canvas, toolbar, adjustment sliders, layer panel
- **Keyboard navigation**: Full tool and layer panel navigation via keyboard
- **High contrast tool icons**: Visible in both light and dark themes

---

## Design

### UX for Mobile

#### Layout

- **Full-screen canvas** on mobile; tools as bottom toolbar icons
- **Panels** slide up from bottom as sheets (adjustments, layers, filters)
- **Pinch-to-zoom** and **two-finger pan** on canvas
- **Safe area** respected for devices with notches/home indicators

#### Touch Targets

- Minimum `44px` tap target for all interactive elements
- **Tool buttons**: Large icons in bottom toolbar
- **Slider handles**: Oversized thumb for precise dragging

#### Forms

- **Adjustment sliders**: Full-width with value display; drag anywhere on track
- **Filter grid**: Scrollable grid with large preview thumbnails
- **Text input**: Popup keyboard for text tool entry

#### Navigation Patterns

- **Bottom toolbar**: Primary tools (Move, Crop, Brush, Text, Shapes)
- **Swipe between panels**: Adjustment, Filter, Layer panels as tabs
- **Long press**: Context menu for layer actions

#### Feedback

- **Toast notifications**: Image saved, export complete, error messages
- **Skeleton loading**: Canvas skeleton during image load
- **Zoom badge**: Floating indicator during pinch zoom
- **Adjustment preview**: Real-time canvas update as sliders move

#### Lists & Scrolling

- **Library grid**: Responsive image grid with gap
- **Layer list**: Scrollable with drag handle per layer
- **History list**: Scrollable undo/redo timeline

#### Modals

- **Export dialog**: Format selection with quality slider
- **Delete confirmation**: Before removing images
- **New album**: Name input modal

#### Theming

- **Dark mode default** (`data-theme="night"`) for color-accurate editing
- **Canvas always shows image** with checkerboard transparency
- **Theme picker** on Settings page for UI chrome only

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI

> Foundation: library, canvas viewer, basic tools

- [ ] Image library with grid/list view
- [ ] Image upload with drag-and-drop
- [ ] Canvas editor workspace
- [ ] Zoom controls (slider, presets, fit-to-screen)
- [ ] Pan with Space+drag
- [ ] Canvas info bar (zoom, coordinates, dimensions)
- [ ] Undo/redo (Ctrl+Z / Ctrl+Shift+Z)
- [ ] Demo images seed data
- [ ] Responsive layout

#### Phase 2 — Enhanced UX

> Polish: keyboard shortcuts, before/after, history panel

- [ ] Keyboard shortcuts (V, C, B, T for tools)
- [ ] Before/after comparison (split view or toggle)
- [ ] History panel with named states
- [ ] Full-screen editor mode
- [ ] Image info/metadata panel
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states
- [ ] Multi-select in library

#### Phase 3 — Adjustments & Filters

> Color: brightness, contrast, saturation, presets

- [ ] Brightness, contrast, saturation sliders
- [ ] Hue and temperature controls
- [ ] Exposure, highlights, shadows
- [ ] Clarity, vibrance, sharpness
- [ ] Noise reduction slider
- [ ] Vignette effect
- [ ] RGB histogram display
- [ ] 20+ preset filters with intensity slider
- [ ] Custom preset save/load
- [ ] Reset per adjustment and reset all

#### Phase 4 — Retouching & Selection

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

#### Phase 5 — Text & Shapes

> Design: text tool, shape tools, effects

- [ ] Text tool with font selector
- [ ] Text properties (size, color, bold, italic, alignment)
- [ ] Text effects (shadow, outline, background)
- [ ] Shape tools (rectangle, ellipse, line, arrow)
- [ ] Shape properties (fill, stroke, opacity, corner radius)
- [ ] Shape layers for independent editing
- [ ] Text layers

#### Phase 6 — Layers & Compositing

> Advanced: layers, blend modes, masking

- [ ] Layer panel with thumbnails
- [ ] Drag to reorder layers
- [ ] Per-layer opacity slider
- [ ] Blend modes (Normal, Multiply, Screen, Overlay, etc.)
- [ ] Layer visibility toggle and lock
- [ ] Merge down and flatten
- [ ] New empty layer
- [ ] Layer naming
- [ ] Crop and transform tools
- [ ] Perspective correction

#### Phase 7 — Platform & Integration

> Ecosystem: native, batch, RAW, plugins

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Batch processing (resize, filter, export multiple)
- [ ] RAW image support (mock)
- [ ] Image resizing and canvas size adjustment
- [ ] Background removal (mock AI tool)
- [ ] AI-enhance (mock: auto-levels, auto-color)
- [ ] Plugin system for custom filters
- [ ] Social media export presets (Instagram, Twitter, Facebook sizes)
