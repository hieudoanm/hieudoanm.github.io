# Apps / Psychology / GeneralizedAnxietyDisorderScale

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
GeneralizedAnxietyDisorderScale/
  index.tsx            # Entry component (single step + results)
  utils.ts             # Pure data + scoring (no UI imports)
  components/
    FrequencyStep.tsx  # 0–3 frequency options step (reusable)
    ResultsStep.tsx    # Total score + severity band
```

## Instrument

Digital implementation of the **Generalized Anxiety Disorder 7-item scale**
(GAD-7; Spitzer et al., 2006). 7 items, 0–3 frequency over the past two weeks (0
= not at all, 3 = nearly every day).

## Scoring

- `computeGadScore` sums the 7 ratings (0–21, no reverse items)
- `interpretGadScore`: 0–4 minimal, 5–9 mild, 10–14 moderate, 15–21 severe; 10+
  is the standard clinical threshold

## Routes

```tsx
// src/app/(products)/apps/psychology/page.tsx            — category listing
// src/app/(products)/apps/psychology/generalized-anxiety-disorder/page.tsx — tool
```

## Registration

- `apps-data.ts` → `Psychology` section,
  `toolId: 'generalized-anxiety-disorder'`
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
