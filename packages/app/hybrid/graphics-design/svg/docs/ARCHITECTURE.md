# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Atomic design system for reusable UI
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
| Data        | Mock data with IndexedDB           |

## Directory Structure

```txt
src/
├── app/                # App Router pages and layouts
├── components/         # Atomic design components
│   ├── atoms/          # ToolButton, ColorSwatch, LayerItem, HandlePoint
│   ├── molecules/      # ShapeProps, FillPanel, StrokePanel, AlignToolbar
│   ├── organisms/      # Sidebar, Canvas, LayerPanel, Toolbar, CodeEditor
│   └── templates/      # EditorTemplate, SettingsTemplate
│   └── RouteGuard.tsx  # Auth route protection
├── data/               # Mock SVGs, templates, color palettes
├── hooks/              # useCanvas, useSelection, useLayers, useHistory
├── lib/                # IndexedDB wrapper (db.ts), SVG parser mock
├── providers/          # DataProvider, Providers, ToastProvider
├── styles/             # globals.css (Tailwind + DaisyUI)
├── types/              # TypeScript interfaces
└── utils/              # svgExport, generateId, snapToGrid
src-tauri/              # Tauri desktop (Rust)
e2e/                    # Playwright E2E tests
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Sidebar, Canvas, LayerPanel, Toolbar
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  ShapeProps, FillPanel, StrokePanel
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  ToolButton, ColorSwatch, HandlePoint
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  DataProvider, ToastProvider
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

| Route             | Page            | Client | Description                        |
| ----------------- | --------------- | ------ | ---------------------------------- |
| `/`               | `page.tsx`      | Yes    | Document library — recent SVGs     |
| `/edit/[id]`      | Canvas Editor   | Yes    | Vector workspace with tools        |
| `/edit/[id]/code` | SVG Code Editor | Yes    | Raw SVG code editing               |
| `/settings`       | Settings        | Yes    | Theme, grid, snap, export defaults |
| `/profile`        | Profile         | Yes    | User info                          |
| `/version`        | Version         | Yes    | Build version display              |

Pass document IDs via dynamic segments (e.g. `/edit/[id]`).

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** marked with `"use client"` — canvas and editor pages
  require browser APIs for SVG rendering
- No server actions, no API routes — pure static with local persistence

## State Management

- **IndexedDB** for persistent state — SVG documents, symbols, settings, history
  stored in `svg-db`
- **Local state** with `useState` / `useReducer` — canvas tool state
- **DataProvider** context wraps the app — manages data access layer
- **Optimistic UI** — canvas edits apply immediately, persist in background

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`, etc.)
- **32 DaisyUI themes** — dark mode default (`data-theme="night"`)
- **Global base styles** in `src/styles/globals.css`

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker (`SWProvider`) for offline caching
- PWA manifest for installability
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
