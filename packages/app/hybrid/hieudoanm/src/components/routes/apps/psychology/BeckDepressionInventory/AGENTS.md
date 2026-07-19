# Apps / Psychology / BeckDepressionInventory

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
BeckDepressionInventory/
  index.tsx            # Entry component (3-step wizard + results)
  items.ts             # Item/option data (BeckItem, BDI_ITEMS)
  utils.ts             # Pure scoring (no UI imports; re-exports items)
  components/
    OptionsStep.tsx    # Graded statement step (0–3 per item)
    ResultsStep.tsx    # Total score + severity band + item-9 flag
```

## Instrument

Digital implementation of the **Beck Depression Inventory–II** (BDI-II; Beck et
al., 1996). 21 symptom groups, each with graded statements scored 0–3, for the
past two weeks. Presented in 3 steps of 7.

## Scoring

- `BDI_ITEMS` models each item as options with pre-keyed `value` 0–3; state
  tracks the selected **option index** (`-1` = unanswered) because items 16
  (sleep) and 18 (appetite) have 7 options sharing values (1a/1b = 1, etc.)
- `computeBdiScore` maps selected indices to option values and sums (0–63)
- `interpretBdiScore`: 0–13 minimal, 14–19 mild, 20–28 moderate, 29–63 severe
- `hasBdiSuicidalThoughts` flags item 9 for the warning alert

## Routes

```tsx
// src/app/(products)/apps/psychology/page.tsx            — category listing
// src/app/(products)/apps/psychology/beck-depression-inventory/page.tsx — tool
```

## Registration

- `apps-data.ts` → `Psychology` section, `toolId: 'beck-depression-inventory'`
- `start/types.ts` → `MODAL_IDS`
- `start/components/main/AppsView/loaders.ts` → lazy loader

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. Game logic MUST be pure functions in `utils.ts` — zero UI imports
4. TailwindCSS v4 + DaisyUI v5
5. Icons: `react-icons/pi`
6. Component receives `onClose: () => void` prop
7. Keep files under 200 lines, functions under 30 lines
8. Mobile-first responsive design
