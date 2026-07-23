# Wallet — Banking App UI

## Table of Contents

- [Wallet — Banking App UI](#wallet--banking-app-ui)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Authentication \& Security](#authentication--security)
      - [Data \& Persistence](#data--persistence)
      - [UI \& Theming](#ui--theming)
      - [Navigation \& Routing](#navigation--routing)
      - [Transactions](#transactions)
      - [Cards](#cards)
      - [Budget \& Bills](#budget--bills)
      - [Exchange](#exchange)
      - [Pay \& QR](#pay--qr)
      - [Notifications](#notifications)
      - [Profile \& Settings](#profile--settings)
      - [Code Quality](#code-quality)
  - [Design](#design)
    - [UX for Mobile](#ux-for-mobile)
      - [Layout](#layout)
      - [Touch Targets](#touch-targets)
      - [Forms](#forms)
      - [Navigation Patterns](#navigation-patterns)
      - [Feedback](#feedback)
      - [Lists \& Scrolling](#lists--scrolling)
      - [Modals](#modals)
      - [Theming](#theming)
  - [Roadmap](#roadmap)
    - [Product Roadmap](#product-roadmap)
      - [Phase 1 — Core UI ✅](#phase-1--core-ui-)
      - [Phase 2 — Enhanced UX](#phase-2--enhanced-ux)
      - [Phase 3 — Data \& Analytics](#phase-3--data--analytics)
      - [Phase 4 — Social \& Payments](#phase-4--social--payments)
      - [Phase 5 — Security \& Compliance](#phase-5--security--compliance)
      - [Phase 6 — Platform \& Integration](#phase-6--platform--integration)

---

## Overview

### Tech Stack

1. **pnpm**
2. **ESLint**
3. **Prettier**
4. **Jest**
5. **Playwright**
6. **Next.js 16** (App Router, static export)
7. **TypeScript 6** (strict mode)
8. **Tailwind CSS 4** + **DaisyUI 5** (32 themes, dark default)
9. **Tauri 2** (desktop shell)
10. **Mock data** with IndexedDB persistence

### Pages

| #   | Route               | Page             | Key Features                                                     |
| --- | ------------------- | ---------------- | ---------------------------------------------------------------- |
| 1   | `/login`            | Login            | Email/password form, social login buttons                        |
| 2   | `/register`         | Register         | Sign up form, terms checkbox                                     |
| 3   | `/`                 | Dashboard        | Total balance, account cards, quick actions, recent transactions |
| 4   | `/accounts`         | Accounts         | List of accounts (checking, savings, credit), filter by type     |
| 5   | `/transactions`     | Transactions     | Filterable transaction list, search, income/expense filter       |
| 6   | `/transfer`         | Transfer         | Send money form, recipient selection, amount input, confirmation |
| 7   | `/cards`            | Cards            | Card carousel, freeze/unfreeze, card details                     |
| 8   | `/budget`           | Budget           | Spending by category, budget summary                             |
| 9   | `/pay`              | Pay / QR         | QR code display/scanner, quick pay form                          |
| 10  | `/bills`            | Bills            | Recurring bill list, total due summary                           |
| 11  | `/exchange`         | Exchange         | Multi-currency converter, exchange rate list                     |
| 12  | `/notifications`    | Notifications    | Filterable alerts (All/Unread/Alerts)                            |
| 13  | `/profile`          | Profile          | User info, settings, theme picker, sign out                      |
| 14  | `/help-support`     | Help & Support   | Contact options, FAQ, resources                                  |
| 15  | `/terms-of-service` | Terms of Service | Legal text                                                       |
| 16  | `/privacy-policy`   | Privacy Policy   | Legal text                                                       |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages (17 routes)
  components/
    atoms/            # BalanceCard, AccountCard, TransactionItem, etc.
    molecules/        # QuickActions, TransferForm, CurrencyConverter, etc.
    organisms/        # Sidebar, Header, BottomNav
    templates/        # DashboardTemplate, AuthTemplate
    RouteGuard.tsx    # Auth route protection
  data/               # Mock data, navigation config
  hooks/              # useMediaQuery, useTheme
  lib/                # IndexedDB wrapper (db.ts)
  providers/          # DataProvider, Providers, ToastProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces
  utils/              # formatCurrency, formatDate, iconMap
src-tauri/            # Tauri desktop (Rust)
e2e/                  # Playwright E2E tests
```

---

## Development

### Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `input`, etc.)
- Dark theme as default
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → molecules → organisms → templates
- `console.*` with `[Module]` prefix for structured debug logging
- `console.*` stripped in production via `compiler.removeConsole`
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` env var (default `800`ms) for
  simulating network latency; applied in `db.ts` before every query

### Features

#### Authentication & Security

- **Email/password auth**: Mock authentication via localStorage; any non-empty
  email passes in development
- **Route protection**: `RouteGuard` redirects unauthenticated users to
  `/login`; authenticated users on public routes redirect to `/`
- **Forgot/reset password**: Multi-step flow — email entry → confirmation screen
  → token + new password form
- **Session persistence**: `wallet-auth` localStorage key survives page reload;
  cleared on explicit logout
- **Biometric toggle**: UI toggle on Settings page (mock — persists preference
  to localStorage)

#### Data & Persistence

- **IndexedDB storage**: All entities (users, accounts, transactions, cards,
  bills, budgets, notifications, rates) stored in `wallet-db`
- **Seed on first load**: `db.needsSeed()` checks user count; populates all
  stores with mock data if empty
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default 800ms) applied
  before every DB operation to simulate real API latency
- **Optimistic UI**: State updates immediately in React; persists to IndexedDB
  in background with error fallback
- **CRUD operations**: Full create/read/update for accounts, transactions,
  cards, bills, budget categories; mark-as-read for notifications

#### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle with visual theme picker; persisted
  to `data-theme` attribute and localStorage
- **Skeleton loading**: Page-specific skeleton layouts (not generic spinners)
  that mirror actual content structure for perceived performance
- **Toast notifications**: In-app toast system via `ToastProvider`; auto-dismiss
  with success/error/info variants; positioned above bottom nav
- **Responsive layout**: Bottom tab nav (5 items, icon-above-text) on mobile;
  grouped sidebar nav on desktop; breakpoints at `md:` (768px)

#### Navigation & Routing

- **Route groups**: Pages organized into `(dashboard)`, `(auth)`, `(profile)`,
  `(settings)` — URLs unaffected, code logically grouped
- **Nested routes**: Accounts split into `/accounts` (overview) →
  `/accounts/checking|savings|credit`; Exchange split into `/exchange`
  (calculator) → `/rates`
- **Sidebar sections**: Navigation grouped into Overview, Finance, Payments,
  Budgeting, Account with uppercase section labels
- **Back navigation**: Consistent `FiArrowLeft` +
  `btn-neutral btn-sm btn-circle` on all sub-pages

#### Transactions

- **Search**: Real-time text filter across transaction titles
- **Type filter**: All / Income / Expense chip toggles
- **Date range filter**: Expandable From/To date pickers; clears via `FiX` on
  filter button
- **DateTime display**: Each transaction shows category + formatted date/time
  (e.g., "Jul 22, 10:30 AM")

#### Cards

- **Card carousel**: Horizontal scroll with `overflow-x-auto` for card
  thumbnails
- **Freeze/unfreeze**: Toggle card frozen state with toast confirmation
- **Card details**: Masked card number, expiry, type badge

#### Budget & Bills

- **Budget summary**: Total spent vs. total limit progress bar
- **Category cards**: Individual spending tracking per category with progress
- **Bill management**: Recurring bill list with paid/unpaid status; mark as
  paid; add new bill modal
- **Total due**: Warning card showing aggregate unpaid amount

#### Exchange

- **Currency calculator**: Convert between 58 currencies with live rate
  calculation; swap button for quick reversal
- **Rate list**: Full list of all currency rates with code, name, symbol

#### Pay & QR

- **QR code generation**: `qrcode.react` library; theme-aware (`currentColor`)
  for dark/light mode compatibility
- **Camera scanning**: `getUserMedia` API for real camera access;
  tap-to-simulate fallback; stream cleanup on unmount
- **Quick pay form**: Amount input with instant submit

#### Notifications

- **Filter tabs**: All / Unread / Alerts with unread count badge
- **Mark as read**: Click to mark individual notifications; persisted to DB

#### Profile & Settings

- **User info**: Avatar, name, email display via `UserCard`
- **Profile form**: Edit phone, email, country, timezone, default currency (58
  currencies from rate data)
- **Settings page**: Dark mode, push notifications, biometric, language
  selector, theme picker, help/legal links

#### Code Quality

- **Arrow functions**: All function declarations and component exports use arrow
  syntax; test files excluded
- **Debug logging**: `console.*` with `[Module]` prefix throughout source;
  stripped from production via `compiler.removeConsole`
- **Testing**: Jest (unit) + Playwright (E2E) framework ready
- **Atomic design**: atoms → molecules → organisms → templates hierarchy

---

## Design

### UX for Mobile

#### Layout

- **Bottom navigation** for 5 primary destinations (Home, Accounts, Pay, Cards,
  More); icons stacked above labels, active state with `bg-primary/10` tint
- **Header** with logo, notification bell, hamburger menu for secondary pages
- **DashboardTemplate** provides consistent padding, scroll, and bottom nav
  spacing across all authenticated pages
- **Safe area** respected for devices with notches/home indicators via `pb-20`
  on scrollable content

#### Touch Targets

- Minimum `44px` tap target for all interactive elements (DaisyUI `btn`
  defaults)
- `btn-sm` buttons padded with `px-4 py-2` minimum
- Toggle switches (`toggle`) and checkboxes (`checkbox`) sized for thumb
  interaction
- Card links use full-width `Link` with `hover:bg-base-300` feedback

#### Forms

- **Floating labels** (`floating-label`) for all inputs — label stays visible
  after focus, no placeholder overlap
- **Select dropdowns** use native `<select>` for reliable mobile OS picker
- **Input types**: `type="email"`, `type="tel"`, `type="number"` for correct
  mobile keyboard
- **Submit buttons** full-width (`w-full`) for easy thumb reach

#### Navigation Patterns

- **Back buttons** (`FiArrowLeft` + `btn-neutral btn-sm btn-circle`) on all
  sub-pages for consistent back navigation
- **Section links** (e.g., Calculator ↔ Rates, Profile → Settings) use
  `btn-neutral btn-sm` in the header row
- **Bottom nav** hidden on `md:` breakpoint; sidebar replaces it on desktop

#### Feedback

- **Toast notifications** for all actions (save, transfer, pay, etc.) —
  auto-dismiss, positioned above bottom nav
- **Loading skeletons** mirror each page's actual layout for perceived
  performance; 800ms mock delay via `NEXT_PUBLIC_MOCK_DELAY`
- **Empty states** with descriptive text when lists have no items
- **Optimistic UI** — state updates immediately, persists to IndexedDB in
  background

#### Lists & Scrolling

- **Transaction/item lists** use `flex flex-col gap-2` for consistent spacing
- **Card carousels** (Cards page) use `overflow-x-auto` with snap scrolling
- **Filter chips** (Transactions, Notifications) horizontal scroll on mobile
- **Pull-to-refresh** not implemented — data refreshes on page mount

#### Modals

- **Modal dialogs** (`AddAccountModal`, `AddBillModal`, `QRCodeModal`) use
  DaisyUI `modal` with backdrop dismiss
- **Full-screen on mobile** via `modal-box` max-width constraints
- **Close button** visible and reachable in top-right corner

#### Theming

- **Dark mode default** (`data-theme="night"`) for reduced eye strain
- **Theme picker** on Settings page with visual preview cards
- **System preference** detection via `useTheme` hook
- **QR codes** use `fgColor="currentColor"` to adapt to active theme

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI ✅

> Foundation: all pages, navigation, theming, mock data

- [x] Authentication flow (login, register, forgot/reset password)
- [x] Dashboard with balance, accounts, quick actions, recent transactions
- [x] Accounts overview with type sections (checking, savings, credit)
- [x] Transaction list with search, type filter, date range filter
- [x] Transfer wizard (3-step: recipient → amount → review)
- [x] Card carousel with freeze/unfreeze
- [x] Budget summary with category cards
- [x] Recurring bills with mark-as-paid
- [x] Currency exchange calculator + rate list
- [x] Pay page with QR code generation + camera scanning
- [x] Notifications with filter and mark-as-read
- [x] Profile with user info, settings, theme picker
- [x] Responsive layout (bottom nav + sidebar)
- [x] 32 DaisyUI themes with dark default

#### Phase 2 — Enhanced UX

> Polish: animations, accessibility, offline support

- [ ] Page transition animations (Framer Motion)
- [ ] Pull-to-refresh on mobile
- [ ] Infinite scroll / pagination for transaction list
- [ ] Swipe gestures on transaction items (delete, archive)
- [ ] Haptic feedback on key actions (transfer confirm, payment sent)
- [ ] Keyboard navigation and ARIA labels audit
- [ ] Screen reader announcements for toasts
- [ ] Offline indicator banner
- [ ] Service worker for static asset caching
- [ ] PWA manifest with install prompt

#### Phase 3 — Data & Analytics

> Insights: charts, reports, smart categorization

- [ ] Spending charts (pie chart by category, line chart over time)
- [ ] Monthly/yearly spending reports
- [ ] Income vs. expense comparison
- [ ] Budget forecasting based on historical data
- [ ] Transaction export (CSV, PDF)
- [ ] Recurring transaction detection
- [ ] Smart categorization with category suggestions
- [ ] Search with filters (date range, amount range, category)

#### Phase 4 — Social & Payments

> Peer-to-peer: contacts, splits, payment requests

- [ ] Contact list with frequent recipients
- [ ] Payment requests (send/receive)
- [ ] Split bill feature (equal or custom splits)
- [ ] Payment history with status (pending, completed, failed)
- [ ] Recurring transfers (auto-pay setup)
- [ ] International transfer with fee calculator
- [ ] Multi-currency wallet balances
- [ ] Currency alert notifications (rate thresholds)

#### Phase 5 — Security & Compliance

> Production-ready: 2FA, KYC, audit logging

- [ ] Two-factor authentication (TOTP, SMS)
- [ ] Biometric authentication (WebAuthn)
- [ ] Session timeout with re-authentication
- [ ] KYC document upload and verification flow
- [ ] Transaction limits and daily caps
- [ ] Suspicious activity detection and alerts
- [ ] Audit log for all account actions
- [ ] Data encryption at rest (IndexedDB encryption)

#### Phase 6 — Platform & Integration

> Ecosystem: native apps, APIs, third-party services

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Push notifications via FCM/APNs
- [ ] Open Banking API integration (Plaid, Stripe)
- [ ] Bank account linking (OAuth flow)
- [ ] Credit score monitoring
- [ ] Bill pay integration (utility providers)
- [ ] Investment portfolio tracking
- [ ] Crypto wallet integration
