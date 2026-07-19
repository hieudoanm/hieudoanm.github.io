# Apps / Text - Convert / LeetSpeak

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
LeetSpeak/
  index.tsx            # Entry component — input, output, copy, char map
  utils.ts             # Pure logic — leet map, leetify, SAMPLES
```

## Overview

LeetSpeak converts typed text into leet-speak (1337) substitutions using a
digit-symbol map. It offers copy-to-clipboard, one-click sample inputs, and a
toggleable character map showing the symbol and description for each supported
character.

## Logic

- `leet` maps a subset of letters (`a`, `b`, `e`, `g`, `i`, `l`, `o`, `s`, `t`,
  `z`) to digit symbols.
- `leetify` maps each char via `leet[ch.toLowerCase()]?.symbol ?? ch` — unknown
  characters are preserved unchanged.
- `SAMPLES` includes a long brain-teaser paragraph and short phrases; sample
  buttons truncate labels over 30 chars.
- `LeetSpeak` only lists characters actually present in the input in the char
  map, and disables Copy until there is meaningful output.

## Routes

```tsx
// src/app/(products)/apps/text-convert/page.tsx            — category listing
// src/app/(products)/apps/text-convert/leetspeak/page.tsx  — tool
```

## Registration

- `data/apps.csv` → `Text - Convert` section, `toolId: 'leetspeak'`

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
