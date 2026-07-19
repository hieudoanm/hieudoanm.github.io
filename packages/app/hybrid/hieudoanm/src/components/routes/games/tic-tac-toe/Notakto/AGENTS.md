# Games / Tic-Tac-Toe / Notakto

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Notakto"      # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Notakto/
  index.tsx            # Entry component — place Xs, first 3 in a row loses
  utils.ts             # Types + WIN combos (no UI imports)
  __tests__/
    Notakto.test.tsx   # Render, clicks, undo, loser
```

## Gameplay

Misère tic-tac-toe played with only X marks on a single 3×3 board. Players 1 and
2 alternate placing an X, and whoever completes a row of 3 Xs loses the game. If
the board fills up without a line, the game is a draw. The losing line is
highlighted in red; Reset and Undo behave as in the other variants.

## Logic

- `utils.ts` exports the single-symbol types — `Cell = 'X' | null`, `Board`,
  `Move { idx }`, `LoseResult { cells }` — and the `WIN` combos.
- `createBoard()` returns 9 empty cells.
- `checkLoser(b)` returns `{ cells }` for the first `WIN` combo of three Xs,
  otherwise `null`.
- `handleCellClick(i)` places an X, then sets `loser` if a line formed, else
  `isDraw` when the board is full, else toggles the player between 1 and 2.
- `undo()` removes the last move and toggles the player back; both undo and
  further moves are blocked once `loser` or `isDraw` is set.
- `reset()` restores the opening board and player 1's turn.

## Routes

```tsx
// src/app/(products)/games/tic-tac-toe/page.tsx          — category listing
// src/app/(products)/games/tic-tac-toe/notakto/page.tsx  — tool
```

## Registration

- Not registered in data/games.csv
- Tool route: `src/app/(products)/games/tic-tac-toe/notakto/page.tsx`

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
