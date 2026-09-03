# Music

> Ear-training games and music tools — guess notes on an on-screen piano,
> sharpen your pitch, and play melodies. Runs everywhere: phone, tablet, laptop,
> desktop.

![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────── Music ────────────────┐
│                                       │
│   ♪  ♫  ♬  Pitch Training  ♩  ♪  ♫  │
│   ┌──┬┬┬┬┬┬┬┬┬┬┬┬──┬┬┬┬┬┬┬┬┬┬┬┐    │
│   │  │││││││││││││  ││││││││││││    │
│   │  │││││││││││││  ││││││││││││    │
│   │  │││││││││││││  ││││││││││││    │
│   │  │├┤├┤├┤├┤│  │├┤├┤├┤├┤│  │    │
│   └──┴┴┴┴┴┴┴┴┴┴┴──┴┴┴┴┴┴┴┴┴┴┴┘    │
│     C  D  E  F  G  A  B  C          │
│                                       │
│   Level: 5/11   Score: 420  🏆 680   │
└───────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-education-music-latest` — updates ship continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/music_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/music_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/music_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/music_x64.msi

<br>

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-music-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/education/music
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

An ear-training pocket piano that runs on any device. Guess notes, practice
scales, and play melodies — all from a beautiful hybrid web/desktop app.

---

## Features

Sharpen your ears and have fun doing it.

### 🔨 Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/music`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `music` theme (light default) with `music-dark`
  toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

### 🏠 Home & Navigation

- Card grid listing the tool with icon and description
- Tool route rendered directly, opened from the home card grid
- Theme toggle in template header; choice persisted in localStorage

### 🎵 Pitch (Ear Training)

- Guess-the-note piano game: random note plays, player guesses on on-screen
  keyboard
- 11 difficulty levels with growing note pools (C → full chromatic scale)
- Score tracking with localStorage-persisted high score
- Practice mode: ascending white keys with key highlighting
- Twinkle Twinkle Little Star mode: melody playback with highlighting
- Visual feedback: green for correct, red for wrong, blue for highlighted
- Ripple animation on tone play
- Mobile-first responsive design with white and black key rendering
- Keyboard-free: all interaction via click/tap

---

# First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag the
  app to your Applications folder.
- **Linux (AppImage):** `chmod +x music_amd64.AppImage` then run it — no install
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
