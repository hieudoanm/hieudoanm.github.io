# Games / Puzzle / LightsOut

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "LightsOut"    # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
LightsOut/
  index.tsx            # Entry component — 5×5 board, moves counter, controls
  useLightsOut.ts      # Hook — game state, move count, auto-solve timer
  utils.ts             # Pure logic — board, toggling, generation, solved check
  __tests__/           # Component, hook, and utils tests
```

## Gameplay

LightsOut is played on a 5×5 grid of lit cells. Click any cell to toggle it and
its orthogonal neighbours between on and off. The goal is to turn every light
off in as few moves as possible; a success banner reports the move count.

## Logic

- `generatePuzzle(n, moves = 8)` applies `moves` random `toggleCell` presses to
  an empty board, recording each press as the `solution` list.
- `toggleCell` flips the clicked cell plus its orthogonal neighbours via
  `getNeighbors`; `isSolved` returns true when every cell is off.
- `useLightsOut` tracks `movesCount` and `solved`, and `startAutoSolve` replays
  the solution presses in reverse at 200 ms intervals until the board is solved.

## Routes

```tsx
// src/app/(products)/games/puzzle/page.tsx           — category listing
// src/app/(products)/games/puzzle/lights-out/page.tsx — tool
```

## Registration

- `data/games.csv` → `Puzzle` section, `toolId: 'lights-out'`

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
