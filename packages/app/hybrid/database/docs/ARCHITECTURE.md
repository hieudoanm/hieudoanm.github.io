# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Mock SQLite manager with schema browsing and query execution
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) |
| Language    | TypeScript 6 (strict)              |
| Styling     | Tailwind CSS 4 + DaisyUI 5         |
| Icons       | react-icons (Fi set)               |
| Desktop     | Tauri 2                            |
| Testing     | Jest + Playwright                  |
| Linting     | ESLint 10 + Prettier               |
| Package Mgr | pnpm                               |

## Directory Structure

```txt
src/
├── app/              # App Router pages and layouts
├── components/       # Atomic design components
│   ├── atoms/        # ConnectionCard, ColumnBadge, DataTypeTag
│   ├── molecules/    # QueryEditor, ResultsTable, SchemaTree, TableDesigner
│   ├── organisms/    # Sidebar, ERDiagram, ConnectionForm, DataGrid
│   ├── templates/    # DatabaseTemplate, SettingsTemplate
│   └── RouteGuard.tsx
├── data/             # Mock databases, schemas, sample data
├── hooks/            # useQuery, useSchema, useVirtualTable
├── lib/              # IndexedDB wrapper (db.ts), SQL parser mock
├── providers/        # DataProvider, Providers, ToastProvider
├── styles/           # Global CSS (Tailwind base layer)
├── types/            # TypeScript interfaces
└── utils/            # formatSQL, exportCSV, exportJSON
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Sidebar, ERDiagram, ConnectionForm
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  QueryEditor, ResultsTable, SchemaTree
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  ConnectionCard, ColumnBadge, DataTypeTag
├─────────────────────────────────────────┤
│  Lib (lib/)                             │  IndexedDB wrapper, SQL parser mock
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  DataProvider, ToastProvider
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

Dynamic routes for database views; flat routes for settings.

| Route                   | Page                            | Client | Description                        |
| ----------------------- | ------------------------------- | ------ | ---------------------------------- |
| `/`                     | `page.tsx`                      | Yes    | Connection list, add/edit/delete   |
| `/db/[id]`              | `db/[id]/page.tsx`              | Yes    | Schema tree, query editor, results |
| `/db/[id]/tables`       | `db/[id]/tables/page.tsx`       | Yes    | Table list with row counts         |
| `/db/[id]/table/[name]` | `db/[id]/table/[name]/page.tsx` | Yes    | Table detail, columns, indexes     |
| `/db/[id]/query`        | `db/[id]/query/page.tsx`        | Yes    | SQL editor, history, bookmarks     |
| `/db/[id]/erd`          | `db/[id]/erd/page.tsx`          | Yes    | ER diagram visualization           |
| `/settings`             | `settings/page.tsx`             | Yes    | Theme, port, font size, timeout    |
| `/profile`              | `profile/page.tsx`              | Yes    | User info                          |
| `/version`              | `version/page.tsx`              | Yes    | Build version display              |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** — all database pages marked with `"use client"` due to
  interactive query editing, schema browsing, and results display
- **Server Components** used only for static layout wrappers
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useReducer` — component-scoped state
- **IndexedDB** for persistence (database: `database-db`):
  - Connections, query history, bookmarks, settings, mock schemas
  - Seed data on first load with demo databases (users, orders, products)
- **Context providers** wrap the app in `layout.tsx`:
  - `DataProvider` — IndexedDB access and state
  - `ToastProvider` — in-app notifications
- **Optimistic UI** — schema changes apply immediately, persist in background

## Data Fetching

- No server-side data fetching — all content is mock data from IndexedDB
- Mock network delay via `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
- **Virtual table** — windowed rendering for result sets with 10,000+ rows

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `input`, `badge`)
- **Dark mode** via `data-theme="night"` on `<html>`
- **32 themes** available, persisted to localStorage
- **Base HTML styles** in `src/styles/globals.css` — headings, code, tables,
  forms, semantic elements
- **Font**: `font-mono` set on `<body>` for monospace throughout

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Import from `react-icons/fi` — e.g. `FiDatabase`, `FiPlay`, `FiArrowLeft`
- Icons accept `className` for sizing

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker for offline database access
- PWA manifest for installability
- Virtual scrolling for large result sets
- Resizable panels with persisted proportions
