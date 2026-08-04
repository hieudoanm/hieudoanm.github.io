# Roadmap

## Phase 1 — Core

> Foundation: connections, schema browser, query editor, results table

- [ ] Connection list with add/edit/delete
- [ ] Schema browser tree view
- [ ] SQL query editor with syntax highlighting
- [ ] Results table with sorting and pagination
- [ ] Execute query with loading state
- [ ] Mock database seed data (users, orders, products tables)
- [ ] Responsive layout (resizable panels)

## Phase 2 — Enhanced

> Polish: keyboard shortcuts, search, resizable panels

- [ ] Keyboard shortcuts (Ctrl+Enter, Ctrl+K, Ctrl+/)
- [ ] Schema search filter
- [ ] Resizable panel dividers
- [ ] Collapsible sidebar
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states
- [ ] SQL pretty-print / format
- [ ] Results export (CSV, JSON)

## Phase 3 — Data Management

> CRUD: table designer, data viewer, inline editing

- [ ] Table designer (add/remove columns, types, constraints)
- [ ] Live CREATE TABLE preview
- [ ] Data viewer with browse/paginate
- [ ] Inline cell editing
- [ ] Add/delete rows
- [ ] Column-level filtering
- [ ] Copy row as SQL INSERT / JSON
- [ ] Foreign key editor

## Phase 4 — Advanced Queries

> Power: history, bookmarks, auto-complete, explain

- [ ] Query history with re-run
- [ ] Query bookmarks with folders
- [ ] SQL keyword auto-complete
- [ ] Explain query plan (mock output)
- [ ] Multiple result tabs (run multiple queries)
- [ ] Query execution time tracking
- [ ] Error highlighting with line numbers
- [ ] Selected-text execution

## Phase 5 — Import / Export

> Data: CSV wizard, SQL dump, JSON

- [ ] Export database as SQL dump
- [ ] Export table as CSV / JSON / SQL INSERT
- [ ] Import CSV wizard (file select, column mapping, preview, execute)
- [ ] Import JSON (paste/array, map to table, execute)
- [ ] Batch import with progress indicator
- [ ] Import validation and error reporting

## Phase 6 — Visualization

> Insights: ER diagrams, stats, charts

- [ ] ER diagram with tables and relationships
- [ ] Zoom/pan on ER diagram
- [ ] Highlight related tables on hover
- [ ] Database statistics (table sizes, row counts)
- [ ] Storage breakdown chart
- [ ] Index usage statistics (mock)
- [ ] Export ER diagram as PNG/SVG

## Phase 7 — Platform & Integration

> Ecosystem: native, multiple DB, collaboration

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Multiple database support (mock PostgreSQL, MySQL)
- [ ] Connection SSH tunnel (mock)
- [ ] Query sharing (mock: generate shareable link)
- [ ] Scheduled query execution (mock: cron-like)
- [ ] Database monitoring dashboard (mock: live connections, queries/sec)
- [ ] Data masking / privacy mode
