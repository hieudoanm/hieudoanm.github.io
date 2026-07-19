# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Seven Nikoli logic puzzle games with shared infrastructure
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
├── app/                # App Router pages and layouts
│   ├── (games)/        # Game route group (sudoku, nurikabe, etc.)
│   └── (info)/         # Info route group (about, downloads, version)
├── components/         # Atomic design components
│   └── templates/      # Page-level layout shells
├── games/              # Game modules (one dir per game)
│   ├── _shared/        # Shared game data, instructions modal
│   ├── Sudoku/         # types, utils, hook, component
│   ├── Nurikabe/
│   ├── Masyu/
│   ├── Shikaku/
│   ├── Fillomino/
│   ├── Norinori/
│   └── Heyawake/
├── styles/             # Global CSS (Tailwind base layer)
└── types/              # TypeScript interfaces
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Games (games/)                         │  One module per puzzle game
│    ├── Shared (_shared/)                │    GameInstructions modal, registry
│    ├── [Game]/index.tsx                 │    React component (grid + controls)
│    ├── [Game]/use[Game].ts              │    Custom hook (state, undo, solve)
│    ├── [Game]/utils.ts                  │    Pure logic (generation, validation)
│    └── [Game]/types.ts                  │    Domain types, bilingual names
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

Route groups separate game routes from info routes.

| Route         | Page                         | Client | Description            |
| ------------- | ---------------------------- | ------ | ---------------------- |
| `/`           | `page.tsx`                   | Yes    | Home — 7 game cards    |
| `/sudoku/`    | `(games)/sudoku/page.tsx`    | Yes    | Sudoku game            |
| `/nurikabe/`  | `(games)/nurikabe/page.tsx`  | Yes    | Nurikabe game          |
| `/masyu/`     | `(games)/masyu/page.tsx`     | Yes    | Masyu game             |
| `/shikaku/`   | `(games)/shikaku/page.tsx`   | Yes    | Shikaku game           |
| `/fillomino/` | `(games)/fillomino/page.tsx` | Yes    | Fillomino game         |
| `/norinori/`  | `(games)/norinori/page.tsx`  | Yes    | Norinori game          |
| `/heyawake/`  | `(games)/heyawake/page.tsx`  | Yes    | Heyawake game          |
| `/about/`     | `(info)/about/page.tsx`      | Yes    | About page             |
| `/downloads/` | `(info)/downloads/page.tsx`  | Yes    | Downloads page         |
| `/version/`   | `(info)/version/page.tsx`    | Yes    | Build version display  |
| `*`           | `not-found.tsx`              | No     | 404 page               |
| `*`           | `error.tsx`                  | Yes    | Runtime error boundary |

## Game Architecture Pattern

Each game follows a strict 4-file separation:

| File           | Responsibility                                      | UI imports |
| -------------- | --------------------------------------------------- | ---------- |
| `types.ts`     | Bilingual names (`GAME_NAME`), domain types         | No         |
| `utils.ts`     | Pure functions — generation, validation, solving    | No         |
| `use[Game].ts` | Custom hook — game state, undo history, auto-solve  | No         |
| `index.tsx`    | React component — renders grid, controls, win state | Yes        |

Sudoku is the exception: it uses `useReducer` inline instead of a separate hook.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** — all game pages marked with `"use client"` due to
  interactive grid manipulation and state management
- **Server Components** used only for static layout wrappers
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useReducer` — component-scoped per game
- **Custom hooks** encapsulate game logic:
  - Undo history (snapshot stack)
  - Auto-solve with step-by-step visualization
  - Win detection and timer
- **Shared state** via `gameData.tsx` registry — instructions, visualizations
- No IndexedDB yet (planned for puzzle history and scores)

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin (CSS-first config)
- **DaisyUI 5** for component classes (`btn`, `card`, `input`, `badge`)
- **Dark mode** via `className="dark"` on `<html>`
- **Base HTML styles** in `src/styles/base.css` — full-height html/body
- **Theme config** in `src/styles/themes.css` — dark as default

## Icons

- **react-icons** with Feather icons (`Fi` set) for UI controls
- Game grids use CSS grid with conditional styling (no icon library)

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker for offline caching of all 8 pages
- PWA manifest for installability
- Pure-logic utils are tree-shakeable and testable in isolation
