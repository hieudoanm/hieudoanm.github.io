# Games / Memory / PiNumber

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Pi"           # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
PiNumber/
  index.tsx            # Entry component — scrolling π digit viewport
  usePiGame.ts         # Game hook: index, mode, game state
  keyHandlers.ts       # Pure key dispatch: practice/game handling
  constants.ts         # Digit width, high-score key, Mode type
  __tests__/
    Pi.test.tsx        # Component tests
    usePiGame.test.ts  # Hook behaviour tests
```

## Gameplay

The digits of π stream through a fixed viewport. In practice mode you navigate
with the arrow keys; in game mode you type the next digit. A wrong digit locks
the game and records the furthest digit reached as a high score, persisted
across sessions.

## Logic

- `usePiGame` splits the `PI` string (from `memory/data/pi.ts`) into a digit
  array and tracks `index`, `mode` (`'practice' | 'game'`), and `GameState`
  (`locked`, `lastResult`, `revealedIndex`, `highScore`)
- `handlePracticeKey` clamps `index` navigation to `[0, digits.length - 1]`;
  `handleEscape` closes the game on `Escape`
- `handleGameKey` only accepts `/^[0-9.]$/`; on a correct digit it reveals the
  digit and advances the index after 200ms; on a wrong digit it locks the game,
  stores `Math.max(highScore, index)` under `HIGH_SCORE_KEY` in `localStorage`
- `getHighScore` reads the stored value safely (returns 0 when `window` is
  undefined or the value is NaN); `retry` resets index + state, and
  `switchToGame` starts a fresh game run
- `VIEWPORT_OFFSET` and `DIGIT_WIDTH` drive the scrolling `left` style so the
  current digit sits centred in the viewport

## Routes

```tsx
// src/app/(products)/games/memory/page.tsx          — category listing
// src/app/(products)/games/memory/pi/page.tsx       — tool
```

## Registration

- `data/games.csv` → `Memory` section, `toolId: 'pi'`

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
