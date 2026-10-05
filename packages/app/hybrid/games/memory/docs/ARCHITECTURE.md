# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Board, card and number games with shared infrastructure
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
│   ├── (games)/        # Game route group (8-bit, gambling, nikoli, puzzles, tic-tac-toe)
│   └── (info)/         # Info route group (about, downloads, version)
├── components/         # Atomic design components
│   ├── organisms/      # Header
│   └── templates/      # ErrorTemplate, NotFoundTemplate
├── games/              # Game modules (one dir per category)
│   ├── 8-bit/          # DinoRun, Maze, RockPaperScissors, Snake
│   ├── gambling/       # Baccarat, Craps, Keno, Roulette, and more
│   ├── nikoli/         # Fillomino, Heyawake, Masyu, Nurikabe, and more
│   ├── puzzles/        # Game2048, LightsOut, SlidingPuzzle, Towers
│   └── tic-tac-toe/    # classic, duck, notakto, reverse, t3, wild
└── styles/             # Global CSS (Tailwind base layer)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Games (games/)                         │  One module per category
│    ├── 8-bit/                           │    Maze, Snake, Dino Run
│    ├── gambling/                        │    Baccarat, Roulette, Craps
│    ├── nikoli/                          │    Sudoku, Masyu, Nurikabe
│    ├── puzzles/                         │    2048, Lights Out, Towers
│    └── tic-tac-toe/                     │    Classic, Reverse, Duck, Wild
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

| Route         | Page                        | Client | Description            |
| ------------- | --------------------------- | ------ | ---------------------- |
| `/`           | `(games)/page.tsx`          | Yes    | Home — 5 game cards    |
| `/about/`     | `(info)/about/page.tsx`     | No     | About page             |
| `/downloads/` | `(info)/downloads/page.tsx` | No     | Downloads page         |
| `/version/`   | `(info)/version/page.tsx`   | No     | Version page           |
| `*`           | `not-found.tsx`             | No     | 404 page               |
| `*`           | `error.tsx`                 | Yes    | Runtime error boundary |

## Game Architecture Pattern

Each game follows a separation of concerns:

| File             | Responsibility                                      | UI imports |
| ---------------- | --------------------------------------------------- | ---------- |
| `constants.ts`   | Grid size, timing, level constants                  | No         |
| `utils.ts`       | Pure functions — matching, generation, highlighting | No         |
| `use*.ts`        | Custom hooks — game state, scoring, persistence     | No         |
| `keyHandlers.ts` | Keyboard event handlers, where a game needs them    | No         |
| `index.tsx`      | React component — renders UI, controls, game board  | Yes        |

## Rendering Strategy

- Static export (`output: 'export'` in next.config.ts) — all pages rendered at
  build time
- Client Components — all game pages marked with `"use client"`
- No server actions, no API routes — pure static

## State Management

- Local state with `useState` / `useReducer` — component-scoped per game
- Custom hooks for game logic, one per game module

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
