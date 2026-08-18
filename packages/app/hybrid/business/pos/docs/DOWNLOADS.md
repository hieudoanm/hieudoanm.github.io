# POS

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/pos_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-pos-latest/SHA256SUMS.txt

## About

POS — minimal point of sale client for processing transactions.

## Features

## Core

- Point of sale interface for creating and managing orders
- Item catalog with categories and pricing
- Cart management (add, remove, update quantities)
- Tax calculation and subtotal/total display
- Payment processing workflow

## Transactions

- Cash payment support
- Receipt generation (digital and print-ready)
- Transaction history with search and filtering
- Daily sales summary and reporting
- Refund and void transaction support

## Inventory

- Stock level tracking per item
- Low stock alerts and notifications
- Inventory adjustment and audit trail
- Bulk import/export of item catalog

## Receipts

- Customizable receipt templates
- Digital receipt delivery (email, SMS)
- Print receipt via thermal printer
- Receipt search and reprint

## Reporting

- Daily/weekly/monthly sales reports
- Top-selling items and categories
- Payment method breakdown
- Tax summary reports
- Export reports as CSV

## Platform

- Web app (browser) for quick access
- Tauri desktop app for dedicated POS terminals
- Tauri mobile app for tablet-based POS
- Dark theme as default

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
