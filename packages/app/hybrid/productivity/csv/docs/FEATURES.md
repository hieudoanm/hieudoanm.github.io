# Features

> CSV — minimal Excel / Google Sheets.

## Grid

- Sticky-header spreadsheet grid (column letters + row numbers)
- Click / double-click / keyboard cell editing
- Keyboard navigation (arrows, Tab, Enter, F2, Delete)
- Add / delete rows and columns
- Multiple sheets per file (`.xlsx`-style tabs) — add / remove / rename / switch
- Column width / row height resizing
- Freeze panes (rows / columns / both)
- Cell comments (hover indicator + popover)
- Range label in status bar (e.g. `A1:B2`)
- Cell ranges and multi-cell selection (drag + Shift+arrows)
- Copy / paste between cells (clipboard, TSV-delimited)

## Data & Formulas

- Formula support (`=SUM(A1:B2)`, `=AVG`, `=COUNT`, ...) with ranges
- Number formatting and alignment
- Auto-fill drag handle (numeric series, copy, tiling)
- Find & replace across the grid (Ctrl+F, match highlighting)
- Sort and filter rows (A→Z / Z→A, per-column filter bar)
- Status bar (active cell + grid size)

## Import / Export

- Import CSV from file
- TSV import + CSV/TSV auto-detection
- Export CSV download
- Export as `.csv`, `.tsv`, `.json`, `.html`, `.xml`, `.xlsx`

## Persistence & UX

- localStorage persistence
- Legacy `csv-editor:grid` → `csv-editor:workbook` data migration
- Undo / redo history
- Keyboard shortcuts panel (Ctrl+K)
- Dark / light theme toggle (persisted)
- PWA / offline support (service worker + manifest)

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
