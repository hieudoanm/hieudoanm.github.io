# Tax — Packaging Checklist

Checklist for shipping Tax to users: macOS notarization, Windows code-signing,
Android/iOS store builds, and the Tauri updater pipeline.

App: `tax` (bundle identifier `io.github.hieudoanm.tax`, version 0.0.1).

## Common

- [ ] Bump `version` in `src-tauri/tauri.conf.json` and `package.json` in sync
- [ ] Run `pnpm tauri build` (desktop) and `pnpm tauri android build` /
      `pnpm tauri ios build` (mobile) and confirm artifacts appear under
      `src-tauri/target/`
- [ ] Smoke-test the exported web build and the native apps
- [ ] Regenerate `docs/ROADMAP.md` release notes for the tag

## Auto-update (desktop)

> Auto-update is **not yet configured** for this app. The Tauri updater plugin
> is not registered. Follow the checklist below.

- [ ] Add `tauri-plugin-updater` (Rust) + `@tauri-apps/plugin-updater` (JS) and
      register the plugin in `src-tauri/src/lib.rs`
- [ ] Generate a signing key pair
- [ ] Set `plugins.updater.pubkey` and `plugins.updater.endpoints` in
      `src-tauri/tauri.conf.json`
- [ ] Set `bundle.createUpdaterArtifacts: true`
- [ ] Publish the updater JSON + artifacts to the configured endpoint
- [ ] Add `updater:default` to `src-tauri/capabilities/default.json`
- [ ] CI provides the private key via environment variables

## macOS

- [ ] Developer ID Application certificate installed
- [ ] Notarization configured (APPLE_ID, APPLE_PASSWORD, APPLE_TEAM_ID)
- [ ] DMG mounts and copies to Applications
- [ ] Gatekeeper passes: `spctl --assess --type execute`

## Windows

- [ ] Code-signing certificate installed
- [ ] Installer runs without SmartScreen warning
- [ ] Updater NSIS installMode works without UAC prompt

## Android

- [ ] Upload keystore generated and stored in CI secrets
- [ ] Signed APK + AAB produced
- [ ] Play Store listing assets prepared

## iOS

- [ ] Apple Developer account + App Store Connect record
- [ ] Signing team + provisioning profile set
- [ ] Archive produced and uploaded via Transporter
