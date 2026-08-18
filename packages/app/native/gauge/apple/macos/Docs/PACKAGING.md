# Packaging

Gauge, bundle ID `io.github.hieudoanm.Gauge`, version 0.0.1.

## Checklist

### Common

- [ ] Bump `VERSION` in Makefile and Info.plist
- [ ] `make build`
- [ ] `make app`
- [ ] `make dmg`
- [ ] Smoke test the app

### DMG

- [ ] Mount the .dmg
- [ ] Drag `Gauge.app` to Applications
- [ ] Eject

### macOS Notarization

- [ ] Sign with Developer ID certificate
- [ ] Set `DEVELOPER_ID_APPLICATION` and `APPLE_TEAM_ID` env vars
- [ ] `xcrun notarytool submit build/Gauge-0.0.1.dmg --keychain-profile "notarytool" --wait`
- [ ] `xcrun stapler staple build/Gauge-0.0.1.dmg`
- [ ] `spctl --assess --type open --context context:primary-signature build/Gauge.app`

### Permissions

Gauge requires no special permissions for its basic functionality. Do not
request any except when a future feature genuinely requires one.

### Launch at Login (Future)

- [ ] Use `SMAppService` from `ServiceManagement`
- [ ] Do not use shell scripts or deprecated login items

### App Store (Future)

- [ ] Apple Developer account with App Store access
- [ ] Create app record in App Store Connect
- [ ] Configure provisioning profiles
- [ ] Archive and upload
- [ ] Fill out privacy questionnaire
- [ ] Submit for review

### Auto-Update (Future)

- [ ] Integrate Sparkle framework
- [ ] Add `SUFeedURL` to Info.plist
- [ ] Test update flow