# Games / Word / Wordle

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Wordle"       # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Wordle/
  index.tsx            # Entry component — guess grid, input, validation
```

## Gameplay

Wordle-style guess-the-word game. The target is a random word drawn from the
shared word list (length varies per game), shown as a hint in the placeholder. A
guess must match the target's length and exist in the word list, otherwise a
message explains why it was rejected. Each submitted guess is colour-coded per
letter (correct / present / absent) in a 6-attempt grid; New Game picks a fresh
target.

## Logic

- `words` is imported from `word/data/wordle.ts` (a ~10k-word list) and cached
  in a `WORD_SET` for O(1) validity checks; `MAX_ATTEMPTS` is 6
- `checkGuess` maps each letter to `'correct'` (exact position), `'present'` (in
  the target elsewhere), or `'absent'` — a per-position, non-greedy lookup
- `submitGuess` validates length and word-list membership, appends the result,
  and ends the game on a match or after 6 guesses (revealing the answer)
- `renderGrid` builds the 6×N grid from submitted guesses plus the in-progress
  row; state is all `useState` in `index.tsx`

## Routes

```tsx
// src/app/(products)/games/word/page.tsx        — category listing
// src/app/(products)/games/word/wordle/page.tsx — tool
```

## Registration

- `data/games.csv` → `Word` section, `toolId: 'wordle'`

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
