# Games / Countries / Border

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Border"       # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Border/
  index.tsx            # Entry component — multiple-choice neighbour guessing
  borders.ts           # borders map: country name -> neighbour country names
```

## Gameplay

A country's flag and name are shown with four neighbour options. Pick the
country that actually borders it to score; a wrong pick reveals the full
neighbour list and resets the streak. Enter/space advances to the next round.

## Logic

- `borders` (borders.ts) maps each country name to an array of bordering
  countries; entries with fewer than 2 neighbours (island nations) are excluded
- `pickQuestion` picks a random country from `POOL` (top 80 by rank with ≥ 2
  borders), selects a random correct neighbour, and fills the other 3 options
  (`OPTIONS_COUNT = 4`) from non-neighbour countries, then shuffles
- `guess` increments `score`/`games`, updates `streak`/`bestStreak` on a hit and
  resets streak + sets `revealed` on a miss; further clicks are blocked once
  `message` is set
- Keyboard: `1`–`4` guess, `Enter`/` ` next, `Escape` close

## Routes

```tsx
// src/app/(products)/games/countries/page.tsx          — category listing
// src/app/(products)/games/countries/countries-border/page.tsx — tool
```

## Registration

- `data/games.csv` → `Countries` section, `toolId: 'countries-border'`

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
