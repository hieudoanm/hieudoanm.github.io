# Games / Arcade / Snake

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Snake"        # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Snake/
  index.tsx            # Entry component — grid render, loop, input, HUD
  constants.ts         # GRID size, tick timing constants
  types.ts             # Cell, Dir, Pos types
  utils/
    snake.ts           # Pure logic: randomFood, initSnake, direction helpers
```

## Gameplay

Classic snake on a 12×12 grid. Arrow keys steer; eating food grows the snake and
adds a point; hitting a wall or your own body ends the game. Space/P toggles
pause, a 1–5 speed slider sets the tick rate, and the head/food are colour-coded
on a responsive grid (no wrap-around — walls are lethal).

## Logic

- `initSnake` returns 3 segments centred on the grid; `NEXT` maps each direction
  to a row/column delta and `OPPOSITE` blocks 180° reversals
- `randomFood` builds a pool of cells not occupied by the snake and picks one
  uniformly; if the pool is empty the game is over (board full = win)
- Tick interval = `max(MIN_TICK, TICK_BASE - (speed - 1) * TICK_DECAY)`
  (60–180ms)
- `changeDir` rejects turning into the current opposite direction via `dirRef`;
  `buildGrid` derives a `Cell[][]` from snake + food for rendering

## Routes

```tsx
// src/app/(products)/games/arcade/page.tsx         — category listing
// src/app/(products)/games/arcade/snake/page.tsx   — tool
```

## Registration

- `data/games.csv` → `Arcade` section, `toolId: 'snake'`

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
