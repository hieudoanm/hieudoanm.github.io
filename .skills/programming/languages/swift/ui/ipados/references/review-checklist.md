# Review checklist

Focused reference for **ipados-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
