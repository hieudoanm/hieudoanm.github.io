# Implementation notes

Focused reference for **ipados-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
