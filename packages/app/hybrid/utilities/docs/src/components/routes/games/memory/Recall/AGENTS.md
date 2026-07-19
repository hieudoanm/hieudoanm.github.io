# Games / Memory / Recall

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Recall"       # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Recall/
  index.tsx            # Entry component — digit memorization & recall
  useRecall.ts         # Game hook: phases, level, timer, scoring
  useHighStreak.ts     # Persisted best-streak hook (localStorage)
  constants.ts         # Timing constants + pure digit helpers
  __tests__/
    Recall.test.tsx        # Component tests
    useHighStreak.test.ts  # Persistence tests
    useRecall.test.ts      # Hook behaviour tests
```

## Gameplay

A random number is shown briefly, then hidden behind a countdown. Type it back
before the reveal window ends; correct recalls level up and grow the number by
one digit, mistakes highlight the wrong digits and restart at level 1. A best
streak is saved across sessions.

## Logic

- `generateNumber(length)` builds a random digit string; `chunkDigits` groups
  digits in threes for display; `highlightMistakes` wraps wrong digits in a red
  `<span>` for the result message
- `useRecall` drives a `Phase` machine
  (`'ready' | 'show' | 'input' | 'result'`); `startRound` sets the show duration
  via `clamp(level * TIME_PER_DIGIT, MIN_TIME, MAX_TIME)` and runs a countdown
  interval plus a `setTimeout` that flips to `input` phase
- `submit` compares `input === number`: on success it levels up and calls
  `updateHighStreak(level)`; on failure it resets to level 1 and builds the
  highlighted diff message; `next`/`start` restart a round
- `useHighStreak` reads/writes the `highStreak` key in `localStorage` (guarded
  for SSR), keeping the max of stored and current
- Keyboard: `Enter` start/next, `Escape` close; the input also offers a mask
  toggle (`setMask`) for privacy

## Routes

```tsx
// src/app/(products)/games/memory/page.tsx          — category listing
// src/app/(products)/games/memory/recall/page.tsx   — tool
```

## Registration

- `data/games.csv` → `Memory` section, `toolId: 'recall'`

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
