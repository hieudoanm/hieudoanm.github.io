# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Office productivity suite with four sub-apps — **Calendar**, **CSV**,
  **Markdown**, and **Tasks** — each available in a full and a lite variant,
  plus **Keynotes**, an offline-first presentation editor
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack)  |
| Language    | TypeScript 6 (strict)               |
| Styling     | Tailwind CSS 4 + DaisyUI 5          |
| Persistence | idb 8 (IndexedDB), localStorage     |
| Animation   | motion 13                           |
| Desktop     | Tauri 2                             |
| Testing     | Jest 30 + Playwright 1              |
| Linting     | ESLint 10 + Prettier                |
| Package Mgr | pnpm 11 (Node 26)                   |

## Directory Structure

```txt
src/
├── app/                    # App Router pages and layouts
│   ├── (app)/              # App route group — full sub-apps
│   │   ├── calendar/       # Full calendar (7 views)
│   │   ├── csv/            # Full spreadsheet editor
│   │   ├── md/             # Full markdown knowledge base
│   │   ├── tasks/          # Full kanban board (4 views)
│   │   ├── keynotes/       # Deck gallery, templates, editor, present…
│   │   └── (lite)/lite/    # Lite route group
│   │       ├── calendar/   # Lite calendar (monthly view)
│   │       ├── csv/        # Lite table editor
│   │       ├── md/         # Lite markdown editor
│   │       ├── tasks/      # Lite to-do list (Google Tasks style)
│   │       └── page.tsx    # Lite hub
│   ├── (auth)/             # sign-in, sign-up, profile, password reset
│   ├── (info)/             # about, downloads, version
│   ├── page.tsx            # Home — Office suite hub
│   ├── layout.tsx          # Root layout (Header + main)
│   └── *.tsx               # error, not-found, loading, forbidden, robots…
├── components/             # Atomic design, one folder per feature
│   ├── calendar/           # Calendar feature module
│   ├── csv/                # CSV/sheet feature module
│   ├── md/                 # Markdown feature module
│   ├── tasks/              # Tasks feature module
│   ├── keynotes/           # Keynotes feature module + Providers
│   └── shared/             # Header, page templates
├── content/                # about.ts, download.ts, version.ts
├── data/                   # Static/cached data per feature
│   ├── calendar/           # Events, months, years, time blocks
│   ├── md/                 # Markdown seed content
│   ├── tasks/              # models.ts + seed.ts
│   └── keynotes/           # charts, icons, presets, templates, themes
├── hooks/                  # Feature hooks (csv, md, shared, keynotes)
├── lib/                    # Feature libs (calendar, csv, md, tasks, keynotes)
├── notes/                  # Personal notes consumed by the md app
├── styles/                 # globals.css, themes.css, keynotes-*.css
└── types/keynotes/         # Keynotes domain types
```

## Feature Modules

Each feature follows atomic design under `src/components/<feature>/` with
`atoms/`, `molecules/`, `organisms/`, and (for shared) `templates/`. Tests are
colocated in `__tests__/` next to each unit.

| Module    | Full (`(app)/`) | Lite (`(app)/(lite)/lite/`) | Lib                       | Data                         |
| --------- | --------------- | ---------------------------- | ------------------------- | ---------------------------- |
| Calendar  | calendar/       | lite/calendar                | `lib/calendar/`           | `data/calendar/`             |
| CSV       | csv/            | lite/csv                     | `lib/csv/`                | —                            |
| Markdown  | md/             | lite/md                      | `lib/md/`                 | `data/md/`, `notes/`         |
| Tasks     | tasks/          | lite/tasks                   | `lib/tasks/`              | `data/tasks/`                |
| Keynotes  | keynotes/       | —                            | `lib/keynotes/`           | `data/keynotes/`             |

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (shared/templates/)          │  Home, About, Downloads, Version…
├─────────────────────────────────────────┤
│  Feature organisms (components/<f>/)    │  CalendarApp, Sheet, MarkdownApp,
│                                         │  TasksView, KanbanBoard, BoardBody
├─────────────────────────────────────────┤
│  Feature libs (lib/<f>/)                │  Domain logic, providers, storage
├─────────────────────────────────────────┤
│  Data (data/) + Notes (notes/)          │  Events, seed content, tasks seed
└─────────────────────────────────────────┘
```

## Routing

| Route                  | Page                              | Client | Description                |
| ---------------------- | --------------------------------- | ------ | -------------------------- |
| `/`                    | `page.tsx`                        | Yes    | Home — Office suite hub    |
| `/calendar/`           | `(app)/calendar/page.tsx`         | Yes    | Full calendar sub-app      |
| `/csv/`                | `(app)/csv/page.tsx`              | Yes    | Full spreadsheet sub-app   |
| `/md/`                 | `(app)/md/page.tsx`               | Yes    | Full markdown sub-app      |
| `/tasks/`              | `(app)/tasks/page.tsx`            | Yes    | Full kanban board sub-app  |
| `/keynotes/`           | `(app)/keynotes/page.tsx`         | Yes    | Keynotes deck gallery      |
| `/keynotes/templates/` | `(app)/keynotes/templates/page.tsx` | Yes | Keynotes template gallery |
| `/keynotes/editor/[id]/` | `(app)/keynotes/editor/[id]/page.tsx` | Yes | Slide editor (SSG)    |
| `/keynotes/present/[id]/` | `(app)/keynotes/present/[id]/page.tsx` | Yes | Present mode (SSG)   |
| `/keynotes/presenter/[id]/` | `(app)/keynotes/presenter/[id]/page.tsx` | Yes | Presenter view (SSG) |
| `/keynotes/handouts/[id]/` | `(app)/keynotes/handouts/[id]/page.tsx` | Yes | Handouts (SSG)      |
| `/keynotes/print/[id]/` | `(app)/keynotes/print/[id]/page.tsx` | Yes   | Print / PDF view (SSG)     |
| `/lite/`               | `(app)/(lite)/lite/page.tsx`      | Yes    | Lite hub                   |
| `/lite/calendar/`      | `(app)/(lite)/lite/calendar/page.tsx` | Yes | Lite calendar          |
| `/lite/csv/`           | `(app)/(lite)/lite/csv/page.tsx`  | Yes    | Lite spreadsheet           |
| `/lite/md/`            | `(app)/(lite)/lite/md/page.tsx`   | Yes    | Lite markdown editor       |
| `/lite/tasks/`         | `(app)/(lite)/lite/tasks/page.tsx`| Yes    | Lite to-do list            |
| `/sign-in/`…           | `(auth)/*`                        | Yes    | Auth pages                 |
| `/about/`, `/downloads/`, `/version/` | `(info)/*`       | No     | Static info pages          |
| `*`                    | `not-found.tsx`                   | No     | 404 page                   |
| `*`                    | `error.tsx` / `global-error.tsx`  | Yes    | Error boundaries           |

## Tasks Sub-app

The Tasks module is a kanban board (full) and Google Tasks-style to-do list
(lite), both backed by IndexedDB.

- `lib/tasks/types.ts` — domain types (Board, List, Card, Member, Label,
  Settings, Task)
- `lib/tasks/db.ts` — idb wrapper around the `office-db` IndexedDB database
  (kept separate from the projects app's `projects-db`)
- `lib/tasks/data-provider.tsx` — React context with load/query/mutation
  operations (CRUD for boards, lists, cards, tasks, settings)
- `lib/tasks/auth.tsx` — mock member auth context; falls back to `members[0]`
- `lib/tasks/toast.tsx` — toast feedback provider
- `lib/tasks/collab.ts`, `lib/tasks/format.ts` — multi-device sync hashing and
  date formatting helpers
- `components/tasks/Providers.tsx` — root wrapper composed as
  `DataProvider > AuthProvider > ToastProvider`
- Full page renders `ProjectSidebar`, `ViewSwitcher` (Kanban / List / Calendar
  / Timeline), and `BoardBody`, which switches among `KanbanBoard`,
  `ListView`, `CalendarView`, and `TimelineView`
- Lite page renders a single `TasksView` with `TaskInput`, `TaskItem`, and
  states for loading, signed-out (`TaskSignInState`), and empty (`TaskEmptyState`)

## Keynotes Sub-app

Keynotes is a presentation editor (deck gallery, slide canvas, presenter view,
handouts, print/PDF). It was migrated in from a standalone `keynotes` package.

- `app/(app)/keynotes/layout.tsx` — mounts `KeynotesProviders`
  (`ToastProvider > DeckProvider`) for every Keynotes route
- `components/keynotes/Providers.tsx` — the provider wrapper
- `components/keynotes/organisms/DeckProvider.tsx` — deck state, undo/redo,
  autosave, and a `BroadcastChannel` realtime mock
- `components/keynotes/organisms/SlideCanvas.tsx` — WYSIWYG canvas;
  `ObjectRenderer` renders each `SlideObject`
- `lib/keynotes/db.ts` — idb wrapper around the `office-keynotes-db` IndexedDB
  database, separate from Tasks' `office-db`
- `lib/keynotes/idb.ts` — one-line re-export of `idb`; the indirection exists so
  Jest's `moduleNameMapper` can swap in `lib/keynotes/__mocks__/idb.ts` without
  affecting Tasks' own `idb` usage. Keynotes code must import `openDB` from here
- `lib/keynotes/` — exporters, importers, animation/transition model, geometry,
  shapes, rehearsal, sections, slide backgrounds, markdown/highlight renderers
- `types/keynotes/deck.ts` — `Deck`, `Slide`, `SlideObject`, `ShapeType`,
  `AnimationTrigger`, `DeckSnapshot`
- `styles/keynotes-animations.css` / `styles/keynotes-utilities.css` — the
  `kn-*` keyframes plus the `anim-*` and `trans-*` utility classes. Keynotes
  reuses the suite's `office-light` / `office-dark` themes

## Rendering Strategy

- Static export (`output: 'export'` in `next.config.ts`) — all pages rendered
  at build time
- Client components for interactive pages (`"use client"`)
- No server actions, no API routes — pure static
- `reactCompiler: true` and `reactStrictMode: true` enabled

## State Management

- Local state with `useState`/`useReducer` per feature component
- Persistence via IndexedDB (`idb`) for tasks and keynotes, and localStorage
  for md/csv
- Calendar uses static data with helper libs for date math
- Settings (default view, weekday filters) persisted and restored on load

## Styling

- Tailwind CSS 4 with PostCSS plugin
- DaisyUI 5 component classes (`btn`, `card`, `select`, `badge`, `table`)
- Theming via `data-theme` on `<html>` (`office-dark` / `office-light`) in
  `src/styles/themes.css`
- Consistent colour tokens: `bg-base-100`, `text-primary`, `bg-base-200`
- Keynotes animation/transition keyframes and utilities in
  `src/styles/keynotes-animations.css` and `src/styles/keynotes-utilities.css`
- `prettier-plugin-tailwindcss` sorts utility classes