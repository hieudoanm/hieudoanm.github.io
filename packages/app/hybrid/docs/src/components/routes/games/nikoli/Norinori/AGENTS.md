# Games / Nikoli / Norinori

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Norinori"     # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Norinori/
  index.tsx            # Entry component — 6×6 grid with row/column clues
  types.ts             # GAME_NAME, Grid, ClueCounts types
  useNorinori.ts       # Hook — game state, undo history, auto-solve timer
  utils.ts             # Pure logic — domino generation, validation
  __tests__/           # Component, hook, and utils tests
```

## Gameplay

Norinori is played on a 6×6 grid whose cells are covered by dominoes. The
row/column clues give the number of shaded cells in each line. Click cells to
shade or unshade them so each line matches its count and exactly one half of
every domino is shaded, with no two shaded cells orthogonally adjacent.

## Logic

- `generatePuzzle` tiles the grid with dominoes, shades one random cell of each,
  and computes the resulting row/column counts as clues.
- `validate(grid, clues)` checks that every row and column matches its clue and
  that no shaded cell touches another (`isAdjacentToShaded`).
- `useNorinori` keeps a `historyRef` stack for `undo` and runs `autoSolve` by
  flipping differing cells to the stored solution at 150 ms intervals.

## Routes

```tsx
// src/app/(products)/games/nikoli/page.tsx          — category listing
// src/app/(products)/games/nikoli/norinori/page.tsx — tool
```

## Registration

- `data/games.csv` → `Nikoli` section, `toolId: 'norinori'`

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
