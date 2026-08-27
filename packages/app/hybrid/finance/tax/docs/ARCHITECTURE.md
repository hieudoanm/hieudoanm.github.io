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
├── app/                # App Router pages and layouts (11 routes)
├── components/         # Atomic design components
│   ├── atoms/          # Small UI building blocks
│   ├── molecules/      # Composed atom combinations
│   ├── organisms/      # Sidebar, Header, BottomNav, CalculatorForm, etc.
│   └── templates/      # DashboardTemplate, AuthTemplate
│   └── RouteGuard.tsx  # Auth route protection
├── data/               # Mock data, navigation config
├── hooks/              # useEntitySync
├── lib/                # IndexedDB wrapper (db.ts), tax logic
├── providers/          # DataProvider, Providers, ToastProvider
├── styles/             # globals.css (Tailwind + DaisyUI)
├── types/              # TypeScript interfaces
└── utils/              # formatCurrency, formatDate
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
│  Organisms (components/organisms/)      │  Sidebar, Header, BottomNav, CalculatorForm
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  Composed components
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  Small UI building blocks
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  DataProvider, ToastProvider
├─────────────────────────────────────────┤
│  Lib (lib/tax/)                         │  Pure tax calculation logic
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

| Route              | Page              | Client | Description                   |
| ------------------ | ----------------- | ------ | ----------------------------- |
| `/login`           | Login             | Yes    | Email/password form           |
| `/register`        | Register          | Yes    | Sign up form                  |
| `/`                | Dashboard         | Yes    | Stats, recent activity        |
| `/calculator`      | Tax Calculator    | Yes    | PIT calculator (gross↔net)    |
| `/submission`      | Tax Submissions   | Yes    | Submission list               |
| `/submission/new`  | New Submission    | Yes    | Create tax submission         |
| `/submission/[id]` | Submission Detail | Yes    | Submission detail + documents |
| `/audit`           | Tax Audits        | Yes    | Audit list with risk scores   |
| `/audit/[id]`      | Audit Detail      | Yes    | Audit findings + checklist    |
| `/profile`         | Profile           | Yes    | User info, settings           |
| `/settings`        | Settings          | Yes    | App settings                  |

## Rendering Strategy

- **Standalone output** (`output: 'standalone'` in `next.config.ts`) — supports
  dynamic routes with server-side rendering
- **Client Components** marked with `"use client"` — all pages require IndexedDB
  access and interactive UI
- No external API calls — pure local persistence with IndexedDB

## State Management

- **IndexedDB** for persistent state — users, companies, submissions, audits
- **Local state** with `useState` / `useReducer` — component-scoped UI state
- **DataProvider** context wraps the app — manages data access layer
- **useEntitySync** hook — generic IndexedDB sync for all entity types

## Tax Logic

- **Pure functions** in `lib/tax/calculator.ts` — no UI imports
- **Constants** in `lib/tax/constants.ts` — Vietnamese tax brackets, insurance
  rates
- **Progressive tax** — 7 brackets from 5% to 35%
- **Social insurance** — BHXH (8%), BHYT (1.5%), BHTN (1%) employee; BHXH
  (17.5%), BHYT (3%), BHTN (1%) employer
- **Insurance cap** — 36,000,000 VND/month

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`, etc.)
- **Dark theme default** (`data-theme="nothing"`)
- **32 DaisyUI themes** available
- **Global base styles** in `src/styles/globals.css`

## Performance

- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
- Service worker for static asset caching
- PWA manifest for installability
