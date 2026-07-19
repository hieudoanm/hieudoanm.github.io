# Games / Casino / Poker

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Poker"        # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Poker/
  index.tsx                     # Entry component — pick hand/board, run simulation
  types.ts                      # Card, Suit, Results, Outcome types
  constants.ts                  # Ranks, suits, symbols, HAND_NAMES, ITERATIONS
  utils/poker.ts                # handRank, bestHand7, runSimulation
  components/
    CardPicker.tsx              # Grid of 52 cards to fill hand/board slots
    CardChip.tsx                # Small rendered card chip
    MeterBar.tsx                # Coloured equity progress bar
```

## Gameplay

Texas Hold'em equity calculator. Pick your two hole cards and at least the
three-card flop, choose the number of players (2–9), then run a Monte Carlo
simulation to get your win, tie, and equity percentages.

## Logic

- `handRank` — scores a 5-card hand 1–10 (high card through royal flush),
  handling flushes, straights, and the wheel (A–5) straight
- `bestHand7` — evaluates all 21 5-card combos of a 7-card hand and returns the
  best rank
- `runSimulation` — deals random boards to the hero and hands to `players − 1`
  villains over `ITERATIONS` (5000) trials, counting outright wins and ties
- `equity` in `index.tsx` is `(win + tie / 2) / ITERATIONS`; `ready` requires a
  full hand and at least the flop

## Routes

```tsx
// src/app/(products)/games/casino/page.tsx          — category listing
// src/app/(products)/games/casino/poker/page.tsx    — tool
```

## Registration

- `data/games.csv` → `Casino` section, `toolId: 'poker'`

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
