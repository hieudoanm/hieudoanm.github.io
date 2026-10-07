---
name: ios-best-practices
description: Best practices for building iPhone apps in Swift — the platform layer of iOS. Use when creating, structuring, or reviewing an iOS app — covers scene lifecycle, adaptive layout, permissions, background execution, persistence, Liquid Glass, performance, and App Store distribution.
---

# iOS Development

iOS is Apple's handheld platform, and its defining constraint is that **the app does not own the screen**. The system owns the window, the safe area, the process lifecycle, and increasingly the ability to resize and relocate your scenes. Practical iOS work leans on **scene-based lifecycle, size classes instead of device checks, permission requests in context, and background work through `BGTaskScheduler`** — while SwiftUI conventions live in [swiftui.md](./swiftui.md) and language rules in [swift.md](../swift.md).

---

## 1. Target Setup & Configuration

- **One universal target** (`TARGETED_DEVICE_FAMILY = "1,2"`) unless iPad is genuinely out of scope — see [ipados.md](./ipados.md) for what universal costs you.
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

- **Size classes, not device checks.** `UIDevice.current.userInterfaceIdiom` is no longer meaningful for layout, and an iPhone app on iPad keeps the phone idiom while being fully resizable.
- **Orientation is a preference, not a constraint.** `supportedInterfaceOrientations` is ignored in resizable environments; never compute layout from it.
- **Let SwiftUI pick the container.** `ViewThatFits` is the cleanest way to declare a preferred layout plus a fallback without branching on width.
- **Honor Dynamic Type at every size** — `.lineLimit(nil)`, `ViewThatFits`, and flexible frames beat fixed heights.
- **Use `safeAreaInset` and layout guides**, not hardcoded status-bar or home-indicator heights.

```swift
ViewThatFits {
    HStack(spacing: 16) { LargeDetail(); Sidebar() }
    VStack { Sidebar(); LargeDetail() }
}
```

---

## 4. Permissions & Privacy

- **Request in context**, at the moment the user taps the feature that needs it, with a one-line rationale. A cold prompt on first launch is the fastest route to denial and a bad review.
- **Handle all three outcomes** — granted, denied, and _limited_. Photos returns `.limited`, which is a success state that also needs a "manage selection" affordance.
- **Prefer the least-privileged API**: `requestAuthorization(for: .readWrite)` only if you truly need to add, and add `NSPhotoLibraryAddUsageDescription` separately.
- **Never block your UI on a permission prompt.** A denied camera is a degraded state, not an error state.
- **App Tracking Transparency** requires `ATTrackingManager.requestTrackingAuthorization` _before_ any tracking SDK initializes, plus `NSUserTrackingUsageDescription`.

---

## 5. Background Execution

- **iOS gives you seconds, not minutes.** There is no general background thread; anything long-running must be deferrable work.
- **Schedule with `BGTaskScheduler`**: `BGAppRefreshTaskRequest` for opportunistic sync, `BGProcessingTaskRequest` for battery/network-gated heavy work. Both need `BGTaskSchedulerPermittedIdentifiers` in `Info.plist`.
- **Wrap any last-gasp work in `beginBackgroundTask(expirationHandler:)`** and end it promptly — failing to end gets the app terminated.
- **Use a background `URLSession`** (`URLSessionConfiguration.background(withIdentifier:)`) for uploads and downloads that must survive app suspension; it relaunches you to handle the response.
- **Silent pushes are not guaranteed** — treat push as a latency hint and still schedule a refresh task as a backstop.

```swift
BGTaskScheduler.shared.register(forTaskWithIdentifier: "com.app.sync", using: nil) { task in
    guard let task = task as? BGAppRefreshTask else { return }
    scheduleSync()
    task.expirationHandler = { task.setTaskCompleted(success: false) }
    Task { await sync(); task.setTaskCompleted(success: true) }
}
```

- **SwiftUI `.backgroundTask(_:)`** is the modern scene-bound wrapper for the same idea — prefer it over raw `BGTaskScheduler` in an `App` scene.

---

## 6. Persistence & Secrets

- **`AppStorage`/`UserDefaults` for preferences only** — flags, units, last-opened tab. Never secrets, never large arrays, never as a write cache.
- **SwiftData or Core Data for structured data**; keep the store off the main actor and read through `@Query`/`FetchRequest` in SwiftUI.
- **Keychain for tokens and keys**, with the tightest accessibility class that still lets your background work run.
- **Set file protection explicitly** on sensitive files, and exclude user data from iCloud/iTunes backups unless the user expects it.

```swift
let query: [String: Any] = [
    kSecClass as String: kSecClassGenericPassword,
    kSecAttrAccount as String: "access-token",
    kSecValueData as String: token,
    kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
]
SecItemAdd(query as CFDictionary, nil)
```

---

## 7. Liquid Glass & Materials (iOS 26+)

- **Prefer system components.** Bars, sheets, and controls adopt Liquid Glass automatically; a custom `.background()` on a navigation element fights the effect.
- **Use `glassEffect` sparingly** — on floating controls and overlays, not on every list cell. Glass is GPU-expensive.
- **Wrap neighbouring glass in `GlassEffectContainer`** so they share one backdrop sample and morph cleanly; glass cannot sample other glass.
- **`.interactive()` only on elements the user actually touches** — it adds per-frame cost for nothing on passive content.
- **Do not blur, clip, or stack solid fills behind a glass surface**; an ancestor `.clipped()` silently kills the effect.
- **Accessibility adaptations are automatic** — Reduce Transparency, Increase Contrast, and Reduce Motion reshape the material with no code. Verify your own colors survive them.

```swift
GlassEffectContainer(spacing: 12) {
    HStack(spacing: 12) {
        Image(systemName: "play.fill").glassEffect(.regular.interactive())
        Image(systemName: "pause.fill").glassEffect(.regular.interactive())
    }
}
```

---

## 8. Performance & Launch

- **Measure launch with Instruments**; a cold start over ~400ms reads as jank. Defer non-essential initialization past first frame.
- **Downsample images to the display size** — a full-resolution `UIImage` in a thumbnail is the most common iOS memory bug.
- **Keep view bodies pure and cheap.** A body that reads `Date()` or allocates a formatter invalidates on every pass.
- **Offload with actors or a background task**, never with `DispatchQueue.global()` plus a data race on a `@State`.
- **Profile on a real low-end device in Release.** Simulator and Debug builds hide most of what matters.

---

## 9. Distribution

- **TestFlight before review** — internal for smoke, external for real device coverage across the oldest supported OS.
- **Privacy nutrition labels must match the Privacy Manifest** and your actual SDK behavior; mismatches are a common rejection.
- **Declare every permission you ship**, and remove ones you no longer use — unused usage descriptions are scrutinised.
- **Export compliance** (encryption) must be answered accurately or your build is held.
- **Ship incremental rollouts** with a crash-free threshold you actually check.

---

## Common Pitfalls

- **Branching on `userInterfaceIdiom` or screen size** — use size classes and adaptive containers; idiom is no longer meaningful.
- **Reading `UIScreen.main`** — wrong under iPhone Mirroring, iPad multitasking, and external displays.
- **Requesting permissions at launch**, or without a denial path.
- **A missing usage description key** — guaranteed crash on first use.
- **Assuming a long-running background task will finish.** It will not.
- **Glassifying every view**, or putting a solid background behind a glass surface.
- **Full-resolution images in lists** — memory spikes and scroll drops.
- **Shipping without a Privacy Manifest**, which is now an upload rejection.

---

## General Rules of Thumb

- Scene lifecycle, size classes, and Dynamic Type over any device or screen assumption.
- Request permissions in context, at the moment of need, with every outcome handled.
- Background work is deferred by design: schedule, don't block.
- `UserDefaults` for preferences, a real store for data, Keychain for secrets.
- Prefer system components over custom chrome so Liquid Glass works for free.
- Verify on the oldest supported OS, on a real low-end device, before calling it done.

---

## Quick-Start Checklist

- [ ] `UIScene` lifecycle adopted; no `UIScreen.main` or idiom checks anywhere
- [ ] Usage description keys present for every requested permission; limited access handled
- [ ] `PrivacyInfo.xcprivacy` shipped and consistent with privacy labels
- [ ] Background work via `BGTaskScheduler` with `BGTaskSchedulerPermittedIdentifiers` set
- [ ] Secrets in Keychain; preferences in `AppStorage`; structured data in SwiftData/Core Data
- [ ] `ViewThatFits` / size classes drive layout; Dynamic Type verified at accessibility sizes
- [ ] Glass confined to floating controls, grouped in `GlassEffectContainer`, interactive only when tappable
- [ ] Images downsampled; launch profiled in Release; no per-frame allocation in `body`
- [ ] Tested on the oldest supported iOS, small and large iPhone, and under Reduce Motion/Transparency
- [ ] TestFlight pass complete; export compliance answered; staged rollout enabled
