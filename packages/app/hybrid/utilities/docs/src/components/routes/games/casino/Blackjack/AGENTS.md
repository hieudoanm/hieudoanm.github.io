# Games / Casino / Blackjack

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Blackjack"    # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Blackjack/
  index.tsx            # Entry component — keyboard-driven card-counting trainer
  utils.ts             # Card type, Hi-Lo values, shuffled 52-card deck
```

## Gameplay

This is a Hi-Lo card-counting trainer, not a playable blackjack hand. Cards are
dealt one at a time from a shuffled deck; press Tab to deal, Space to reveal the
running count, and R to reset. Track the running Hi-Lo count as the deck is
exhausted, then reset to shuffle a fresh deck.

## Logic

- `hiLoValue` — ranks 2–6 score +1, 7–9 score 0, and 10/J/Q/K/A score −1
- `newDeck` — builds a shuffled 52-card deck with the Hi-Lo `value` precomputed
  on each card
- `isRed` — true for hearts and diamonds (drives the red card styling)
- `dealCard` in `index.tsx` accumulates the running `count` and marks the deck
  finished when empty

## Routes

```tsx
// src/app/(products)/games/casino/page.tsx          — category listing
// src/app/(products)/games/casino/blackjack/page.tsx — tool
```

## Registration

- `data/games.csv` → `Casino` section, `toolId: 'blackjack'`

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
