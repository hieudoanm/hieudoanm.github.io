# Roadmap

## Phase 1 — Core UI

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

## Phase 2 — Enhanced UX

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

## Phase 3 — Annotations

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

## Phase 4 — Editing

> Modification: text edit, images, watermarks

- [ ] Text editing mode (click to edit text blocks)
- [ ] Font controls (size, bold, italic, color)
- [ ] Image insertion with resize handles
- [ ] Image controls (rotate, opacity, delete)
- [ ] New text box creation
- [ ] Text watermark with configurable properties
- [ ] Image watermark with opacity
- [ ] Stamp presets (Approved, Rejected, Draft, Confidential)

## Phase 5 — Page Management

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

## Phase 6 — Forms & Signing

> Interactive: form fill, digital signatures

- [ ] Form field detection (text, checkbox, radio, dropdown)
- [ ] Form filling with tab navigation
- [ ] Signature drawing on canvas
- [ ] Typed signature with font selection
- [ ] Image signature upload
- [ ] Signature placement and resize
- [ ] Form export as new PDF
- [ ] Print dialog with full settings

## Phase 7 — Platform & Integration

> Ecosystem: native, batch, OCR, cloud

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Batch processing (watermark/annotate multiple PDFs)
- [ ] OCR mock (extract text from scanned pages)
- [ ] Cloud storage integration (Google Drive, Dropbox mock)
- [ ] PDF/A compliance check (mock)
- [ ] Redaction tool (permanently black out sensitive text)
- [ ] Page comparison (side-by-side diff of two PDFs)
