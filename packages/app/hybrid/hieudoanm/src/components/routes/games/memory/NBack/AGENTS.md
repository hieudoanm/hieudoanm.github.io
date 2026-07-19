# Games / Memory / NBack

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "NBack"        # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
NBack/
  index.tsx            # Entry component — 3×3 n-back stimulus grid
  constants.ts         # Grid/stimulus timing and difficulty constants
```

## Gameplay

A letter appears in one cell of a 3×3 grid for each stimulus. Press **A** when
the current position matches what you saw _n_ steps earlier, **L** otherwise.
Each stimulus auto-advances after a short reveal, and the run ends with hits,
misses, false alarms, and an accuracy score.

## Logic

- `generateTrials(n, count)` builds `TOTAL_STIMULI = 20` trials; each has a
  random position + letter, and with 30% probability the position matches the
  trial _n_-back (with a 50/50 chance the letter matches too)
- `isTarget` is true when a trial's position equals the trial `n`-back's
  position — this is the sole criterion for scoring
- `respond('match' | 'no-match')` records `hits`/`misses`/`falseAlarms` and
  advances to the next stimulus after `INTERVAL_DURATION` (500ms); unresponded
  targets are auto-counted as misses after `STIMULUS_DURATION` (1500ms) via the
  `useEffect` timer, which also ends the game at the final trial
- Accuracy is `hits / (hits + falseAlarms)`; `n` is switchable between 1, 2, 3
  (`DEFAULT_N = 2`); grid positions come from `GRID_POSITIONS`
- Keyboard: `A` match, `L` no-match, `Escape` close

## Routes

```tsx
// src/app/(products)/games/memory/page.tsx          — category listing
// src/app/(products)/games/memory/n-back/page.tsx   — tool
```

## Registration

- `data/games.csv` → `Memory` section, `toolId: 'n-back'`

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
