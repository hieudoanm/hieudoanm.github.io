# Review checklist

Focused reference for **xcode-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```bash
set -o pipefail && \
xcodebuild test -project App.xcodeproj -scheme App \
  -destination 'platform=iOS Simulator,name=iPhone 17,OS=latest' \
  CODE_SIGNING_ALLOWED=NO | xcbeautify
```

- **Generate a project rather than hand-editing `project.pbxproj` in CI** if you use xcodegen/Tuist — otherwise your IDE project and the CI build can silently diverge.

---

## 10. Common Pitfalls

- **Opening the `.xcodeproj` instead of the `.xcworkspace`**, making packages and pods appear missing.
- **Committing `xcuserdata`**, which produces per-user diff noise on every machine.
- **Configuration set in the IDE instead of an `.xcconfig`**, invisible to review and lost in merge conflicts.
- **Forgetting `$(inherited)`** in a target-level override, silently dropping inherited flags.
- **Sharing the wrong scheme**, or not sharing it at all, so a build variant only exists on one machine.
- **An unshared scheme with a stale launch argument** making a staging build look broken.
- **Hard-coded `DEVELOPMENT_TEAM` per developer** instead of in the xcconfig.
- **Building a release with Debug settings**, or shipping with `-Onone` and full debug symbols.
- **Clean Build Folder expected to fix a stale index**, when deleting DerivedData does.
- **`xcodebuild` with no `-destination`** failing on a multi-target scheme.
- **CI running on a floating runner image**, where a toolchain change alters the build.
- **Expecting `-Ounchecked` or a beta Xcode to be shippable** — beta toolchains are for evaluation.
- **The simulator as the only performance signal.** The simulator runs your Mac's CPU; the device is the measurement.

---

## General Rules of Thumb

- Build configuration in committed `.xcconfig` files, with `$(inherited)` respected.
- Shared schemes, one per real environment; `xcuserdata` ignored.
- Generate `project.pbxproj` with xcodegen or Tuist if more than one person edits it.
- Swift Package Manager for new dependencies; commit `Package.resolved`.
- `DEVELOPMENT_TEAM` in xcconfig, never per-machine; capabilities provisioned before they are used.
- DerivedData disposable, off iCloud, and driven by `-derivedDataPath` in scripts.
- Symbolic breakpoints and the View Debugger before speculative fixes; Instruments for real performance numbers.
- `xcodebuild` with an explicit `-destination` in CI, pinned toolchain, `xcbeautify` for logs.

---

## Quick-Start Checklist

- [ ] `xcodebuild -version` recorded, and CI pinned to the same Xcode
- [ ] Deployment targets set in `.xcconfig`, with `SWIFT_VERSION` and strict-concurrency mode explicit
- [ ] `.xcconfig` assigned as the base configuration for every build configuration
- [ ] All build settings in files, not in the IDE; `$(inherited)` used in overrides
- [ ] `xcuserdata` in `.gitignore`; shared schemes committed
- [ ] One shared scheme per real environment, with launch arguments for staging/mock
- [ ] Swift packages over CocoaPods for new work; `Package.resolved` committed
- [ ] `DEVELOPMENT_TEAM` in xcconfig; no provisioning profiles or key material committed
- [ ] Every capability used is provisioned in the portal and declared in entitlements
- [ ] `CODE_SIGNING_ALLOWED=NO` for simulator-only CI jobs
- [ ] `xcodebuild` invoked with an explicit `-destination` and piped through `xcbeautify`
- [ ] DerivedData excluded from backups, iCloud, and version control
- [ ] Exception and constraint-violation breakpoints enabled in Debug
- [ ] Performance claims measured on a device or the Time Profiler, not the simulator
