# Tax

> Vietnamese tax management made simple — PIT calculator, submissions, and
> audits in one tidy place. Manage your money everywhere it happens: phone,
> tablet, laptop, and desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────────┐
│  Tax Calculator           PIT · Gross→Net     │
│  ┌────────────────────────────────────────┐  │
│  │ Gross salary   22,000,000 VND/mo      │  │
│  │ Dependents           0               │   │
│  │ Insurance           ▸ on              │  │
│  │                        ┌────────────┐  │  │
│  │ Tax payable → 1,528,000│   Compute  │  │  │
│  │                        └────────────┘  │  │
│  └────────────────────────────────────────┘  │
│  effective rate 6.9% · 7 brackets           │
└──────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-finance-tax-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your device — Android phones install the `.apk`, and
Linux/macOS/Windows grab their native package below.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-tax-latest/tax.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-tax-latest/tax.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-tax-latest/tax.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-tax-latest/tax.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-tax-latest/tax.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-tax-latest/tax.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-tax-latest/tax.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-tax-latest/tax.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-finance-tax-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/finance/tax
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

## First Run

Per-platform launch tips:

- **macOS** — right-click the `.dmg` then **Open** to bypass Gatekeeper the
  first time, or find the app bundle inside.
- **Linux** — make it runnable: `chmod +x tax.AppImage` then double-click.
- **Windows** — SmartScreen may warn; choose **More info → Run anyway**.
- **Android** — if Play Protect warns, tap **Install anyway**.

---

## About

From gross-to-net in seconds to full compliance tracking. Tax is a Vietnamese
tax management application — PIT calculator, tax submissions, and audits — that
works offline and on any screen, with login, dashboards, and responsive design
built in.

---

## Features

Personal and business tax workflows, all in one syncable place.

### 🔐 Authentication

- Login and registration flow
- Route guard for protected pages
- Local persistence with IndexedDB

### 📊 Dashboard

- Overview statistics (companies, submissions, pending, flagged audits)
- Recent submissions list
- Recent audits list
- Quick navigation to all features

### 🧮 Tax Calculator

- Personal income tax (PIT) calculator
- Gross-to-Net and Net-to-Gross modes
- Monthly and annual period support
- Progressive tax brackets: 5% → 35% (7 brackets)
- Personal deduction: 11,000,000 VND/month
- Dependent deduction: 4,400,000 VND/dependent/month
- Social insurance toggle (employee + employer)
- Insurance cap: 36,000,000 VND/month
- Detailed tax breakdown table
- Effective tax rate calculation
- Total employer labor cost

### 📑 Tax Submission

- Company tax declaration management
- Tax types: PIT, CIT, VAT, FCT
- Status tracking: draft → submitted → accepted/rejected/amended
- Document management (01-KK/TNCN, GTGT, TNDN, etc.)
- Deadline management
- Period tracking (monthly, quarterly, annual)
- Notes and comments

### 🔎 Tax Audit

- Automated compliance checks
- Manual internal audits
- Risk scoring (0-100)
- Finding tracking with severity levels (low/medium/high/critical)
- Finding categories: discrepancy, missing_document, compliance_error,
  overpayment, underpayment
- Resolution tracking
- Audit checklist (document, calculation, deadline, compliance)
- Company-level audit history

### 🖥️ Responsive Design

- Desktop: Sidebar navigation
- Mobile: Bottom navigation + header with hamburger menu
- 32 DaisyUI themes with dark default
- Accessible (skip to content, ARIA labels, screen reader announcements)

### 📴 Offline Support

- IndexedDB for local persistence
- Offline indicator banner
- Mock data with configurable delay

---

## First run

---

## Next steps

- [CONTRIBUTING](CONTRIBUTING) — set up the dev environment and start tinkering.
- [ROADMAP](ROADMAP) — see what's coming next on the roadmap.

---

## License

See [LICENSE](LICENSE).
