# Games / Nikoli / Fillomino

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Fillomino"    # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Fillomino/
  index.tsx            # Entry component — 6×6 grid, number pad, undo/auto-solve
  types.ts             # GAME_NAME + Grid type ((number | null)[][])
  useFillomino.ts      # Hook — game state, undo history, auto-solve timer
  utils.ts             # Pure logic — puzzle generation, regions, completion
  __tests__/           # Component, hook, and utils tests
```

## Gameplay

Fillomino is played on a 6×6 grid. Select a cell, then press a number button to
write it (or ✕ to clear). The goal is to fill every cell so each contiguous
region of equal numbers contains exactly that many cells. Given cells shown in
the puzzle cannot be edited.

## Logic

- `generatePuzzle(clueRatio = 0.35)` places random straight polyominoes (length
  1–5) as a solution, repairs any region whose size mismatches its value, then
  blanks cells with probability `clueRatio` to form the puzzle.
- `getRegion` flood-fills a cell's connected same-value area; `isComplete`
  returns true only when no cell is `null` and every region's length equals its
  number.
- `isValidPlacement` rejects placements that grow a region past its value or
  give a cell more than two same-valued neighbours.
- `useFillomino` keeps a `historyRef` stack for `undo` and drives `autoSolve` by
  copying each empty cell from the stored solution at 150 ms intervals.

## Routes

```tsx
// src/app/(products)/games/nikoli/page.tsx          — category listing
// src/app/(products)/games/nikoli/fillomino/page.tsx — tool
```

## Registration

- `data/games.csv` → `Nikoli` section, `toolId: 'fillomino'`

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
