# Password

> A minimal BitWarden / 1Password vault that runs everywhere — phone, tablet,
> laptop, and desktop. Generate passwords, manage TOTP, and stay secure from any
> screen.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────┐
│  🔒 Vault           [search]   │
│  ┌──────────────────────────┐   │
│  │ ● Gmail       👤 📧     │   │
│  │ ● GitHub      👤 🔑     │   │
│  │ ● Netflix     👤 🎬     │   │
│  │ ● Bank        💳 💰     │   │
│  └──────────────────────────┘   │
│  vault │ gen │ health │ totp   │
└─────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-utilities-password-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform and install directly.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |

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

<br>

¹ The `.aab` bundle is for uploading to app stores; install the `.apk` directly
on your device.

² Right-click the `.dmg`, choose **Open**, then drag the app into your
Applications folder.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-password-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/utilities/password
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A vault packed into your pocket — store, generate, and manage every password you
own, running natively on every device you own.

---

## Features

### 🔒 Vault

- Vault list with item cards (logins, cards, notes, identities, SSH keys)
- Item detail view with show/hide for sensitive fields
- Add/edit item forms with per-type fields (login, card, identity, note, SSH)
- Search across all items
- Category filter chips
- Favorites with star toggle
- Copy username/password to clipboard
- Demo vault seed data (24 items)
- Responsive layout (sidebar + vault)

### 🎯 UX

- Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+L)
- Swipe-to-delete on mobile
- Drag-and-drop items into folders
- Page transition animations (Framer Motion)
- Skeleton loading states
- Recently used items section
- Sort options (name, date, most used)
- Bulk select and delete

### 🔐 Security

- Master password lock screen
- Auto-lock on timeout (configurable; setting stored, no enforcement)
- Auto-lock on browser close
- Password generator (length, complexity, memorable mode)
- PIN generator
- Password strength meter with criteria checklist
- Clipboard auto-clear (setting stored, no enforcement)
- TOTP setup with QR code and countdown timer
- Biometric toggle (mock)

### 📂 Organization

- Folder creation and management (IndexedDB store, FolderManager UI)
- Drag items into folders
- Tag system with filter
- Trash with restore and 30-day auto-purge
- Advanced search (by type, date range, folder, tag)
- Sort options (name, date, most used)
- Duplicate item
- Custom fields on any item type

### 🏥 Password Health

- Overall health score (0-100)
- Weak password detection with threshold
- Reused password grouping
- Breached password check (mock)
- Old password alerts (90+ days)
- Strength breakdown chart
- Remediation suggestions per item
- Health dashboard with trends

### 🤝 Collaboration

- Item sharing with permission levels (view/edit)
- Shared with me filter
- Emergency access with delay timer
- Access log per item
- Team vaults (mock: shared folders)
- Import from CSV
- Import from JSON
- Export vault (encrypted JSON, plain CSV)

### 🖥️ Platform

- Tauri desktop app build (bundling configured; signing not yet)

---

## Next steps

- Want to contribute? Check the [CONTRIBUTING](CONTRIBUTING) guide.
- Curious what's coming? See the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
