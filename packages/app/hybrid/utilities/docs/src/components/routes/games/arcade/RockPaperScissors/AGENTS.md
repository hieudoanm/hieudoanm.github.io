# Games / Arcade / RockPaperScissors

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "RockPaperScissors" # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
RockPaperScissors/
  index.tsx            # Entry component — choice picker, scoreboard, keys
  utils.ts             # Pure rules: CHOICES, BEATS, play, randomChoice
```

## Gameplay

Best-of-session Rock–Paper–Scissors against a random bot. Pick a choice via the
buttons or keys `1`–`3`; the bot picks randomly and the round resolves to win /
lose / draw. The header tracks score, games played (with win %), current streak,
and best streak. `R` resets the session, `Esc` closes.

## Logic

- `CHOICES` defines the three options with emoji/label; `BEATS` records the
  winning relationship (`rock` beats `scissors`, etc.)
- `play(player, computer)` returns `'draw'` when equal, `'win'` when
  `BEATS[player] === computer`, else `'lose'`
- `randomChoice` picks uniformly from `CHOICES`
- `handleChoice` in `index.tsx` computes the result, increments `games`, adds to
  `score` on a win, and bumps `streak` (reset to 0 on a loss), keeping
  `bestStreak` at the running max

## Routes

```tsx
// src/app/(products)/games/arcade/page.tsx       — category listing
// src/app/(products)/games/arcade/rps/page.tsx   — tool
```

## Registration

- `data/games.csv` → `Arcade` section, `toolId: 'rps'`

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
