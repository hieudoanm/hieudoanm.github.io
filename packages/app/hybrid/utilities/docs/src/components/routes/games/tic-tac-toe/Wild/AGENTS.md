# Games / Tic-Tac-Toe / Wild

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Wild"         # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Wild/
  index.tsx            # Entry component — choose X or O each turn
  utils.ts             # Types + WIN combos (no UI imports)
  __tests__/
    Wild.test.tsx      # Render, clicks, undo, winner
```

## Gameplay

Tic-tac-toe where the active player (1 or 2) chooses to place either an X or an
O in an empty cell each turn. Both players can use both symbols, so a line can
be made of either mark. Getting 3 in a row wins for whichever player placed the
winning mark, and a full board with no line is a draw. The two symbol buttons
highlight the current selection.

## Logic

- `utils.ts` exports the types (`Player`, `Board`, `Move`, `WinResult`) and the
  `WIN` combos.
- `selectedMark: Player` ('X' | 'O') is set by the symbol buttons;
  `handleClick(i)` writes it to the board and records a
  `Move { player: selectedMark, idx: i }`.
- `checkWinner(b)` scans `WIN` and returns `{ player, cells }`.
- The winner banner maps the winning symbol to player 1 or 2 by searching the
  moves for the first placement of that mark.
- `isBoardFull(b)` detects a draw.
- `undo()` pops the last `Move`, clears its cell, and toggles the player back;
  `reset()` returns to an empty board, player 1, and an X selection.

## Routes

```tsx
// src/app/(products)/games/tic-tac-toe/page.tsx          — category listing
// src/app/(products)/games/tic-tac-toe/wild/page.tsx     — tool
```

## Registration

- Not registered in data/games.csv
- Tool route: `src/app/(products)/games/tic-tac-toe/wild/page.tsx`

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
