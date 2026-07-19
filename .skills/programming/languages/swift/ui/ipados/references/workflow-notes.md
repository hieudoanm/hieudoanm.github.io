# Workflow notes

Focused reference for **ipados-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
