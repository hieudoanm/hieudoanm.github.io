# Games / Puzzle / Maze

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Maze"         # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Maze/
  index.tsx            # Entry component — canvas renderer, size slider, solve animation
  maze.ts              # Pure logic — grid creation, maze generation, BFS solver
  constants.ts         # DEFAULT/MIN/MAX size, CELL_SIZE, WALL_THICKNESS
  types.ts             # Cell, Pos types
```

## Gameplay

Maze generates a random perfect maze rendered to a canvas, with a size slider
from 5×5 to 20×20. Use "New Maze" to regenerate, and "Solve" to animate the
shortest path from the top-left (blue) to bottom-right (red) cell. Keyboard: `R`
new maze, `S` solve, `Esc` close.

## Logic

- `generateMaze(rows, cols)` runs the recursive-backtracker: a DFS stack carves
  `walls` between unvisited neighbours in random order until every cell is
  visited.
- `solveMaze(grid, start, end)` performs BFS tracking `parent` pointers, then
  unshifts the chain from end to start to rebuild the shortest path (or returns
  null if unreachable).
- `index.tsx` redraws the canvas in a `useEffect` whenever `grid` or `path`
  changes, painting walls per cell and highlighting the path (green) as it is
  revealed cell-by-cell at `600 / size` ms per step.

## Routes

```tsx
// src/app/(products)/games/puzzle/page.tsx        — category listing
// src/app/(products)/games/puzzle/maze/page.tsx   — tool
```

## Registration

- `data/games.csv` → `Puzzle` section, `toolId: 'maze'`

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
