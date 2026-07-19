# Apps / Utilities / Clipboard

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Clipboard/
  index.tsx            # Entry component — capture/copy UI with history & preview tabs
  useClipboard.ts      # Hook — clipboard read/write + persistent clip history
  clipboard.ts         # ClipItem type + clipboard & storage instances (@frontend/native)
  __tests__/
    useClipboard.test.ts  # Hook behaviour tests
```

## Overview

Clipboard manager that captures the current clipboard text on load and keeps a
local history of up to 50 clips, persisted in localStorage. History and preview
tabs let you copy an old clip back to the system clipboard.

## Logic

- `useClipboard` holds `clips`, `loading`, `tab` (`history`/`preview`),
  `selected`, and `error` state; `loadClips`/`saveClips` persist via `storage`
- `addClip` dedupes by content (matching entries move to the front) and slices
  to the newest 50 items
- `capture` calls `clipboard.paste()` and runs once on mount; it surfaces
  "Clipboard API not supported" and "Clipboard read blocked (requires user
  interaction)" errors
- `copy`/`remove`/`clearAll` write back to the clipboard or prune the store
- `ClipItem` uses `crypto.randomUUID()` for ids and `Date.now()` timestamps

## Routes

```tsx
// src/app/(products)/apps/utilities/page.tsx          — category listing
// src/app/(products)/apps/utilities/clipboard/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Utilities` section, `toolId: 'clipboard'`

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
