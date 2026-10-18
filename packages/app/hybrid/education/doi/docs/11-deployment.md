# DOI

> Explore the Crossref citation network interactively — works, references,
> force-directed graphs, and author ranking. Runs everywhere: phone, tablet,
> laptop, desktop.

![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

---

## Latest release

- **Version:** `app-hybrid-education-doi-latest` — updates ship continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-doi-latest/doi.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-doi-latest/doi.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-doi-latest/doi.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-doi-latest/doi.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-doi-latest/doi.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-doi-latest/doi.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-doi-latest/doi.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-doi-latest/doi.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-doi-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/education/doi
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Explore the Crossref citation network interactively.

- **Search** — look up works in the network.
- **Citation statistics** — browse the numbers behind the network.
- **Force-directed citation graph** — navigate how works cite one another.

---

## Features

### 🔨 Project Foundation

- Monorepo scaffold following the education app conventions
  (`packages/app/hybrid/education/doi`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- In-browser SQLite (sql.js) loads the bundled citation database
- Shared design system: DaisyUI `doi-light` theme (default) with `doi-dark`
  toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced via Jest

### 🏠 Home & Navigation

- Card grid linking the three views: Overview, Graph, Search
- About, Downloads, and Version pages
- Theme toggle in the header; choice persisted in localStorage

### 📊 Overview

- Citation statistics: total/titled/stub works, edges, distinct authors, year
  span
- Year-distribution bar chart (hand-rolled SVG)
- Top-ranked lists: most cited, most citing, top authors

### 🕸️ Graph

- Force-directed citation network (d3-force)
- Node radius by in-degree; click for metadata panel
- Degree filter + node cap for smooth interaction on the full set

### 🔍 Search

- Single box matching title, author, abstract, or DOI
- Results cascade into overview stats and the graph

---

## First run

- **macOS:** Right-click the `.dmg` → "Open" to bypass Gatekeeper, then drag the
  app to your Applications folder.
- **Linux (AppImage):** `chmod +x doi.AppImage` then run it — no install needed.
- **Windows:** SmartScreen may flag the `.msi` — click "More info" → "Run
  anyway".

---

## Next steps

- Want to contribute? Read [CONTRIBUTING](CONTRIBUTING).
- Curious what's coming? Check the [ROADMAP](ROADMAP).

---

## License

See [LICENSE](LICENSE).

# Packaging

DOI ships as a Tauri 2 desktop app and a static web export.

## Desktop (Tauri)

```sh
pnpm build     # static export to out/
pnpm tauri build  # platform bundles into src-tauri/target/release/bundle/
```

CI builds every platform on pushes touching this app:

| Platform | Artifacts           |
| -------- | ------------------- |
| Linux    | `.AppImage`, `.deb` |
| macOS    | `.dmg` (aarch64)    |
| Windows  | `.msi` (x64)        |

Artifacts attach to the `app-hybrid-education-doi-latest` release tag with
versions stripped from filenames; `SHA256SUMS.txt` accompanies them.

## Updater

`tauri.conf.json` points the updater plugin at the rolling release:

https://github.com/hieudoanm/hieudoanm.github.io/releases/latest/download/latest.json

Releases must be signed with the key whose public half is embedded in
`tauri.conf.json` (`pubkey`).

## Web

The site's root post-build script rebuilds each hybrid app with
`BASE_PATH=/open/doi` and copies `out/` to `docs/open/doi/`.

## Icons

`src-tauri/icons` is generated from the web app icon (`public/icons/icon.svg`,
512x512) via `src-tauri/icons/create-icons.sh`. Re-run it whenever the app icon
changes, then re-verify the bundle.

## Checklist

1. `pnpm test` green (coverage >= 80%)
2. `pnpm lint` clean
3. `pnpm build` exports without errors
4. `pnpm tauri build` produces bundles for the current platform
5. Version bumped in `package.json` + `tauri.conf.json`
