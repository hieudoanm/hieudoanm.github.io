# Games / Tic-Tac-Toe / Classic

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Classic"      # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Classic/
  index.tsx            # Entry component — 3×3 board, turns, win/draw detection
  utils.ts             # Types + WIN combos (no UI imports)
  __tests__/
    Classic.test.tsx   # Render, clicks, undo, winner, draw
```

## Gameplay

Traditional 3×3 tic-tac-toe for two players. X moves first and players alternate
placing their mark in an empty cell; the first to line up 3 marks in a row wins,
and a full board with no line is a draw. Winning cells are highlighted, and the
current player is color-coded (X = info, O = error). Reset clears the board and
Undo takes back the last move (disabled once the game ends).

## Logic

- `utils.ts` exports the `Player`, `Cell`, `Board`, `Move`, and `WinResult`
  types plus `WIN`, the 8 winning line combinations.
- `checkWinner(b)` scans `WIN` and returns `{ player, cells }` for the first
  matching combo, otherwise `null`.
- `isBoardFull(b)` detects a draw (`!winner && board full`).
- `handleClick(i)` guards occupied cells and game-over, writes the current
  player's mark, and alternates turns only while the game continues.
- `undo()` pops the last `Move`, clears its cell, and restores the previous
  player; `reset()` returns all state to the opening position.

## Routes

```tsx
// src/app/(products)/games/tic-tac-toe/page.tsx          — category listing
// src/app/(products)/games/tic-tac-toe/classic/page.tsx  — tool
```

## Registration

- Not registered in data/games.csv
- Tool route: `src/app/(products)/games/tic-tac-toe/classic/page.tsx`

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
