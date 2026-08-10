# Apps / Psychology / DyadicAdjustmentScale

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
DyadicAdjustmentScale/
  index.tsx            # Entry component (4-step wizard + results)
  utils.ts             # Pure data + scoring (no UI imports)
  components/
    OptionsStep.tsx    # Per-item option-chip step (variable anchors)
    ResultsStep.tsx    # Total score + 4 subscale bars
```

## Instrument

Digital implementation of the **Dyadic Adjustment Scale** (DAS; Spanier, 1976).
32 items across 4 subscales, each with its own response anchors. Presented in 4
steps: Agreement (1–15), Interaction (16–24), Frequency (25–30), Happiness
(31–32). Item order and anchor wording follow the official PDF.

## Scoring

- Subscales (per UW ARC scoring code): **Consensus** 1, 2, 3, 5, 7–15;
  **Satisfaction** 16–23, 31, 32; **Cohesion** 24–28; **Affectional Expression**
  4, 6, 29, 30
- Option values are pre-keyed so a higher value always means better adjustment
  (reverse items 16, 17, 20, 21, 22, 29, 30 are encoded with their reversed
  value in `utils.ts`, not via a `8 - rating` formula)
- Item score ranges: 1–22, 25–28, 32 are 0–5; 23–24 are 0–4; 29–30 are 0–1; 31
  is 0–6
- `computeDasScores` sums per subscale; maxes: consensus 65, satisfaction 50,
  cohesion 24, affectional 12, total 151
- `interpretDasTotal`: 102+ non-distressed, 101 or lower distressed (Prouty et
  al., 2000)

## Routes

```tsx
// src/app/(products)/apps/psychology/page.tsx                 — category listing
// src/app/(products)/apps/psychology/dyadic-adjustment-scale/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Psychology` section, `toolId: 'dyadic-adjustment-scale'`
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
