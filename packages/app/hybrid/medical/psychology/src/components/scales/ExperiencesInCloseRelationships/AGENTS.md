ExperiencesInCloseRelationships

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
ExperiencesInCloseRelationships/
  index.tsx            # Entry component (3-step wizard + results)
  utils.ts             # Pure data + scoring (no UI imports)
  components/
    ScaleStep.tsx      # 7-point Likert scale step (reusable)
    ResultsStep.tsx    # Anxiety/avoidance bars + attachment style
```

## Instrument

Digital implementation of the **Experiences in Close Relationships — Revised**
(ECR-R; Fraley et al., 2000). 36 items, 7-point agree/disagree (1 = strongly
disagree … 7 = strongly agree), presented in 3 steps of 12.

## Scoring

- Items 1–18 form the **anxiety** subscale; items 19–36 the **avoidance**
  subscale
- Reverse-keyed items (9, 11) are scored `8 - rating` before averaging anxiety;
  reverse-keyed avoidance items (20, 22, 26–31, 33–36) before averaging
  avoidance (`reverse: true` in `utils.ts`)
- `computeEcrScores` returns subscale means (1–7)
- `attachmentStyle` labels the quadrant via the 4-point midpoint (secure /
  preoccupied / dismissive / fearful); cutoffs are illustrative

## Routes

```tsx
// src/app/experiences-in-close-relationships/page.tsx — scale tool page
```

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. Game logic MUST be pure functions in `utils.ts` — zero UI imports
4. TailwindCSS v4 + DaisyUI v5
5. Icons: `react-icons/pi`
6. Component receives `onClose: () => void` prop
7. Keep files under 200 lines, functions under 30 lines
8. Mobile-first responsive design
