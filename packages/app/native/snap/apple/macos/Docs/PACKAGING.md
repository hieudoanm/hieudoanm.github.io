# Snap — Packaging Checklist

Checklist for shipping Snap to users: macOS notarization, DMG creation, and
App Store distribution.

App: `Snap` (bundle identifier `io.github.hieudoanm.Snap`, version 0.0.1).

## Common

- [ ] Bump `VERSION` in `Makefile`
- [ ] Run `make build` and confirm binary compiles
- [ ] Run `make app` and confirm `.app` bundle is created
- [ ] Run `make dmg` and confirm DMG is created
- [ ] Smoke-test the app from the DMG
- [ ] Verify Accessibility permission is requested on first launch

## DMG

- [ ] `make dmg` produces a DMG that mounts correctly
- [ ] DMG contains `Snap.app` and `/Applications` symlink
- [ ] App launches from DMG without issues

## macOS Notarization

- [ ] Developer ID Application certificate installed in keychain
- [ ] `APPLE_ID`, `APPLE_PASSWORD`, `APPLE_TEAM_ID` set in environment
- [ ] Notarize the app:
  ```bash
  xcrun notarytool submit build/Snap-0.0.1.dmg \
    --apple-id "$APPLE_ID" \
    --password "$APPLE_PASSWORD" \
    --team-id "$APPLE_TEAM_ID" \
    --wait
  ```
- [ ] Staple the notarization:
  ```bash
  xcrun stapler staple build/Snap-0.0.1.dmg
  ```
- [ ] Verify Gatekeeper: `spctl --assess --type execute build/Snap.app`

## App Store

- [ ] Apple Developer account active
- [ ] App Store Connect app record created
- [ ] Sign with App Store provisioning profile
- [ ] Archive and upload via Xcode or `xcrun altool`
- [ ] Complete App Privacy questionnaire
- [ ] Submit for review

## Accessibility Permission

- [ ] Info.plist includes `NSAccessibilityUsageDescription`
- [ ] Permission prompt explains why Snap needs Accessibility access
- [ ] App gracefully handles denied permission
- [ ] Settings provide link to System Settings > Privacy > Accessibility

## Auto-Update (Future)

- [ ] Implement Sparkle or similar update framework
- [ ] Configure update feed URL
- [ ] Sign update artifacts
