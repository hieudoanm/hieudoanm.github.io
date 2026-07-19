# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Geography word games built on a shared dataset of world countries
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
│   ├── (games)/        # Game route group (wordle, connections, border,
│   │                   # continents-sort, emoji-guesser, flag-guesser,
│   │                   # higher-or-lower)
│   └── (info)/         # Info route group (about, downloads, version)
├── components/         # Atomic design components
│   ├── organisms/      # Header (nav + theme toggle)
│   └── templates/      # Page-level layout shells
├── games/              # Game modules (one dir per game)
│   ├── _shared/        # Datasets + quiz helpers (countries, flags, borders,
│   │                   # population)
│   ├── wordle/         # types, utils, hook, component
│   ├── connections/    # types, puzzles, utils, hook, component
│   ├── border/         # types, utils, hook, component
│   ├── continents-sort/# types, utils, hook, component
│   ├── emoji-guesser/  # types, utils, hook, component
│   ├── flag-guesser/   # types, utils, hook, component
│   └── higher-or-lower/# types, utils, hook, component
└── styles/             # Global CSS (Tailwind base layer)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  About / Downloads / Version shells
├─────────────────────────────────────────┤
│  Games (games/)                         │  One module per game
│    ├── Shared (_shared/countries.ts)    │    Country name dataset + helpers
│    ├── [Game]/index.tsx                 │    React component (board + controls)
│    ├── [Game]/use[Game].ts              │    Custom hook (state, input handling)
│    ├── [Game]/utils.ts                  │    Pure logic (validation, scoring)
│    └── [Game]/types.ts                  │    Domain types
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

Route groups separate game routes from info routes.

| Route               | Page                               | Client | Description            |
| ------------------- | ---------------------------------- | ------ | ---------------------- |
| `/`                 | `page.tsx`                         | Yes    | Home — game cards      |
| `/wordle/`          | `(games)/wordle/page.tsx`          | Yes    | Country Wordle         |
| `/connections/`     | `(games)/connections/page.tsx`     | Yes    | Country Connections    |
| `/border/`          | `(games)/border/page.tsx`          | Yes    | Border Guesser         |
| `/continents-sort/` | `(games)/continents-sort/page.tsx` | Yes    | Continents Sort        |
| `/emoji-guesser/`   | `(games)/emoji-guesser/page.tsx`   | Yes    | Emoji Guesser          |
| `/flag-guesser/`    | `(games)/flag-guesser/page.tsx`    | Yes    | Flag Guesser           |
| `/higher-or-lower/` | `(games)/higher-or-lower/page.tsx` | Yes    | Higher or Lower        |
| `/about/`           | `(info)/about/page.tsx`            | Yes    | About page             |
| `/downloads/`       | `(info)/downloads/page.tsx`        | Yes    | Downloads page         |
| `/version/`         | `(info)/version/page.tsx`          | Yes    | Build version display  |
| `*`                 | `not-found.tsx`                    | No     | 404 page               |
| `*`                 | `error.tsx`                        | Yes    | Runtime error boundary |

## Game Architecture Pattern

Each game follows a strict separation between data, logic, state, and UI:

| File           | Responsibility                                                      | UI imports |
| -------------- | ------------------------------------------------------------------- | ---------- |
| `types.ts`     | Domain types (guess rows, letter statuses, puzzle groups)           | No         |
| `utils.ts`     | Pure functions — validation, evaluation, submission logic           | No         |
| `puzzles.ts`   | Authored content + deterministic daily selection (Connections only) | No         |
| `use[Game].ts` | Custom hook — game state, input handlers, win/lose flow             | No         |
| `index.tsx`    | React component — renders board, keyboard, controls                 | Yes        |

Pure logic lives in utils/hooks so it is testable in isolation; components are
thin renderers over hook state.

### Wordle specifics

- Answer pool is the shared country dataset (`_shared/countries.ts`)
- Daily answer chosen by hashing the date key (`dailyAnswer(dateKey)`)
- Guess evaluation follows Wordle rules: exact → `correct`, remaining letter →
  `present`, otherwise `absent`
- Physical keyboard listener plus on-screen QWERTY keyboard
- Six guesses, fixed length = answer length

### Connections specifics

- Eight authored puzzles; each partitions 16 distinct countries into four
  labeled groups of four (`puzzles.ts`)
- Daily puzzle selected deterministically by date hash (`puzzleForDate`)
- Four mistakes allowed; "One away..." hint when a guess overlaps a group by 3
- Solved groups move above the board with DaisyUI color coding; losing reveals
  all remaining groups
- Tile shuffling: seeded Fisher-Yates for initial layout, random on user shuffle

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** — all game pages marked with `"use client"` due to
  interactive board manipulation and state management
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` + `useMemo` — component-scoped per game
- **Custom hooks** encapsulate game logic:
  - Input handling (letters, backspace, enter) with guard states
  - Win/loss detection and end-of-game messaging
  - Puzzle/tile lifecycle (new game, next puzzle, shuffle)
- No persistence yet (planned for streaks and statistics)

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin (CSS-first config)
- **DaisyUI 5** for component classes (`btn`, `card`, `alert`) and semantic
  status colors (`success`, `warning`, `neutral`, `error`)
- **Themes**: Dracula by default, Bumblebee light theme via header toggle;
  choice persisted in `localStorage` under `countries-theme`

## Icons

- **react-icons** with Feather icons (`Fi` set) for navigation and controls
- Game boards use CSS grid with conditional styling (no icon library)

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- Pure-logic utils are tree-shakeable and testable in isolation
