# Password — Packaging Checklist

Checklist for shipping Password to users: macOS notarization, Windows
code-signing, Android/iOS store builds, and the Tauri updater pipeline.

App: `password` (bundle identifier `io.github.hieudoanm.password`, version
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
      `https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-password-latest/latest.json`
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
- [ ] Signing team + provisioning profile set for the `password` Xcode project
      under `src-tauri/gen/apple/`
- [ ] `pnpm tauri ios build` produces an archive; upload via Xcode/Transporter
- [ ] Review App Privacy questionnaire entries (no analytics SDKs)
