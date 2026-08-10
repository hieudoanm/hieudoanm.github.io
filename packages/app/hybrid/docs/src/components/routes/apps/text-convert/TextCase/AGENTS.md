# Apps / Text - Convert / TextCase

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
TextCase/
  index.tsx            # Entry component — input + six case-converted outputs
```

## Overview

TextCase converts a typed string into six case variants at once: UPPER, lower,
Title, camelCase, snake_case, and kebab-case. Results render live as the user
types and disappear when the input is empty.

## Logic

- `caseConverted` (a `useMemo`) computes the six variants from `inputText`:
  - `upper`/`lower` via `toUpperCase()`/`toLowerCase()`
  - `title` via `\w\S*` word matching (first letter upper, rest lower)
  - `camel` via `[^a-zA-Z0-9]+(.)` replacing a separator + char with the
    uppercased char
  - `snake`/`kebab` via whitespace-to-`_`/`-` then `toLowerCase()`
- The component returns `null` from the memo when input is empty, so the
  conversion block only renders when there is text.
- Note: `TextCase` renders only the converter panel; the mapping to the
  `text-case` route is via the CSV toolId, not the component folder name.

## Routes

```tsx
// src/app/(products)/apps/text-convert/page.tsx            — category listing
// src/app/(products)/apps/text-convert/text-case/page.tsx  — tool
```

## Registration

- `data/apps.csv` → `Text - Convert` section, `toolId: 'text-case'`

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
