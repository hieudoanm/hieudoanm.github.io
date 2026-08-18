# Resume

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/resume_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-resume-latest/SHA256SUMS.txt

## About

Resume — minimal offline-first resume builder.

## Features

## Editing

- Accordion forms for personal, summary, experience, education, projects,
  skills, certifications, languages, interests
- Undo / redo history (debounced, persisted)
- Multiple named profiles with quick switching
- Example resumes to start from
- Drag-and-drop reordering of list items (native DnD, no library)

## Templates

- 32 offline templates with live thumbnails
- Template search with category filter chips

## Preview

- Real paper sizes: A3 · A4 · A5 · A6 · B5
- Text density (compact / normal / spacious) and accent color
- Fit-to-width zoom, manual zoom, overflow warning
- Word count and one-page-fit assistant

## Export & Import

- Download as HTML · Print / PDF (`window.print()`)
- Download as JSON / YAML · copy JSON / Text / HTML to clipboard
- Load a JSON or YAML file to replace the resume

## Persistence & Platform

- `localStorage` (`resume.data`, `resume.template`, `resume.paper`,
  `resume.theme`)
- Static PWA with service worker + Tauri desktop shell
- Dark mode (DaisyUI `night` theme, persisted)
- Keyboard shortcuts: `Cmd/Ctrl+Z` undo, `Cmd/Ctrl+Shift+Z` / `Cmd+Y` redo,
  `Cmd/Ctrl+S` download
- Responsive layout, accessible controls

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
