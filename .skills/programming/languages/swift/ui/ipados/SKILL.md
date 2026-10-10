---
name: "ipados-best-practices"
description: "Best practices for building iPad apps in Swift — adaptive multi-column layouts, resizable windows, multitasking, pointer and Pencil input, and scene restoration. Use when creating, structuring, or reviewing an iPad experience."
tags:
  - "programming"
  - "language"
  - "swift"
  - "ui"
  - "ipados"
when_to_use: "Use when creating, structuring, or reviewing an iPad experience."
prerequisites:
  - "Basic familiarity with Swift and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../ios/SKILL.md"
  - "../macos/SKILL.md"
  - "../../SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# iPadOS Development

iPadOS is not an iPhone with a bigger screen — since iPadOS 26 it runs a **full desktop-style windowing system**: resizable windows, a menu bar, traffic-light controls, and free movement between displays. Practical iPad work leans on **`NavigationSplitView` doing the adapting for you, zero device or orientation checks, and layouts that stay sane down to 375pt wide** — while SwiftUI conventions live in [swiftui.md](../swiftui/SKILL.md), language rules in [swift.md](../../SKILL.md), and iPhone specifics in [ios.md](../ios/SKILL.md).

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

## 3. Adaptive Navigation

- **`NavigationSplitView` is the primary container.** It renders 2–3 columns on iPad and collapses to a `NavigationStack` on compact width, with no size-class branching.
- **Drive navigation with selection bindings, not `NavigationLink`s between columns.** That single choice is what makes the same code adapt across iPhone, iPad, and Mac.
- **Default `columnVisibility` to `.automatic`.** Forcing `.all` on compact width overlays the sidebar on top of detail and reads as a layout bug.
- **Use `preferredCompactColumn` to choose the compact entry point**, and do not rely on it for three-column splits — restructure to two columns instead.
- **Give columns min/ideal/max widths** (`navigationSplitViewColumnWidth(for:ideal:min:max:)`); a fixed width looks lost on a 27-inch display and clipped at accessibility Dynamic Type.
- **Reset the detail stack on sidebar selection** — switching folders must pop `detailPath` to `[]`, or the user is left looking at a stale child.
- **Fallback to `ContentUnavailableView`, never `EmptyView()`** — the detail column is always visible, and a blank pane reads as broken.

```swift
NavigationSplitView {
    List(selection: $selection) { ForEach(folders) { f in Tag(f.name, value: f) } }
        .navigationTitle("Library")
} detail: {
    NavigationStack(path: $detailPath) {
        DetailView(folder: selection)
    }
}
.navigationSplitViewColumnWidth(for: .sidebar, ideal: 240, min: 180, max: 320)
```

---

## 4. Adaptive Layout

- **Size classes and the view's own size are the only inputs.** Never `userInterfaceIdiom`, never `UIScreen`, never a hardcoded device model.
- **Use `ViewThatFits`** to declare a preferred arrangement and a fallback — it is clearer than nested `if sizeClass` trees and resizes continuously rather than snapping.
- **Prefer fluid grids**: `LazyVGrid` with adaptive columns, `ViewThatFits`, and flexible frames over fixed-size rows.
- **Use `NavigationSplitView` over layout, not for navigation**, when you only need a wide two-pane arrangement — a `NavigationSplitView` inside a sheet is a common mistake.
- **Animate column transitions** with a spring in `withAnimation`; the default linear interpolation reads as cheap next to the system feel.

---

## 5. Input & Interaction

- **Support three input methods in one layout**: touch, pointer, and keyboard. Assume any of them at any moment.
- **Add keyboard shortcuts and a `CommandMenu`** — iPad users have hardware keyboards, and iPadOS 26 surfaces a real menu bar.
- **Handle hover and focus states** for pointer input; a UI that only renders a pressed state feels broken under a trackpad.
- **Use `Transferable` for drag and drop** rather than `NSItemProvider` plumbing, and make drop targets obvious with `.dropDestination`.
- **Support multi-select in lists** (`List(selection:)`), and never make destructive actions reachable by a single accidental swipe.
- **Apple Pencil**: support hover and squeeze via `UIViewRepresentable` + `UIPencilInteraction` only where a drawing surface genuinely needs it, and enable finger drawing explicitly where it helps.

---

## 6. Multitasking & External Displays

- **Support Slide Over, Split View, and Stage Manager.** A layout that only works full-screen is a bug report waiting to happen.
- **Test in every multitasking mode on a device** — the failure modes (clipped toolbars, unreachable buttons, dead scroll views) are invisible in the simulator's default layout.
- **Support external displays** if your content benefits: mirror the main content, and never assume a fixed pixel size.
- **Do not use `UIApplication.shared.connectedScenes` filtering to guess "the" screen** — identify the scene from the view's own `windowScene`.

---

## 7. Performance Under Resizing

- **Resizing is an expensive layout event.** Avoid recomputing large data transformations in `body`; cache derived values in the model and invalidate on real data change.
- **Regenerate image assets at the new size after the gesture**, per `isInteractivelyResizing` — re-decoding mid-drag is the classic iPad jank.
- **Long lists in a detail column must be lazy** (`List`/`LazyVStack`); a window that can be 2000pt tall makes non-lazy stacks fatal.
- **Prefer Instruments' SwiftUI template** and watch body evaluation counts while resizing, not just at rest.

---

## 8. State Restoration

- **Restore the sidebar selection, column visibility, and detail path per scene**, driven by `@SceneStorage` or a `Codable` route.
- **Persist `NavigationSplitViewVisibility`** so a relaunch restores the user's chosen layout.
- **Deep links and shared URLs must resolve into a window** — with multiple scenes, "which window receives this" needs an explicit policy, not a global handler.
- **Never assume one shared controller.** A model shared across windows must be an `@Observable` object or an actor, not a `static var`.

---

## 9. Testing

- **Use Xcode's resize mode** in the canvas or Device Hub to iterate through widths quickly, then confirm on hardware.
- **Add snapshot tests at several widths** — the failures that matter (clipped labels, overlapping toolbars) are width-dependent and invisible to logic tests.
- **Exercise each multitasking mode** in a scripted UI test, not just a manual pass.
- **Test keyboard-only navigation**; a layout that requires touch to reach a control is broken for a large share of iPad users.
- **Verify Dynamic Type at `accessibility3` and above** in every column — fixed column widths clip here before anything else does.

---

## Common Pitfalls

- **Branching on `userInterfaceIdiom` or hardcoding device widths.** It is no longer meaningful; iPhone apps run on iPad as fully resizable.
- **Forcing `columnVisibility = .all`.** It overlays the sidebar in compact width instead of letting the framework collapse.
- **Assuming a fixed window size** or caching geometry at launch.
- **Doing heavy work on every resize step** without checking `isInteractivelyResizing`.
- **Building a custom title bar** without accounting for the new window controls.
- **Ignoring tiny windows** — users can shrink below iPhone SE dimensions and your layout must degrade honestly.
- **Using `@State`/`static var` for cross-window state**, which silently diverges between scenes.
- **Shipping `UIRequiresFullscreen`** to dodge the problem; it is deprecated and ignored.

---

## General Rules of Thumb

- `NavigationSplitView` with selection bindings is the default container; let it collapse.
- Size classes and `ViewThatFits` are the only layout inputs — never idiom, model, or screen.
- Every scene is a resizable, movable window; state restoration is per scene.
- Support touch, pointer, and keyboard in the same layout, and test each.
- Re-measure everything the user can resize, and do the expensive work after the gesture.
- Test every multitasking mode on real hardware before shipping.

---

## Quick-Start Checklist

- [ ] Device family includes iPad; all orientations supported; `UIRequiresFullscreen` unset
- [ ] `NavigationSplitView` with `columnVisibility` defaulting to `.automatic`; no `NavigationLink`s between columns
- [ ] `preferredCompactColumn` set; two columns preferred over an unreliable three-column compact fallback
- [ ] Column widths use min/ideal/max; `ContentUnavailableView` for empty detail; `detailPath` reset on selection change
- [ ] No `userInterfaceIdiom`, `UIScreen`, or orientation checks; layout via size class, `ViewThatFits`, and adaptive grids
- [ ] Window controls accommodated; small-window fallback state implemented
- [ ] `isInteractivelyResizing` checked before regenerating assets or running heavy work
- [ ] Hover/focus states, keyboard shortcuts, `CommandMenu`, `Transferable` drag and drop, and multi-select all present
- [ ] `@SceneStorage` / per-scene restoration for selection, column visibility, and path
- [ ] Snapshot tests at several widths; hardware pass across Slide Over, Split View, and Stage Manager
