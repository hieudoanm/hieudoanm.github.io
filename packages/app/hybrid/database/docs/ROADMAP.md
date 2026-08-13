# Roadmap

## Phase 1 — Core

> Foundation: connections, schema browser, query editor, results table

- [x] Connection list with add/delete
- [x] Edit existing connection
- [x] Schema browser tree view
- [x] SQL query editor with syntax highlighting
- [x] Results table with sorting and pagination
- [x] Execute query with loading state
- [x] Mock database seed data (customers, orders, products tables)
- [x] Responsive layout (collapsible sidebar)

## Phase 2 — Enhanced

> Polish: keyboard shortcuts, search, resizable panels

- [x] Keyboard shortcuts (Ctrl+Enter execute, Ctrl+Shift+Enter format, Ctrl+/
      toggle comment, Ctrl+K focus schema search)
- [x] Schema search filter (table filter in sidebar, Ctrl+K to focus)
- [x] Resizable panel dividers (sidebar drag handle, 160–480px)
- [x] Collapsible sidebar
- [x] Page transition animations (CSS keyframes via `app/template.tsx`)
- [x] Skeleton loading states
- [x] SQL pretty-print / format (`utils/sqlFormat.ts`: clauses, parens, function
      calls, subqueries, joins)
- [x] Results export (CSV, JSON, Markdown, SQL INSERT)

## Phase 3 — Data Management

> CRUD: table designer, data viewer, inline editing

- [x] Table designer (`TableDesignerModal`: add/remove columns, types, PK / NOT
      NULL / UNIQUE / DEFAULT, header buttons New/Edit table)
- [x] Live CREATE TABLE preview (designer modal, updates as you type)
- [x] Data viewer with browse/paginate
- [x] Inline cell editing (double-click to edit, Enter/blur commits, Esc
      cancels, empty → NULL; `updateCell` with rowid fallback)
- [x] Add/delete rows (Row button + row-menu Delete; `addRow`/`deleteRow` with
      rowid fallback)
- [x] Column-level filtering (per-column filter inputs, combined with global
      filter)
- [x] Copy row as SQL INSERT / JSON (per-row menu)
- [x] Foreign key editor (per-column FK table/column selects in the designer;
      REFERENCES rendered in CREATE TABLE; editing existing columns via
      add/remove)

## Phase 4 — Advanced Queries

> Power: history, bookmarks, auto-complete, explain

- [x] Query history with re-run (IndexedDB persistence; history panel with
      re-run button)
- [x] Query bookmarks with folders (bookmark button persists queries; folder
      select + bookmark panel)
- [x] SQL keyword auto-complete (Ctrl+Space; keywords + tables + columns in
      `utils/autocomplete.ts`)
- [x] Explain query plan (real `EXPLAIN QUERY PLAN` via sql.js, opened in a
      dedicated tab)
- [x] Multiple result tabs (each query/explain opens a tab; close + activate)
- [x] Query execution time tracking (sql.js path; elapsed ms shown in status
      footer)
- [x] Error highlighting with line numbers (gutter marks the failing line red)
- [x] Selected-text execution (Ctrl+Enter runs the selection when present)

## Phase 5 — Import / Export

> Data: CSV wizard, SQL dump, JSON

- [x] Export database as SQL dump (`dumpSql` → `downloadText`, toolbar "Export
      SQL")
- [x] Export table as CSV / JSON / SQL INSERT
- [x] Import CSV wizard (file select, delimiter, column mapping, preview,
      execute)
- [x] Import JSON (paste/array, map to table, execute)
- [x] Batch import with progress indicator (`importRowsAsync`, 500-row chunks)
- [x] Import validation and error reporting (`validateImport`, per-row warnings)

## Phase 6 — Visualization

> Insights: ER diagrams, stats, charts

- [x] Schema Library (`/posts`: 10 classic schemas with hand-written markdown
      renderer and mermaid `erDiagram` → SVG via `utils/mermaid.ts` +
      `utils/markdown.ts`)
- [x] ER diagram with tables and relationships (live, from the open database;
      `ErDiagramView` built from `utils/er.ts`, opened via the Visualize button
      → `VisualizationModal`)
- [x] Zoom/pan on ER diagram (scroll to zoom at cursor, drag to pan, fit / zoom
      in/out controls)
- [x] Highlight related tables on hover (CSS-driven via `data-hover` + generated
      rules, FK-linked tables stay bright)
- [x] Database statistics (table sizes, row counts; `StatsView` +
      `utils/stats.ts`)
- [x] Storage breakdown chart (per-table size share stacked bar + list)
- [x] Index usage statistics (mock; `computeMockIndexUsage`)
- [x] Export ER diagram as PNG/SVG (toolbar buttons in `ErDiagramView`)

## Phase 7 — Platform & Integration

> Ecosystem: native, multiple DB, collaboration

- [x] Tauri desktop app build (bundling configured; signing/updater not yet
      configured)
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Multiple database support (mock PostgreSQL, MySQL)
- [ ] Connection SSH tunnel (mock)
- [ ] Query sharing (mock: generate shareable link)
- [ ] Scheduled query execution (mock: cron-like)
- [ ] Database monitoring dashboard (mock: live connections, queries/sec)
- [ ] Data masking / privacy mode
