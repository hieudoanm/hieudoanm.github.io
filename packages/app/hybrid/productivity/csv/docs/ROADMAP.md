# Roadmap

## Phase 1 — Core Editor

> Foundation: grid, editing, file operations

- [x] Sticky-header spreadsheet grid (column letters + row numbers)
- [x] Click / double-click / keyboard cell editing
- [x] Keyboard navigation (arrows, Tab, Enter, F2, Delete)
- [x] Add / delete rows and columns
- [x] Undo / redo history
- [x] Import CSV from file
- [x] TSV import + CSV/TSV auto-detection
- [x] Export CSV download
- [x] localStorage persistence
- [x] Legacy `csv-editor:grid` → `csv-editor:workbook` data migration
- [x] Status bar (active cell + grid size)

## Phase 2 — Sheets & Layout

> Structure: multiple sheets, resizing, quality of life

- [x] Multiple sheets per file (`.xlsx`-style tabs) — add / remove / rename / switch
- [x] Column width / row height resizing
- [x] Freeze panes (rows / columns / both)
- [x] Cell comments (hover indicator + popover)
- [x] Keyboard shortcuts panel (Ctrl+K)
- [x] Dark / light theme toggle (persisted)
- [x] Range label in status bar (e.g. `A1:B2`)

## Phase 3 — Cells & Data

> Power: formulas, data types, bulk editing

- [x] Cell ranges and multi-cell selection (drag + Shift+arrows)
- [x] Copy / paste between cells (clipboard, TSV-delimited)
- [x] Formula support (`=SUM(A1:B2)`, `=AVG`, `=COUNT`, ...) with ranges,
      cell references, arithmetic, `MIN`/`MAX`, cycle detection
- [x] Number formatting and alignment
- [x] Auto-fill drag handle (numeric series, copy, tiling)
- [x] Find & replace across the grid (Ctrl+F, match highlighting)
- [x] Sort and filter rows (A→Z / Z→A, per-column filter bar)

## Phase 4 — Export & Sharing

> Sharing: more formats, printing

- [x] Export as `.csv`, `.tsv`, `.json`, `.html`, `.xml`, `.xlsx`
- [ ] Print-friendly grid view — basic `window.print()` + print CSS exists; dedicated layout/pagination pending
- [ ] Chart generation from selected cells

## Phase 5 — Platform & Integration

> Ecosystem: native apps, plugins, collaboration

- [ ] Tauri desktop app build and signing — scaffold exists (`src-tauri/`), packaging/signing/updater not yet configured
- [ ] iOS/Android native shells (Tauri Mobile)
- [x] PWA / offline support (service worker + manifest)
- [ ] Plugin system (community extensions)
- [ ] Real-time collaboration
- [ ] AI-assisted data cleaning
