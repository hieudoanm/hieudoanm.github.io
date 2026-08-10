# Games / Memory / MemoryMatch

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "MemoryMatch"  # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
MemoryMatch/
  index.tsx            # Entry component — emoji memory grid
  useMemoryMatch.ts    # Game hook: grid, moves, timer, win detection
  utils.ts             # Pure helpers: shuffle, createCards, formatTime
  __tests__/
    MemoryMatch.test.tsx  # Component tests
    useMemoryMatch.test.ts # Hook behaviour tests
    utils.test.ts         # Pure function tests
```

## Gameplay

A grid of face-down emoji cards hides matching pairs. Flip two cards at a time
to find pairs; matched pairs stay revealed. Adjust the category, rows, and
columns to resize the grid, and solve it with the fewest moves before the timer
gets the better of you.

## Logic

- `createCards(rows, cols, category)` builds `(rows * cols) / 2` emoji pairs
  from the category pool and returns them shuffled; `getEmojis` slices the first
  `count` emojis and falls back to `animals`
- `useMemoryMatch` owns the cards/rows/cols state and a `1s` interval timer
  (`timerRef`); `handleCardClick` flips a card and, at two flips, increments
  `movesCount` and compares emojis — a match locks pairs `matched` after 400ms,
  a mismatch flips them back after 800ms, both via `locked` guard
- Winning (`matchedPairs >= totalPairs`) stops the timer; `handleRowChange` and
  `handleColChange` ignore invalid pair counts (odd totals), and all setters
  restart the game via `initGame`
- `formatTime` renders `m:ss`; tests cover the pure helpers and hook behaviour

## Routes

```tsx
// src/app/(products)/games/memory/page.tsx          — category listing
// src/app/(products)/games/memory/memory-match/page.tsx — tool
```

## Registration

- `data/games.csv` → `Memory` section, `toolId: 'memory-match'`

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. Game logic MUST be pure functions in `utils.ts` — zero UI imports
4. State management: Zustand for complex games, `useState`/`useReducer` for
   simple ones
5. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
6. Icons: `react-icons/pi` (Phosphor)
7. Each game component receives `onClose: () => void` prop
8. Keep files under 200 lines, functions under 30 lines
9. Test behaviour, not implementation — Jest + Testing Library
10. Mobile-first responsive design
11. `GAME_SECTIONS` consumes `data/games.json` — never hardcode game sections in
    components
