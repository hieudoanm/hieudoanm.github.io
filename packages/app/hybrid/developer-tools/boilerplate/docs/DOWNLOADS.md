# Boilerplate

> A Next.js + Tauri foundation with a full atomic design system — spin up any
> app on your phone, tablet, laptop, or desktop without reinventing the wheel.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────────┐
│  BOILERPLATE             ⚙  👤     │
├─────────────────────────────────────┤
│  ▸ Atoms    Button  Badge  Spinner │
│  ▸ Molecules Toast  Modal  Card    │
│  ▸ Organisms Table  Nav    Footer  │
│  ▸ Templates Hero    FAQ    Blog   │
│                                     │
│  ┌────────────────────────────────┐ │
│  │  32 DaisyUI themes · PWA ready│ │
│  │  Tauri desktop · Dark default │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

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

A batteries-included Next.js + Tauri starter — app shell, atomic design system
with 90+ components, DaisyUI theming, PWA support, and a desktop build, all
ready to go.

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

# First run

- **macOS:** Right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x boilerplate.AppImage && ./boilerplate.AppImage`
- **Windows SmartScreen:** Click **More info → Run anyway** if prompted.
- **Android Play Protect:** Tap **Install anyway** if the warning appears.

---

## First run

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and how
  to run tests.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).
