# Games / Tic-Tac-Toe / Duck

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Duck"         # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Duck/
  index.tsx            # Entry component — two-phase turn (mark, then duck)
  utils.ts             # Types + WIN combos (no UI imports)
  __tests__/
    Duck.test.tsx      # Render, clicks, undo, winner
```

## Gameplay

Like classic tic-tac-toe, but each turn is split into two phases. A player first
places their mark, then moves the Duck to any empty cell that is not the cell
just marked. The Duck blocks its cell for the rest of the game (no mark may be
placed on it), so it is used to defend an opponent's threat. 3 marks in a row
still wins; a full board with no line is a draw.

## Logic

- `utils.ts` exports the types — `Move` carries
  `{ player, markIdx, duckFrom, duckTo }` — and the `WIN` combos.
- `Phase = 'mark' | 'duck'` drives the turn; `pendingMark` holds the cell placed
  in the mark phase.
- `isEmpty(i)` treats a cell as playable only when `board[i] === null` and the
  duck is not on it.
- `handleCellClick(i)` branches by phase: the mark phase stores `pendingMark`
  and switches to `'duck'`; the duck phase rejects the pending mark, occupied
  cells, and the duck's current cell, then records the `Move` and passes the
  turn.
- `checkWinner(b)` and `isBoardFull(b)` mirror the classic variant.
- `undo()` pops the last `Move` and restores `duckFrom`, returning to the mark
  phase; `reset()` clears all state.

## Routes

```tsx
// src/app/(products)/games/tic-tac-toe/page.tsx          — category listing
// src/app/(products)/games/tic-tac-toe/duck/page.tsx     — tool
```

## Registration

- Not registered in data/games.csv
- Tool route: `src/app/(products)/games/tic-tac-toe/duck/page.tsx`

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
