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
│   ├── atoms/          # CardBadge, LabelChip, DueDateBadge, Avatar
│   ├── molecules/      # CardItem, ListItem, ChecklistItem, ActivityEntry
│   ├── organisms/      # Sidebar, BoardHeader, KanbanBoard, CalendarGrid
│   └── templates/      # BoardTemplate, SettingsTemplate
│   └── RouteGuard.tsx  # Auth route protection
├── data/               # Mock boards, lists, cards, members
├── hooks/              # useDragDrop, useBoard, useCard, useCalendar
├── lib/                # IndexedDB wrapper (db.ts)
├── providers/          # DataProvider, Providers, ToastProvider
├── styles/             # globals.css (Tailwind + DaisyUI)
├── types/              # TypeScript interfaces
└── utils/              # formatDate, groupByDate, sortCards
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
│  Organisms (components/organisms/)      │  Sidebar, BoardHeader, KanbanBoard
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  CardItem, ListItem, ChecklistItem
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  CardBadge, LabelChip, Avatar, etc.
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  DataProvider, ToastProvider
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

| Route                  | Page          | Client | Description                             |
| ---------------------- | ------------- | ------ | --------------------------------------- |
| `/`                    | `page.tsx`    | Yes    | Dashboard — all boards, recent activity |
| `/board/[id]`          | Board View    | Yes    | Kanban lists, drag-and-drop cards       |
| `/board/[id]/list`     | List View     | Yes    | Compact table view of all cards         |
| `/board/[id]/cal`      | Calendar View | Yes    | Cards plotted on monthly calendar       |
| `/board/[id]/timeline` | Timeline View | Yes    | Gantt-style timeline bars               |
| `/card/[id]`           | Card Detail   | Yes    | Description, checklists, activity       |
| `/settings`            | Settings      | Yes    | Theme, default view, notification prefs |
| `/profile`             | Profile       | Yes    | User info, avatar                       |
| `/version`             | Version       | Yes    | Build version display                   |

Pass entity IDs via URL params (e.g. `/board/[id]`) for board and card routes.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** marked with `"use client"` — all interactive pages
  require IndexedDB access and drag-and-drop
- No server actions, no API routes — pure static with local persistence

## State Management

- **IndexedDB** for persistent state — boards, lists, cards, labels, members,
  checklists, activity, settings stored in `projects-db`
- **Local state** with `useState` / `useReducer` — component-scoped UI state
- **DataProvider** context wraps the app — manages data access layer
- **Optimistic UI** — card moves apply instantly, persist in background

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`, etc.)
- **32 DaisyUI themes** — dark mode default (`data-theme="night"`)
- **Global base styles** in `src/styles/globals.css`
- **Framer Motion** for page transitions (fade + slide-up, 200ms ease-out)

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker (`SWProvider`) for offline caching
- PWA manifest for installability
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
