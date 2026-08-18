# Packaging

Top, bundle ID `io.github.hieudoanm.Top`, version 0.0.1.

## Checklist

### Common

- [ ] Bump `VERSION` in Makefile and Info.plist
- [ ] `make build`
- [ ] `make app`
- [ ] `make dmg`
- [ ] Smoke test the app
- [ ] Verify Accessibility permission prompt works

### DMG

- [ ] Mount the .dmg
- [ ] Drag `Top.app` to Applications
- [ ] Eject

### macOS Notarization

- [ ] Sign with Developer ID certificate
- [ ] Set `DEVELOPER_ID_APPLICATION` and `APPLE_TEAM_ID` env vars
- [ ] `xcrun notarytool submit build/Top-0.0.1.dmg --keychain-profile "notarytool" --wait`
- [ ] `xcrun stapler staple build/Top-0.0.1.dmg`
- [ ] `spctl --assess --type open --context context:primary-signature build/Top.app`

### Accessibility Permission

Top requires Accessibility permission to control window levels via the Accessibility API.

#### Info.plist

```xml
<key>NSAccessibilityUsageDescription</key>
<string>Top needs Accessibility access to pin windows to always-on-top.</string>
```

#### Behavior

- On first launch, Top checks `AXIsProcessTrusted()`
- If not trusted, shows a permission prompt view
- User clicks "Open System Settings" which opens the Accessibility pane
- After granting, the app proceeds normally
- If denied, Top shows a disabled state with instructions

#### Handling Denial

- Log denial event
- Show permission prompt with instructions
- Provide button to open System Settings
- Disable pinning functionality until granted

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
