# Apps / Text - Convert / Morse

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Morse/
  index.tsx            # Entry component — input, output, play, copy, .morse
  constants.ts         # morse map (code + pattern) and SAMPLES
  utils/
    morse.ts           # Pure logic — morsify, playMorse
  __tests__/
    Morse.test.tsx     # Component behaviour tests
    morse.test.ts      # Pure function tests
```

## Overview

Morse converts typed text into International Morse code, with an audio player
that beeps the code out loud, copy-to-clipboard, download as a `.morse` file,
and a toggleable character map showing code and pattern for each supported
character.

## Logic

- `morse` (constants.ts) maps letters, digits, punctuation, and space (code `/`)
  to `{ code, pattern }` records.
- `morsify` maps each char via `morse[ch.toLowerCase()]?.code ?? ''`, filters
  out unmapped characters, and joins codes with single spaces.
- `playMorse` schedules WebAudio beeps (600 Hz oscillator, unit = 0.08 s): dot =
  1 unit, dash = 3 units, letter gap = 3 units, word gap (`/`) = 7 units, then
  calls `onDone` after the total duration.
- `Morse` counts `symbolCount` excluding spaces and slashes, disables Play while
  playing, and only lists characters present in the input in the char map.

## Routes

```tsx
// src/app/(products)/apps/text-convert/page.tsx            — category listing
// src/app/(products)/apps/text-convert/morse/page.tsx      — tool
```

## Registration

- `data/apps.csv` → `Text - Convert` section, `toolId: 'morse'`

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
