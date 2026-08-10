# Roadmap

## Phase 1 — Core Editor

> Foundation: grid, editing, file operations

- [x] Sticky-header spreadsheet grid (column letters + row numbers)
- [x] Click / double-click / keyboard cell editing
- [x] Keyboard navigation (arrows, Tab, Enter, F2, Delete)
- [x] Add / delete rows and columns
- [x] Undo / redo history
- [x] Import CSV from file
- [x] Export CSV download
- [x] localStorage persistence
- [x] Status bar (active cell + grid size)

## Phase 2 — Sheets & Layout

> Structure: multiple sheets, resizing, quality of life

- [x] Multiple sheets per file (`.xlsx`-style tabs) — add / remove / rename / switch
- [x] Column width / row height resizing
- [x] Freeze panes (rows / columns / both)
- [x] Cell comments (hover indicator + popover)
- [x] Keyboard shortcuts panel (Ctrl+K)
- [x] Dark / light theme toggle

## Phase 3 — Cells & Data

> Power: formulas, data types, bulk editing

- [x] Cell ranges and multi-cell selection (drag + Shift+arrows)
- [x] Copy / paste between cells (clipboard, TSV-delimited)
- [ ] Formula support (`=SUM(A1:B2)`, `=AVG`, `=COUNT`, ...)
- [ ] Number formatting and alignment
- [ ] Auto-fill drag handle
- [x] Find & replace across the grid (Ctrl+F, match highlighting)
- [x] Sort and filter rows (A→Z / Z→A, per-column filter bar)

## Phase 4 — Export & Sharing

> Sharing: more formats, printing

- [x] Export as `.csv`, `.tsv`, `.json`, `.html`, `.xml`, `.xlsx`
- [ ] Print-friendly grid view — basic `window.print()` + print CSS exists; dedicated layout/pagination pending
- [ ] Chart generation from selected cells
- [ ] Cloud sync (mock) and version history

## Phase 5 — Platform & Integration

> Ecosystem: native apps, plugins, collaboration

- [ ] Tauri desktop app build and signing — scaffold exists (`src-tauri/`), packaging/signing/updater not yet configured
- [ ] iOS/Android native shells (Tauri Mobile)
- [ ] Plugin system (community extensions)
- [ ] Real-time collaboration (mock)
- [ ] AI-assisted data cleaning (mock)

## Beyond the roadmap

Implemented features not captured above:

- TSV import + CSV/TSV auto-detection on file import and clipboard paste
- PWA / offline support (service worker + manifest)
- Theme persistence (localStorage)
- Legacy `csv-editor:grid` → `csv-editor:workbook` data migration
- Range label in status bar (e.g. `A1:B2`)
