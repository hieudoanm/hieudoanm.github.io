# Wallet

> Your money, one tap away — a minimal banking app that tracks balances, splits
> bills, and runs on your phone, tablet, laptop, or desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![wallet screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/wallet/home.png)

---

## Latest release

- **Version:** `app-hybrid-finance-wallet-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform and you're good to go.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Fedora | amd64        | 40.+         | [Download `.rpm`][download-rpm]            |                  |
| 5   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 6   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 7   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |
| 8   | Windows  |        | x64          | 10.+         | [Download `.exe`][download-exe]            | Portable         |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/wallet.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-wallet-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/finance/wallet
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A dead-simple Momo / Techcombank-style mobile banking app — track your balance,
move money, split bills, and keep an eye on budgets from any device.

---

## Features

Everything you need to manage money without the bloat.

### 👤 Account

- Authentication flow (login, register, forgot/reset password)
- Profile with user info, settings, theme picker
- Dashboard with balance, accounts, quick actions, recent transactions
- Accounts overview with type sections (checking, savings, credit)
- Responsive layout (bottom nav + sidebar)
- 32 DaisyUI themes with dark default

### 💸 Transactions

- Transaction list with search, type filter, date range filter
- Infinite scroll / pagination for transaction list
- Swipe gestures on transaction items (delete, archive)
- Transaction export (CSV, PDF)
- Payment history with status (pending, completed, failed)

### 🔄 Money Movement

- Transfer wizard (3-step: recipient, amount, review)
- Card carousel with freeze/unfreeze
- Recurring bills with mark-as-paid
- Currency exchange calculator + rate list
- Pay page with QR code generation + camera scanning
- Payment requests (send/receive)
- Recurring transfers (auto-pay setup)

### 📊 Budgets & Insights

- Budget summary with category cards
- Spending charts (pie chart by category, line chart over time)
- Monthly/yearly spending reports (monthly trends; yearly selector pending)
- Income vs. expense comparison
- Search with filters (date range, amount range, category)

### 📇 Contacts & Social

- Contact list with frequent recipients
- Split bill feature (equal or custom splits)

### 🏦 Banking Products

- Loan product catalog (personal, auto, home, education)
- EMI calculator with slider inputs
- Loan dashboard with active loans and repayment schedules
- FD interest calculator
- FD management (active deposits, maturity tracking)
- RD deposit tracker (paid/upcoming/missed)
- RD maturity forecast
- Savings goal creation and management

### 🛡️ Insurance & Rewards

- Coverage summary dashboard
- Premium payment from wallet
- Card rewards: cashback tracking, reward points, tier status
- Reward catalog (redeem points)

### 🔔 Notifications & UX

- Notifications with filter and mark-as-read
- Currency alert notifications (rate thresholds)
- Page transition animations (Framer Motion)
- Pull-to-refresh on mobile
- Haptic feedback on key actions (transfer confirm, payment sent)
- Keyboard navigation and ARIA labels audit
- Screen reader announcements for toasts
- Offline indicator banner

### 📱 PWA

- Service worker for static asset caching
- PWA manifest with install prompt

---

# First run

- **macOS:** Right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x wallet.AppImage && ./wallet.AppImage`
- **Windows SmartScreen:** Click **More info → Run anyway** if prompted.
- **Android Play Protect:** Tap **Install anyway** if the warning appears.

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and how
  to run tests.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).
