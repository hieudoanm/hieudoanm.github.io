# Hieu Doan

> The personal docs-style home for Hieu Doan — developer tools, games, and
> medical apps all in one place. Runs everywhere your life does: phone, tablet,
> laptop, and desktop, from a single polished interface.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![docs screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/docs/home.png)

---

## Latest release

- **Version:** `app-hybrid-utilities-docs-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your device — Android phones install the `.apk`, and
Linux/macOS/Windows grab their native package below.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/hieudoanm_next.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-utilities-docs-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/utilities/docs
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

## First Run

Per-platform launch tips:

- **macOS** — right-click the `.dmg` then **Open** to bypass Gatekeeper the
  first time, or find it bundled with the app.
- **Linux** — make the AppImage runnable: `chmod +x hieudoanm_next.AppImage` and
  double-click it.
- **Windows** — SmartScreen may warn; choose **More info → Run anyway**.
- **Android** — if Play Protect warns, tap **Install anyway**.

---

## About

All your tools, one polished surface. Hieu Doan is a personal documentation and
apps site.

- **Developer tools, games, and medical apps** — all packed into one site.
- **Docs-style interface** — a single polished surface you can open on any
  screen.

---

## Features

Everything lives in one frictionless, docs-first shell.

### 📚 The Docs Site

- Personal documentation and apps site for Hieu Doan, with developer tools,
  games, medical apps, and more — all accessible from a single docs-style
  interface.

### 📱 Everywhere You Are

- Runs on phone, tablet, laptop, and desktop through a shared, installable front
  end.

---

## Next steps

- [CONTRIBUTING](CONTRIBUTING) — set up the dev environment and start tinkering.
- [ROADMAP](ROADMAP) — see what's coming next on the roadmap.

---

## License

See [LICENSE](LICENSE).

# Hieudoanm — Packaging Checklist

Checklist for shipping Hieudoanm to users: macOS notarization, Windows
code-signing, Android/iOS store builds, and the Tauri updater pipeline.

App: `hieudoanm_next` (bundle identifier `io.github.hieudoanm.next`, version
0.0.1).

## Common

- [ ] Bump `version` in `src-tauri/tauri.conf.json` and `package.json` in sync
- [ ] Run `pnpm tauri build` (desktop) and `pnpm tauri android build` /
      `pnpm tauri ios build` (mobile) and confirm artifacts appear under
      `src-tauri/target/`
- [ ] Smoke-test the exported web build (`out/`) and the native apps
- [ ] Regenerate `docs/ROADMAP.md` release notes for the tag

## Auto-update (desktop)

> Auto-update is **not yet configured** for this app. The Tauri updater plugin
> is not registered and `plugins.updater` is absent from
> `src-tauri/tauri.conf.json`. Follow the checklist below.

- [ ] Add `tauri-plugin-updater` (Rust) + `@tauri-apps/plugin-updater` (JS) and
      register the plugin in `src-tauri/src/lib.rs`
- [ ] Generate a signing key pair:
      `pnpm tauri signer generate --ci -p <password> -w <path>`
- [ ] Set `plugins.updater.pubkey` and `plugins.updater.endpoints` in
      `src-tauri/tauri.conf.json`
- [ ] Endpoint to publish to:
      `https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-hieudoanm-latest/latest.json`
- [ ] Set `bundle.createUpdaterArtifacts: true` so `.sig` + updater bundles are
      produced by `tauri build`
- [ ] Publish the updater JSON + artifacts to the configured endpoint
- [ ] Add `updater:default` (and `dialog:default`) to
      `src-tauri/capabilities/default.json` for the JS API
- [ ] CI provides the private key via environment variables:
  - `TAURI_SIGNING_PRIVATE_KEY` or `TAURI_SIGNING_PRIVATE_KEY_PATH`
  - `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`
  - Keep the private key out of the repo (dev-machine path only)

## macOS

- [ ] Developer ID Application certificate installed in the signing keychain
- [ ] Notarization configured:
  - `APPLE_ID`, `APPLE_PASSWORD`/`APPLE_APP_SPECIFIC_PASSWORD`, and
    `APPLE_TEAM_ID` set for `tauri-apple-signing` / CI
- [ ] `bundle.macOS.dmg` settings produce a DMG that mounts and copies to
      Applications
- [ ] Verify Gatekeeper: `spctl --assess --type execute` on the `.app` passes
      after notarization
- [ ] Confirm updater signatures verify against `plugins.updater.pubkey` once
      the updater is configured

## Windows

- [ ] Code-signing certificate (e.g. EV cert) installed and password available
- [ ] `tauri.conf.json` `bundle.windows.certificateThumbprint` / signing tools
      configured (or `tauri-action` `signingCertificate`/`certificatePassword`)
- [ ] Installer (MSI/NSIS) runs without SmartScreen warning on a clean VM
- [ ] Updater NSIS `installMode: passive` installs on quit without a UAC prompt
      churn

## Android

- [ ] Upload keystore generated and stored in CI secrets (never in repo)
- [ ] `tauri.conf.json` `bundle.android` keystore configured via env vars:
      `TAURI_ANDROID_KEYSTORE_PATH`, `TAURI_ANDROID_KEYSTORE_PASSWORD`,
      `TAURI_ANDROID_KEY_ALIAS`, `TAURI_ANDROID_KEY_PASSWORD`
- [ ] `pnpm tauri android build --target apk --target aab` produces a signed
      APK + AAB for Play Store
- [ ] Play Store listing assets (icons, screenshots, privacy policy) prepared
- [ ] Content URI handling verified: file import via camera/gallery works

## iOS

- [ ] Apple Developer account + App Store Connect app record created
- [ ] Signing team + provisioning profile set for the `hieudoanm_next` Xcode
      project under `src-tauri/gen/apple/`
- [ ] `pnpm tauri ios build` produces an archive; upload via Xcode/Transporter
- [ ] Review App Privacy questionnaire entries (no analytics SDKs)
