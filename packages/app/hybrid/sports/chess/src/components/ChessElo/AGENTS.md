# Games / Chess / ChessElo

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Elo"          # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
ChessElo/
  index.tsx            # Entry component — Rating / Performance tabs
  RatingTab.tsx        # Single-game Elo update calculator
  PerformanceTab.tsx   # Multi-game performance rating calculator
  types.ts             # Formula, GameRow types
```

## Gameplay

Two Elo calculators behind a tab bar. The Rating tab takes your rating, opponent
rating, and result (win/draw/loss) and computes the new rating. The Performance
tab lists games — each an opponent rating plus score — and computes a
performance rating from the batch.

## Logic

- All math lives in `@chess/ts`: `calculateRating(formula)` (used by
  `RatingTab`) and `calculatePerformance({ games })` (used by `PerformanceTab`);
  the components only collect and display inputs
- `Formula` carries the FIDE flags (`lessThan30Games`, `overRating2400`,
  `overAge18`) and `timeClass`, initialised in `index.tsx`
- `updateGame` in `index.tsx` merges one field into a `GameRow` by index;
  `addGame` appends a default draw at 1800

## Routes

```tsx
// src/app/(products)/games/chess/page.tsx          — category listing
// src/app/(products)/games/chess/chess-elo/page.tsx — tool
```

## Registration

- `data/games.csv` → `Chess` section, `toolId: 'chess-elo'`

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
