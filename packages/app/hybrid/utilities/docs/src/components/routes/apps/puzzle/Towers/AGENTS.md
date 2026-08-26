# Games / Puzzle / Towers

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Towers"       # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Towers/
  index.tsx            # Entry component — 3 pegs, disk slider, FLIP animations
  constants.ts         # MIN/MAX_DISKS + disk gradient/text style maps
  types.ts             # Tower, Move types
  utils/
    towers.ts          # Pure logic — recursive Hanoi move generation
    __tests__/         # Unit tests for move generation
```

## Gameplay

Towers is the Tower of Hanoi with 3 to 7 disks on three pegs. Click a peg to
pick up its top disk, then click a target peg to drop it (larger disks may not
rest on smaller ones). Move the whole stack to the rightmost peg; a banner
reports the move count against the optimal `2^n − 1`. Keys: `1/2/3` select, `U`
undo, `R` redo, `A` auto-solve, `Esc` close.

## Logic

- `generateMoves(n, from, to, aux)` builds the optimal solution as a `Move[]` of
  `[from, to]` pairs using the classic recursive Hanoi decomposition.
- `index.tsx` manages state via `useReducer` (`gameReducer`): `canDrop` enforces
  the size rule, `MOVE_DISK` pushes undo history and clears redo, `UNDO`/`REDO`
  walk `history`/`future`, and `APPLY_MOVE` animates auto-solve steps.
- Disks are animated with FLIP: `useLayoutEffect` animates from the previous
  bounding rect, invalid drops shake the target peg, and `autoSolve` dispatches
  solution moves at 500 ms intervals.

## Routes

```tsx
// src/app/(products)/games/puzzle/page.tsx         — category listing
// src/app/(products)/games/puzzle/towers/page.tsx  — tool
```

## Registration

- `data/games.csv` → `Puzzle` section, `toolId: 'towers'`

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
