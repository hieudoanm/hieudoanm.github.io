# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Three classic 8-bit arcade/puzzle games with shared infrastructure
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
│   └── (games)/        # Game route group (maze, snake, dino-run)
├── components/         # Atomic design components
│   ├── organisms/      # Header
│   └── templates/      # ErrorTemplate, NotFoundTemplate
├── games/              # Game modules (one dir per game)
│   ├── _shared/        # Shared game data, instructions modal
│   ├── Maze/           # types, constants, maze logic, component
│   ├── Snake/          # types, constants, snake logic, component
│   └── DinoRun/        # types, constants, game logic, component
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
│    ├── Shared (_shared/)                │    GameInstructions modal, registry
│    ├── [Game]/index.tsx                 │    React component (canvas/grid + controls)
│    ├── [Game]/game.ts or maze.ts        │    Pure logic (simulation, generation)
│    ├── [Game]/constants.ts              │    Physics/tuning constants
│    └── [Game]/types.ts                  │    Domain types, bilingual names
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

| Route        | Page                        | Client | Description            |
| ------------ | --------------------------- | ------ | ---------------------- |
| `/`          | `page.tsx`                  | Yes    | Home — 3 game cards    |
| `/maze/`     | `(games)/maze/page.tsx`     | Yes    | Maze game (canvas)     |
| `/snake/`    | `(games)/snake/page.tsx`    | Yes    | Snake game (grid)      |
| `/dino-run/` | `(games)/dino-run/page.tsx` | Yes    | DinoRun game (canvas)  |
| `*`          | `not-found.tsx`             | No     | 404 page               |
| `*`          | `error.tsx`                 | Yes    | Runtime error boundary |

## Game Architecture Pattern

Each game follows a separation of concerns:

| File                                 | Responsibility                                     | UI imports |
| ------------------------------------ | -------------------------------------------------- | ---------- |
| `types.ts`                           | Bilingual names (`GAME_NAME`), domain types        | No         |
| `constants.ts`                       | Physics, tuning, grid size constants               | No         |
| `game.ts` or `maze.ts` or `snake.ts` | Pure functions — generation, simulation, collision | No         |
| `index.tsx`                          | React component — renders canvas/grid, controls    | Yes        |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** — all game pages marked with `"use client"` due to
  interactive canvas manipulation and state management
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useRef` — component-scoped per game
- **requestAnimationFrame** loop for DinoRun (canvas-based)
- **setInterval** tick loop for Snake (grid-based)
- **useEffect** canvas redraw for Maze (canvas-based)
- **Shared state** via `gameData.tsx` registry — instructions, visualizations

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin (CSS-first config)
- **DaisyUI 5** for component classes (`btn`, `card`, `alert`, `range`)
- **Dark mode** via `data-theme="dracula"` on `<html>`
- **Theme toggle** — dracula (dark) / bumblebee (light) with localStorage

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker for offline caching of all pages
- PWA manifest for installability
- Pure-logic utils are tree-shakeable and testable in isolation
