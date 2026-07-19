# Overview

Focused reference for **xcode-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Xcode

Xcode is the compiler driver, build system, simulator, debugger, and profiler for every Apple platform — and it is also a large amount of IDE state that does not belong in version control. Practical Xcode work is mostly about **knowing which files are generated and must be ignored, keeping build configuration out of the IDE, and making sure CI compiles what you compiled locally**. App-level patterns live in swift.md and the platform playbooks alongside it.

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
