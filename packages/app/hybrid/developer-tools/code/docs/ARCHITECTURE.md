# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Mock code editor with file explorer, terminal, and git integration
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
│   ├── atoms/        # LineNumbers, Tab, StatusBar, Breadcrumb
│   ├── molecules/    # EditorPane, FileTreeItem, TerminalLine
│   ├── organisms/    # Sidebar, EditorGroup, TerminalPanel, CommandPalette
│   ├── templates/    # EditorTemplate, SettingsTemplate
│   └── RouteGuard.tsx
├── data/             # Mock files, themes, snippets
├── hooks/            # useEditor, useFileTree, useTerminal, useKeyboard
├── lib/              # IndexedDB wrapper (db.ts), syntax engine
├── providers/        # DataProvider, Providers, ToastProvider
├── styles/           # Global CSS (Tailwind base layer)
├── types/            # TypeScript interfaces
└── utils/            # formatCode, iconMap, diffEngine
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Sidebar, EditorGroup, TerminalPanel
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  EditorPane, FileTreeItem, TerminalLine
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  LineNumbers, Tab, StatusBar, Breadcrumb
├─────────────────────────────────────────┤
│  Lib (lib/)                             │  IndexedDB wrapper, syntax engine
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  DataProvider, ToastProvider
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

Dynamic routes for file editing; flat routes for settings.

| Route             | Page                      | Client | Description                         |
| ----------------- | ------------------------- | ------ | ----------------------------------- |
| `/`               | `page.tsx`                | Yes    | Editor with file explorer, tabs     |
| `/file/[...path]` | `file/[...path]/page.tsx` | Yes    | Open file in editor                 |
| `/settings`       | `settings/page.tsx`       | Yes    | Theme, font, tab width, keybindings |
| `/profile`        | `profile/page.tsx`        | Yes    | User info                           |
| `/version`        | `version/page.tsx`        | Yes    | Build version display               |
| `*`               | `not-found.tsx`           | No     | 404 page                            |
| `*`               | `error.tsx`               | Yes    | Runtime error boundary              |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** — all editor pages marked with `"use client"` due to
  interactive editing, file operations, and terminal
- **Server Components** used only for static layout wrappers
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useReducer` — component-scoped state
- **IndexedDB** for persistence (database: `code-db`):
  - Files, folders, open tabs, settings, recent files, git mock state
  - Seed data on first load with demo project files
- **Context providers** wrap the app in `layout.tsx`:
  - `DataProvider` — IndexedDB access and state
  - `ToastProvider` — in-app notifications
- **Optimistic UI** — edits apply immediately, persist in background

## Data Fetching

- No server-side data fetching — all content is mock data from IndexedDB
- Mock network delay via `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
- **Auto-save** — debounced save (1 second) after last keystroke

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `input`, `badge`)
- **Dark mode** via `data-theme="night"` on `<html>`
- **32 themes** available for UI chrome; editor uses separate syntax themes
- **Base HTML styles** in `src/styles/globals.css` — headings, code, tables,
  forms, semantic elements
- **Font**: `font-mono` set on `<body>` for monospace throughout

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Extension-based file icons via icon map utility
- Icons accept `className` for sizing

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker for offline file access
- PWA manifest for installability
- Optimistic UI for instant editing feedback
