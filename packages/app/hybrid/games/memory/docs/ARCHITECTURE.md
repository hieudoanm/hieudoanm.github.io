# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Four memory and cognitive training games with shared infrastructure
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) |
| Language    | TypeScript 6 (strict)              |
| Styling     | Tailwind CSS 4 + DaisyUI 5         |
| Icons       | react-icons (Pi set)               |
| Desktop     | Tauri 2                            |
| Testing     | Jest + Playwright                  |
| Linting     | ESLint 10 + Prettier               |
| Package Mgr | pnpm                               |

## Directory Structure

```txt
src/
├── app/                # App Router pages and layouts
│   ├── (games)/        # Game route group (memory-match, pi, n-back, recall)
│   └── (info)/         # Info route group (about, downloads, version)
├── components/         # Atomic design components
│   ├── organisms/      # Header
│   └── templates/      # ErrorTemplate, NotFoundTemplate
├── games/              # Game modules (one dir per game)
│   ├── MemoryMatch/    # types, utils, hooks, component
│   ├── PiNumber/       # constants, keyHandlers, hooks, component
│   ├── NBack/          # constants, component
│   └── Recall/         # constants, hooks, component
├── data/               # Shared data (pi digits)
└── styles/             # Global CSS (Tailwind base layer)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Games (games/)                         │  One module per game
│    ├── MemoryMatch/                     │    Card matching with emoji categories
│    ├── PiNumber/                        │    Pi digit memorization
│    ├── NBack/                           │    Dual n-back cognitive test
│    └── Recall/                          │    Progressive digit recall
├─────────────────────────────────────────┤
│  Data (data/)                           │  Shared pi digit sequences
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

| Route            | Page                            | Client | Description            |
| ---------------- | ------------------------------- | ------ | ---------------------- |
| `/`              | `(games)/page.tsx`              | Yes    | Home — 4 game cards    |
| `/memory-match/` | `(games)/memory-match/page.tsx` | Yes    | Memory Match game      |
| `/pi/`           | `(games)/pi/page.tsx`           | Yes    | Pi digit game          |
| `/n-back/`       | `(games)/n-back/page.tsx`       | Yes    | N-Back cognitive test  |
| `/recall/`       | `(games)/recall/page.tsx`       | Yes    | Recall game            |
| `/about/`        | `(info)/about/page.tsx`         | No     | About page             |
| `/downloads/`    | `(info)/downloads/page.tsx`     | No     | Downloads page         |
| `/version/`      | `(info)/version/page.tsx`       | No     | Version page           |
| `*`              | `not-found.tsx`                 | No     | 404 page               |
| `*`              | `error.tsx`                     | Yes    | Runtime error boundary |

## Game Architecture Pattern

Each game follows a separation of concerns:

| File             | Responsibility                                      | UI imports |
| ---------------- | --------------------------------------------------- | ---------- |
| `constants.ts`   | Grid size, timing, level constants                  | No         |
| `utils.ts`       | Pure functions — matching, generation, highlighting | No         |
| `use*.ts`        | Custom hooks — game state, scoring, persistence     | No         |
| `keyHandlers.ts` | Keyboard event handlers (PiNumber)                  | No         |
| `index.tsx`      | React component — renders UI, controls, game board  | Yes        |

## Rendering Strategy

- Static export (`output: 'export'` in next.config.ts) — all pages rendered at
  build time
- Client Components — all game pages marked with `"use client"`
- No server actions, no API routes — pure static

## State Management

- Local state with `useState` / `useReducer` — component-scoped per game
- Custom hooks for game logic (`useMemoryMatch`, `usePiGame`, `useRecall`)
- `useHighStreak` hook for cross-session score persistence (localStorage)
- `getHighScore()` / `setHighScore()` for Pi game persistence

## Styling

- Tailwind CSS 4 with `@tailwindcss/postcss` plugin (CSS-first config)
- DaisyUI 5 for component classes (`btn`, `card`, `alert`, `badge`)
- Dark theme via `data-theme="nothing"` on `<html>`
- Consistent colour scheme: `bg-base-100`, `text-primary`, `bg-base-200`

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker for offline caching of all pages
- PWA manifest for installability
- Pure-logic utils are tree-shakeable and testable in isolation
