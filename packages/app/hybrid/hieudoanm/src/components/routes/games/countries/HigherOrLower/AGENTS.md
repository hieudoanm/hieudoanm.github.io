# Games / Countries / HigherOrLower

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "HigherOrLower" # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
HigherOrLower/
  index.tsx            # Entry component — population comparison cards
  population.ts        # population map: country name -> population count
```

## Gameplay

Two country cards are shown and the player must pick which has the larger
population. The chosen side is revealed after each guess — correct picks score,
wrong picks reset the streak. Enter/space deals the next pair.

## Logic

- `population` (population.ts) maps country names to population counts; `POOL`
  filters the ranked countries to those present in the map
- `pickPair` draws two distinct random countries (a `while` loop guarantees the
  right card differs from the left)
- `guess(side)` compares `leftPop >= rightPop` — a tie is accepted as correct
  for either side — then increments `score`/`games` and updates
  `streak`/`bestStreak`; `revealed` blocks further guesses on the round
- `formatNum` renders counts as compact `B`/`M`/`K` strings, shown once revealed
- Keyboard: `←`/`1` and `→`/`2` pick a side, `Enter`/` ` next, `Escape` close

## Routes

```tsx
// src/app/(products)/games/countries/page.tsx          — category listing
// src/app/(products)/games/countries/countries-higher-lower/page.tsx — tool
```

## Registration

- `data/games.csv` → `Countries` section, `toolId: 'countries-higher-lower'`

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
