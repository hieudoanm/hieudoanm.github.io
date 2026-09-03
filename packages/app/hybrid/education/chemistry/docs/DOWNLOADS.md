# Chemistry

> Interactive periodic table and chemistry tools — tap elements, explore
> categories, and learn the building blocks of matter. Runs everywhere: phone,
> tablet, laptop, desktop.

![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────── Chemistry ────────────────┐
│  Periodic Table of Elements               │
│                                           │
│  ┌──┐ ┌──┐   ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐  │
│  │H │ │He│   │Li│ │Be│ │B │ │C │ │N │  │
│  │1 │ │2 │   │3 │ │4 │ │5 │ │6 │ │7 │  │
│  └──┘ └──┘   └──┘ └──┘ └──┘ └──┘ └──┘  │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐    │
│  │O │ │F │ │Ne│ │Na│ │Mg│ │Al│ │Si│    │
│  │8 │ │9 │ │10│ │11│ │12│ │13│ │14│    │
│  └──┘ └──┘ └──┘ └──┘ └──┘ └──┘ └──┘    │
│                                           │
│  [Metals] [Nonmetals] [Noble Gases]       │
└───────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-education-chemistry-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 2   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            | System package   |
| 3   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]            | Apple Silicon    |
| 4   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |

[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/chemistry_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/chemistry_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/chemistry_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/chemistry_x64.msi

<br>

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-chemistry-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/education/chemistry
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

An interactive periodic table in your pocket — tap elements, filter by category,
and explore chemistry on any device. Beautiful, responsive, and educational.

---

## Features

Explore the elements like never before.

### 🔨 Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/chemistry`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `chemistry` theme (light default) with
  `chemistry-dark` toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

### 🏠 Home & Navigation

- Card grid listing the tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

### 🧪 Periodic Table

- Interactive periodic table rendered from
  `@hieudoanm.github.io/data/periodic-table`
- Elements color-coded by `specificName` category
- Filter buttons to highlight specific element categories
- Desktop: 18-column CSS grid layout
- Mobile: 3-column card grid layout
- Responsive design adapts between breakpoints

---

# First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag the
  app to your Applications folder.
- **Linux (AppImage):** `chmod +x chemistry_amd64.AppImage` then run it — no
  install needed.
- **Windows:** SmartScreen may flag the `.msi` — click "More info" → "Run
  anyway".

---

## First run

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](LICENSE).
