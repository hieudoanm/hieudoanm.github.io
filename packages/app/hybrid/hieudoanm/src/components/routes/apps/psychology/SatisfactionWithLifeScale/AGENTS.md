# Apps / Psychology / SatisfactionWithLifeScale

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
SatisfactionWithLifeScale/
  index.tsx            # Entry component (single step + results)
  utils.ts             # Pure data + scoring (no UI imports)
  components/
    ScaleStep.tsx      # 7-point Likert scale step (reusable)
    ResultsStep.tsx    # Total score card + interpretation band
```

## Instrument

Digital implementation of the **Satisfaction With Life Scale** (SWLS; Diener et
al., 1985). 5 statements, 7-point agree/disagree (1 = strongly disagree … 7 =
strongly agree).

## Scoring

- `computeSwlsScore` sums the 5 ratings (range 5–35, no reverse items)
- `interpretSwlsScore` maps the total to an interpretation band (31–35 Extremely
  satisfied … 5–9 Extremely dissatisfied; 20 Neutral)

## Routes

```tsx
// src/app/(products)/apps/psychology/page.tsx              — category listing
// src/app/(products)/apps/psychology/satisfaction-with-life/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Psychology` section, `toolId: 'satisfaction-with-life'`
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
