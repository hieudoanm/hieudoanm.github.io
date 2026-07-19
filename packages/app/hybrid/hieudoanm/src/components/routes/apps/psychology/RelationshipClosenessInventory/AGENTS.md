# Apps / Psychology / RelationshipClosenessInventory

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
RelationshipClosenessInventory/
  index.tsx            # Entry component (5-step wizard + results)
  utils.ts             # Pure data + scoring (no UI imports)
  components/
    TimeStep.tsx       # Hours/minutes alone with partner per day part
    ActivitiesStep.tsx # Shared-activities checklist (38 items)
    ScaleStep.tsx      # 7-point Likert scale step (reusable)
    ResultsStep.tsx    # Subscale score cards + reset
  docs/                # Source instrument docs
```

## Instrument

Digital implementation of the **Relationship Closeness Inventory — Revised**
(RCI-R). Five sections:

1. **Time Together** — avg minutes/day alone with partner (morning, afternoon,
   evening)
2. **Activities** — 38 shared activities (checkbox)
3. **Influence (part 1)** — items 1–14, 7-point agree/disagree
4. **Influence (part 2)** — items 15–27
5. **Future Plans** — 6 items, 7-point affected-extent

## Scoring

- `computeScores` in `utils.ts` returns 4 subscale totals: `timeMinutes`,
  `activitiesCount`, `influenceTotal`, `plansTotal`
- Influence items flagged `reverse: true` (13 "does not influence" items) are
  scored as `8 - rating`; others use the raw rating
- There is no composite total — subscales are reported individually

## Routes

```tsx
// src/app/(products)/apps/psychology/page.tsx                        — category listing
// src/app/(products)/apps/psychology/relationship-closeness-inventory/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Psychology` section,
  `toolId: 'relationship-closeness-inventory'`
- `start/sections.ts` → `TOOL_SECTION_LABELS.psychology`
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
