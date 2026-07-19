# Colors

> A collection of practical tools for picking, tuning and shipping color.
> Convert, adjust, blend, and export color values from any device.

![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────┐
│  ┌───────┬──────────────┐      │
│  │ tools │  ┌────────┐  │      │
│  │ ░░░░  │  │ color  │  │      │
│  │ ▓▓▓▓  │  │  wheel │  │      │
│  └───────┘  └────────┘  │      │
│  converter │ adjust │ mix│      │
└─────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-graphics-design-colors-latest` — updates ship
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
| 4   | Linux    | Fedora | amd64        | 40.+         | [Download `.rpm`][download-rpm]            |                  |
| 5   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 6   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 7   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |
| 8   | Windows  |        | x64          | 10.+         | [Download `.exe`][download-exe]            | Portable         |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-colors-latest/colors.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-colors-latest/colors.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-colors-latest/colors.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-colors-latest/colors.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-colors-latest/colors.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-colors-latest/colors.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-colors-latest/colors.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-colors-latest/colors.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

Every asset is published with a SHA-256 digest so you can confirm the file you
got is exactly the file we shipped. See [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-colors-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/graphics-design/colors
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A pocket-sized color utility with 16 tools — converter, adjuster, wheel,
schemes, contrast checker, mixer, gradient builder, and more — running natively
on every device you own.

---

## Features

### 🔄 Converter

- Convert between HEX, RGB, HSL, HSV and CMYK
- Copy any value with one click

### 🎚️ Adjuster

- Tune hue, saturation and lightness of any color

### 🎡 Color Wheel

- Explore hues and their harmonic relationships

### 🎨 Schemes

- Generate complementary, analogous and triadic sets

### 🎯 Contrast

- Verify contrast ratios against WCAG AA/AAA thresholds

### 🌗 Shades & Tints

- Build a balanced scale from one color
- Tint, shade or tone a color in steps

### 🫧 Mixer & Temperature

- Blend two colors by weight
- Classify warm and cool colors and map Kelvin

### 🌈 Gradient & Opacity

- Compose linear and radial CSS gradients
- Preview a color over white and black at any alpha

### 👁️ Color Blindness

- Simulate protanopia, deuteranopia and tritanopia

### 📝 CSS Scale & Palette

- Export a color scale as CSS custom properties
- Roll a random harmonious color palette
- Generate and lock a random color
- Browse the active theme palette roles

---

## Next steps

- Want to contribute? Check the [CONTRIBUTING](CONTRIBUTING) guide.
- Curious what's coming? See the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
