# Packaging Checklist

Checklist for shipping Brainbow to users: macOS notarization, Windows
code-signing, Android/iOS store builds, and the Tauri updater pipeline.

## Common

- [ ] Bump `version` in `src-tauri/tauri.conf.json` and `package.json` in sync
- [ ] Run `pnpm tauri build` (desktop) and `pnpm tauri android build` /
      `pnpm tauri ios build` (mobile) and confirm artifacts appear under
      `src-tauri/target/`
- [ ] Smoke-test the exported web build (`out/`) and the native apps
- [ ] Regenerate `docs/ROADMAP.md` release notes for the tag

## Auto-update (desktop)

- [ ] Signing key pair is generated with `pnpm tauri signer generate`
- [ ] Public key is set under `plugins.updater.pubkey` in `tauri.conf.json`
      (already configured; the private key is **not** in the repo)
- [ ] `createUpdaterArtifacts` is `true` for release builds so `.sig` + updater
      bundles are produced — it defaults to `false` so plain local/CI builds do
      not require a key; enable it per-build with
      `pnpm tauri build --config '{"bundle":{"createUpdaterArtifacts":true}}'`
- [ ] Publish the updater JSON + artifacts to
      `https://github.com/hieudoanm/hieudoanm.github.io/releases/latest/download/latest.json`
      (the endpoint already configured in `tauri.conf.json`)
- [ ] CI provides the private key via environment variables:
  - `TAURI_SIGNING_PRIVATE_KEY` or `TAURI_SIGNING_PRIVATE_KEY_PATH`
  - `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`
  - Local key lives at `~/.config/brainbow/brainbow.key` (dev machine only)

## macOS

- [ ] Developer ID Application certificate installed in the signing keychain
- [ ] Notarization configured:
  - `APPLE_ID`, `APPLE_PASSWORD`/`APPLE_APP_SPECIFIC_PASSWORD`, and
    `APPLE_TEAM_ID` set for `tauri-apple-signing` / CI
- [ ] `bundle.macOS.dmg` settings produce a DMG that mounts and copies to
      Applications
- [ ] Verify Gatekeeper: `spctl --assess --type execute` on the `.app` passes
      after notarization
- [ ] Confirm the updater signatures verify against `plugins.updater.pubkey`

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
- [ ] Content URI handling verified: image import via camera/gallery works

## iOS

- [ ] Apple Developer account + App Store Connect app record created
- [ ] Signing team + provisioning profile set for the `brainbow` Xcode project
      under `src-tauri/gen/apple/`
- [ ] `pnpm tauri ios build` produces an archive; upload via Xcode/Transporter
- [ ] Review App Privacy questionnaire entries (no analytics SDKs)
