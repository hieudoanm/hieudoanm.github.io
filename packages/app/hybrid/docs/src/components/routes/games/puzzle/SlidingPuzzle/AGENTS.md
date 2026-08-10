# Games / Puzzle / SlidingPuzzle

## Build & Test

```bash
pnpm dev                        # Start Next.js dev server
pnpm test                       # Run all Jest tests
pnpm jest -- "SlidingPuzzle"    # Run tests for this game
pnpm tsc --noEmit               # TypeScript type check
pnpm lint                       # ESLint
```

## File Structure

```text
SlidingPuzzle/
  index.tsx            # Entry component — dropzone upload, tile grid, controls
  useSlidingPuzzle.ts  # Hook — image/tile state, grid size, auto-solve timer
  utils.ts             # Pure logic — image cropping, tile slicing, shuffling
  __tests__/           # Component, hook, and utils tests (+ snapshot)
```

## Gameplay

SlidingPuzzle starts with a dropzone: upload an image, which is cropped to a
center square and cut into an n×n tile grid (3×3 to 5×5). Click a tile adjacent
to the empty slot to slide it, aiming to reassemble the original image with
minimum moves. Auto Solve replays the recorded shuffle in reverse.

## Logic

- `cropToCenterSquare` draws the largest centered square of the uploaded image
  to a canvas and returns a data URL; `generateTileImages` slices it into n×n
  canvas tiles.
- `shuffleBoard(n)` starts from the solved layout and performs `total × 10`
  random valid swaps (via `getAdjacent`), recording each swap so the auto-solve
  can reverse it.
- `isSolved(tiles, n)` is true when tile at each index equals its position.
- `useSlidingPuzzle` rebuilds the board whenever `imageUrl`, `gridSize`, or
  `gameNonce` changes (cancelling stale `Image` loads), and `startAutoSolve`
  replays `shuffleMoves` in reverse at 80 ms intervals.

## Routes

```tsx
// src/app/(products)/games/puzzle/page.tsx               — category listing
// src/app/(products)/games/puzzle/sliding-puzzle/page.tsx — tool
```

## Registration

- `data/games.csv` → `Puzzle` section, `toolId: 'sliding-puzzle'`

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
