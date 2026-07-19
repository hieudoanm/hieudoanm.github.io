# Games / Tic-Tac-Toe / T3

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "TicTacToe"    # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
T3/
  index.tsx            # Entry component — max 3 active marks, oldest disappears
  utils.ts             # Types + WIN combos (no UI imports)
  __tests__/
    TicTacToe.test.tsx # Render, clicks, undo, winner
```

## Gameplay

3×3 tic-tac-toe where each player may hold at most 3 active marks. Placing a 4th
mark makes that player's oldest mark disappear from the board, so a winning line
must be formed within a moving window of three marks. The mark that would
disappear next is shown faded. First to line up 3 in a row wins; Reset and Undo
work as in the other variants.

## Logic

- `utils.ts` exports the types (`Player`, `Board`, `Move`, `WinResult`) and the
  `WIN` combos.
- `history: { X: number[]; O: number[] }` records each player's active mark
  indices; `handleClick(i)` appends to the current player's list and, when its
  length exceeds 3, `shift()`s the oldest index, clears that cell, and removes
  the matching `Move`.
- `checkWinner(b)` scans `WIN` and returns `{ player, cells }`.
- `aboutToDisappear` is `history[current][0]` when the current player already
  holds 3 marks; that cell renders at 30% opacity.
- `undo()` removes the last `Move` and its index from history, restoring the
  previous player; `reset()` clears board, history, and moves.

## Routes

```tsx
// src/app/(products)/games/tic-tac-toe/page.tsx          — category listing
// src/app/(products)/games/tic-tac-toe/t3/page.tsx       — tool
```

## Registration

- Not registered in data/games.csv
- Tool route: `src/app/(products)/games/tic-tac-toe/t3/page.tsx`

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
