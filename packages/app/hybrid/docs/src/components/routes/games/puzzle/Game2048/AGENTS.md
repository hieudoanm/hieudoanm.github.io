# Games / Puzzle / Game2048

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Game2048"     # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Game2048/
  index.tsx            # Entry component — 4×4 board, keyboard/button controls, greedy auto-play
  constants.ts         # SIZE + TILE_COLORS / TILE_FONT style maps
  types.ts             # Grid, Dir types
  utils/
    game.ts            # Pure logic — move, slide, spawn, game-over detection
    __tests__/         # Unit tests for game logic
```

## Gameplay

Game2048 is played on a 4×4 board. Move with arrow keys or on-screen buttons to
slide and merge equal tiles; every move spawns a new 2 or 4 tile. The goal is to
reach the 2048 tile. Press `R` for a new game, `A` to auto-play, and `Esc` to
close.

## Logic

- `utils/game.ts` exports `move(g, dir)` which slides each row using `slideRow`
  (merging equal adjacent tiles left to right), rotating rows for vertical
  directions and reversing for DOWN/RIGHT; it returns the new grid, added
  `score`, and whether anything `moved`.
- `spawn` adds a 2 (90%) or 4 (10%) tile at a `randomEmpty` cell; `init` is two
  spawns on an empty board; `canMove` is false only when no cell is empty and no
  equal neighbours exist.
- `index.tsx` implements a greedy bot: `evaluate` scores a grid (edge/merge
  bonuses) and `bestMove` picks the direction with the highest resulting score,
  looping at 50 ms while `autoPlaying`.

## Routes

```tsx
// src/app/(products)/games/puzzle/page.tsx          — category listing
// src/app/(products)/games/puzzle/game2048/page.tsx — tool
```

## Registration

- `data/games.csv` → `Puzzle` section, `toolId: 'game2048'`

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
