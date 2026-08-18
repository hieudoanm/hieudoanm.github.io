# Apps / Utilities / Kaprekar

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Kaprekar/
  index.tsx            # Entry component — number input + routine step display
  utils.ts             # kaprekarRoutine + constants (pure, no UI imports)
```

## Overview

Visualizes Kaprekar's routine (sort digits descending, sort ascending, then
subtract) for numbers 100–9999 until it reaches 495 (3-digit) or 6174 (4-digit).
Repdigit inputs are rejected.

## Logic

- `kaprekarRoutine(number, numbers, { count, length })` recursively computes
  each step; the base cases are `IGNORE_NUMBERS_3`/`IGNORE_NUMBERS_4`
  (repdigits), the constants themselves, and a `count >= 8` safety cap
- Descending order is padded with a trailing `0` when it is shorter than the
  target `length`, so results stay aligned
- `KAPREKAR_CONSTANT_3 = 495`, `KAPREKAR_CONSTANT_4 = 6174`
- The UI clamps input to 100–9999, supports arrow-key stepping (left/right
  decrement/increment) and Space to reset

## Routes

```tsx
// src/app/(products)/apps/utilities/page.tsx          — category listing
// src/app/(products)/apps/utilities/kaprekar/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Utilities` section, `toolId: 'kaprekar'`

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
