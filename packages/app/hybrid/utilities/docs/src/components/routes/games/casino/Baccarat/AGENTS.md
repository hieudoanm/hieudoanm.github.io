# Games / Casino / Baccarat

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Baccarat"     # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Baccarat/
  index.tsx            # Entry component — bet phase + result phase with credits
  game.ts              # Deck build/shuffle, card/hand value, draw rules
  constants.ts         # Suits, ranks, Card type, Bet/Phase types, payouts
```

## Gameplay

Bet on Player, Banker, or Tie, then deal. Two cards each; a natural 8 or 9 ends
the round immediately, otherwise third-card draw rules apply. The hand closest
to 9 wins, and credits pay out at 2:1 (player), 1.95:1 (banker), or 8:1 (tie).
Starting credits are 200 with a 10-credit bet per round.

## Logic

- `createDeck` — builds a 6-deck shoe (`DECK_COUNT`); `shuffle` is Fisher–Yates
- `cardValue` — A = 1, face cards = 0, otherwise pip value
- `handValue` — sum of card values mod 10
- `playerDrawRule` — player draws on a total ≤ 5
- `bankerDrawRule` — full banker third-card table, depending on the player's
  third card (e.g. draws on 3 unless the player's card is an 8)
- `shouldDrawThird` — generic helper; `PAYOUTS` in constants mirrors the win
  amounts in `index.tsx` (20 / 19 / 80)

## Routes

```tsx
// src/app/(products)/games/casino/page.tsx          — category listing
// src/app/(products)/games/casino/tai-baccarat/page.tsx — tool
```

## Registration

- `data/games.csv` → `Casino` section, `toolId: 'tai-baccarat'`

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
