# Implementation notes

Focused reference for **ios-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
