# Menu

> Create your menu, print the QR code, and let guests order straight from their
> phones — no app to install, no counter clutter. Menu is a lightweight,
> static-first restaurant menu client that runs in the browser or as a desktop
> app.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────────────────┐
│  THE GOLDEN FORK                            │
│  ┌───────────────────────────────────────┐  │
│  │ 🍕 Margherita         $12.00          │  │
│  │ 🍔 Smash Burger       $9.50           │  │
│  │ 🥤 Lemonade           $3.00           │  │
│  │ ───────────────────────────────       │  │
│  │ Your order                     $24.50 │  │
│  │ [ + Place order + ]                  │  │
│  └───────────────────────────────────────┘  │
│      [ Menu QR code ]                       │
└─────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-business-menu-latest` — updates ship continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-menu-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-menu-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-menu-latest/menu_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-menu-latest/menu_amd64.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-menu-latest/menu_amd64.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-menu-latest/menu_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-menu-latest/menu_x64.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-menu-latest/menu_x64.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-business-menu-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/business/menu
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

One menu, one QR code, zero checkout friction. Designed for phones first, Menu
lets you build a menu in seconds, share a QR code, and take orders without a
backend — everything travels in the link itself.

---

## Features

Build, share, and take orders — all in one place.

### 🍽️ Menu builder

- Create multiple restaurants with a name, description, and accent color
- Add food and drink items with prices, emoji, and descriptions
- Mark items in or out of stock in one tap
- Filter by food, drink, or view everything

### 📱 Guest ordering

- Guests open the menu from a QR code or shared link
- Add items to an order with quantity steppers
- Enter a name, table number, and note before submitting
- Mobile-first layout that feels right on a phone

### 🔗 Share by link

- Every menu is shared as a URL — no account, no backend
- Menu data travels inside the link itself (query params only)
- Works offline: open a shared menu and order right away

### 🖥️ Platform

- Web app (browser) for quick access
- Tauri desktop app for an in-store ordering kiosk
- Dark theme as default

---

## First run

A few things to know before your first launch:

- **macOS** — right-click the `.dmg` and choose _Open_ the first time to bypass
  the Gatekeeper "unidentified developer" prompt, then drag Menu to
  _Applications_.
- **Linux (AppImage)** — make it executable first:
  `chmod +x menu_amd64.AppImage`, then run it.
- **Windows** — Windows SmartScreen may show an "unknown publisher" warning;
  choose _More info → Run anyway_. The `.msi` installs Menu into the Start menu.
- **Android** — Google Play Protect may ask to scan the sideloaded `.apk`; allow
  it to check, then _Install anyway_ if you trust the source.
- **Browser** — no install needed. Open the web app, create a restaurant, and
  print the generated QR code for your menu.

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
