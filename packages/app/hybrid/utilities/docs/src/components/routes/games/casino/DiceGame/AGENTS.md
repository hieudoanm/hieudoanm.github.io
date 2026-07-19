# Games / Casino / DiceGame

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "DiceGame"     # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
DiceGame/
  index.tsx            # Entry component — bet phase, 600ms roll animation, result
  game.ts              # Roll, payouts, playRound outcome logic
```

## Gameplay

Two dice are rolled each round. Bet on under 7 (2:1), exactly 7 (5:1), or over 7
(2:1). After a brief rolling animation the dice land, the total is shown, and
winnings (or a loss) are applied to your credits. Start with 200 credits at a
fixed 10-credit bet per round.

## Logic

- `roll` — returns a random die face 1–6
- `getPayout` — `seven` pays 50, `under`/`over` pay 20 (for a 10-credit bet)
- `playRound` — rolls both dice, compares the total to the bet, and returns a
  `RoundOutcome` of `dice`, `won`, and `result` ('win' | 'lose')
- `INITIAL_CREDITS` (200), `BET_AMOUNT` (10), and `DICE_FACES` (unicode die
  glyphs) are exported from `game.ts`; `doRoll` in `index.tsx` applies the
  timeout and credit updates

## Routes

```tsx
// src/app/(products)/games/casino/page.tsx          — category listing
// src/app/(products)/games/casino/dice-game/page.tsx — tool
```

## Registration

- `data/games.csv` → `Casino` section, `toolId: 'dice-game'`

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
