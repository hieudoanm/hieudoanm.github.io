# Apps / Calculator / Tax

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Tax/
  index.tsx            # Entry component — input/results tabs (Vietnamese UI)
  constants.ts         # Deductions, insurance rates, progressive brackets
  types.ts             # Period, SalaryMode, TaxBracket, TaxBreakdownItem
  utils/tax.ts         # Pure tax math (no UI imports)
  __tests__/           # Component tests
```

## Overview

Vietnamese personal income tax (PIT) calculator. Input gross or net salary (via
a Gross → Net / Net → Gross toggle), monthly or annual period, number of
dependents and optional social insurance to get deductions, taxable income, the
progressive tax breakdown, net pay and total employer cost.

## Logic

- A `useMemo` pipeline: in net mode `solveGrossFromNet` iterates up to 20 passes
  to converge on the gross; `toMonthly` divides annual input by 12;
  `clampInsuranceBase` caps at `INSURANCE_CAP` (36,000,000) or yields 0 when
  disabled; employee/employer insurance = base ×
  `sumRates(EMPLOYEE/EMPLOYER_INSURANCE)`.
- `calculateTaxBreakdown` slices
  `taxableIncome = max(0, gross − personal − dependents × 4,400,000 − employeeInsurance)`
  through `TAX_BRACKETS` (5% → 35% progressive limits), returning per-bracket
  `TaxBreakdownItem`s.
- Constants: `PERSONAL_DEDUCTION` 11,000,000 and `DEPENDENT_DEDUCTION`
  4,400,000.
- The results tab warns "Áp dụng trần bảo hiểm" when the insurance cap actually
  reduced the base.

## Routes

```tsx
// src/app/(products)/apps/calculator/page.tsx     — category listing
// src/app/(products)/apps/calculator/tax/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Calculator` section, `toolId: 'tax'`

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
