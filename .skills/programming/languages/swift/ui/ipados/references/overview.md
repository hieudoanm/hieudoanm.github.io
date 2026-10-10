# Overview

Focused reference for **ipados-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# iPadOS Development

iPadOS is not an iPhone with a bigger screen — since iPadOS 26 it runs a **full desktop-style windowing system**: resizable windows, a menu bar, traffic-light controls, and free movement between displays. Practical iPad work leans on **`NavigationSplitView` doing the adapting for you, zero device or orientation checks, and layouts that stay sane down to 375pt wide** — while SwiftUI conventions live in swiftui.md, language rules in swift.md, and iPhone specifics in ios.md.

---

## 1. Target Setup

- **Enable the iPad device family** (`TARGETED_DEVICE_FAMILY = "1,2"`) and verify the provisioning profile covers it.
- **Treat the universal target as the default.** A separate iPad-only target duplicates code and doubles maintenance for a layout you can express in SwiftUI.
- **Declare all four orientations** in `Info.plist`; iPad apps are expected to rotate into every one.
- **Set `UIRequiresFullscreen` to `false`** — the key is deprecated in iOS 26 and full-screen opt-out is no longer respected.
- **Verify window resizing on a real iPad early**, not at release. Simulator window drag is a partial substitute, never a complete one.

---

## 2. Windowing & Scenes

- **Every scene is a resizable window.** Assume multiple simultaneous windows, arbitrary sizes, and the user moving your app to an external display mid-interaction.
- **Do not cache a size at launch.** Read the current size from the view, and re-read on every layout pass. `UIScreen.main` is actively wrong here.
- **Defer expensive work while the user is dragging.** `windowScene(_:didUpdateEffectiveGeometry:)` exposes `isInteractivelyResizing` — skip asset regeneration until the gesture ends, or the app stutters through the whole resize.
- **Window controls overlap your top edge.** Standard toolbars adapt automatically; if you build a custom title bar, offset around the control with `containerCornerOffset(_:sizeToFit:)` and let the system shrink the available width.
- **Support arbitrary small windows.** A window can shrink below iPhone SE dimensions. Provide an honest "please resize" state rather than letting controls overlap or clip.

```swift
ViewThatFits {
    Dashboard().frame(minWidth: 320, minHeight: 480)
    ContentUnavailableView(
        "Window Too Small", systemImage: "arrow.up.left.and.arrow.down.right",
        description: Text("Resize the window to continue.")
    )
}
```

- **Restore per-scene state**, not per-app state — see §9.

---
