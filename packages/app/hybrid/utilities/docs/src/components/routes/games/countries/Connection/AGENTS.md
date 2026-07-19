# Games / Countries / Connection

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Connection"   # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Connection/
  index.tsx            # Entry component — NYT-style "Connections" board
  puzzles.ts           # Puzzle generation + hand-crafted puzzle bank
  types.ts             # Group and Puzzle interfaces
```

## Gameplay

Sixteen countries are shown on a grid. Group them into four sets of four that
share a hidden theme — e.g. Island Nations or Ends in "a". Submit sets of four,
take up to 4 mistakes, and get a "One away!" hint when a set is 3-of-4.

## Logic

- `getRandomPuzzle` returns a hand-crafted `HAND_CRAFTED` puzzle 40% of the
  time, otherwise delegates to `generatePuzzle`
- `generatePuzzle` builds four groups from the ranked countries list (Island
  Nations, Ends in "a", landlocked Eastern Africa, Mixed Bag) with non-overlap
  enforced via `pick4`/`pick4Except`
- `toggle` selects up to 4 countries (blocked once solved or game over);
  `submit` finds a group whose countries are all selected and unsolved, else
  counts a mistake — reaching `MAX_MISTAKES = 4` ends the game
- `oneAway` is true when a selected set matches 3 of 4 members of an unsolved
  group; `shuffle` re-randomises the grid via a Fisher–Yates shuffle
- Keyboard: `Enter` submit, `Escape` close

## Routes

```tsx
// src/app/(products)/games/countries/page.tsx          — category listing
// src/app/(products)/games/countries/countries-connection/page.tsx — tool
```

## Registration

- `data/games.csv` → `Countries` section, `toolId: 'countries-connection'`

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
