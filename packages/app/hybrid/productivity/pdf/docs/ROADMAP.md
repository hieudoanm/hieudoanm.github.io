# Roadmap

## Phase 1 — Core UI

> Foundation: document list, PDF viewer, zoom, page navigation — **complete**

- [x] Document list with grid/list view
- [x] PDF upload with drag-and-drop
- [x] PDF viewer with page rendering
- [x] Zoom controls (slider, presets, fit-to-width, fit-to-page)
- [x] Page navigation (thumbnails, page number, arrows)
- [x] Continuous scroll mode
- [x] Page rotation
- [x] Demo PDFs seed data
- [x] Responsive layout

## Phase 2 — Enhanced UX

> Polish: keyboard shortcuts, search, bookmarks, thumbnails — **complete**

- [x] Keyboard shortcuts (Ctrl+/-, arrows, Ctrl+F, Ctrl+G)
- [x] Text search with match highlighting
- [x] Bookmark/TOC sidebar
- [x] Page fit modes (fit width, fit page, actual size)
- [x] Presentation mode (fullscreen)
- [x] Page transition animations (Motion)
- [x] Skeleton loading states
- [x] Document properties panel
- [x] Recent documents section

## Phase 3 — Annotations

> Markup: highlights, notes, shapes, drawing — **complete**

- [x] Text highlighting with color picker
- [x] Underline and strikethrough
- [x] Sticky notes with text content
- [x] Freehand drawing with pen tool
- [x] Shapes (rectangle, circle, arrow, line)
- [x] Annotation list sidebar
- [x] Annotation colors (8-color palette)
- [x] Comment threads on annotations
- [x] Undo/redo for annotations

## Phase 4 — Editing

> Modification: text edit, images, watermarks

- [x] Text editing mode (click to edit text blocks)
- [x] Font controls (size, bold, italic, color)
- [x] Image insertion with resize handles
- [x] Image controls (rotate, opacity, delete)
- [x] New text box creation
- [x] Text watermark with configurable properties
- [x] Image watermark with opacity
- [x] Stamp presets (Approved, Rejected, Draft, Confidential)

## Phase 5 — Page Management

> Structure: reorder, merge, split, extract — **complete**

- [x] Drag-and-drop page reorder via thumbnails
- [x] Delete pages with confirmation
- [x] Rotate individual pages
- [x] Extract pages by range
- [x] Duplicate page
- [x] Merge multiple PDFs with drag-to-reorder
- [x] Split by page range
- [x] Crop page with visual crop box
- [x] Page labels and numbering

## Phase 6 — Forms & Signing

> Interactive: form fill, digital signatures

- [x] Form field detection (text, checkbox, radio, dropdown)
- [x] Form filling with tab navigation
- [x] Signature drawing on canvas
- [x] Typed signature with font selection
- [x] Image signature upload
- [x] Signature placement and resize
- [x] Form export as new PDF
- [x] Print dialog with full settings

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
