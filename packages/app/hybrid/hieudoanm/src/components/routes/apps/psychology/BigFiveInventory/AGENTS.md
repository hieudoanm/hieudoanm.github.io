# Apps / Psychology / BigFiveInventory

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
BigFiveInventory/
  index.tsx            # Entry component (3-step wizard + results)
  utils.ts             # Pure data + scoring (no UI imports)
  components/
    AgreeStep.tsx      # 5-point agree/disagree step (reusable)
    ResultsStep.tsx    # Five factor means (1–5) + levels
  docs/                # Source reference (John & Srivastava, 1999)
```

## Instrument

Digital implementation of the **Big Five Inventory** (BFI; John & Srivastava,
1999). 44 items rated 1 = disagree strongly to 5 = agree strongly, presented in
3 steps (16 / 16 / 12).

## Scoring

- Five factors, each scored as the mean of its items (1–5)
- Reverse-keyed items (`reverse: true`) are scored `6 - rating` before
  averaging: extraversion 6,21,31; agreeableness 2,12,27,37; conscientiousness
  8,18,23,43; neuroticism 9,24,34; openness 35,41
- `computeBigFiveScores` returns the five means
- `factorLevel` labels each mean low (≤ 2.4) / moderate / high (≥ 3.6) relative
  to the midpoint of 3; there are no clinical bands

## Routes

```tsx
// src/app/(products)/apps/psychology/page.tsx            — category listing
// src/app/(products)/apps/psychology/big-five-inventory/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Psychology` section, `toolId: 'big-five-inventory'`
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
