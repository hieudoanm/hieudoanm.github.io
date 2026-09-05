# PDF

> A minimal Adobe Acrobat alternative — view, annotate, edit, sign, and manage
> PDFs entirely offline. Works on your phone, tablet, laptop, and desktop so
> every document is at your fingertips.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![pdf screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/pdf/home.png)

---

## Latest release

- **Version:** `app-hybrid-productivity-pdf-latest` — updates ship continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

## First run

- **macOS** — right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux** — `chmod +x pdf.AppImage && ./pdf.AppImage`.
- **Windows** — SmartScreen may warn; click **More info → Run anyway**.
- **Android** — Play Protect may block; tap **Install anyway**.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/productivity/pdf
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A minimal Adobe Acrobat alternative that lets you view, annotate, edit, sign,
and manage PDFs entirely offline — text editing, stamps, form filling, and page
reorder all running in your browser or as a native desktop app.

---

## Features

### 👁️ Viewing

- Document list with grid/list view and recent documents
- PDF upload with drag-and-drop
- Page rendering with zoom (slider, presets, fit-to-width, fit-to-page, actual
  size)
- Page navigation (thumbnails, page number, arrows, Go to Page)
- Continuous scroll and single-page layouts with page transitions
- Page rotation, presentation (fullscreen) mode
- Text search with match highlighting
- Skeleton loading states

### 🖊️ Annotations

- Text highlighting, underline, and strikethrough
- Sticky notes with comment threads
- Freehand drawing pen tool
- Shapes: rectangle, circle, arrow, line
- 8-color annotation palette, annotation list sidebar
- Undo/redo for annotations

### ✏️ Editing

- Click-to-edit text blocks with font controls (size, bold, italic, color)
- New text box creation
- Image insertion with resize handles
- Image controls: rotate, opacity, delete
- Text and image watermarks
- Stamp presets (Approved, Rejected, Draft, Confidential)

### 📑 Page Management

- Drag-and-drop page reorder via thumbnails
- Delete pages with confirmation
- Rotate individual pages
- Duplicate page, extract pages by range
- Split by page range, merge multiple PDFs with drag-to-reorder
- Crop page with a visual crop box
- Page labels and numbering

### 📝 Forms & Signing

- Form field detection (text, checkbox, radio, dropdown)
- Manual field insertion and form filling with Tab navigation
- Signatures: draw on canvas, type with font selection, or upload an image
- Signature placement and resize
- Export filled form as a new PDF
- Print dialog with page range, copies, and headers/footers settings

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
