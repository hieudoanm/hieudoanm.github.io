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
      - [Business Features](#business-features)
        - [Authentication \& Security](#authentication--security)
        - [Transactions](#transactions)
        - [Reports](#reports)
        - [Cards](#cards)
        - [Card Rewards](#card-rewards)
        - [Budget \& Bills](#budget--bills)
        - [Exchange](#exchange)
        - [Pay \& QR](#pay--qr)
        - [Notifications](#notifications)
        - [Contacts](#contacts)
        - [Payment Requests](#payment-requests)
        - [Split Bill](#split-bill)
        - [Recurring Transfers](#recurring-transfers)
        - [Currency Alerts](#currency-alerts)
        - [Loans](#loans)
        - [Fixed Deposits](#fixed-deposits)
        - [Recurring Deposits](#recurring-deposits)
        - [Savings Goals](#savings-goals)
        - [Insurance](#insurance)
        - [Profile \& Settings](#profile--settings)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [Navigation \& Routing](#navigation--routing)
        - [Code Quality](#code-quality)
        - [Haptic Feedback](#haptic-feedback)
        - [Pull-to-Refresh](#pull-to-refresh)
        - [Infinite Scroll](#infinite-scroll)
        - [Page Transitions](#page-transitions)
        - [Offline Support](#offline-support)
        - [Accessibility](#accessibility)
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
      - [Phase 3 — Data \& Analytics ✅](#phase-3--data--analytics-)
      - [Phase 4 — Social \& Payments ✅](#phase-4--social--payments-)
      - [Phase 5 — Bank Products](#phase-5--bank-products)
      - [Phase 6 — Security \& Compliance](#phase-6--security--compliance)
      - [Phase 7 — Platform \& Integration](#phase-7--platform--integration)

---

## Overview

### Tech Stack

1. **pnpm** (always pin dependencies version)
2. **ESLint** (with next)
3. **Prettier** (with tailwindcss)
4. **Jest** (coverage >= 80%)
5. **Playwright** (coverage all page level)
6. **Next.js 16** (App Router, static export)
7. **TypeScript 6** (strict mode)
8. **Tailwind CSS 4** + **DaisyUI 5** (32 themes, dark default)
9. **Tauri 2** (desktop shell)
10. **Mock data** with IndexedDB persistence

### Pages

| #   | Route                 | Page               | Key Features                                                     |
| --- | --------------------- | ------------------ | ---------------------------------------------------------------- |
| 1   | `/login`              | Login              | Email/password form, social login buttons                        |
| 2   | `/register`           | Register           | Sign up form, terms checkbox                                     |
| 3   | `/`                   | Dashboard          | Total balance, account cards, quick actions, recent transactions |
| 4   | `/accounts`           | Accounts           | List of accounts (checking, savings, credit), filter by type     |
| 5   | `/transactions`       | Transactions       | Filterable transaction list, search, income/expense filter       |
| 6   | `/reports`            | Reports            | Spending charts, income/expense comparison, export (CSV/PDF)     |
| 7   | `/transfer`           | Transfer           | Send money form, recipient selection, amount input, confirmation |
| 8   | `/contacts`           | Contacts           | Contact list, add/edit contacts, send money                      |
| 9   | `/payment-requests`   | Payment Requests   | Incoming/outgoing requests, status tracking                      |
| 10  | `/split-bill`         | Split Bill         | Equal or custom split with contacts                              |
| 11  | `/cards`              | Cards              | Card carousel, spending limits, freeze/unfreeze, card actions    |
| 12  | `/pay`                | Pay / QR           | QR code display/scanner, quick pay form                          |
| 13  | `/budget`             | Budget             | Spending by category, budget summary                             |
| 14  | `/bills`              | Bills              | Recurring bill list, total due summary                           |
| 15  | `/recurring`          | Recurring          | Auto-pay setup, pause/resume, frequency control                  |
| 16  | `/currency-alerts`    | Currency Alerts    | Rate threshold alerts, above/below triggers                      |
| 17  | `/exchange`           | Exchange           | Multi-currency converter, exchange rate list                     |
| 18  | `/notifications`      | Notifications      | Filterable alerts (All/Unread/Alerts)                            |
| 19  | `/profile`            | Profile            | User info, settings, theme picker, sign out                      |
| 20  | `/help-support`       | Help & Support     | Contact options, FAQ, resources                                  |
| 21  | `/terms-of-service`   | Terms of Service   | Legal text                                                       |
| 22  | `/privacy-policy`     | Privacy Policy     | Legal text                                                       |
| 23  | `/loans`              | Loans              | Loan products, apply flow, EMI calculator, repayment schedule    |
| 24  | `/loans/apply`        | Loan Application   | Multi-step form: personal → financial → review → submit          |
| 25  | `/fixed-deposits`     | Fixed Deposits     | FD products, interest calculator, maturity tracking              |
| 26  | `/recurring-deposits` | Recurring Deposits | RD products, monthly deposit tracker, maturity forecast          |
| 27  | `/savings-goals`      | Savings Goals      | Goal-based saving, progress tracking, target amounts             |
| 28  | `/insurance`          | Insurance          | Insurance products, coverage summary, claim status               |

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

#### Business Features

##### Authentication & Security

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

##### Transactions

- **Search**: Real-time text filter across transaction titles
- **Type filter**: All / Income / Expense chip toggles
- **Date range filter**: Expandable From/To date pickers; clears via `FiX` on
  filter button
- **Category filter**: Dropdown to filter by transaction category
- **Amount range filter**: Min/max amount inputs for precise filtering
- **DateTime display**: Each transaction shows category + formatted date/time
  (e.g., "Jul 22, 10:30 AM")
- **Export**: CSV download and PDF print for filtered transaction lists

##### Reports

- **Spending by category**: Donut chart (recharts PieChart) showing spending
  distribution across budget categories
- **Spending over time**: Line chart showing daily income vs expense trends
- **Income vs expense**: Bar chart comparing total income and expenses
- **Category breakdown**: Sorted list with progress bars and percentages
- **Income sources**: Detailed list of all income transactions
- **Daily summary**: Table with per-day income, expense, and net amounts
- **Overview tab**: Summary cards (income, expenses, net) with charts

##### Cards

- **Card carousel**: Horizontal scroll with `overflow-x-auto` for card
  thumbnails; each card shows spending progress bar inline
- **Card type badge**: Visa / Mastercard / Amex labels on each card
- **Spending tracker**: Per-card progress bar with spent/limit, percentage,
  remaining amount; warning at ≥80% usage
- **Freeze/unfreeze**: Toggle card frozen state with toast confirmation; frozen
  badge on card thumbnail
- **Card detail view**: Cardholder name, expiry, status indicator, available
  balance
- **Card actions**: Expandable panel — Freeze/Unfreeze, Change PIN, Report
  Lost/Stolen, Replace Card
- **Summary stats**: Total cards, total spent, total limit, remaining credit
  across all cards
- **Recent transactions**: Last 5 expense transactions shown alongside card
  detail

##### Card Rewards

- **Cashback tracking**: Per-card cashback earned this month and YTD
- **Reward points**: Points balance, earn rate per card, redemption value
- **Tier status**: Card tier (Standard, Gold, Platinum, Black) with benefits
- **Reward catalog**: Browse and redeem points for gift cards, travel, or
  statement credits

##### Budget & Bills

- **Budget summary**: Total spent vs. total limit progress bar
- **Category cards**: Individual spending tracking per category with progress
- **Bill management**: Recurring bill list with paid/unpaid status; mark as
  paid; add new bill modal
- **Total due**: Warning card showing aggregate unpaid amount

##### Exchange

- **Currency calculator**: Convert between 58 currencies with live rate
  calculation; swap button for quick reversal
- **Rate list**: Full list of all currency rates with code, name, symbol

##### Pay & QR

- **QR code generation**: `qrcode.react` library; theme-aware (`currentColor`)
  for dark/light mode compatibility
- **Camera scanning**: `getUserMedia` API for real camera access;
  tap-to-simulate fallback; stream cleanup on unmount
- **Quick pay form**: Amount input with instant submit

##### Notifications

- **Filter tabs**: All / Unread / Alerts with unread count badge
- **Mark as read**: Click to mark individual notifications; persisted to DB

##### Contacts

- **Contact list**: Avatar, name, email with frequently-used star indicator
- **Add contact**: Modal form with name, email, optional phone
- **Quick send**: Direct link to transfer page with pre-filled recipient

##### Payment Requests

- **Incoming requests**: Requests from contacts with accept/pending status
- **Outgoing requests**: Requests you've sent to contacts
- **Status tracking**: Pending, completed, failed with visual indicators

##### Split Bill

- **Equal split**: Divide total equally among selected contacts
- **Custom amounts**: Assign specific amounts per contact
- **Your share**: Real-time calculation of your portion
- **Contact selection**: Toggle contacts with visual checkmarks

##### Recurring Transfers

- **Auto-pay setup**: Weekly, monthly, or yearly frequency
- **Pause/resume**: Toggle active state without deleting
- **Next due date**: Display upcoming payment dates
- **Account selection**: Choose source account for transfers

##### Currency Alerts

- **Rate threshold alerts**: Get notified when rates cross targets
- **Above/below direction**: Trigger on rate increase or decrease
- **Current rate display**: Show live rate alongside alert target
- **Toggle active**: Pause/resume alerts without deleting

##### Loans

- **Loan products**: Personal loan, auto loan, home loan, education loan
- **EMI calculator**: Slider-based — loan amount, interest rate, tenure; shows
  monthly EMI, total interest, total cost
- **Apply flow**: Multi-step form — personal info → employment details → loan
  specifics → document upload → review & submit
- **Loan status dashboard**: Active loans with outstanding balance, EMI due
  date, next payment amount
- **Repayment schedule**: Month-by-month amortization table with principal,
  interest, and balance breakdown
- **Prepayment calculator**: Show savings from prepaying lump sum; partial vs
  full prepayment comparison
- **Loan comparison**: Side-by-side comparison of available loan products with
  rates, tenure, and processing fees

##### Fixed Deposits

- **FD products**: List of available FD schemes with tenure and interest rates
  (e.g., 6 months, 1 year, 3 years, 5 years)
- **Interest calculator**: Deposit amount + tenure → maturity amount, total
  interest earned, effective annual rate
- **FD management**: Active deposits with maturity date, interest earned,
  auto-renewal toggle
- **Maturity tracking**: Timeline view of upcoming maturities with reinvest or
  withdraw options
- **FD vs RD comparison**: Side-by-side tool comparing fixed vs recurring
  deposit returns for same amount/tenure

##### Recurring Deposits

- **RD products**: Monthly deposit schemes with interest rates
- **Deposit tracker**: Monthly deposit history with paid/upcoming/missed status
  indicators
- **Maturity forecast**: Projected maturity amount based on current deposit rate
  and remaining months
- **Auto-debit setup**: Link RD to checking account for automatic monthly
  deductions
- **Missed deposit alert**: Notification when a monthly deposit is missed with
  option to catch up

##### Savings Goals

- **Goal creation**: Name, target amount, target date, category (vacation,
  emergency fund, education, wedding, custom)
- **Progress tracking**: Circular progress indicator per goal with percentage
  and remaining amount
- **Auto-save rules**: Set up automatic transfers (weekly, monthly) to goals
  from checking account
- **Milestone celebrations**: Visual feedback at 25%, 50%, 75%, 100% completion
- **Goal priority**: Rank goals by priority; smart allocation suggests how to
  split savings
- **Withdraw from goal**: Move funds back to checking with reason tracking

##### Insurance

- **Product catalog**: Life, health, auto, home insurance with coverage amounts
  and monthly premiums
- **Coverage summary**: Total insured amount, active policies, next premium due
  dates
- **Claim status**: Filed claims with status tracking (submitted, under review,
  approved, denied)
- **Premium payments**: Pay insurance premiums from wallet balance; auto-pay
  setup
- **Policy renewal**: Upcoming renewals with renewal amount and one-tap renewal
- **Beneficiary management**: Add/edit beneficiaries for life insurance policies

##### Profile & Settings

- **User info**: Avatar, name, email display via `UserCard`
- **Profile form**: Edit phone, email, country, timezone, default currency (58
  currencies from rate data)
- **Settings page**: Dark mode, push notifications, biometric, language
  selector, theme picker, help/legal links

#### Technical Features

##### Data & Persistence

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

##### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle with visual theme picker; persisted
  to `data-theme` attribute and localStorage
- **Skeleton loading**: Page-specific skeleton layouts (not generic spinners)
  that mirror actual content structure for perceived performance
- **Toast notifications**: In-app toast system via `ToastProvider`; auto-dismiss
  with success/error/info variants; positioned above bottom nav
- **Responsive layout**: Bottom tab nav (5 items, icon-above-text) on mobile;
  grouped sidebar nav on desktop; breakpoints at `md:` (768px)

##### Navigation & Routing

- **Route groups**: Pages organized into `(dashboard)`, `(auth)`, `(profile)`,
  `(settings)` — URLs unaffected, code logically grouped
- **Nested routes**: Accounts split into `/accounts` (overview) →
  `/accounts/checking|savings|credit`; Exchange split into `/exchange`
  (calculator) → `/rates`
- **Sidebar sections**: Navigation grouped into Overview, Finance, Payments,
  Budgeting, Account with uppercase section labels
- **Back navigation**: Consistent `FiArrowLeft` +
  `btn-neutral btn-sm btn-circle` on all sub-pages

##### Code Quality

- **Arrow functions**: All function declarations and component exports use arrow
  syntax; test files excluded
- **Debug logging**: `console.*` with `[Module]` prefix throughout source;
  stripped from production via `compiler.removeConsole`
- **Testing**: Jest (unit) + Playwright (E2E) framework ready
- **Atomic design**: atoms → molecules → organisms → templates hierarchy

##### Haptic Feedback

- **`useHaptic()` hook**: Wraps `navigator.vibrate()` with named patterns: light
  (10ms), medium (20ms), heavy (40ms), success (two pulses), error (long burst)
- **Transfer confirmation**: Success vibration on completed transfer
- **Payment sent**: Success vibration on QR scan and quick pay submit
- **Swipe actions**: Light vibration on swipe reveal of delete/archive buttons

##### Pull-to-Refresh

- **`usePullToRefresh()` hook**: Touch event handlers tracking vertical drag
  distance; configurable threshold (default 80px)
- **Visual indicator**: Rotating `FiLoader` icon with opacity fade-in
- **Transaction list**: Pull down triggers reload, resets visible count, shows
  "Transactions refreshed" toast

##### Infinite Scroll

- **IntersectionObserver sentinel**: 200px root margin triggers load before user
  reaches bottom
- **Batch loading**: 10 items per page (`PAGE_SIZE`), appended to visible list
- **Loading indicator**: Spinner below visible items during fetch
- **End state**: "All transactions loaded" message when all filtered items shown

##### Page Transitions

- **`PageTransition` component**: Framer Motion wrapper with fade + slide-up
  variants (opacity 0→1, y 12→0, 200ms ease-out)
- **Applied via `DashboardTemplate`**: All authenticated pages receive smooth
  transitions on route change

##### Offline Support

- **`OfflineBanner`**: Fixed top banner using `AnimatePresence` for enter/exit
  transitions; listens to `online`/`offline` events
- **Service worker**: Cache-first strategy for static assets; stale-while-
  revalidate for navigation; `CACHE_NAME` versioned for cache busting
- **PWA manifest**: Standalone display, portrait orientation, dark background,
  installable to home screen

##### Accessibility

- **Focus-visible**: Global `focus-visible:outline-primary` on buttons, links,
  inputs, selects, textareas
- **Skip to content**: Hidden link appears on Tab focus; jumps to
  `#main-content` landmark
- **ARIA labels**: BottomNav, Sidebar, Header menu, notification bell, QR modal
  all have `aria-label` or `aria-current`
- **Screen reader toasts**: `aria-live="assertive"` region announces toast
  messages to assistive technology

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
- **Pull-to-refresh** via touch gesture on transaction list with loading spinner
- **Infinite scroll** via IntersectionObserver sentinel at bottom of transaction
  list; loads 10 items per batch

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

- [x] Page transition animations (Framer Motion)
- [x] Pull-to-refresh on mobile
- [x] Infinite scroll / pagination for transaction list
- [x] Swipe gestures on transaction items (delete, archive)
- [x] Haptic feedback on key actions (transfer confirm, payment sent)
- [x] Keyboard navigation and ARIA labels audit
- [x] Screen reader announcements for toasts
- [x] Offline indicator banner
- [x] Service worker for static asset caching
- [x] PWA manifest with install prompt

#### Phase 3 — Data & Analytics ✅

> Insights: charts, reports, smart categorization

- [x] Spending charts (pie chart by category, line chart over time)
- [x] Monthly/yearly spending reports
- [x] Income vs. expense comparison
- [x] Budget forecasting based on historical data
- [x] Transaction export (CSV, PDF)
- [x] Recurring transaction detection
- [x] Smart categorization with category suggestions
- [x] Search with filters (date range, amount range, category)

#### Phase 4 — Social & Payments ✅

> Peer-to-peer: contacts, splits, payment requests

- [x] Contact list with frequent recipients
- [x] Payment requests (send/receive)
- [x] Split bill feature (equal or custom splits)
- [x] Payment history with status (pending, completed, failed)
- [x] Recurring transfers (auto-pay setup)
- [x] International transfer with fee calculator
- [x] Multi-currency wallet balances
- [x] Currency alert notifications (rate thresholds)

#### Phase 5 — Bank Products

> Full banking: lending, deposits, insurance, financial planning

- [ ] Loan product catalog (personal, auto, home, education)
- [ ] EMI calculator with slider inputs
- [ ] Loan application multi-step form
- [ ] Loan dashboard with active loans and repayment schedules
- [ ] Amortization table per loan
- [ ] Prepayment calculator (savings comparison)
- [ ] Fixed deposit product catalog with interest rates
- [ ] FD interest calculator
- [ ] FD management (active deposits, maturity tracking)
- [ ] Recurring deposit product catalog
- [ ] RD deposit tracker (paid/upcoming/missed)
- [ ] RD maturity forecast
- [ ] Savings goal creation and management
- [ ] Goal progress tracking with milestones
- [ ] Auto-save rules for goals
- [ ] Insurance product catalog (life, health, auto, home)
- [ ] Coverage summary dashboard
- [ ] Insurance claim status tracking
- [ ] Premium payment from wallet
- [ ] Card rewards: cashback tracking, reward points, tier status
- [ ] Reward catalog (redeem points)
- [ ] Loan vs FD vs RD comparison tool
- [ ] Financial health score dashboard

#### Phase 6 — Security & Compliance

> Production-ready: 2FA, KYC, audit logging

- [ ] Two-factor authentication (TOTP, SMS)
- [ ] Biometric authentication (WebAuthn)
- [ ] Session timeout with re-authentication
- [ ] KYC document upload and verification flow
- [ ] Transaction limits and daily caps
- [ ] Suspicious activity detection and alerts
- [ ] Audit log for all account actions
- [ ] Data encryption at rest (IndexedDB encryption)

#### Phase 7 — Platform & Integration

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
