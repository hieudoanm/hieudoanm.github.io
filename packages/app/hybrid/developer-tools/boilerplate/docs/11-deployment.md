# Boilerplate

> A Next.js + Tauri foundation with a full atomic design system — spin up any
> app on your phone, tablet, laptop, or desktop without reinventing the wheel.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![boilerplate screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/boilerplate/home.png)

---

## Latest release

- **Version:** `app-hybrid-developer-tools-boilerplate-latest` — updates ship
  continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/boilerplate.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-boilerplate-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/developer-tools/boilerplate
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A batteries-included Next.js + Tauri starter, all ready to go.

- **App shell** — a Next.js + Tauri scaffold you can build on.
- **Atomic design system** — 90+ components.
- **DaisyUI theming** — wired up out of the box.
- **PWA support** — installable and offline-capable.
- **Desktop build** — desktop target via Tauri.

---

## Features

A full design system and app shell, pre-wired and ready to extend.

### 🐚 App Shell

- App Router with flat routes
- Home page with navigation links
- About page with tech stack info
- Settings page (language, theme, timezone)
- Version page with build timestamp
- 404 and 500 error pages
- Responsive layout (mobile + desktop)
- Bottom navbar for mobile navigation
- Sticky header with back navigation
- Skeleton loading states

### 🖥️ Platform

- Dark theme default (DaisyUI)
- Service worker for offline caching
- PWA manifest for installability
- Tauri desktop app build for macOS

### 🔵 Design System — Atoms

- Spinner, Badge, Avatar, Separator, TextField, Skeleton
- Button, Checkbox, Icon, Progress, Rating, StatusDot, Switch, Textarea
- CodeBlock, FileInput, Kbd, Radio, Select, Slider, Tag

### 🟣 Design System — Molecules

- CopyButton, Divider, IconButton, Indicator, NumberField, PasswordField
- Toast, Modal, Card, EmptyState, Tabs, Dropdown

### 🟠 Design System — Organisms & Templates

- Alert, AvatarGroup, Breadcrumbs, Fieldset, NavItem, Pagination, SearchBar
- Accordion, ChatBubble, FormRow, Steps, TagInput, Timeline, TreeView
- ButtonGroup, Carousel, ConfirmDialog, DangerZone, KeyValue, List, Menu
- Header, Navbar
- DataTable, FeatureGrid, Footer, PricingSection, Sidebar, Toolbar
- ChatWindow, FAQSection, Hero, NewsletterSection, StatsGrid
- BlogSection, ContactSection, CTASection, TeamSection, TestimonialSection
- Calendar, Diff, IntegrationsSection, PageHeader, PricingCard
- Clock, Cube, Dock, EditableText, EmptyPlaceholder, LinkButton, MiniMap
- DatePicker, DateRange, Dialog, FileUpload, ImageGallery, InfoList
- DashboardHeader, DataList, EventTimeline, FaqAccordion, GalleryGrid
- ButtonLink, Collapse, Countdown, Mask, OTPInput, ProgressRing, Stack, Text
- CheckboxGroup, ColorPicker, Combobox, InputGroup, Popover, RadioGroup
- ActivityFeed, AnnouncementBar, AuthForm, CommandMenu, CookieBanner
- AspectRatio, Artboard, BrowserMockup, Label, LetterAvatar, PhoneMockup
- Banner, BottomNavigation, Chip, ContextMenu, Drawer, FloatingActionButton
- Four-level atomic demo with animated level tabs (ComponentsTemplate)

---

## First run

- **macOS:** Right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x boilerplate.AppImage && ./boilerplate.AppImage`
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

# Boilerplate — Packaging Checklist

Checklist for shipping Boilerplate to users: macOS notarization, Windows
code-signing, Android/iOS store builds, and the Tauri updater pipeline.

App: `boilerplate` (bundle identifier `io.github.hieudoanm.boilerplate`, version
0.0.1).

## Common

- [ ] Bump `version` in `src-tauri/tauri.conf.json` and `package.json` in sync
- [ ] Run `pnpm tauri build` (desktop) and `pnpm tauri android build` /
      `pnpm tauri ios build` (mobile) and confirm artifacts appear under
      `src-tauri/target/`
- [ ] Smoke-test the exported web build (`out/`) and the native apps
- [ ] Regenerate `docs/ROADMAP.md` release notes for the tag

## Auto-update (desktop)

> Auto-update is **not yet configured** for this app. The Tauri updater plugin
> is not registered and `plugins.updater` is absent from
> `src-tauri/tauri.conf.json`. Follow the checklist below.

- [ ] Add `tauri-plugin-updater` (Rust) + `@tauri-apps/plugin-updater` (JS) and
      register the plugin in `src-tauri/src/lib.rs`
- [ ] Generate a signing key pair:
      `pnpm tauri signer generate --ci -p <password> -w <path>`
- [ ] Set `plugins.updater.pubkey` and `plugins.updater.endpoints` in
      `src-tauri/tauri.conf.json`
- [ ] Endpoint to publish to:
      `https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-boilerplate-latest/latest.json`
- [ ] Set `bundle.createUpdaterArtifacts: true` so `.sig` + updater bundles are
      produced by `tauri build`
- [ ] Publish the updater JSON + artifacts to the configured endpoint
- [ ] Add `updater:default` (and `dialog:default`) to
      `src-tauri/capabilities/default.json` for the JS API
- [ ] CI provides the private key via environment variables:
  - `TAURI_SIGNING_PRIVATE_KEY` or `TAURI_SIGNING_PRIVATE_KEY_PATH`
  - `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`
  - Keep the private key out of the repo (dev-machine path only)

## macOS

- [ ] Developer ID Application certificate installed in the signing keychain
- [ ] Notarization configured:
  - `APPLE_ID`, `APPLE_PASSWORD`/`APPLE_APP_SPECIFIC_PASSWORD`, and
    `APPLE_TEAM_ID` set for `tauri-apple-signing` / CI
- [ ] `bundle.macOS.dmg` settings produce a DMG that mounts and copies to
      Applications
- [ ] Verify Gatekeeper: `spctl --assess --type execute` on the `.app` passes
      after notarization
- [ ] Confirm updater signatures verify against `plugins.updater.pubkey` once
      the updater is configured

## Windows

- [ ] Code-signing certificate (e.g. EV cert) installed and password available
- [ ] `tauri.conf.json` `bundle.windows.certificateThumbprint` / signing tools
      configured (or `tauri-action` `signingCertificate`/`certificatePassword`)
- [ ] Installer (MSI/NSIS) runs without SmartScreen warning on a clean VM
- [ ] Updater NSIS `installMode: passive` installs on quit without a UAC prompt
      churn

## Android

- [ ] Upload keystore generated and stored in CI secrets (never in repo)
- [ ] `tauri.conf.json` `bundle.android` keystore configured via env vars:
      `TAURI_ANDROID_KEYSTORE_PATH`, `TAURI_ANDROID_KEYSTORE_PASSWORD`,
      `TAURI_ANDROID_KEY_ALIAS`, `TAURI_ANDROID_KEY_PASSWORD`
- [ ] `pnpm tauri android build --target apk --target aab` produces a signed
      APK + AAB for Play Store
- [ ] Play Store listing assets (icons, screenshots, privacy policy) prepared
- [ ] Content URI handling verified: file import via camera/gallery works

## iOS

- [ ] Apple Developer account + App Store Connect app record created
- [ ] Signing team + provisioning profile set for the `boilerplate` Xcode
      project under `src-tauri/gen/apple/`
- [ ] `pnpm tauri ios build` produces an archive; upload via Xcode/Transporter
- [ ] Review App Privacy questionnaire entries (no analytics SDKs)
