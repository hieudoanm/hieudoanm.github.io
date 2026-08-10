# Games / Nikoli / Shikaku

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Shikaku"      # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Shikaku/
  index.tsx            # Entry component — 6×6 clue grid, colour-coded regions
  types.ts             # GAME_NAME, Point, Region, Clue, PlacedRegion types
  useShikaku.ts        # Hook — clue selection, placement, undo, auto-solve
  utils.ts             # Pure logic — region split, clue placement, validation
  __tests__/           # Component, hook, and utils tests
```

## Gameplay

Shikaku is played on a 6×6 grid of numbered clues. Click a clue to select it,
then click a cell to define the rectangle spanning both points. The rectangle's
area must equal the clue number, contain exactly one clue, and not overlap any
previously placed region. Placed regions are tinted with distinct colours.

## Logic

- `generateRegions` recursively splits the grid until areas stop below the
  `STOP_THRESHOLD` (8); `placeClues` puts each clue at the region's centre with
  value equal to width × height.
- `getRectangleCells` enumerates the cells between two points, and
  `validateRegion` accepts a placement only when it contains exactly one clue
  whose value equals the area and no cells are already assigned.
- `useShikaku` tracks a `selectedClue`, flashes `wrongFlash` on invalid
  placements, supports LIFO `undo`, and `autoSolve` replays the remaining
  solution regions at 150 ms intervals.

## Routes

```tsx
// src/app/(products)/games/nikoli/page.tsx          — category listing
// src/app/(products)/games/nikoli/shikaku/page.tsx  — tool
```

## Registration

- `data/games.csv` → `Nikoli` section, `toolId: 'shikaku'`

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
