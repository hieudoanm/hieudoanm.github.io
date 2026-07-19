# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Atomic design system for reusable UI
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) |
| Language    | TypeScript 6 (strict)              |
| Styling     | Tailwind CSS 4 + DaisyUI 5         |
| Icons       | react-icons (Fi set)               |
| Desktop     | Tauri 2                            |
| Testing     | Jest + Playwright                  |
| Linting     | ESLint 10 + Prettier               |
| Package Mgr | pnpm                               |
| Data        | Mock data with IndexedDB           |

## Directory Structure

```txt
src/
├── app/                # App Router pages and layouts (29 routes)
├── components/         # Atomic design components
│   ├── atoms/          # BalanceCard, AccountCard, TransactionItem, etc.
│   ├── molecules/      # QuickActions, TransferForm, CurrencyConverter, etc.
│   ├── organisms/      # Sidebar, Header, BottomNav
│   └── templates/      # DashboardTemplate, AuthTemplate
│   └── RouteGuard.tsx  # Auth route protection
├── data/               # Mock data, navigation config
├── hooks/              # useMediaQuery, useTheme, useHaptic, usePullToRefresh
├── lib/                # IndexedDB wrapper (db.ts)
├── providers/          # DataProvider, Providers, ToastProvider
├── styles/             # globals.css (Tailwind + DaisyUI)
├── types/              # TypeScript interfaces
└── utils/              # formatCurrency, formatDate, iconMap
src-tauri/              # Tauri desktop (Rust)
e2e/                    # Playwright E2E tests
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  DashboardTemplate, AuthTemplate
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Sidebar, Header, BottomNav
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  QuickActions, TransferForm, etc.
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  BalanceCard, AccountCard, etc.
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  DataProvider, ToastProvider
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

| Route                 | Page               | Client | Description                        |
| --------------------- | ------------------ | ------ | ---------------------------------- |
| `/login`              | Login              | Yes    | Email/password form                |
| `/register`           | Register           | Yes    | Sign up form, terms checkbox       |
| `/`                   | Dashboard          | Yes    | Balance, accounts, quick actions   |
| `/accounts`           | Accounts           | Yes    | Checking, savings, credit overview |
| `/transactions`       | Transactions       | Yes    | Filterable transaction list        |
| `/reports`            | Reports            | Yes    | Charts, income/expense comparison  |
| `/transfer`           | Transfer           | Yes    | Send money wizard                  |
| `/contacts`           | Contacts           | Yes    | Contact list, add/edit             |
| `/payment-requests`   | Payment Requests   | Yes    | Incoming/outgoing requests         |
| `/split-bill`         | Split Bill         | Yes    | Equal or custom split              |
| `/cards`              | Cards              | Yes    | Card carousel, spending limits     |
| `/pay`                | Pay / QR           | Yes    | QR code display/scanner            |
| `/budget`             | Budget             | Yes    | Spending by category               |
| `/bills`              | Bills              | Yes    | Recurring bill list                |
| `/recurring`          | Recurring          | Yes    | Auto-pay setup, frequency          |
| `/currency-alerts`    | Currency Alerts    | Yes    | Rate threshold alerts              |
| `/exchange`           | Exchange           | Yes    | Multi-currency converter           |
| `/notifications`      | Notifications      | Yes    | Filterable alerts                  |
| `/profile`            | Profile            | Yes    | User info, settings, theme picker  |
| `/loans`              | Loans              | Yes    | Loan products, EMI calculator      |
| `/loans/apply`        | Loan Application   | Yes    | Multi-step application form        |
| `/fixed-deposits`     | Fixed Deposits     | Yes    | FD products, interest calculator   |
| `/recurring-deposits` | Recurring Deposits | Yes    | RD products, deposit tracker       |
| `/savings-goals`      | Savings Goals      | Yes    | Goal-based saving, progress        |
| `/insurance`          | Insurance          | Yes    | Products, coverage, claim status   |
| `/help-support`       | Help & Support     | Yes    | Contact options, FAQ               |
| `/terms-of-service`   | Terms of Service   | Yes    | Legal text                         |
| `/privacy-policy`     | Privacy Policy     | Yes    | Legal text                         |
| `/version`            | Version            | Yes    | Build version display              |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** marked with `"use client"` — all pages require IndexedDB
  access and interactive UI
- No server actions, no API routes — pure static with local persistence

## State Management

- **IndexedDB** for persistent state — users, accounts, transactions, cards,
  bills, budgets, notifications, rates stored in `wallet-db`
- **Local state** with `useState` / `useReducer` — component-scoped UI state
- **DataProvider** context wraps the app — manages data access layer
- **Optimistic UI** — transfers and payments apply instantly, persist in
  background with error fallback

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`, etc.)
- **32 DaisyUI themes** — dark mode default (`data-theme="night"`)
- **Global base styles** in `src/styles/globals.css`
- **Framer Motion** for page transitions (fade + slide-up, 200ms ease-out)
- **qrcode.react** for QR code generation (theme-aware via `currentColor`)

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker for static asset caching (cache-first + stale-while-revalidate)
- PWA manifest for installability
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
- Haptic feedback via `useHaptic()` hook (light/medium/heavy/success/error)
- Pull-to-refresh via `usePullToRefresh()` hook
- Infinite scroll via IntersectionObserver (10 items per batch)
