# Workflow notes

Focused reference for **ios-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
