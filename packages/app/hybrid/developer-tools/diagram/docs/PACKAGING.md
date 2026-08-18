# Diagram — Packaging Checklist

Checklist for shipping Diagram to users: macOS notarization, Windows
code-signing, Android/iOS store builds, and the Tauri updater pipeline.

App: `diagram` (bundle identifier `io.github.hieudoanm.diagram`, version 0.0.1).

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
> `src-tauri/tauri.conf.json`.

Before enabling it:

- [ ] Add `@tauri-apps/plugin-updater` and register the plugin
- [ ] Configure `plugins.updater` with the static server / GitHub release URL
- [ ] Add signing keys and set `TauriUpdaterPubkey` / private key in CI secrets
- [ ] Document that macOS builds must be notarized (below) for auto-update to
      work

## macOS

- [ ] Install `tauri-apps/tauri-action`-style signing via Apple Developer
      identity in CI
- [ ] Notarize the `.app` bundle and staple the ticket
      (`xcrun notarytool submit … && xcrun stapler staple …`)
- [ ] Verify `spctl --assess --type execute` passes on the built app

## Windows

- [ ] Use a code-signing certificate (Authenticode) and sign the MSI/EXE in CI
- [ ] Confirm SmartScreen shows the publisher, not "Unknown publisher"

## Mobile

- [ ] Android: generate a release keystore, configure `signingConfigs` in
      `src-tauri/gen/android`, upload `.aab` to Play Console
- [ ] iOS: configure code signing + provisioning in `src-tauri/gen/apple`,
      archive with Xcode, upload via Transporter

## Web / PWA

- [ ] Confirm `pnpm build` produces a static `out/` (no server functions)
- [ ] Run Lighthouse on the deployed `out/` (PWA offline must pass)
