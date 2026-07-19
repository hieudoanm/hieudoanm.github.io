# Games / Nikoli / Heyawake

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Heyawake"     # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Heyawake/
  index.tsx            # Entry component — 6×6 grid, room clues, undo/auto-solve
  types.ts             # GAME_NAME, Room, Grid types
  useHeyawake.ts       # Hook — game state, undo history, auto-solve timer
  utils.ts             # Pure logic — room generation, win checks
  __tests__/           # Component, hook, and utils tests
```

## Gameplay

Heyawake is played on a 6×6 grid partitioned into rooms. Click a cell to toggle
it shaded. The goal is to shade exactly as many cells in each room as its clue,
with no two shaded cells orthogonally adjacent, all white cells connected, and
no 2×2 block of white cells.

## Logic

- `generatePuzzle` partitions the grid into random rooms (2–4 cells) via
  `generateRooms`, then shades cells per room to produce `solution` and clues.
- `checkWin(grid, rooms)` verifies the four rules: per-room shaded counts match
  clues, no orthogonally adjacent shaded cells, white cells stay connected via
  flood fill, and no 2×2 all-white block exists.
- `useHeyawake` stores a `historyRef` stack for `undo` and runs `autoSolve` by
  flipping every cell that differs from the generated solution at 150 ms
  intervals.

## Routes

```tsx
// src/app/(products)/games/nikoli/page.tsx          — category listing
// src/app/(products)/games/nikoli/heyawake/page.tsx — tool
```

## Registration

- `data/games.csv` → `Nikoli` section, `toolId: 'heyawake'`

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
