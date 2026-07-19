# Apps / Education / Pitch

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Pitch/
  index.tsx            # Entry component — piano keyboard + game UI
  constants.ts         # whiteKeys, blackKeys, levels (note pools), NODE_ENV
  keyClasses.ts        # whiteKeyClass/blackKeyClass feedback styling
  useAudio.ts          # useAudio — mp3 playback + ripple animation
  useGame.ts           # useGame — guess-the-note game state
  useSequence.ts       # useSequence — practice/song playback with highlight
  usePitchGame.ts      # usePitchGame — composes the hooks above
```

## Overview

Piano ear-training game. A random note plays and the player guesses it on the
on-screen keyboard; practice mode plays ascending white keys or Twinkle Twinkle
Little Star with the active key highlighted.

## Logic

- `useGame` tracks `target`, `score`, `highScore` (persisted in
  `localStorage['pitch-high-score']`), `feedback`, and `level`. Correct guesses
  flash green, add +1, and every 10 correct answers advance through the 11
  `levels` (growing note pools). A wrong guess shows the correct and wrong keys
  in red, saves the high score, and resets the round after 900ms.
- `nextRound` picks a random key from the current level's pool and calls
  `playTone`.
- `useSequence` plays `whiteKeys` (800ms each) or the imported `twinkleTwinkle`
  sequence, highlighting each key; it no-ops while `isPracticing`.
- `useAudio` plays `/audio/3/<id>.mp3` (dev) or `/hieudoanm/audio/3/<id>.mp3`
  (prod) and triggers a ripple.
- `usePitchGame` composes the three hooks and wires `whiteKeyClass`/
  `blackKeyClass` feedback colors from `keyClasses.ts`.

## Routes

```tsx
// src/app/(products)/apps/education/page.tsx        — category listing
// src/app/(products)/apps/education/pitch/page.tsx  — tool
```

## Registration

- `data/apps.csv` → `Education` section, `toolId: 'pitch'`

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. State management: `useState`/`useReducer` for local, React Context for shared
4. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
5. Icons: `react-icons/pi` (Phosphor)
6. Each tool component receives `onClose: () => void` prop
7. Keep files under 200 lines, functions under 30 lines
8. Pure logic in `utils.ts` — never mix UI and business logic
9. Test behaviour, not implementation — Jest + Testing Library
10. `APP_SECTIONS` consumes `data/apps.json` — never hardcode app sections in
    components
