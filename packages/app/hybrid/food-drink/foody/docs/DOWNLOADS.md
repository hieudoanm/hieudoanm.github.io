# Foody

> Can't decide what to eat? Spin the reel and let fate pick your next meal from
> 32 dishes across six world cuisines. Runs everywhere: phone, tablet, laptop,
> desktop.

![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────── Foody ─────────────────┐
│  🍜 Food Randomizer                    │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │           🍝                     │  │
│  │         Spaghetti                │  │
│  │           Bolognese              │  │
│  └──────────────────────────────────┘  │
│                                        │
│  🇮🇹 Italy  🇰🇷 Korea  🇯🇵 Japan       │
│  🇹🇭 Thailand 🇻🇳 Vietnam 🇲🇽 Mexico  │
│                                        │
│  [ SPIN ]   Spins: 12                  │
└────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-food-drink-foody-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-food-drink-foody-latest/foody.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-food-drink-foody-latest/foody.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-food-drink-foody-latest/foody.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-food-drink-foody-latest/foody.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-food-drink-foody-latest/foody.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-food-drink-foody-latest/foody.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-food-drink-foody-latest/foody.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-food-drink-foody-latest/foody.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-food-drink-foody-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/food-drink/foody
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Can't decide what to eat? Spin the slot-machine reel and let fate pick from 32
dishes across six world cuisines. Quick, fun, and runs on any device.

---

## Features

Let the reel decide your next meal.

### 🔨 Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/food-drink/foody`)
- Next.js static export validated against Tauri's `out` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `foody` theme (light default) with `foody-dark`
  toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

### 🏠 Home & Navigation

- Card grid listing the Food Randomizer tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

### 🎰 Food Randomizer

- Slot-machine style reel cycling dish names while spinning
- 32 dishes across six cuisines: Italy, Korea, Japan, Thailand, Vietnam and
  Mexico (`randomizer/constants.ts`)
- Cuisine picker with search, cuisine filter chips and expandable groups;
  supports locking a single dish before spinning
- Spin via button or keyboard (Space / Enter); ignored while typing
- Landed dishes link to a Google search for quick research
- How-to-play modal explaining the flow
- Local spin counter shown under the reel

### 📁 Data Model

- `Cuisine { emoji, value, label }` and `Food { emoji, value, label, category }`
- `FOOD_OPTIONS` maps every cuisine plus `all` to dish label lists used by the
  reel animation and random pick

---

# First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag the
  app to your Applications folder.
- **Linux (AppImage):** `chmod +x foody.AppImage` then run it — no install
  needed.
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
