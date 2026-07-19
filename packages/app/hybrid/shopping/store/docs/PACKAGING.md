# Packaging Checklist

Checklist for shipping Store to users: web PWA, Tauri desktop builds, and mobile
artifacts.

## Common

- [ ] Bump `version` in `package.json` (the release workflow strips versions
      from asset filenames, so download links never change)
- [ ] Run `pnpm tauri build` (desktop) and confirm artifacts appear under
      `src-tauri/target/`
- [ ] Smoke-test the exported web build (`out/`) and the native apps
- [ ] Regenerate `docs/ROADMAP.md` release notes for the tag
- [ ] Upload artifacts to the `app-hybrid-shopping-store-latest` release tag

## Auto-update (desktop)

- [ ] Signing key pair is generated with `pnpm tauri signer generate`
- [ ] Public key is set under `plugins.updater.pubkey` in `tauri.conf.json`
- [ ] `createUpdaterArtifacts` is `true` for release builds so `.sig` + updater
      bundles are produced
- [ ] Publish the updater JSON + artifacts to the release endpoint
- [ ] CI provides the private key via environment variables:
  - `TAURI_SIGNING_PRIVATE_KEY` or `TAURI_SIGNING_PRIVATE_KEY_PATH`
  - `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`

## macOS

- [ ] Developer ID Application certificate installed in the signing keychain
- [ ] Notarization configured:
  - `APPLE_ID`, `APPLE_PASSWORD`/`APPLE_APP_SPECIFIC_PASSWORD`, and
    `APPLE_TEAM_ID` set for CI
- [ ] `bundle.macOS.dmg` settings produce a DMG that mounts and copies to
      Applications
- [ ] Verify Gatekeeper: `spctl --assess --type execute` on the `.app` passes
      after notarization
- [ ] Confirm the updater signatures verify against `plugins.updater.pubkey`
- [ ] DMG artifact is named `store_<version>_aarch64.dmg` (Apple Silicon) to
      match the in-app download link

## Linux

- [ ] `.AppImage` runs on a clean Ubuntu 22.04+ machine without bundled libs
      leaking host paths
- [ ] `.deb` installs and uninstalls cleanly on Debian 13+
- [ ] Artifacts are named `store_<version>_amd64.AppImage` /
      `store_<version>_amd64.deb` to match the in-app download links

## Android

- [ ] Keystore configured for release signing
- [ ] `.apk` installs on Android 14+ devices
- [ ] `.aab` uploads to Google Play Console
- [ ] Artifact is named `app-universal-release.apk` / `.aab`

## Windows

- [ ] Code-signing certificate configured (optional but recommended)
- [ ] `.msi` installs cleanly on Windows 10+
- [ ] SmartScreen prompt is acceptable (or EV certificate for no warning)
- [ ] Artifact is named `store_<version>_x64.msi`

## Web (PWA)

- [ ] Static export succeeds (`pnpm build`) and `out/` contains `manifest.json`,
      `sw.js`, and all icons
- [ ] Service worker cache version bumped when routes or shell assets change so
      existing installs pick up the new build
- [ ] Lighthouse PWA installability check passes against a production build
