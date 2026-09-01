# POS

> Take the order, split the bill, hit print — all in seconds. POS is a minimal
> point of sale client that runs wherever you do: phone, tablet, laptop, or a
> dedicated terminal at the counter.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────────────────┐
│  ORDER #42                    TABLE B-7     │
│  ┌───────────────────────────────────────┐  │
│  │ Espresso         2 × $3.50     $7.00  │  │
│  │ Croissant        1 × $4.00     $4.00  │  │
│  │ ───────────────────────────────       │  │
│  │ Subtotal                      $11.00  │  │
│  │ Tax (8%)                       $0.88  │  │
│  │ TOTAL                        $11.88   │  │
│  └───────────────────────────────────────┘  │
│      [ PAY CASH ]   [ CARD ]   [ SPLIT ]    │
└─────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-business-pos-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Not sure which file you need? **Android phone or tablet** → grab the `.apk`.
**Store submission** → use the `.aab`. **Desktop** → pick your OS below.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.rpm`][download-rpm]            |                  |
| 5   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 6   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 7   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |
| 8   | Windows  |        | x64          | 10.+         | [Download `.exe`][download-exe]            | Portable         |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_amd64.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_amd64.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_x64.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_x64.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/business/pos
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

One counter, five screens. Built for speed and simplicity, POS stays out of your
way while you run your shop — on Android, macOS, Windows, or Linux.

---

## Features

Every order, every sale, every report — handled in one place.

### 🛒 Core

- Point of sale interface for creating and managing orders
- Item catalog with categories and pricing
- Cart management (add, remove, update quantities)
- Tax calculation and subtotal/total display
- Payment processing workflow

### 💳 Transactions

- Cash payment support
- Receipt generation (digital and print-ready)
- Transaction history with search and filtering
- Daily sales summary and reporting
- Refund and void transaction support

### 📦 Inventory

- Stock level tracking per item
- Low stock alerts and notifications
- Inventory adjustment and audit trail
- Bulk import/export of item catalog

### 🧾 Receipts

- Customizable receipt templates
- Digital receipt delivery (email, SMS)
- Print receipt via thermal printer
- Receipt search and reprint

### 📈 Reporting

- Daily/weekly/monthly sales reports
- Top-selling items and categories
- Payment method breakdown
- Tax summary reports
- Export reports as CSV

### 🖥️ Platform

- Web app (browser) for quick access
- Tauri desktop app for dedicated POS terminals
- Tauri mobile app for tablet-based POS
- Dark theme as default

---

# First run

A few things to know before your first launch:

- **macOS** — right-click the `.dmg` and choose _Open_ the first time to bypass
  the Gatekeeper "unidentified developer" prompt, then drag POS to
  _Applications_.
- **Linux (AppImage)** — make it executable first:
  `chmod +x pos_amd64.AppImage`, then run it.
- **Windows** — Windows SmartScreen may show an "unknown publisher" warning;
  choose _More info → Run anyway_. The `.msi` installs POS into the Start menu.
- **Android** — Google Play Protect may ask to scan the sideloaded `.apk`; allow
  it to check, then _Install anyway_ if you trust the source.

---

## First run

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).