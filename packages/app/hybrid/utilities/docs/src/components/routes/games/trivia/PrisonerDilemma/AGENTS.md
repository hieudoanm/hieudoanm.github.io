# Games / Trivia / PrisonerDilemma

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "PrisonerDilemma" # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
PrisonerDilemma/
  index.tsx            # Entry component — UI, reducer, round flow
  constants.ts         # PAYOFF matrix, STRATEGIES, TOTAL_ROUNDS
  types.ts             # Move, Phase, Round, Strategy types
  utils/
    game.ts            # Pure logic: pickStrategy, chooseOpponent, formatScore
```

## Gameplay

A 10-round iterated prisoner's dilemma against a hidden bot strategy. Each round
the player cooperates or defects (`C`/`D` keys); a payoff matrix shows the
sentence outcome (1/1, 3/0, 0/3, 2/2 "years"). After the final round the bot's
strategy is revealed and the higher total score wins.

## Logic

- `PAYOFF[move][opponent]` returns `[player, opponent]` year values; the
  dominant-strategy defect/defect = 2/2 is the "dilemma" trap
- `pickStrategy` selects one of titfortat / alwaysdefect / alwayscooperate /
  grimtrigger / random at game start
- `chooseOpponent` decides the bot's move: tit-for-tat mirrors the last player
  move, grim trigger defects forever after the first player defect, random flips
  a coin
- `gameReducer` handles `SUBMIT_MOVE` (accumulate scores + history),
  `NEXT_ROUND` (end at `TOTAL_ROUNDS`), and `RESET`, driving phases
  `choose → reveal → done`

## Routes

```tsx
// src/app/(products)/games/trivia/page.tsx       — category listing
// src/app/(products)/games/trivia/pd/page.tsx    — tool
```

## Registration

- `data/games.csv` → `Trivia` section, `toolId: 'pd'`

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
