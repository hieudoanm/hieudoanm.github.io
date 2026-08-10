# Games / Nikoli / Sudoku

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Sudoku"       # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Sudoku/
  index.tsx            # Entry component — grid, timer, difficulty, hint, keypad
  types.ts             # GAME_NAME, Size (3 | 4 | 5), Grid types
  utils/
    sudoku.ts          # Pure logic — generation, solving, validation, time format
    __tests__/         # Unit tests for sudoku logic
```

## Gameplay

Sudoku is played on a 9×9 board (Size 3), with difficulties Easy/Medium/Hard
selectable. Click a given-free cell, then press a number to enter it (or ✕ to
clear). Each row, column, and 3×3 box must contain the digits 1–9 exactly once.
A timer tracks elapsed time, and the Hint button fills the first empty cell from
the solution.

## Logic

- `generatePuzzle(size, difficulty)` builds a complete grid from a shuffled
  first row via a Latin-square pattern, applies random row/column swaps, then
  removes cells (0.4 + difficulty × 0.35 fraction) while `countSolutions` keeps
  the solution unique.
- `isValid` rejects a digit already present in its row, column, or box; `solve`
  is a backtracking solver used to verify completions.
- `index.tsx` drives state through `useReducer` (`gameReducer`) with `NEW_GAME`
  / `SET_CELL` / `SELECT` / `TICK` actions and a 1-second interval timer;
  `formatTime` renders minutes:seconds.

## Routes

```tsx
// src/app/(products)/games/nikoli/page.tsx         — category listing
// src/app/(products)/games/nikoli/sudoku/page.tsx  — tool
```

## Registration

- `data/games.csv` → `Nikoli` section, `toolId: 'sudoku'`

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
