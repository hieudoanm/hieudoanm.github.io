PatientHealthQuestionnaire

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
PatientHealthQuestionnaire/
  index.tsx            # Entry component (single step + results)
  utils.ts             # Pure data + scoring (no UI imports)
  components/
    FrequencyStep.tsx  # 0–3 frequency options step (reusable)
    ResultsStep.tsx    # Total score + severity band + item-9 flag
```

## Instrument

Digital implementation of the **Patient Health Questionnaire-9** (PHQ-9; Kroenke
et al., 2001). 9 items, 0–3 frequency over the past two weeks (0 = not at all, 3
= nearly every day).

## Scoring

- `computePhqScore` sums the 9 ratings (0–27, no reverse items)
- `interpretPhqScore`: 0–4 none–minimal, 5–9 mild, 10–14 moderate, 15–19
  moderately severe, 20–27 severe
- `hasPhqSelfHarmThoughts` flags item 9 (self-harm thoughts) for the warning
  alert

## Routes

```tsx
// src/app/patient-health-questionnaire/page.tsx — scale tool page
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
