# Games / Nikoli / Nurikabe

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Nurikabe"     # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Nurikabe/
  index.tsx            # Entry component — 6×6 island/shade grid, controls
  types.ts             # GAME_NAME, CellState, Grid types
  useNurikabe.ts       # Hook — game state, undo history, auto-solve timer
  utils.ts             # Pure logic — island generation, win checks
  __tests__/           # Component, hook, and utils tests
```

## Gameplay

Nurikabe is played on a 6×6 grid of numbered islands. Click a cell to toggle it
between empty and shaded; numbered cells are fixed. The goal is to shade every
cell not belonging to an island so each island occupies exactly as many cells as
its number, shaded cells stay connected with no 2×2 block, and no shaded cell
touches a numbered island.

## Logic

- `generatePuzzle` places islands of sizes 1, 1, 2, 2, 3, 3, 4 by random
  neighbouring-cell growth with retries.
- `checkWin(grid)` verifies each island's connected region matches its value, no
  shaded cell is adjacent to a numbered one, all shaded cells are connected via
  flood fill, and no 2×2 shaded block exists.
- `useNurikabe` resets cells to `'empty'` from the generated solution, prevents
  toggling `'numbered'` cells, keeps a `historyRef` stack for `undo`, and
  `autoSolve` fills every cell to the solution state at 150 ms intervals.

## Routes

```tsx
// src/app/(products)/games/nikoli/page.tsx          — category listing
// src/app/(products)/games/nikoli/nurikabe/page.tsx — tool
```

## Registration

- `data/games.csv` → `Nikoli` section, `toolId: 'nurikabe'`

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
