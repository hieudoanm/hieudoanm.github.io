# PDF

> A minimal Adobe Acrobat alternative — view, annotate, edit, sign, and manage
> PDFs entirely offline. Works on your phone, tablet, laptop, and desktop so
> every document is at your fingertips.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────────────┐
│ 📕 PDF Viewer      [Annotate] [Edit] [Sign] [⚙]  │
├──────┬───────────────────────────────────────────┤
│ 📄   │                                           │
│ [1]  │    ┌─────────────────────────────────┐    │
│ [2]  │    │  ┌─────────────────────────┐    │    │
│ [3]  │    │  │   Sample Document        │    │    │
│ [4]  │    │  │                         │    │    │
│      │    │  │   Lorem ipsum dolor sit  │    │    │
│      │    │  │   amet, consectetur      │    │    │
│      │    │  │   adipiscing elit.       │    │    │
│      │    │  └─────────────────────────┘    │    │
│      │    └─────────────────────────────────┘    │
├──────┴───────────────────────────────────────────┤
│ Page 3 of 24  │  Zoom: 125%  │  🔍 Search        │
└──────────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-productivity-pdf-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link | Note |
| --- | -------- | ------ | ------------ | ------------ | ------------- | ---- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk] | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹ | For store upload ¹ |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb] | |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]² | Apple Silicon ² |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi] | |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-pdf-latest/pdf_x64.msi

<br>

¹ The `.aab` bundle is for Google Play store upload — sideload the `.apk`
instead.

² The `.dmg` is a universal Apple Silicon binary.

## First run

- **macOS** — right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux** — `chmod +x pdf_amd64.AppImage && ./pdf_amd64.AppImage`.
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

## First run

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).