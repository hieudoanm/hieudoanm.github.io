# Games / Casino / SlotMachine

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "SlotMachine"  # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
SlotMachine/
  index.tsx            # Entry component — 3 reels, spin animation, credits
  game.ts              # randomSymbols, calcWinnings
  constants.ts         # SymbolDef, multipliers, spin duration/timing
```

## Gameplay

Spin three reels at a 10-credit bet. Matching all three reels pays the bet times
the symbol's multiplier; a pair pays half the multiplier. Symbols range from
cherry (2×) up to jackpot (50×). Start with 100 credits, press Space to spin and
Escape to close.

## Logic

- `randomSymbols` — returns 3 random symbol indices for the reels
- `calcWinnings` — all-same reels pay `bet * multiplier`; a single pair pays
  `bet * multiplier * 0.5`; otherwise 0
- `SPIN_DURATION` (800ms) / `TICK_INTERVAL` (60ms) drive the `tick` animation
  loop in `index.tsx`, which swaps random reels until it locks in the target
- `INITIAL_CREDITS` (100) and `BET_AMOUNT` (10) live in constants

## Routes

```tsx
// src/app/(products)/games/casino/page.tsx          — category listing
// src/app/(products)/games/casino/slot-machine/page.tsx — tool
```

## Registration

- `data/games.csv` → `Casino` section, `toolId: 'slot-machine'`

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
