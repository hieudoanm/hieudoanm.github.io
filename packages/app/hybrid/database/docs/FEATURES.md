# Features

> Database — minimal pgAdmin / DBeaver for SQLite only (sql.js).

## Connections & Schema

- Connection list with add/delete
- Edit existing connection
- Schema browser tree view
- Schema search filter (table filter in sidebar, Ctrl+K to focus)
- Mock database seed data (customers, orders, products tables)

## Query Editor

- SQL query editor with syntax highlighting
- Execute query with loading state
- Keyboard shortcuts (Ctrl+Enter execute, Ctrl+Shift+Enter format, Ctrl+/
  comment)
- SQL pretty-print / format (clauses, parens, function calls)
- SQL keyword auto-complete (Ctrl+Space; keywords + tables + columns)
- Query history with re-run (IndexedDB persistence)
- Query bookmarks with folders
- Selected-text execution (Ctrl+Enter runs the selection when present)
- Error highlighting with line numbers (gutter marks the failing line red)
- Query execution time tracking (sql.js path, elapsed ms in status bar)
- Explain query plan (real `EXPLAIN QUERY PLAN` via sql.js)

## Results

- Results table with sorting and pagination
- Results export (CSV, JSON, Markdown, SQL INSERT)
- Data viewer with browse/paginate
- Inline cell editing (double-click to edit, Enter/blur commits, Esc cancels)
- Add/delete rows
- Column-level filtering (per-column filter inputs, combined with global search)
- Copy row as SQL INSERT / JSON (per-row menu)
- Multiple result tabs (each query/explain opens a tab)

## Table Designer

- Table designer (add/remove columns, types, PK / NOT NULL constraints)
- Live CREATE TABLE preview (updates as you type)
- Foreign key editor (per-column FK table/column selects)
- Export database as SQL dump
- Export table as CSV / JSON / SQL INSERT

## Import

- Import CSV wizard (file select, delimiter, column mapping, preview)
- Import JSON (paste/array, map to table, execute)
- Batch import with progress indicator (500-row chunks)
- Import validation and error reporting (per-row warnings)

## Schema Intelligence

- Schema Library (`/posts`: 10 classic schemas with hand-written markdown)
- ER diagram with tables and relationships (live, from the open database)
- Zoom/pan on ER diagram (scroll to zoom at cursor, drag to pan, fit / zoom
  buttons)
- Highlight related tables on hover
- Database statistics (table sizes, row counts)
- Storage breakdown chart (per-table size share stacked bar + list)
- Index usage statistics (mock)
- Export ER diagram as PNG/SVG

## UX & Platform

- Responsive layout (collapsible sidebar)
- Resizable panel dividers (sidebar drag handle, 160–480px)
- Collapsible sidebar
- Page transition animations (CSS keyframes via `app/template.tsx`)
- Skeleton loading states
- Tauri desktop app build (bundling configured; signing/updater not yet)

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
