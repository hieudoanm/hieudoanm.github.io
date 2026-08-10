# Games / Arcade / DinoRun

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "DinoRun"      # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
DinoRun/
  index.tsx            # Entry component — canvas game loop, input, HUD
  game.ts              # Pure simulation: spawn, tick, collision, drawing
  constants.ts         # Physics/tuning constants (gravity, speeds, sizes)
  types.ts             # Dino, Obstacle, Cloud, Star, Phase types
```

## Gameplay

Infinite runner on a 320×320 canvas. The dino auto-runs and gains speed over
time; the player jumps (Space / click / ArrowUp) over obstacles — cacti, rocks,
and birds. Landing on an obstacle ends the round; the score (frames/10) and best
score are tracked, with `R` to restart and `Esc` to close.

## Logic

- `createDino` / `createObstacle` / `createCloud` / `createStar` build the
  initial entities; obstacles pick a random type from cactus/rock/bird
- `jump` only applies vertical velocity when the dino is on the ground (prevents
  mid-air double jumps)
- `tick` applies `GRAVITY`, moves entities left by `speed`, spawns a new
  obstacle when the gap counter hits 0, and returns a fresh immutable state
- `checkCollision` uses AABB with a 6px shrink on each side (forgiving hitbox)
- `index.tsx` runs a `requestAnimationFrame` loop mutating refs; speed rises by
  `SPEED_INCREMENT` per frame up to `MAX_SPEED`; collision flips phase to 'over'
  and updates `highScore`

## Routes

```tsx
// src/app/(products)/games/arcade/page.tsx         — category listing
// src/app/(products)/games/arcade/dino-run/page.tsx — tool
```

## Registration

- `data/games.csv` → `Arcade` section, `toolId: 'dino-run'`

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
