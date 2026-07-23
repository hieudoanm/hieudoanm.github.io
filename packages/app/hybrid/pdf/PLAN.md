# PDF — PDF Viewer & Editor

## Table of Contents

- [PDF — PDF Viewer \& Editor](#pdf--pdf-viewer--editor)
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
        - [PDF Viewing](#pdf-viewing)
        - [Annotations](#annotations)
        - [Text \& Image Editing](#text--image-editing)
        - [Page Management](#page-management)
        - [Merge \& Split](#merge--split)
        - [Forms \& Signatures](#forms--signatures)
        - [Watermark \& Stamps](#watermark--stamps)
        - [Search \& Navigation](#search--navigation)
        - [Export \& Print](#export--print)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [PDF Rendering](#pdf-rendering)
        - [Virtual Scrolling](#virtual-scrolling)
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
      - [Phase 3 — Annotations](#phase-3--annotations)
      - [Phase 4 — Editing](#phase-4--editing)
      - [Phase 5 — Page Management](#phase-5--page-management)
      - [Phase 6 — Forms \& Signing](#phase-6--forms--signing)
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

| #   | Route               | Page          | Key Features                                            |
| --- | ------------------- | ------------- | ------------------------------------------------------- |
| 1   | `/`                 | Documents     | Recent PDFs, upload area, grid/list toggle, search      |
| 2   | `/pdf/[id]`         | PDF Viewer    | Page render, zoom, navigation, annotations toolbar      |
| 3   | `/pdf/[id]/edit`    | PDF Editor    | Text edit, images, page reorder, watermark              |
| 4   | `/pdf/[id]/merge`   | Merge / Split | Combine PDFs, extract pages, reorder, page range select |
| 5   | `/pdf/[id]/compare` | Compare       | Side-by-side diff of two PDFs                           |
| 6   | `/settings`         | Settings      | Theme, default zoom, page layout, annotation defaults   |
| 7   | `/profile`          | Profile       | User info                                               |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages
  components/
    atoms/            # PageThumbnail, ZoomControl, AnnotationBadge
    molecules/        # PageCanvas, AnnotationToolbar, PageReorderList
    organisms/        # Sidebar, ViewerToolbar, MergePanel, CompareView
    templates/        # ViewerTemplate, SettingsTemplate
    RouteGuard.tsx    # Auth route protection
  data/               # Mock PDFs, annotation templates, page images
  hooks/              # usePDFViewer, useZoom, useAnnotation, useDragDrop
  lib/                # IndexedDB wrapper (db.ts), PDF render engine mock
  providers/          # DataProvider, Providers, ToastProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces
  utils/              # formatPageNumber, exportImage, mergeArrays
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

##### Document Management

- **Document list**: Grid or list view of uploaded PDFs; shows title, page
  count, file size, last opened, thumbnail preview
- **Upload**: Drag-and-drop zone or file picker; accepts `.pdf`; mock parsing
  creates page thumbnails
- **Recent documents**: Top section showing last 5 opened PDFs
- **Search**: Filter documents by title or filename
- **Delete**: Confirmation modal before removing from library
- **Document info**: Properties panel showing title, author, creation date, page
  count, file size
- **Rename**: Inline edit on document title

##### PDF Viewing

- **Page rendering**: Mock canvas-based page display with text blocks and images
  representing PDF content
- **Zoom controls**: Slider (25%-400%), preset buttons (50%, 100%, 150%, 200%),
  fit-to-width, fit-to-page, actual size
- **Page navigation**: Thumbnail sidebar, page number input, keyboard arrows,
  first/last page buttons
- **Continuous scroll**: Vertical scroll through all pages with page gaps
- **Page fit modes**: Fit width (content fills viewport), fit page (full page
  visible), actual size (100%)
- **Rotation**: Rotate individual pages 90° clockwise/counterclockwise
- **Presentation mode**: Fullscreen with single page display, arrow key advance

##### Annotations

- **Highlight**: Yellow (default) text highlight with color picker; drag over
  text to select and highlight
- **Underline**: Blue underline on selected text
- **Strikethrough**: Red strikethrough on selected text
- **Sticky notes**: Click to place note icon; popup textarea for content;
  color-coded by importance
- **Freehand drawing**: Pen tool with color and thickness selector; draw
  anywhere on page
- **Shapes**: Rectangle, circle, arrow, line — click-drag to place with resize
  handles
- **Annotation list**: Sidebar panel listing all annotations by page; click to
  navigate; delete per annotation
- **Annotation colors**: Palette of 8 colors for each annotation type
- **Comment thread**: Reply to annotations; mock collaboration with timestamps

##### Text & Image Editing

- **Text edit mode**: Click text block to enter edit mode; inline textarea
  replaces original text
- **Font controls**: Font size, bold, italic, color — applied to selected text
- **Image insertion**: Drag-and-drop or file picker; resize handles on corners;
  drag to reposition
- **Image controls**: Resize, rotate, opacity, delete
- **Text box**: Add new text box anywhere on page; configurable font and size

##### Page Management

- **Thumbnail sidebar**: Drag-and-drop reorder of page thumbnails
- **Delete pages**: Select pages → delete with confirmation
- **Rotate pages**: Per-page rotation (90° increments)
- **Extract pages**: Select page range → create new PDF from selection
- **Page labels**: Auto-numbering or custom labels per page
- **Duplicate page**: Clone a page within the document
- **Crop page**: Visual crop box with drag handles on page edges

##### Merge & Split

- **Merge PDFs**: Select multiple documents → preview → combine in order; drag
  to reorder
- **Split by range**: Enter page ranges (e.g., "1-5, 8, 12-15") to extract
- **Split by size**: Split into files of max size (mock: 1MB, 5MB, 10MB)
- **Split at bookmark**: Divide at bookmark/chapter boundaries (mock)
- **Preview before merge**: Show thumbnails of all pages in order

##### Forms & Signatures

- **Form field detection**: Auto-detect form fields (text inputs, checkboxes,
  dropdowns) in mock PDFs
- **Fill form**: Click field to type/select value; tab between fields
- **Form field types**: Text, checkbox, radio, dropdown, date, signature line
- **Digital signature**: Draw signature on canvas, type signature in font, or
  upload image
- **Signature placement**: Click signature line to place; resize to fit
- **Signature appearance**: Pen thickness, color, font selection for typed
- **Form export**: Save filled form as new PDF (mock)

##### Watermark & Stamps

- **Text watermark**: Custom text with font size, color, opacity, rotation;
  apply to all pages or range
- **Image watermark**: Company logo or custom image with opacity control
- **Stamp presets**: Approved, Rejected, Draft, Confidential, Final — each with
  distinct color and style
- **Custom stamp**: Create stamp from text with custom border and color
- **Stamp placement**: Click to place stamp; drag to reposition; resize handles
- **Watermark position**: Center, diagonal, top, bottom — configurable

##### Search & Navigation

- **Text search**: Ctrl+F opens search bar; highlights all matches across pages;
  prev/next navigation with match count
- **Bookmark navigation**: Sidebar list of PDF bookmarks/chapters; click to jump
- **Go to page**: Ctrl+G dialog to jump to specific page number
- **Outline/TOC**: Table of contents sidebar from PDF bookmarks

##### Export & Print

- **Print dialog**: Page range, copies, layout (portrait/landscape), scale,
  color/BW
- **Export as images**: Page-by-page PNG or JPEG download
- **Export annotations**: Download annotations as separate JSON file
- **Save a copy**: Save modified PDF (with annotations/edits) as new file
- **Flatten annotations**: Merge annotations into page content permanently

#### Technical Features

##### Data & Persistence

- **IndexedDB storage**: Documents, annotations, bookmarks, settings, form data
  stored in `pdf-db`
- **Seed on first load**: Demo PDFs with mock pages (5-20 pages each with text
  blocks, images, and pre-existing annotations)
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default 800ms) applied
  before every DB operation
- **Optimistic UI**: Annotations and edits apply immediately; persist in
  background
- **CRUD operations**: Full create/read/update/delete for documents and
  annotations

##### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle with visual theme picker; persisted
  to `data-theme` attribute and localStorage
- **Skeleton loading**: Page canvas skeleton during render
- **Toast notifications**: In-app toast system via `ToastProvider`; auto-dismiss
  with success/error/info variants
- **Responsive layout**: Sidebar + viewer on desktop; full-screen viewer with
  collapsible toolbar on mobile

##### PDF Rendering

- **Mock canvas rendering**: Text blocks, images, and shapes drawn on HTML
  canvas elements to simulate PDF pages
- **Text layer**: Invisible text layer overlay for selection and search
- **Image placeholders**: Colored rectangles with labels representing images
- **Page dimensions**: Standard A4/Letter dimensions scaled to viewport

##### Virtual Scrolling

- **Windowed rendering**: Only render visible pages ± 1 buffer page for
  performance
- **Page height cache**: Pre-calculated page heights for scroll position
  calculation
- **Infinite scroll**: Load pages lazily as user scrolls

##### Navigation & Routing

- **Route groups**: Pages organized into `(pdf)`, `(settings)` — URLs
  unaffected, code logically grouped
- **Dynamic routes**: `/pdf/[id]` for viewer, `/pdf/[id]/edit` for editor
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

- **Ctrl+/-**: Zoom in/out
- **Ctrl+0**: Reset zoom to 100%
- **Arrow keys**: Navigate pages
- **Home/End**: First/last page
- **Ctrl+F**: Search text
- **Ctrl+G**: Go to page
- **Ctrl+P**: Print
- **Ctrl+Z / Ctrl+Shift+Z**: Undo/redo annotation
- **Ctrl+S**: Save
- **Escape**: Deselect tool / close panel

##### Responsive Layout

- **Resizable panels**: Drag border between thumbnail sidebar and viewer
- **Collapse sidebar**: Toggle button to hide thumbnails
- **Mobile**: Full-screen viewer with slide-out thumbnail drawer
- **Breakpoints**: Sidebar collapses below `lg:` (1024px)

##### Page Transitions

- **`PageTransition` component**: Framer Motion wrapper with fade + slide-up
  variants (opacity 0→1, y 12→0, 200ms ease-out)

##### Offline Support

- **`OfflineBanner`**: Fixed top banner; listens to `online`/`offline` events
- **Cached documents**: All PDFs and annotations in IndexedDB; fully functional
  offline
- **PWA manifest**: Standalone display, portrait orientation

##### Accessibility

- **Focus-visible**: Global `focus-visible:outline-primary` on interactive
  elements
- **ARIA labels**: Page canvas, toolbar, annotations, thumbnails
- **Keyboard navigation**: Full viewer and annotation toolbar navigable via
  keyboard
- **Screen reader**: Page number and zoom level announced via aria

---

## Design

### UX for Mobile

#### Layout

- **Full-screen viewer** on mobile; toolbar collapsed into FAB menu
- **Thumbnail drawer**: Swipe from left edge to reveal page thumbnails
- **Zoom via pinch**: Native pinch-to-zoom gesture on page canvas
- **Annotation toolbar**: Bottom sheet on mobile with tool selection

#### Touch Targets

- Minimum `44px` tap target for all interactive elements
- **Annotation tools**: Large icons in bottom toolbar
- **Page navigation arrows**: Prominent left/right arrows for page turning

#### Forms

- **Page number input**: Numeric keyboard for page jump
- **Search bar**: Full-width with next/prev match buttons
- **Form fields**: Large tap targets on form fill fields

#### Navigation Patterns

- **Swipe left/right**: Navigate between pages
- **Swipe from left edge**: Open thumbnail sidebar
- **Pinch to zoom**: Native gesture on page canvas
- **Long press**: Context menu for page actions

#### Feedback

- **Toast notifications**: Annotation saved, export complete, error messages
- **Skeleton loading**: Page canvas skeleton during render
- **Zoom indicator**: Floating badge showing current zoom level

#### Lists & Scrolling

- **Thumbnail sidebar**: Scrollable list of page previews
- **Annotation list**: Scrollable panel with page indicators
- **Document grid**: Responsive grid of PDF thumbnails with info

#### Modals

- **Delete confirmation**: Before removing pages or annotations
- **Merge preview**: Before combining PDFs
- **Print dialog**: Full-screen on mobile with settings

#### Theming

- **Dark mode default** (`data-theme="night"`) for extended reading
- **Page rendering** always light (white background) for readability
- **Theme picker** on Settings page for UI chrome

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI

> Foundation: document list, PDF viewer, zoom, page navigation

- [ ] Document list with grid/list view
- [ ] PDF upload with drag-and-drop
- [ ] PDF viewer with page rendering
- [ ] Zoom controls (slider, presets, fit-to-width, fit-to-page)
- [ ] Page navigation (thumbnails, page number, arrows)
- [ ] Continuous scroll mode
- [ ] Page rotation
- [ ] Demo PDFs seed data
- [ ] Responsive layout

#### Phase 2 — Enhanced UX

> Polish: keyboard shortcuts, search, bookmarks, thumbnails

- [ ] Keyboard shortcuts (Ctrl+/-, arrows, Ctrl+F, Ctrl+G)
- [ ] Text search with match highlighting
- [ ] Bookmark/TOC sidebar
- [ ] Page fit modes (fit width, fit page, actual size)
- [ ] Presentation mode (fullscreen)
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states
- [ ] Document properties panel
- [ ] Recent documents section

#### Phase 3 — Annotations

> Markup: highlights, notes, shapes, drawing

- [ ] Text highlighting with color picker
- [ ] Underline and strikethrough
- [ ] Sticky notes with text content
- [ ] Freehand drawing with pen tool
- [ ] Shapes (rectangle, circle, arrow, line)
- [ ] Annotation list sidebar
- [ ] Annotation colors (8-color palette)
- [ ] Comment threads on annotations
- [ ] Undo/redo for annotations

#### Phase 4 — Editing

> Modification: text edit, images, watermarks

- [ ] Text editing mode (click to edit text blocks)
- [ ] Font controls (size, bold, italic, color)
- [ ] Image insertion with resize handles
- [ ] Image controls (rotate, opacity, delete)
- [ ] New text box creation
- [ ] Text watermark with configurable properties
- [ ] Image watermark with opacity
- [ ] Stamp presets (Approved, Rejected, Draft, Confidential)

#### Phase 5 — Page Management

> Structure: reorder, merge, split, extract

- [ ] Drag-and-drop page reorder via thumbnails
- [ ] Delete pages with confirmation
- [ ] Rotate individual pages
- [ ] Extract pages by range
- [ ] Duplicate page
- [ ] Merge multiple PDFs with drag-to-reorder
- [ ] Split by page range
- [ ] Crop page with visual crop box
- [ ] Page labels and numbering

#### Phase 6 — Forms & Signing

> Interactive: form fill, digital signatures

- [ ] Form field detection (text, checkbox, radio, dropdown)
- [ ] Form filling with tab navigation
- [ ] Signature drawing on canvas
- [ ] Typed signature with font selection
- [ ] Image signature upload
- [ ] Signature placement and resize
- [ ] Form export as new PDF
- [ ] Print dialog with full settings

#### Phase 7 — Platform & Integration

> Ecosystem: native, batch, OCR, cloud

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Batch processing (watermark/annotate multiple PDFs)
- [ ] OCR mock (extract text from scanned pages)
- [ ] Cloud storage integration (Google Drive, Dropbox mock)
- [ ] PDF/A compliance check (mock)
- [ ] Redaction tool (permanently black out sensitive text)
- [ ] Page comparison (side-by-side diff of two PDFs)
