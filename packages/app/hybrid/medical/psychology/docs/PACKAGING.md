# Packaging Checklist

Checklist for shipping Psychology to users: macOS notarization, Linux
artifacts, and the Tauri updater pipeline. (Windows and mobile builds are not
shipped yet — see `docs/ROADMAP.md`.)

## Common

- [ ] Bump `version` in `src-tauri/tauri.conf.json` and `package.json` in sync
      (download links embed the version: `psychology_0.0.1_*`)
- [ ] Run `pnpm tauri build` (desktop) and confirm artifacts appear under
      `src-tauri/target/`
- [ ] Smoke-test the exported web build (`out/`) and the native apps
- [ ] Regenerate `docs/ROADMAP.md` release notes for the tag
- [ ] Upload artifacts to the `app-hybrid-psychology-latest` release tag with
      the exact filenames referenced by `/downloads/`
      (`psychology_0.0.1_amd64.AppImage`, `psychology_0.0.1_amd64.deb`,
      `psychology_0.0.1_aarch64.dmg`)

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
- [ ] DMG artifact is named `psychology_<version>_aarch64.dmg` (Apple Silicon)
      to match the in-app download link

## Linux

- [ ] `.AppImage` runs on a clean Ubuntu 22.04+ machine without bundled libs
      leaking host paths
- [ ] `.deb` installs and uninstalls cleanly on Debian 13+
- [ ] Artifacts are named `psychology_<version>_amd64.AppImage` /
      `psychology_<version>_amd64.deb` to match the in-app download links

## Web (PWA)

- [ ] Static export succeeds (`pnpm build`) and `out/` contains `manifest.json`,
      `sw.js`, and all icons
- [ ] Service worker cache version bumped when routes or shell assets change so
      existing installs pick up the new build
- [ ] Lighthouse PWA installability check passes against a production build
