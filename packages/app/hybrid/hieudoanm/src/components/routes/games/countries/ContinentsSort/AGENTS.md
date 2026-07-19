# Games / Countries / ContinentsSort

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "ContinentsSort" # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
ContinentsSort/
  index.tsx            # Entry component — drag-and-drop continent sorter
```

## Gameplay

Fifteen country cards must be dragged from a pool into one of five continent
buckets (Africa, Europe, Asia, Oceania, Americas). Correct drops score a point
and tint the card green; wrong drops show the correct continent in a message.
The game ends once every card is placed.

## Logic

- `REGIONS`/`REGION_MAP` map country data `region` values to the five continent
  buckets; `POPULAR` filters ranked countries and `pickCountries(15)` draws a
  random 15
- Each `Card` stores `correctRegion` (from `REGION_MAP`) plus a nullable
  `placedIn`; `unplaced` cards are the draggable pool
- `onDrop(region)` places the `dragging` card into its bucket, increments
  `score` on a correct match or `mistakes` on a wrong one, and triggers
  `gameOver` once `placedCount + 1 === cards.length`
- Buckets render dropped cards tinted green (correct) or struck-through red
  (wrong); `reset` deals a fresh 15-card hand
- Keyboard: `Escape` close (drag-and-drop requires a pointer)

## Routes

```tsx
// src/app/(products)/games/countries/page.tsx          — category listing
// src/app/(products)/games/countries/countries-continents-sort/page.tsx — tool
```

## Registration

- `data/games.csv` → `Countries` section, `toolId: 'countries-continents-sort'`

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
