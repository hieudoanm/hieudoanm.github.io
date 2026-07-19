# Games / Nikoli / Masyu

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Masyu"        # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Masyu/
  index.tsx            # Entry component — 7×7 loop grid, pearl markers, controls
  types.ts             # GAME_NAME, Pearl, PearlColor, Grid types
  useMasyu.ts          # Hook — game state, undo history, auto-solve timer
  utils.ts             # Pure logic — loop generation, pearl placement, win check
  __tests__/           # Component, hook, and utils tests
```

## Gameplay

Masyu is played on a 7×7 grid of pearls. Click cells to toggle them in or out of
a loop. The goal is to draw a single closed loop through every pearl: at a white
pearl the loop must pass straight through, and at a black pearl it must turn 90°
and continue straight on both adjacent sides.

## Logic

- `generateLoop` performs a randomized walk that prunes cells with the wrong
  neighbour count until every loop cell has exactly two neighbours and stays
  connected, falling back to a fixed rectangle loop after 20 attempts.
- `placePearls` labels loop cells as white (straight, opposite directions) or
  black (perpendicular directions) with 25% probability, topping up to at least
  four pearls.
- `checkWin(grid, pearls)` requires every pearl on the loop, exactly two
  neighbours per loop cell, a single connected loop, and per-pearl rules: white
  must be straight, black must turn and extend straight one more cell.
- `useMasyu` supports `undo` via a `historyRef` stack and `autoSolve` by syncing
  differing cells to the solution at 150 ms intervals.

## Routes

```tsx
// src/app/(games)/nikoli/page.tsx       — category hub listing
// src/app/(games)/nikoli/masyu/page.tsx — game page
```

## Registration

- Home page `GAMES` → `Nikoli` card linking `/nikoli/`
- `src/app/(games)/nikoli/page.tsx` lists the Masyu card

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. Game logic MUST be pure functions in `utils.ts` — zero UI imports
4. State management: Zustand for complex games, `useState`/`useReducer` for
   simple ones
5. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
6. Icons: `react-icons/pi` (Phosphor)
7. Keep files under 200 lines, functions under 30 lines
8. Test behaviour, not implementation — Jest + Testing Library
9. Mobile-first responsive design
