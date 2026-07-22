# 🏦 Wallet — Banking App UI

## Tech Stack

- **Next.js 16** (Pages Router, static export)
- **TypeScript 6** (strict mode)
- **Tailwind CSS 4** + **DaisyUI 5** (dark/light themes)
- **Mock data only** (no backend)

## Pages

| #   | Route            | Page                | Key Features                                                     |
| --- | ---------------- | ------------------- | ---------------------------------------------------------------- |
| 1   | `/login`         | Login               | Email/password form, social login buttons                        |
| 2   | `/register`      | Register            | Sign up form, terms checkbox                                     |
| 3   | `/`              | Dashboard           | Total balance, account cards, quick actions, recent transactions |
| 4   | `/accounts`      | Accounts            | List of accounts (checking, savings, credit), tap to detail      |
| 5   | `/transactions`  | Transactions        | Filterable transaction list, search, date range                  |
| 6   | `/transfer`      | Transfer            | Send money form, recipient selection, amount input, confirmation |
| 7   | `/cards`         | Cards               | Card carousel, freeze/unfreeze, card details                     |
| 8   | `/budget`        | Budget / Analytics  | Spending by category, charts, monthly summary                    |
| 9   | `/pay`           | Pay / QR            | QR code display/scanner, NFC-style payment                       |
| 10  | `/bills`         | Bills / Recurring   | Bill reminders, recurring payment setup                          |
| 11  | `/exchange`      | Currency / Exchange | Multi-currency balances, exchange rate converter                 |
| 12  | `/notifications` | Notifications       | Alerts, transaction notifications, messages                      |
| 13  | `/profile`       | Profile             | User info, settings, theme toggle, logout                        |

## Responsive Layout

- **Mobile (< 768px):** Bottom tab nav (5 icons), stacked cards, full-width
  forms
- **Desktop (>= 768px):** Left sidebar nav, grid layouts, split panels

## File Structure

```
src/
  components/
    layout/         # Sidebar, BottomNav, Header, AuthLayout
    ui/             # Button, Input, Card, Modal, Badge
    dashboard/      # BalanceCard, QuickActions, RecentTransactions
    accounts/       # AccountCard, AccountDetail
    transactions/   # TransactionItem, TransactionFilters
    transfer/       # TransferForm, RecipientPicker, TransferConfirmation
    cards/          # CardCarousel, CardActions
    budget/         # SpendingChart, CategoryBreakdown
    pay/            # QRCode, PaymentButton
    bills/          # BillItem, RecurringSetup
    exchange/       # CurrencyConverter, RateDisplay
    notifications/  # NotificationItem, NotificationList
    profile/        # ProfileForm, ThemeToggle
  pages/            # 13 page files
  styles/           # globals.css
  types/            # TypeScript interfaces
  data/             # Mock accounts, transactions, cards, etc.
  hooks/            # useMediaQuery, useTheme, etc.
  utils/            # Formatters (currency, date), helpers
```

## Implementation Order

1. Project setup (copy boilerplate, add dependencies)
2. Layout + navigation (responsive sidebar/bottom nav)
3. Login/Register (auth screens)
4. Dashboard (home page)
5. Accounts + Transactions
6. Transfer
7. Cards
8. Budget/Analytics
9. Pay/QR
10. Bills/Recurring
11. Currency/Exchange
12. Notifications
13. Profile + theme toggle

## Key Conventions

- Arrow functions, `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn`, `card`, `input`, etc.)
- Dark theme as default
- `prettier-plugin-tailwindcss` for class sorting
