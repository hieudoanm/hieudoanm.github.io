# Resume

> Build a polished, professional resume entirely offline — 32 templates, live
> preview, and one-click export. Works on your phone, tablet, laptop, and
> desktop so your next opportunity is always ready.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────────┐
│ 📄 Resume Builder        [Preview] [Export]  │
├──────────────────┬───────────────────────────┤
│ 👤 Personal Info │ ┌───────────────────────┐ │
│ 📝 Summary       │ │  ┌──────────────────┐ │ │
│ 💼 Experience    │ │  │  JOHN DOE        │ │ │
│ 🎓 Education     │ │  │  Engineer        │ │ │
│ 🛠️ Skills        │ │  │  ─────────────── │ │ │
│ 📜 Certs         │ │  │  EXPERIENCE      │ │ │
│ 🌐 Languages     │ │  │  · Tech Corp     │ │ │
│ 🎯 Interests     │ │  │  · Startup Inc   │ │ │
│                  │ │  └──────────────────┘ │ │
├──────────────────┴───────────────────────────┤
│ Words: 312  │  Paper: A4  │  Fit: ✓         │
└──────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-productivity-resume-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your platform.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

## First run

- **macOS** — right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux** — `chmod +x resume.AppImage && ./resume.AppImage`.
- **Windows** — SmartScreen may warn; click **More info → Run anyway**.
- **Android** — Play Protect may block; tap **Install anyway**.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/productivity/resume
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A minimal, offline-first resume builder with 32 templates, live paper-size
preview, and export to HTML/PDF — no account, no cloud, no tracking, just your
next resume ready in minutes.

---

## Features

### ✏️ Editing

- Accordion forms for personal, summary, experience, education, projects,
  skills, certifications, languages, interests
- Undo / redo history (debounced, persisted)
- Multiple named profiles with quick switching
- Example resumes to start from
- Drag-and-drop reordering of list items (native DnD, no library)

### 🎨 Templates

- 32 offline templates with live thumbnails
- Template search with category filter chips

### 👁️ Preview

- Real paper sizes: A3 · A4 · A5 · A6 · B5
- Text density (compact / normal / spacious) and accent color
- Fit-to-width zoom, manual zoom, overflow warning
- Word count and one-page-fit assistant

### 📤 Export & Import

- Download as HTML · Print / PDF (`window.print()`)
- Download as JSON / YAML · copy JSON / Text / HTML to clipboard
- Load a JSON or YAML file to replace the resume

### 💾 Persistence & Platform

- `localStorage` (`resume.data`, `resume.template`, `resume.paper`,
  `resume.theme`)
- Static PWA with service worker + Tauri desktop shell
- Dark mode (DaisyUI `night` theme, persisted)
- Keyboard shortcuts: `Cmd/Ctrl+Z` undo, `Cmd/Ctrl+Shift+Z` / `Cmd+Y` redo,
  `Cmd/Ctrl+S` download
- Responsive layout, accessible controls

---

## First run

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
