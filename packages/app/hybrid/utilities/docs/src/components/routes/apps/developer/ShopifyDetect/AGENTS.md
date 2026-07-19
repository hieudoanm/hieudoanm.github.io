# Apps / Developer / ShopifyDetect

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
ShopifyDetect/
  index.tsx            # Entry — batch check form + history tab
  types.ts             # DetectionResult + Tab
  utils/detect.ts      # detectFromHTML (signal scoring)
  utils/storage.ts     # loadHistory / saveHistory / clearHistory (localStorage)
```

## Overview

Detects whether a list of URLs run on Shopify by fetching each page and scoring
its HTML for Shopify signals. Results show confidence, detected signals, and a
Shopify Plus flag, with the last 50 checks persisted to localStorage.

## Logic

- `checkBatch` normalises each URL (prepends `https://` when missing), fetches
  the HTML sequentially, and pushes `detectFromHTML` results; fetch failures
  become a zero-confidence result with a `Fetch failed` signal
- `detectFromHTML` scores `cdn.shopify.com` (+40), `shopify-section` (+30), the
  `shopify` keyword (+10), and a Plus marker (+20); `isShopify` requires score ≥
  40, `confidence` is capped at 100
- `saveHistory` prepends new results to existing ones and slices to 50 entries

## Routes

```tsx
// src/app/(products)/apps/developer/page.tsx             — category listing
// src/app/(products)/apps/developer/shopify-detect/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Developer` section, `toolId: 'shopify-detect'`

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
