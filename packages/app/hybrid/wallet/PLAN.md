# Wallet — Banking App UI

## Table of Contents

- [Wallet — Banking App UI](#wallet--banking-app-ui)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Pages](#pages)
  - [Features](#features)
  - [File Structure](#file-structure)
  - [Key Conventions](#key-conventions)

## Tech Stack

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

## Pages

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

## Features

- **Auth**: localStorage-based route protection; unauthenticated users redirect
  to `/login`
- **Toast notifications**: In-app toast system replaces `alert()` for user
  feedback
- **Theme**: 32 DaisyUI themes with dark/light toggle, persisted to localStorage
- **Responsive**: Bottom tab nav (mobile), sidebar nav (desktop)
- **Persistence**: IndexedDB for all data; seeded on first load
- **Testing**: Jest (unit) + Playwright (E2E)
- **Debugging**: `console.*` statements throughout source for development;
  stripped from production builds via `next.config.ts` `compiler.removeConsole`

## File Structure

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

## Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `input`, etc.)
- Dark theme as default
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → molecules → organisms → templates
- `console.*` with `[Module]` prefix for structured debug logging
- `console.*` stripped in production via `compiler.removeConsole`
