# Games / Countries / EmojiGuesser

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "EmojiGuesser" # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
EmojiGuesser/
  index.tsx            # Entry component — pick the flag that matches the name
```

## Gameplay

A country's name is shown and four flag-emoji buttons are offered. Pick the flag
belonging to that country to score; a wrong pick reveals the correct country and
ends the streak. Enter/space advances to the next country.

## Logic

- `POOL` is the top 80 ranked countries (falling back to the full list)
- `pickOptions(correct)` picks 3 decoy countries (excluding ones sharing the
  correct name or flag), merges in the correct country, and shuffles — so the
  correct flag is guaranteed to be one of the 4 options
- `guess(flag)` compares against `current.flag`, increments `score` and
  `streak`/`bestStreak` on a hit, or resets the streak and sets `revealed` on a
  miss; further input is blocked while `message` is set
- `nextRound` draws a new country and rebuilds its options
- Keyboard: `1`–`4` guess, `Enter` next, `Escape` close

## Routes

```tsx
// src/app/(products)/games/countries/page.tsx          — category listing
// src/app/(products)/games/countries/emoji-guesser/page.tsx — tool
```

## Registration

- `data/games.csv` → `Countries` section, `toolId: 'emoji-guesser'`

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
