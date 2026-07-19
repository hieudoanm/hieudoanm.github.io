# Overview

Focused reference for **ios-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# iOS Development

iOS is Apple's handheld platform, and its defining constraint is that **the app does not own the screen**. The system owns the window, the safe area, the process lifecycle, and increasingly the ability to resize and relocate your scenes. Practical iOS work leans on **scene-based lifecycle, size classes instead of device checks, permission requests in context, and background work through `BGTaskScheduler`** — while SwiftUI conventions live in swiftui.md and language rules in swift.md.

---

## 1. Target Setup & Configuration

- **One universal target** (`TARGETED_DEVICE_FAMILY = "1,2"`) unless iPad is genuinely out of scope — see ipados.md for what universal costs you.
- **Every capability change edits the `.entitlements` file and the App ID**, in that order. A capability enabled in Xcode but not provisioned fails at runtime, not build time.
- **Ship an `Info.plist` usage description for every permission you request.** A missing `NSCameraUsageDescription` is an instant crash on first access, not a review rejection.
- **Add a Privacy Manifest** (`PrivacyInfo.xcprivacy`) declaring tracking, collected data types, and required-reason APIs (`UserDefaults`, file timestamps, disk space, boot time). Apple rejects uploads that omit it.
- **Pin a sensible deployment target** and gate newer APIs with `if #available` rather than raising the floor for everyone.

---

## 2. Scene Lifecycle

- **Adopt `UIScene` now.** Building with the iOS 27 SDK _requires_ the scene lifecycle; apps still on `UIApplicationDelegate` will not launch.
- **SwiftUI's `App` protocol is the scene definition** — `WindowGroup` per window type, `Settings`/`MenuBarExtra` where applicable.
- **Never reference `UIScreen.main`.** With iPhone Mirroring and iPad multitasking, your scene may be on a different screen. Read size from the view or `windowScene.effectiveGeometry`.
- **State restoration is per scene.** A user can have three instances of your app; save and restore navigation state keyed by scene, not globally.

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            RootView()
                .task { await appModel.bootstrap() }
        }
    }
}
```

- **Keep `application(_:didFinishLaunching:)` thin** — register background tasks and notification delegates there, and do no blocking work.

---

## 3. Adaptive Layout
