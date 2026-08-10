# Games / Tic-Tac-Toe / Reverse

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Reverse"      # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Reverse/
  index.tsx            # Entry component — first 3 in a row loses
  utils.ts             # Types + WIN combos (no UI imports)
  __tests__/
    Reverse.test.tsx   # Render, clicks, undo, loser
```

## Gameplay

Reverse tic-tac-toe: X and O alternate placing marks normally, but the player
who first completes 3 in a row loses. The losing line is highlighted in red, and
a full board with no line is a draw — meaning nobody lost. Undo restores the
previous player's turn and is blocked once the game has ended.

## Logic

- `utils.ts` exports the types — `LoseResult` carries `{ player, cells }` — and
  the `WIN` combos.
- `checkLoser(b)` returns the losing `player` and the matching cells for the
  first `WIN` combo of three equal marks, otherwise `null`.
- `handleClick(i)` guards occupied cells and game-over, places the current mark,
  then sets `loser`, else `isDraw` when `isBoardFull(b)`, else alternates X ↔ O.
- `undo()` pops the last `Move` and restores `last.player` as current.
- `reset()` returns to an empty board with X to move.

## Routes

```tsx
// src/app/(products)/games/tic-tac-toe/page.tsx          — category listing
// src/app/(products)/games/tic-tac-toe/reverse/page.tsx  — tool
```

## Registration

- Not registered in data/games.csv
- Tool route: `src/app/(products)/games/tic-tac-toe/reverse/page.tsx`

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
