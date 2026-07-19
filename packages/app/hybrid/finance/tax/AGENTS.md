# Tax — Vietnamese Tax Management App

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm build        # Build for production
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
src/
  app/
    page.tsx                          # Root redirect → /personal
    (auth)/
      login/page.tsx
      register/page.tsx
    personal/
      page.tsx                        # Personal dashboard (calculator)
      calculator/page.tsx             # PIT Calculator
    business/
      page.tsx                        # Business dashboard (submissions, audits)
      submission/
        page.tsx                      # Submission list
        new/page.tsx                  # New submission
        [id]/page.tsx                 # Submission detail
      audit/
        page.tsx                      # Audit list
        [id]/page.tsx                 # Audit detail
    profile/page.tsx                  # User profile (shared)
    settings/page.tsx                 # App settings (shared)
    layout.tsx
    template.tsx
    error.tsx
    not-found.tsx
  components/
    atoms/                  # Small UI building blocks
    molecules/              # Composed atom combinations
    organisms/              # Complex sections (Sidebar, Header, BottomNav, CalculatorForm, etc.)
    templates/              # Full-page layouts (DashboardTemplate, AuthTemplate)
    RouteGuard.tsx
    SkipToContent.tsx
    OfflineBanner.tsx
  data/
    mock.ts                 # Mock data for all entities
    nav.ts                  # Navigation structure (personal + business variants)
  hooks/
    useEntitySync.ts        # Generic IndexedDB sync hook
  lib/
    db.ts                   # IndexedDB wrapper (CRUD operations)
    seed.ts                 # Database seeding logic
    tax/
      constants.ts          # Vietnamese tax constants (deductions, brackets, insurance)
      calculator.ts         # Pure tax calculation logic
  providers/
    Providers.tsx           # Top-level provider tree
    DataProvider.tsx        # Aggregates all entity providers
    ToastProvider.tsx       # Toast notification system
    auth/AuthProvider.tsx   # Authentication context
    entities/               # Per-entity data providers
  styles/
    globals.css             # Entry: imports Tailwind + base + themes
    base.css                # Base layer styles
    themes.css              # DaisyUI themes
  types/
    index.ts                # All TypeScript interfaces
  utils/
    format.ts               # Currency/date formatting
```

## Overview

Vietnamese tax management application with two modes:

### Personal App (`/personal`)

- **Tax Calculator**: Personal income tax (PIT) calculator with gross-to-net and
  net-to-gross modes
- Progressive tax brackets: 5% → 35% (7 brackets)
- Personal deduction: 11,000,000 VND/month
- Dependent deduction: 4,400,000 VND/dependent/month
- Social insurance: BHXH (8%), BHYT (1.5%), BHTN (1%)
- Insurance cap: 36,000,000 VND/month

### Business App (`/business`)

- **Tax Submission**: Company tax declaration management (PIT, CIT, VAT, FCT)
  - Company tax declaration tracking
  - Document management (01-KK/TNCN, GTGT, TNDN, etc.)
  - Status tracking (draft → submitted → accepted/rejected)
  - Deadline management
- **Tax Audit**: Automated and manual audit with risk scoring and compliance
  checks
  - Automated compliance checks
  - Risk scoring (0-100)
  - Finding tracking with severity levels
  - Resolution management

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. State management: `useState`/`useReducer` for local, React Context for shared
4. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
5. Icons: `react-icons/fi` (Feather)
6. Keep files under 200 lines, functions under 30 lines
7. Pure logic in `lib/tax/` — never mix UI and business logic
8. Test behaviour, not implementation — Jest + Testing Library
