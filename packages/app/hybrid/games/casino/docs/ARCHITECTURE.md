# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Casino games built on a shared playing-card module
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) |
| Language    | TypeScript 6 (strict)              |
| Styling     | Tailwind CSS 4 + DaisyUI 5         |
| Desktop     | Tauri 2                            |
| Testing     | Jest + Playwright                  |
| Linting     | ESLint 10 + Prettier               |
| Package Mgr | pnpm                               |

## Directory Structure

```txt
src/
├── app/                # App Router pages and layouts
│   ├── (games)/        # Game route group (baccarat, card-counter, poker-odds,
│   │                   # over-under-seven, slot-machine, roulette, craps,
│   │                   # war, keno, hi-lo)
│   └── (info)/         # Info route group (about, downloads, version)
├── components/         # Atomic design components
│   ├── organisms/      # Header (nav + theme toggle)
│   └── templates/      # Page-level layout shells
├── games/              # Game modules (one dir per game)
│   ├── _shared/        # Playing cards (deck, shuffle, draw)
│   ├── baccarat/       # types, utils, hook, component
│   ├── card-counter/   # types, utils, hook, component
│   ├── poker-odds/     # types, constants, utils, hook, components, component
│   ├── over-under-seven/ # types, utils, hook, component
│   ├── slot-machine/   # constants, utils, hook, component
│   ├── roulette/       # types, utils, hook, component
│   ├── craps/          # types, utils, hook, component
│   ├── war/            # types, utils, hook, component
│   ├── keno/           # types, utils, hook, component
│   └── hi-lo/          # types, constants, utils, hook, component
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
│    ├── Shared (_shared/cards.ts)        │    Deck creation + card helpers
│    ├── [Game]/index.tsx                 │    React component (board + controls)
│    ├── [Game]/use[Game].ts              │    Custom hook (state, actions)
│    ├── [Game]/utils.ts                  │    Pure logic (odds, payouts, rules)
│    └── [Game]/types.ts                  │    Domain types + game constants
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

Route groups separate game routes from info routes.

| Route                | Page                                | Client | Description            |
| -------------------- | ----------------------------------- | ------ | ---------------------- |
| `/`                  | `page.tsx`                          | Yes    | Home — game cards      |
| `/baccarat/`         | `(games)/baccarat/page.tsx`         | Yes    | Baccarat               |
| `/card-counter/`     | `(games)/card-counter/page.tsx`     | Yes    | Card Counter           |
| `/poker-odds/`       | `(games)/poker-odds/page.tsx`       | Yes    | Poker Odds             |
| `/over-under-seven/` | `(games)/over-under-seven/page.tsx` | Yes    | Over Under Seven       |
| `/slot-machine/`     | `(games)/slot-machine/page.tsx`     | Yes    | Slot Machine           |
| `/roulette/`         | `(games)/roulette/page.tsx`         | Yes    | Roulette               |
| `/craps/`            | `(games)/craps/page.tsx`            | Yes    | Craps                  |
| `/war/`              | `(games)/war/page.tsx`              | Yes    | War                    |
| `/keno/`             | `(games)/keno/page.tsx`             | Yes    | Keno                   |
| `/hi-lo/`            | `(games)/hi-lo/page.tsx`            | Yes    | Hi-Lo                  |
| `/about/`            | `(info)/about/page.tsx`             | Yes    | About page             |
| `/downloads/`        | `(info)/downloads/page.tsx`         | Yes    | Downloads page         |
| `/version/`          | `(info)/version/page.tsx`           | Yes    | Build version display  |
| `*`                  | `not-found.tsx`                     | No     | 404 page               |
| `*`                  | `error.tsx`                         | Yes    | Runtime error boundary |

## Game Architecture Pattern

Each game follows a strict separation between data, logic, state, and UI:

| File           | Responsibility                                            | UI imports |
| -------------- | --------------------------------------------------------- | ---------- |
| `types.ts`     | Domain types (bets, outcomes, phases) + payout constants  | No         |
| `constants.ts` | Symbols, paytables, iteration counts (where bulky)        | No         |
| `utils.ts`     | Pure functions — rules, odds, settlement logic            | No         |
| `use[Game].ts` | Custom hook — game state, bet/roll/draw handlers, credits | No         |
| `index.tsx`    | React component — renders board, bet buttons, controls    | Yes        |

Pure logic lives in utils/hooks so it is testable in isolation; components are
thin renderers over hook state. Randomness lives in small named helpers (`roll`,
`spinNumber`, `drawNumbers`) so tests can inject deterministic values through
optional parameters instead of mocking internals.

### Game Rules Summary

- **Baccarat** — six-deck shoe, full third-card drawing rules; player 2:1,
  banker 1.95:1, tie 8:1 on a stake of 10
- **Card Counter** — Hi-Lo trainer across a shuffled deck: 2–6 → +1, 7–9 → 0,
  10–A → −1; deal, self-check via reveal, reset
- **Poker Odds** — Texas Hold'em equity vs 2–9 opponents; exhaustive best-of
  seven evaluation, Monte Carlo with 5,000 iterations per run
- **Over Under Seven** — two dice; under 7 and over 7 pay 2:1, exactly 7 pays
  5:1
- **Slot Machine** — three reels, six symbols; three of a kind pays the symbol
  multiplier, a pair pays half of it
- **Roulette** — European single-zero wheel; outside bets pay 2:1, straight-up
  zero pays 36:1
- **Craps** — pass line only; come-out 7/11 wins, 2/3/12 loses, any other total
  sets the point which pays 2:1 when re-rolled before a seven
- **War** — higher card wins 2:1; ties trigger wars that burn three cards each
  and double the pot
- **Keno** — pick up to five spots from eighty, twenty numbers drawn; paytable
  tops out at 700× for five catches on five picks
- **Hi-Lo** — guess whether the next card is strictly higher or lower (aces
  high, ties lose); correct guesses pay 2:1 and build streaks

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** — all game pages marked with `"use client"` due to
  interactive boards and state management
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` + `useMemo` — component-scoped per game
- **Custom hooks** encapsulate game logic:
  - Bet selection, deal/spin/roll/draw flows with guard states
  - Credit accounting (`balance − stake + winnings`)
  - Round lifecycle (bet phase → result phase → next round)
- Credits reset to their initial value per session; no persistence yet

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin (CSS-first config)
- **DaisyUI 5** for component classes (`btn`, `card`, `alert`) and semantic
  status colors (`success`, `warning`, `neutral`, `error`)
- **Themes**: Dracula by default, Bumblebee light theme via header toggle;
  choice persisted in `localStorage` under `casino-theme`

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- Poker equity runs synchronously in 5k-iteration batches; pure-logic utils are
  tree-shakeable and testable in isolation
