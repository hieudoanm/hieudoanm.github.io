---
name: xcode-best-practices
description: Best practices for building Apple apps in Xcode — projects vs workspaces, xcconfig, schemes, signing, DerivedData hygiene, LLDB debugging, SwiftUI previews, and xcodebuild parity with CI. Use when setting up or debugging an Xcode project.
---

# Xcode

Xcode is the compiler driver, build system, simulator, debugger, and profiler for every Apple platform — and it is also a large amount of IDE state that does not belong in version control. Practical Xcode work is mostly about **knowing which files are generated and must be ignored, keeping build configuration out of the IDE, and making sure CI compiles what you compiled locally**. App-level patterns live in [swift.md](../../swift.md) and the platform playbooks alongside it.

_Verified against Xcode 26.6 (17F113, June 2026) with Swift 6.2, on macOS Tahoe 26.x. Xcode 27 is in beta with the iOS 27 SDK._

---

## 1. Versions & Compatibility

- **Xcode 26.6 is the current stable; Xcode 27 is beta.** Stable ships the iOS/macOS 26 SDKs; the 27 beta carries the iOS 27 SDK. Do not build release binaries on a beta toolchain.
- **The compiler is Swift 6.2, and the language mode is a separate choice.** Swift 6 strict concurrency is opt-in per target via `SWIFT_VERSION`; Swift 5 mode still compiles under the 6.2 toolchain.
- **The deployment target is the real constraint, not the SDK.** You can build against iOS 26 SDKs and still target iOS 15 — every API newer than the target is a compile-time availability error unless guarded.
- **Xcode requires a recent macOS** (Sequoia 15.6 or later, and Tahoe 26.x for the newest). It cannot be downgraded independently of macOS.
- **One Xcode per machine.** Multiple versions side by side need a tool that swaps the whole bundle, and switching back and forth invalidates DerivedData.

```bash
xcodebuild -version            # which toolchain is actually selected
xcode-select -p                # the active developer directory
```

- **Keep CI on a pinned Xcode.** GitHub macOS runners default to whatever image you pick — select the version explicitly in the workflow, or a silent toolchain change will alter your build.

---

## 2. Projects & Workspaces

- **A `.xcodeproj` is a directory, not a file.** It appears as one item in Finder but is a package containing `project.pbxproj`. Never merge two projects by pasting that file.
- **A `.xcworkspace` can hold projects and packages together.** If you open the `.xcodeproj` instead of the `.xcworkspace`, your Swift packages and pods will appear to be missing. This is the most common Xcode confusion.
- **`project.pbxproj` is a single merge-conflict-prone file.** Any real multi-module project should use `xcodegen` or Tuist to generate it, and treat the generated file as build output.
- **Prefer Swift Package Manager to CocoaPods/Carthage for new dependencies.** SPM is built in, has no separate `Podfile` lockstep, and the project file references a version rather than a copied tree.
- **Commit `Package.resolved`.** It is the only record of which exact dependency versions the build used.
- **`.xcodeproj/project.xcworkspace/xcshareddata`** is where shared schemes and workspace settings live, and it should be committed.

---

## 3. Build Configuration

- **Move settings into `.xcconfig` files.** Configuration that lives in the IDE is invisible to review and impossible to diff meaningfully.
- **One base `.xcconfig` plus per-configuration overrides.** Settings cascade: project → target → xcconfig, and the more specific wins.
- **Set `SWIFT_VERSION`, deployment target, and signing mode in the xcconfig**, not through the GUI. The GUI writes into `project.pbxproj` where it will conflict.
- **`$(inherited)` is what lets the project-level value flow through.** Omitting it in a target-level override silently discards everything above it — a frequent source of "why is my other flag gone".
- **Debug vs Release is not just optimisation.** Release enables whole-module optimisation and strips symbols; Debug keeps `-Onone` and full debug info. Never ship a Release build that was compiled with Debug settings.

```xcconfig
// Base.xcconfig
SWIFT_VERSION = 6.0
IPHONEOS_DEPLOYMENT_TARGET = 17.0
SWIFT_STRICT_CONCURRENCY = complete
ALWAYS_SEARCH_USER_PATHS = NO
ENABLE_USER_SCRIPT_SANDBOXING = YES
```

- **Add a `.xcconfig` to the project with `Set Configuration Base` per configuration**, otherwise the file exists but does nothing.
- **Keep secrets out of xcconfig.** It is committed; use an uncommitted local override or CI environment variables.

---

## 4. Schemes

- **A scheme is the unit of "what do I run".** Build action, test action, launch arguments, and which target is the entry point all live there.
- **Share your schemes** (`Product → Scheme → Manage Schemes → Shared`). A personal scheme is invisible to your team, which is why "works on my machine" happens at the scheme level too.
- **Name schemes after workflows, not targets** (`MyApp-Staging`), so a build variant is an explicit choice.
- **Use `.xcscheme` launch arguments for configuration.** It is the cleanest way to switch a staging backend or a mock data source without a compile flag.
- **Do not commit `xcuserdata`.** It holds personal window layout, breakpoints, and per-user state; it is regenerated and is a common source of diff noise.

---

## 5. Signing

- **Automatic signing needs a team and a bundle ID registered in the portal.** It handles development builds; distribution still needs a profile or App Store Connect.
- **Set `DEVELOPMENT_TEAM` in the xcconfig, not per-machine.** Otherwise CI machines and new hires cannot build.
- **Choose a bundle ID you control early.** Changing it after release creates a second app identity; you cannot rename an existing App Store record.
- **Entitlements are a file, not a checkbox.** Push, App Groups, HealthKit, and Keychain sharing each require the capability in the portal *and* the entitlement in the build. A capability in Xcode that is not provisioned fails at install, not at build.
- **Never commit the `.mobileprovision` you pulled from a colleague's machine.** Profiles are per-team and regenerate; key material is not.
- **Keychain access groups must be a prefix of the App ID** or the entitlement is rejected at submission with a confusing message.

---

## 6. DerivedData

- **DerivedData is a build cache and must never be committed.** It is large, machine-specific, and regenerable.
- **The GUI path (`~/Library/Developer/Xcode/DerivedData`) is per-project-named and per-user**; a `-derivedDataPath` flag gives you a predictable location, which is what CI and tooling want.
- **"Clean Build Folder" is not a real clean.** It clears intermediate products but leaves module caches; delete the directory when in doubt.
- **Index-While-Building (Index Store) is the biggest startup-cost lever.** If typing lags, the index is stale or huge; the Build pane's "Index Store" indicator tells you.
- **Keep `DerivedData` off your backup and off iCloud.** Both corrupt or throttle it.

```bash
xcodebuild -project App.xcodeproj -scheme App \
  -derivedDataPath .build/dd -destination 'platform=iOS Simulator,name=iPhone 17' build
```

---

## 7. Debugging

- **LLDB is the debugger and it is scriptable.** `po` for a quick look, `p` for the address, `expression` for evaluation, and `thread backtrace all` when you have lost the plot.
- **Symbolic breakpoints beat line breakpoints for crashes.** `objc_exception_throw`, `UIViewAlertForUnsatisfiableConstraints`, and `swift_willThrow` find the whole class of bug that a line break never will.
- **The exception breakpoint in Debug is nearly free and worth always on.** It is how a "silent" nil-coalescing crash becomes an actual stop.
- **View Debugger** (`debugView()`) is a debugger attached at runtime — it catches view hierarchy and rendering problems that look like layout bugs in the simulator.
- **Memory Graph, Allocations, and Leaks** answer the three distinct questions (retain cycles, growth, unreachable). Leaks is the one that turns on for you.
- **Instruments' Time Profiler** is the ground truth for "why is this slow". The signpost in the simulator is a preview; the Time Profiler is the measurement.
- **Check the report navigator after every launch.** Crashes and hangs are collected whether or not you were watching.

```lldb
(lldb) po viewModel.items.count
(lldb) thread backtrace all
(lldb) expression -l objc -O -- [UIWindow keyWindow]
```

---

## 8. Previews & Refactoring

- **SwiftUI previews are a live compile, not a screenshot.** A type error in the previewed view is a real error in that view.
- **Use `#Preview` and keep previews at the bottom of a file**, or in a `Previews` folder excluded from the release target.
- **Preview sample data in one place.** A `SampleData` enum or a `PreviewProvider` shared across views stops each preview inventing its own inconsistent model.
- **The refactor menu is Roslyn-backed and reliable** for rename (it updates strings, XIB outlets, and Swift name references), extract, and convert closures to async.
- **A project-wide rename touches `project.pbxproj` too.** Expect the generated file to churn; with a project generator it does not matter.
- **Do not use "Find and Replace" for a type rename.** It misses storyboard XML and localised strings that the refactor tool handles.

---

## 9. Command Line & CI

- **`xcodebuild` is the same build the IDE runs.** If it works in the terminal, the IDE is not the problem; if it fails there, the GUI is hiding nothing.
- **Always pass `-destination` explicitly.** Without it, `xcodebuild` picks a default and a multi-destination scheme fails unpredictably.
- **`xcodebuild test` needs a booted simulator or a device UDID.** Use `-destination 'platform=iOS Simulator,name=iPhone 17,OS=latest'`.
- **Sign CI with an ephemeral certificate** and set `CODE_SIGNING_ALLOWED=NO` for simulator-only jobs — the fastest way to stop a build failing on a machine without a keychain.
- **Pipe through `xcbeautify` or `xcpretty`.** Raw `xcodebuild` output is unreadable in CI logs; the pretty-printer also emits JUnit XML.
- **Archive separately from build.** `xcodebuild -archivePath` produces the `.xcarchive` you then export from; do not try to reuse a plain build's products.

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
