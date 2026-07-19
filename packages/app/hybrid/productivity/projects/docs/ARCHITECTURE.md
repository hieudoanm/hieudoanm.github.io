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
│   └── templates/      # AboutTemplate, DownloadsTemplate, ErrorTemplate, VersionTemplate
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

| Route      | Page       | Client | Description                                                                     |
| ---------- | ---------- | ------ | ------------------------------------------------------------------------------- |
| `/`        | `page.tsx` | Yes    | Board shell — sidebar + view switcher (kanban, list, calendar, timeline, tasks) |
| `/profile` | Profile    | Yes    | User info, avatar                                                               |
| `/version` | Version    | Yes    | Build version display                                                           |

The current board is selected via the `?id` URL param, and the active view is
switched in the shell (seed value from `settings.defaultView`). The **tasks**
view is personal and per-member: an `AuthProvider` (persisted offline in the
`session` store, default signed-out) exposes the current member, and the tasks
list is filtered to that member — signed-out visits show nothing on the public
board view. The old `/board/[id]`, `/board/[id]/list`, `/board/[id]/cal`,
`/board/[id]/timeline`, `/card/[id]` and `/card` routes were consolidated into
the `/` shell and are no longer served.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** marked with `"use client"` — all interactive pages
  require IndexedDB access and drag-and-drop
- No server actions, no API routes — pure static with local persistence

## State Management

- **IndexedDB** for persistent state — boards, lists, cards, labels, members,
  checklists, activity, settings, tasks, and the offline `session` identity
  stored in `projects-db`
- **Local state** with `useState` / `useReducer` — component-scoped UI state
- **DataProvider** context wraps the app — manages data access layer
- **AuthProvider** context wraps the app — offline signed-in member
  (`switchMember` / `signOut`), persisted in the `session` store
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
