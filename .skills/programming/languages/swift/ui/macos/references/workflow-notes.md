# Workflow notes

Focused reference for **macos-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Windows

- **A Mac user expects windows to be independent.** Two windows on different documents must not share mutable state by accident.
- **Model document-backed state per window** via `WindowGroup(id:for:)` with a `Codable` route, so reopening restores the right content.
- **`dismissWindow(id:)`** is the correct close; do not reach for `NSApp.terminate` or manual `NSWindow` bookkeeping from SwiftUI.
- **Respect the user's window frame** — persist and restore per document where the framework does not already.
- **Do not force a single-window app on a Mac user** unless the design is genuinely single-document.

---

## 4. Navigation & Data Presentation

- **`NavigationSplitView` with `.balanced` or `.prominentDetail`** is the standard three-pane shape; a `List(selection:)` sidebar is the state driver.
- **`TabView` with `.tabViewStyle(.sidebarAdaptable)`** gives a modern sidebar-tab hybrid for top-level sections.
- **Use `Table` for tabular data**, with `TableColumn`, sortable keys, and multi-row `selection` — a `List` of `HStack`s loses sorting, column resizing, and selection semantics.
- **Expose empty states via `ContentUnavailableView`.** The detail column is always visible, so a blank pane reads as broken.
- **Push navigation inside the detail column** with a nested `NavigationStack` bound to a local path; the split view deliberately does not supply one.

---

## 5. Menus & Commands

- **Every meaningful action belongs in the menu bar** with a keyboard shortcut. A Mac app where "Export" is reachable only by a toolbar button is incomplete.
- **Use `Commands`/`CommandGroup` to replace or add items** — `.newItem`, `.undoRedo`, `.pasteboard`, `.sidebar`, `.toolbar` — instead of rebuilding standard menus.
- **Honor system expectations**: copy/paste/select-all, undo/redo, standard Find, and `Cmd-Q` all come free only if you do not fight them.
- **Use `@FocusState` for command enablement** — a disabled menu item with no explanation is worse than a hidden one; validate against the focused view.
- **Custom top-level menus via `CommandMenu`** for app-specific navigation, not for duplicating `File`/`Edit`.
- **Verify shortcuts for collisions** and respect user remapping; do not hardcode assumptions about the user's keyboard.

```swift
.commands {
    CommandGroup(replacing: .newItem) {
        Button("New Note") { store.newNote() }.keyboardShortcut("n", modifiers: .command)
    }
    CommandGroup(after: .saveItem) {
        Button("Export as Markdown…") { store.exportMarkdown() }
            .keyboardShortcut("e", modifiers: [.command, .shift])
    }
}
```

---

## 6. Settings
