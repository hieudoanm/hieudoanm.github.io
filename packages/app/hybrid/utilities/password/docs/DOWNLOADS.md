# Password

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-password-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-password-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-password-latest/password_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-password-latest/password_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-password-latest/password_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-password-latest/password_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-password-latest/SHA256SUMS.txt

## About

Password — minimal BitWarden / 1Password vault.

## Features

## Status

51/59 roadmap items complete (Phases 1–6 done, Phase 7 partially complete).

---

## Vault

- Vault list with item cards (logins, cards, notes, identities, SSH keys)
- Item detail view with show/hide for sensitive fields
- Add/edit item forms with per-type fields (login, card, identity, note, SSH)
- Search across all items
- Category filter chips
- Favorites with star toggle
- Copy username/password to clipboard
- Demo vault seed data (24 items)
- Responsive layout (sidebar + vault)

## UX

- Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+L)
- Swipe-to-delete on mobile
- Drag-and-drop items into folders
- Page transition animations (Framer Motion)
- Skeleton loading states
- Recently used items section
- Sort options (name, date, most used)
- Bulk select and delete

## Security

- Master password lock screen
- Auto-lock on timeout (configurable; setting stored, no enforcement)
- Auto-lock on browser close
- Password generator (length, complexity, memorable mode)
- PIN generator
- Password strength meter with criteria checklist
- Clipboard auto-clear (setting stored, no enforcement)
- TOTP setup with QR code and countdown timer
- Biometric toggle (mock)

## Organization

- Folder creation and management (IndexedDB store, FolderManager UI)
- Drag items into folders
- Tag system with filter
- Trash with restore and 30-day auto-purge
- Advanced search (by type, date range, folder, tag)
- Sort options (name, date, most used)
- Duplicate item
- Custom fields on any item type

## Password Health

- Overall health score (0-100)
- Weak password detection with threshold
- Reused password grouping
- Breached password check (mock)
- Old password alerts (90+ days)
- Strength breakdown chart
- Remediation suggestions per item
- Health dashboard with trends

## Collaboration

- Item sharing with permission levels (view/edit)
- Shared with me filter
- Emergency access with delay timer
- Access log per item
- Team vaults (mock: shared folders)
- Import from CSV
- Import from JSON
- Export vault (encrypted JSON, plain CSV)

## Platform

- Tauri desktop app build (bundling configured; signing not yet)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
