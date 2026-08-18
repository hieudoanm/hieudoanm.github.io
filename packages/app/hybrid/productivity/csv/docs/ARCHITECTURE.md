# Architecture

## Goals

- Minimal spreadsheet-style editor for CSV files that runs as a **web app**
  (browser), **desktop app** (Tauri), and **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Local-first storage with undo/redo history
- Strict CSV parsing and serialization (quoted fields, embedded commas/newlines)
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                             |
| ----------- | -------------------------------------- |
| Framework   | Next.js 16 (App Router, static export) |
| Language    | TypeScript 6 (strict)                  |
| Styling     | Tailwind CSS 4 + DaisyUI 5             |
| Icons       | react-icons (Fi set)                   |
| Desktop     | Tauri 2                                |
| Storage     | localStorage + file import/export      |
| Testing     | Jest + Playwright                      |
| Linting     | ESLint + Prettier                      |
| Package Mgr | pnpm                                   |

## Directory Structure

```txt
src/
├── app/              # App Router (single-page editor shell)
├── components/
│   └── editor/       # CsvApp, CsvGrid, Cell, Toolbar, StatusBar
├── hooks/            # useCsvState (grid state + undo/redo + persistence)
├── lib/              # csv, columns, export, grid, storage, fonts, types
└── styles/           # globals.css (Tailwind + DaisyUI)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Single-page editor shell
├─────────────────────────────────────────┤
│  Editor (components/editor/)            │  CsvApp, CsvGrid, Cell, Toolbar
├─────────────────────────────────────────┤
│  State (hooks/)                         │  useCsvState (undo/redo + save)
├─────────────────────────────────────────┤
│  Domain (lib/)                          │  csv, grid, columns, storage
└─────────────────────────────────────────┘
```

## Routing

The app is a single-page editor — all editing happens in one view.

| Route | Page      | Client | Description             |
| ----- | --------- | ------ | ----------------------- |
| `/`   | Editor    | Yes    | Spreadsheet grid editor |
| `*`   | not-found | No     | 404 page                |
| `*`   | error     | Yes    | Runtime error boundary  |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`)
- **Client Components** throughout — the editor needs browser APIs (storage,
  file input, downloads)
- No server actions, no API routes — pure static

## Editor

- **CsvApp** owns selection and editing state and handles keyboard navigation
  (arrows, Tab, Enter, F2, Delete, printable-char editing)
- **CsvGrid** renders the sticky-header table with column letters (A, B, C, ...)
  and row numbers
- **Cell** renders a display span or a focused editing input
- **Toolbar** exposes new/import/export, add/delete row/column, and undo/redo
- **StatusBar** shows the active cell reference and grid dimensions

## CSV Domain

- `lib/csv.ts` — `parseCsv`/`serializeCsv`, a hand-rolled RFC 4180-style parser
  handling quoted fields, escaped quotes, embedded commas and newlines
- `lib/grid.ts` — pure grid operations (setCell, add/delete row/column, clear)
- `lib/columns.ts` — A1-style column letters (A, B, ..., Z, AA, AB, ...)
- `lib/export.ts` — blob + `file-saver` download of the serialized grid

## State Management

- `useCsvState` uses `useReducer` with an undo/redo stack capped at 100 entries
- The grid is persisted to `localStorage` on every change
- Import replaces the grid and resets history; undo/redo restore whole grids

## Styling

- **Tailwind CSS 4** + **DaisyUI 5** (dark default via `data-theme="spreadsheet"`)
- Monospace font for cell content (`JetBrains_Mono`)
- Sticky first column + header row for scrolling long grids

## Performance

- Static export — zero server runtime
- `React.memo` on the grid so keystrokes only re-render the active cell
- `removeConsole` strips `console.*` in production
- Service worker + PWA manifest for offline caching
