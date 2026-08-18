# Apps / Text - Convert / Braille

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Braille/
  index.tsx            # Entry component — input, output, copy, .brf, char map
  braille.ts           # Pure logic — braille map, braillify, downloadBrf, SAMPLES
  __tests__/
    Braille.test.tsx   # Component behaviour tests
    braille.test.ts    # Pure function tests
```

## Overview

Braille converts typed text into Braille output using a Unicode Braille map. It
offers copy-to-clipboard, download as a `.brf` file, one-click sample inputs,
and a toggleable character map showing the Unicode and dot pattern for each
supported character.

## Logic

- `braille` maps characters (a–z, 0–9, punctuation, space) to
  `{ unicode, dots, character }` records.
- `braillify` maps each char via `braille[ch.toLowerCase()]?.character ?? ch`,
  so unsupported characters pass through unchanged.
- `downloadBrf` wraps `braillify` output at 40 chars per line, creates a text
  Blob, and downloads `output.brf`.
- `SAMPLES` provides one-click example inputs. `Braille` only lists characters
  actually present in the input in the char map, and disables Copy/.brf until
  there is meaningful output.

## Routes

```tsx
// src/app/(products)/apps/text-convert/page.tsx            — category listing
// src/app/(products)/apps/text-convert/braille/page.tsx    — tool
```

## Registration

- `data/apps.csv` → `Text - Convert` section, `toolId: 'braille'`

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
