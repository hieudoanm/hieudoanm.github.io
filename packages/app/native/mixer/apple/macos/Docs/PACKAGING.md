# Mixer — Packaging Checklist

Checklist for shipping Mixer to users: macOS notarization, DMG creation, and
App Store distribution.

App: `Mixer` (bundle identifier `io.github.hieudoanm.Mixer`, version 0.0.1).

## Common

- [ ] Bump `VERSION` in `Makefile`
- [ ] Run `make build` and confirm binary compiles
- [ ] Run `make app` and confirm `.app` bundle is created
- [ ] Run `make dmg` and confirm DMG is created
- [ ] Smoke-test the app from the DMG

## DMG

- [ ] `make dmg` produces a DMG that mounts correctly
- [ ] DMG contains `Mixer.app` and `/Applications` symlink
- [ ] App launches from DMG without issues

## macOS Notarization

- [ ] Developer ID Application certificate installed in keychain
- [ ] `APPLE_ID`, `APPLE_PASSWORD`, `APPLE_TEAM_ID` set in environment
- [ ] Notarize the app:
  ```bash
  xcrun notarytool submit build/Mixer-0.0.1.dmg \
    --apple-id "$APPLE_ID" \
    --password "$APPLE_PASSWORD" \
    --team-id "$APPLE_TEAM_ID" \
    --wait
  ```
- [ ] Staple the notarization:
  ```bash
  xcrun stapler staple build/Mixer-0.0.1.dmg
  ```
- [ ] Verify Gatekeeper: `spctl --assess --type execute build/Mixer.app`

## App Store

- [ ] Apple Developer account active
- [ ] App Store Connect app record created
- [ ] Sign with App Store provisioning profile
- [ ] Archive and upload via Xcode or `xcrun altool`
- [ ] Complete App Privacy questionnaire
- [ ] Submit for review

## Auto-Update (Future)

- [ ] Implement Sparkle or similar update framework
- [ ] Configure update feed URL
- [ ] Sign update artifacts
