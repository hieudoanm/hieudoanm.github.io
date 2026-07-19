# Apps / Utilities / Colors

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Colors/
  index.tsx            # Entry component (single file) — color explorer & converter
```

## Overview

Color utility that converts a hex color to RGB, HSL, and OKLCH and lets you
browse the full TailwindCSS v4 palette. The Space key (or the Random button)
generates random colors; palette swatches are clickable.

## Logic

- `hex2hsl`, `hex2rgb`, and `hex2oklch` convert a `#RRGGBB` string to the
  respective color model (oklch uses the standard LMS matrix + cube-root)
- `randomHex` returns a random `#RRGGBB` value
- `TAILWIND_COLORS` holds 23 named color families x 11 shades; `SHADES` and
  `COLOR_NAMES` drive the palette grid, `INITIAL_COLOR` is `#171717`
- `update` recomputes all four formats from a hex input; a `keydown` listener on
  Space calls `update(randomHex())`
- `isActive` outlines the swatch matching the current hex (case-insensitive)
- Note: exported as `ColorsTool` (folder name `Colors`), and it does not receive
  an `onClose` prop

## Routes

```tsx
// src/app/(products)/apps/utilities/page.tsx          — category listing
// No route page exists — src/app/(products)/apps/utilities has no `colors/` folder
```

## Registration

- Not registered in data/apps.csv

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
