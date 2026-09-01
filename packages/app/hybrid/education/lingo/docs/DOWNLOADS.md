# Lingo

> Duolingo-style language learning — flashcards, dictionary, and sign-language
> recognition. Run vocabulary drills, look up words, or learn ASL. Runs
> everywhere: phone, tablet, laptop, desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────── Lingo ────────────────┐
│  📚 Flashcards  📖 Dict  ✋ Sign      │
│                                       │
│   ┌───────────────────────────────┐   │
│   │                               │   │
│   │     🐱  c a t                 │   │
│   │     a small domestic animal   │   │
│   │                               │   │
│   │     synonyms: feline, kitty   │   │
│   └───────────────────────────────┘   │
│                                       │
│   XP: 1,240  🔥 Streak: 7 days       │
└───────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-education-lingo-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note                |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ------------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly    |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload ¹  |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install    |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            | System package      |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon ²     |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                     |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest/lingo_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest/lingo_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest/lingo_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest/lingo_x64.msi

<br>

¹ The `.aab` is the Android App Bundle — upload it to Google Play for
distribution.
² The `.dmg` is built for Apple Silicon (aarch64) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/education/lingo
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Your pocket language coach — flashcard drills, a built-in dictionary, and
real-time sign-language recognition, all in a beautiful hybrid web/desktop app
that runs on any device.

---

## Features

Learn words, look them up, and recognise signs — all in one app.

### 🔨 Project Foundation
- Monorepo scaffold following the `psychology` app conventions
  (`packages/app/hybrid/education/lingo`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `lingo` theme (light default) with `lingo-dark`
  toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

### 🏠 Home & Navigation
- Card grid listing the three tools with icons and descriptions
- Tool routes rendered directly, opened from the home card grid; closing returns
  to `/`
- Error shells: 404 / 403 / 401 / 500 templates plus loading state
- Offline badge driven by `useOffline`
- Theme toggle in every template header; choice persisted in localStorage

### 🃏 Flashcards
- Vocabulary cards fetched at runtime from `/data/words.json` via TanStack Query
  (kept out of the JS bundle)
- Language filter derived from the dataset (`getLanguages` / `filterByLanguage`)
- Shuffle, flip-to-reveal and keyboard navigation
- Awards 10 XP per 10 navigated cards through the shared progress store

### 📖 English Dictionary
- Word lookup with part-of-speech grouped definitions
- Clickable synonym/antonym badges that navigate between words
- Graceful handling of missing/blank input

### ✋ Sign Recognition
- Real-time webcam letter recognition: MediaPipe Hands landmarks → ONNX model
  inference (`sign-model.onnx`)
- Mirrored video rendering with landmark overlay drawing
- Pure feature extraction in utils: 126-dim vector = 63 landmark offsets + 21
  hand connections × 3 bone vectors, scale-normalised
- Start/stop lifecycle with camera + inference cleanup on unmount

### 📊 Progress
- XP and daily streak persisted in IndexedDB (`idb`)
- Pure scoring function (`applyActivity`) — streak increments once per day
- Home hub displays current XP and streak badges

### 🔗 Platform Integration
- Tauri updater plugin with signed releases
- Native notifications via `nativeNotify`
- PWA manifest + network-first service worker for web installs

---

# First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag
  the app to your Applications folder.
- **Linux (AppImage):** `chmod +x lingo_amd64.AppImage` then run it — no
  install needed.
- **Windows:** SmartScreen may flag the `.msi` — click "More info" → "Run
  anyway".
- **Android:** Play Protect may warn about the `.apk` — tap "Install anyway".

---

## First run

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](LICENSE).