# Wallet

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/SHA256SUMS.txt

## About

Wallet — minimal Momo / Techcombank mobile banking app.

## Features

## Account

- Authentication flow (login, register, forgot/reset password)
- Profile with user info, settings, theme picker
- Dashboard with balance, accounts, quick actions, recent transactions
- Accounts overview with type sections (checking, savings, credit)
- Responsive layout (bottom nav + sidebar)
- 32 DaisyUI themes with dark default

## Transactions

- Transaction list with search, type filter, date range filter
- Infinite scroll / pagination for transaction list
- Swipe gestures on transaction items (delete, archive)
- Transaction export (CSV, PDF)
- Payment history with status (pending, completed, failed)

## Money Movement

- Transfer wizard (3-step: recipient, amount, review)
- Card carousel with freeze/unfreeze
- Recurring bills with mark-as-paid
- Currency exchange calculator + rate list
- Pay page with QR code generation + camera scanning
- Payment requests (send/receive)
- Recurring transfers (auto-pay setup)

## Budgets & Insights

- Budget summary with category cards
- Spending charts (pie chart by category, line chart over time)
- Monthly/yearly spending reports (monthly trends; yearly selector pending)
- Income vs. expense comparison
- Search with filters (date range, amount range, category)

## Contacts & Social

- Contact list with frequent recipients
- Split bill feature (equal or custom splits)

## Banking Products

- Loan product catalog (personal, auto, home, education)
- EMI calculator with slider inputs
- Loan dashboard with active loans and repayment schedules
- FD interest calculator
- FD management (active deposits, maturity tracking)
- RD deposit tracker (paid/upcoming/missed)
- RD maturity forecast
- Savings goal creation and management

## Insurance & Rewards

- Coverage summary dashboard
- Premium payment from wallet
- Card rewards: cashback tracking, reward points, tier status
- Reward catalog (redeem points)

## Notifications & UX

- Notifications with filter and mark-as-read
- Currency alert notifications (rate thresholds)
- Page transition animations (Framer Motion)
- Pull-to-refresh on mobile
- Haptic feedback on key actions (transfer confirm, payment sent)
- Keyboard navigation and ARIA labels audit
- Screen reader announcements for toasts
- Offline indicator banner

## PWA

- Service worker for static asset caching
- PWA manifest with install prompt

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
