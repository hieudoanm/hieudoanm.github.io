# Database — SQLite Manager

## Table of Contents

- [Database — SQLite Manager](#database--sqlite-manager)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Business Features](#business-features)
        - [Connection Management](#connection-management)
        - [Schema Browser](#schema-browser)
        - [Query Editor](#query-editor)
        - [Results Table](#results-table)
        - [Table Designer](#table-designer)
        - [Data Viewer](#data-viewer)
        - [SQL History \& Bookmarks](#sql-history--bookmarks)
        - [Schema Visualization](#schema-visualization)
        - [Database Statistics](#database-statistics)
        - [Import / Export](#import--export)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [SQL Syntax Highlighting](#sql-syntax-highlighting)
        - [Virtual Table](#virtual-table)
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
      - [Phase 3 — Data Management](#phase-3--data-management)
      - [Phase 4 — Advanced Queries](#phase-4--advanced-queries)
      - [Phase 5 — Import / Export](#phase-5--import--export)
      - [Phase 6 — Visualization](#phase-6--visualization)
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

| #   | Route                   | Page          | Key Features                                                |
| --- | ----------------------- | ------------- | ----------------------------------------------------------- |
| 1   | `/`                     | Connections   | Database connection list, add/edit/delete, test connection  |
| 2   | `/db/[id]`              | Database View | Schema tree, query editor, results table (resizable panels) |
| 3   | `/db/[id]/tables`       | Tables        | Table list with row counts, sizes, and quick actions        |
| 4   | `/db/[id]/table/[name]` | Table Detail  | Columns, indexes, data preview, SQL create statement        |
| 5   | `/db/[id]/query`        | Query Editor  | Full SQL editor with execute, history, bookmarks            |
| 6   | `/db/[id]/erd`          | ER Diagram    | Schema visualization with tables and relationships          |
| 7   | `/settings`             | Settings      | Theme, default port, editor font size, query timeout        |
| 8   | `/profile`              | Profile       | User info                                                   |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages
  components/
    atoms/            # ConnectionCard, ColumnBadge, DataTypeTag
    molecules/        # QueryEditor, ResultsTable, SchemaTree, TableDesigner
    organisms/        # Sidebar, ERDiagram, ConnectionForm, DataGrid
    templates/        # DatabaseTemplate, SettingsTemplate
    RouteGuard.tsx    # Auth route protection
  data/               # Mock databases, schemas, sample data
  hooks/              # useQuery, useSchema, useVirtualTable
  lib/                # IndexedDB wrapper (db.ts), SQL parser mock
  providers/          # DataProvider, Providers, ToastProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces
  utils/              # formatSQL, exportCSV, exportJSON
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

##### Connection Management

- **Connection list**: Cards showing database name, file path, size, last
  connected; sorted by most recent
- **Add connection**: Modal form — name, file path (mock), read-only toggle
- **Edit connection**: Inline edit or modal with pre-filled fields
- **Delete connection**: Confirmation modal; does not delete actual database file
- **Test connection**: "Test" button on add/edit form; shows success/failure with
  latency; mock always succeeds
- **Recent connections**: Quick-access list at top, persisted in localStorage

##### Schema Browser

- **Tree view**: Hierarchical — Database → Tables / Views / Indexes / Triggers;
  expand/collapse per node
- **Table node**: Expand to show columns with data types, nullable, primary key
  icon
- **Column details**: Type, default value, constraints (PK, NOT NULL, UNIQUE,
  FK)
- **Context menu**: Right-click on table → View Data, Design, Drop, Copy Name
- **Search**: Filter schema objects by name across all types
- **Refresh**: Reload schema from mock database

##### Query Editor

- **SQL editor**: Syntax-highlighted textarea with line numbers; multi-line
  support
- **Execute**: Ctrl+Enter or button to run query; loading spinner during
  execution
- **Result display**: Table below editor showing query results
- **Error display**: Styled error card with line number and message on invalid
  SQL
- **Multiple queries**: Execute selected text only if selection exists; otherwise
  entire content
- **Prettify SQL**: Auto-format query with consistent indentation
- **Query templates**: Pre-built queries (SELECT \* FROM, SHOW TABLES, DESCRIBE)
  in dropdown

##### Results Table

- **Sortable columns**: Click column header to sort ASC/DESC; indicator arrow
- **Pagination**: Page size selector (25, 50, 100, All); page navigation
- **Row count**: "Showing X of Y rows" status bar below table
- **Export CSV**: Download result set as `.csv` file
- **Export JSON**: Download result set as `.json` file
- **Copy cell**: Click cell to copy value; toast confirmation
- **NULL display**: Gray italic "NULL" for null values
- **Truncated text**: Long text shows first 50 chars with "..." tooltip for
  full value
- **Virtual scrolling**: Windowed rendering for result sets > 1000 rows

##### Table Designer

- **Column editor**: Add/remove columns; drag to reorder
- **Column properties**: Name, type (INTEGER, TEXT, REAL, BLOB, NULL), default,
  NOT NULL, UNIQUE, PRIMARY KEY
- **Add primary key**: Toggle PK on column; auto-sets NOT NULL
- **Foreign key editor**: Add FK references with ON DELETE / ON UPDATE actions
- **Index editor**: Create/edit indexes; select columns; unique toggle
- **Preview SQL**: Live `CREATE TABLE` statement preview as you design
- **Apply changes**: Executes DDL (mock); shows resulting table structure

##### Data Viewer

- **Browse data**: Paginated table showing all rows in selected table
- **Inline edit**: Double-click cell to edit value; Enter to confirm, Escape
  to cancel
- **Add row**: "Insert Row" button; opens form with column names as fields
- **Delete row**: Select row → Delete button with confirmation
- **Filter**: Column-level filter inputs (equals, contains, greater than, etc.)
- **Sort**: Click column header to sort; multi-column sort with priority
- **Copy row**: Right-click → Copy as SQL INSERT, JSON, or CSV

##### SQL History & Bookmarks

- **History list**: Chronological list of executed queries with timestamp,
  execution time, row count
- **Re-run**: Click history item to load into editor
- **Search history**: Filter by SQL content, date range, or success/failure
- **Bookmark queries**: Star icon to save query with custom name
- **Organize bookmarks**: Folder tree for bookmarks (Analytics, Admin,
  Maintenance, etc.)
- **Delete history**: Clear all or selective deletion

##### Schema Visualization

- **ER diagram**: Visual representation of tables with boxes showing columns
- **Relationships**: Lines connecting foreign keys to referenced tables with
  cardinality markers (1:N, N:M)
- **Zoom/pan**: Mouse wheel zoom, drag to pan; fit-to-screen button
- **Table boxes**: Show table name, columns with PK/FK icons, color-coded by
  schema
- **Highlight**: Hover table to highlight related tables and relationships
- **Export diagram**: Download as PNG or SVG

##### Database Statistics

- **Overview cards**: Total tables, total rows, database size, index count
- **Table stats**: Per-table row count, avg row size, data size, index size
- **Index usage**: Hit/miss ratio per index (mock data)
- **Slow queries**: Mock list of slow queries with execution time
- **Storage breakdown**: Pie chart of table sizes

##### Import / Export

- **Export database**: Download entire database as SQL dump (CREATE + INSERT)
- **Import CSV**: Wizard — select file, preview data, map columns to table,
  validate types, execute insert
- **Import JSON**: Paste JSON array, map to target table, preview insert
- **Export table**: Individual table as CSV, JSON, or SQL INSERT statements

#### Technical Features

##### Data & Persistence

- **IndexedDB storage**: Connections, query history, bookmarks, settings,
  mock database schemas stored in `database-db`
- **Seed on first load**: Demo databases with pre-populated tables (users,
  orders, products) and sample data
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default 800ms) applied
  before every query execution
- **Optimistic UI**: Schema changes apply immediately in UI; persist in
  background
- **CRUD operations**: Full create/read/update/delete for connections, bookmarks

##### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle with visual theme picker; persisted
  to `data-theme` attribute and localStorage
- **Skeleton loading**: Schema tree and results table skeletons during load
- **Toast notifications**: In-app toast system via `ToastProvider`; auto-dismiss
  with success/error/info variants
- **Resizable panels**: Draggable dividers between sidebar, editor, and results;
  persisted proportions

##### SQL Syntax Highlighting

- **Prism.js SQL grammar**: Keywords (SELECT, FROM, WHERE, JOIN, etc.) in
  primary color; strings in green; numbers in orange; comments in gray
- **Keyword auto-complete**: Type-first matching for SQL keywords in editor
- **Function highlighting**: Aggregate functions (COUNT, SUM, AVG) highlighted

##### Virtual Table

- **Windowed rendering**: Only render visible rows in results table; supports
  10,000+ rows without lag
- **Fixed header**: Column headers stay visible while scrolling
- **Row height**: Fixed 36px per row for consistent calculations

##### Navigation & Routing

- **Route groups**: Pages organized into `(database)`, `(settings)` — URLs
  unaffected, code logically grouped
- **Dynamic routes**: `/db/[id]` for database views, `/db/[id]/table/[name]`
  for table detail
- **Back navigation**: Consistent `FiArrowLeft` + `btn-neutral btn-sm btn-circle`

##### Code Quality

- **Arrow functions**: All function declarations and component exports use arrow
  syntax; test files excluded
- **Debug logging**: `console.*` with `[Module]` prefix throughout source;
  stripped from production via `compiler.removeConsole`
- **Testing**: Jest (unit) + Playwright (E2E) framework ready
- **Atomic design**: atoms → molecules → organisms → templates hierarchy

##### Keyboard Shortcuts

- **Ctrl+Enter**: Execute query
- **Ctrl+S**: Save query to bookmarks
- **Ctrl+K**: Focus search in schema browser
- **Ctrl+/**: Show keyboard shortcuts modal
- **Ctrl+Shift+E**: Prettify/format SQL
- **Ctrl+L**: Clear query editor
- **F5**: Refresh schema

##### Responsive Layout

- **Resizable panels**: Drag borders between sidebar, editor, and results
- **Collapse sidebar**: Toggle button to hide schema browser
- **Mobile**: Tabbed interface — Schema | Query | Results tabs instead of
  split panels
- **Breakpoints**: Sidebar collapses below `lg:` (1024px)

##### Page Transitions

- **`PageTransition` component**: Framer Motion wrapper with fade + slide-up
  variants (opacity 0→1, y 12→0, 200ms ease-out)

##### Offline Support

- **`OfflineBanner`**: Fixed top banner; listens to `online`/`offline` events
- **Mock databases**: All data in IndexedDB; fully functional offline
- **PWA manifest**: Standalone display, portrait orientation

##### Accessibility

- **Focus-visible**: Global `focus-visible:outline-primary` on interactive
  elements
- **ARIA labels**: Schema tree, results table, query editor, connection cards
- **Keyboard navigation**: Full schema tree and results table navigable via
  keyboard
- **Screen reader**: Query results announced via `aria-live="polite"`

---

## Design

### UX for Mobile

#### Layout

- **Tabbed interface** on mobile: Schema | Query | Results tabs replace split
  panels
- **Connection list** as full-screen cards on mobile
- **Header** with database name, connection status indicator, and action menu

#### Touch Targets

- Minimum `44px` tap target for all interactive elements
- **Schema tree items**: Full-width touch targets with expand/collapse arrows
- **Results table cells**: Tap to copy, double-tap to edit

#### Forms

- **Connection form**: Full-width inputs with clear labels
- **Query editor**: Full-screen textarea with fixed execute button at bottom
- **Table designer**: Scrollable form with add/remove column buttons

#### Navigation Patterns

- **Tab switching**: Bottom tabs for Schema/Query/Results on mobile
- **Back button**: `FiArrowLeft` on sub-pages
- **Swipe between tabs**: Horizontal swipe to switch panels

#### Feedback

- **Toast notifications**: Query executed, connection saved, error messages
- **Skeleton loading**: Results table skeleton during query execution
- **Execution time**: Displayed below results ("Query executed in 42ms")

#### Lists & Scrolling

- **Results table**: Virtual scrolling for large datasets
- **Schema tree**: Scrollable with sticky section headers
- **History list**: Chronological with pull-to-refresh

#### Modals

- **Connection form modal**: Add/edit database connection
- **Delete confirmation**: Before dropping tables or deleting connections
- **Import wizard modal**: Step-by-step CSV/JSON import

#### Theming

- **Dark mode default** (`data-theme="night"`) for data-heavy work
- **Theme picker** on Settings page with visual preview
- **Syntax highlighting** colors adapted to theme

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI

> Foundation: connections, schema browser, query editor, results table

- [ ] Connection list with add/edit/delete
- [ ] Schema browser tree view
- [ ] SQL query editor with syntax highlighting
- [ ] Results table with sorting and pagination
- [ ] Execute query with loading state
- [ ] Mock database seed data (users, orders, products tables)
- [ ] Responsive layout (resizable panels)

#### Phase 2 — Enhanced UX

> Polish: keyboard shortcuts, search, resizable panels

- [ ] Keyboard shortcuts (Ctrl+Enter, Ctrl+K, Ctrl+/)
- [ ] Schema search filter
- [ ] Resizable panel dividers
- [ ] Collapsible sidebar
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states
- [ ] SQL pretty-print / format
- [ ] Results export (CSV, JSON)

#### Phase 3 — Data Management

> CRUD: table designer, data viewer, inline editing

- [ ] Table designer (add/remove columns, types, constraints)
- [ ] Live CREATE TABLE preview
- [ ] Data viewer with browse/paginate
- [ ] Inline cell editing
- [ ] Add/delete rows
- [ ] Column-level filtering
- [ ] Copy row as SQL INSERT / JSON
- [ ] Foreign key editor

#### Phase 4 — Advanced Queries

> Power: history, bookmarks, auto-complete, explain

- [ ] Query history with re-run
- [ ] Query bookmarks with folders
- [ ] SQL keyword auto-complete
- [ ] Explain query plan (mock output)
- [ ] Multiple result tabs (run multiple queries)
- [ ] Query execution time tracking
- [ ] Error highlighting with line numbers
- [ ] Selected-text execution

#### Phase 5 — Import / Export

> Data: CSV wizard, SQL dump, JSON

- [ ] Export database as SQL dump
- [ ] Export table as CSV / JSON / SQL INSERT
- [ ] Import CSV wizard (file select, column mapping, preview, execute)
- [ ] Import JSON (paste/array, map to table, execute)
- [ ] Batch import with progress indicator
- [ ] Import validation and error reporting

#### Phase 6 — Visualization

> Insights: ER diagrams, stats, charts

- [ ] ER diagram with tables and relationships
- [ ] Zoom/pan on ER diagram
- [ ] Highlight related tables on hover
- [ ] Database statistics (table sizes, row counts)
- [ ] Storage breakdown chart
- [ ] Index usage statistics (mock)
- [ ] Export ER diagram as PNG/SVG

#### Phase 7 — Platform & Integration

> Ecosystem: native, multiple DB, collaboration

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Multiple database support (mock PostgreSQL, MySQL)
- [ ] Connection SSH tunnel (mock)
- [ ] Query sharing (mock: generate shareable link)
- [ ] Scheduled query execution (mock: cron-like)
- [ ] Database monitoring dashboard (mock: live connections, queries/sec)
- [ ] Data masking / privacy mode
