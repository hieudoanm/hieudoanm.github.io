---
name: macos-best-practices
description: Best practices for building native macOS apps in Swift — windows and scenes, menus and commands, settings, sandboxing, Keychain, and AppKit interop. Use when creating, structuring, or reviewing a Mac app.
---

# macOS Development

macOS is a **window-and-menu operating system**. There is no single screen, no app-level navigation stack, and no one app switcher entry — the user is always operating on documents and windows with a keyboard in hand. Practical Mac work leans on **scenes with stable window identities, a real menu bar with validated commands, the App Sandbox, and a keychain for secrets** — while SwiftUI conventions live in [swiftui.md](./swiftui.md), language rules in [swift.md](../swift.md), and touch platforms in [ios.md](./ios.md).

---

## 1. Target, Sandbox & Distribution

- **Enable the App Sandbox.** The Mac App Store requires it, and it is the single biggest security decision in a Mac app.
- **Request the narrowest entitlements that work.** Camera, microphone, location, and file access each add a user-consent prompt; only ask for what ships.
- **Turn on Hardened Runtime** and sign with a Developer ID. **Notarization is mandatory** — an un-notarized app is blocked by Gatekeeper on first launch.
- **Prefer user-selected file access** via `fileImporter`/`NSOpenPanel` plus security-scoped bookmarks over arbitrary filesystem paths. The sandbox denies the latter, and bookmark regeneration is needed on every relaunch.
- **Distribute outside the store?** Use the `.dmg`/`.pkg` route with `Sparkle`-style updates and a stable app name; do not ship a bare `.app` zip.

---

## 2. App Structure & Scenes

- **The `App` protocol is the app.** Declare `WindowGroup`, `Window`, `Settings`, `MenuBarExtra`, and `DocumentGroup` there — no `main.swift` boilerplate.
- **Give every window a stable `id`.** `WindowGroup(id:for:)` plus `@Environment(\.openWindow)` is how you reopen a specific window onto specific data; stringly-typed global state is not.
- **Choose single vs multiple instance deliberately.** `Window` for exactly one (settings, inspector), `WindowGroup` for N (documents, dashboards).
- **Constrain windows with `.defaultSize`, `.windowResizability`, and `.defaultPosition`.** A Mac app that opens at an arbitrary size every launch feels unfinished.
- **Mark `NSApplicationDelegateAdaptor` for the few things SwiftUI does not model** — termination, `NSOpen` URL handling, dock behavior.
- **Order your scenes deliberately.** SwiftUI resolves scenes in declaration order, and misordering can leave later scenes without a rendered environment.

```swift
@main
struct MyMacApp: App {
    @NSApplicationDelegateAdaptor(AppDelegate.self) private var appDelegate

    var body: some Scene {
        Window("Notes", id: "notes") { NotesView() }
            .defaultSize(width: 900, height: 620)
            .windowResizability(.contentMinSize)

        Settings { SettingsView() }
    }
}
```

- **Keep the App shell thin** — wiring, scene declarations, and environment injection only. Logic belongs in models and services.

---

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

- **A `Settings` scene is what makes the app feel Mac-native.** It enables the Settings menu item and `Cmd-,` for free — but only if the scene exists.
- **Bind controls to `@AppStorage`**; SwiftUI persists writes and picks up external changes automatically.
- **Group with `Form` + `.formStyle(.grouped)` and `LabeledContent`** — `Form`/`Section` alone is an iOS idiom that looks wrong on a Mac.
- **Use a `TabView` of `Tab`s** for settings categories, and `.scenePadding()` with a sensible `frame` so the window is not absurdly large.
- **Do not put settings in a normal window** reachable only from your own UI. Mac users look in the menu bar.

---

## 7. Security, Secrets & Privacy

- **Store tokens in the Keychain**, not `UserDefaults` or files. Use the data-protection keychain (`kSecUseDataProtectionKeychain`) so items sync through the modern path.
- **Choose the tightest `kSecAttrAccessible` class** that still lets your background work run.
- **`UserDefaults` is for preferences, not data or caches.** It is world-readable to other processes in some configurations and is plist-merged on sync.
- **Respect TCC prompts** (camera, mic, screen recording, automation) and only trigger them from a real user action.
- **Ship a Privacy Manifest** (`PrivacyInfo.xcprivacy`) and make App Store privacy labels match it.
- **Isolate untrusted input.** If you parse files or render untrusted HTML, use a subprocess or a strict, well-tested parser.

---

## 8. AppKit Interop

- **Reach for AppKit when SwiftUI has no answer**, not out of habit: `NSViewRepresentable`/`NSViewControllerRepresentable` for real AppKit views, `NSPasteboard` for custom drag types, `NSSavePanel`/`NSOpenPanel` for full control over panel options.
- **Bridge lifecycles with `NSHostingSceneRepresentation`** to attach SwiftUI `Settings`/`MenuBarExtra` scenes to an existing `NSApplicationDelegate` app without a rewrite.
- **Keep AppKit work on the main actor.** `NSView` and `NSWindow` are not thread-safe, and Swift 6 strict concurrency will surface violations loudly.
- **Mirror `@Observable` models across both worlds** so a single instance drives SwiftUI and AppKit views — that is what keeps state consistent during a migration.

---

## 9. Performance & Concurrency

- **Mark the app and UI models `@MainActor`.** SwiftUI bodies are main-actor isolated; annotating them explicitly avoids isolation churn.
- **Move I/O, parsing, and file walks off the main actor** into an actor or a detached task with `Sendable` inputs.
- **Long lists in a resizable window must be lazy**, and images downsampled to display size — a Mac display makes the memory bug far more visible than a phone.
- **Profile with Instruments on real hardware.** A Mac app runs on the user's fastest machine, so jank reads as unpolished rather than fatal.

---

## 10. Testing

- **Unit-test models and services** with fakes for file and network seams; keep it off the main actor.
- **Use XCUITest for menus, commands, and window lifecycle** — menu enablement and `openWindow` behavior cannot be verified any other way.
- **Test the sandbox path**, not just the unsandboxed one: bookmark creation, entitlement-gated folders, and cancel-on-panel.
- **Test keyboard-only flows** end to end; it is the primary input on this platform.
- **Previews still work** via `#Preview`, and a `Settings` scene deserves its own preview since it is easy to break.

---

## Common Pitfalls

- **Shipping without sandboxing, Hardened Runtime, or notarization** — Gatekeeper blocks the app.
- **No `Settings` scene,** so the app has no Settings menu and feels non-native.
- **Actions living only in toolbars,** with no menu item or keyboard shortcut.
- **Arbitrary filesystem paths** in a sandboxed app; use `fileImporter` and security-scoped bookmarks.
- **Secrets in `UserDefaults`** instead of the Keychain.
- **Forcing single-window behavior** on a multi-document Mac app.
- **Using a `List` of `HStack`s** for tabular data instead of `Table`.
- **Touching AppKit off the main actor,** which breaks under Swift 6 strict concurrency.
- **Ignoring the user's window frame** by resetting size on every launch.

---

## General Rules of Thumb

- Scenes with stable `id`s, sized and positioned deliberately; one window per document.
- Menus and validated commands are the primary UI, not an afterthought.
- Sandbox on, entitlements minimal, notarize, sign with Developer ID.
- Keychain for secrets, `UserDefaults` for preferences, `fileImporter` for user files.
- `NavigationSplitView` or `Table` for structure; `ViewThatFits` is not a Mac idiom — use resizable containers.
- `Settings` scene with `@AppStorage` is mandatory for a native feel; test keyboard-only flows.

---

## Quick-Start Checklist

- [ ] App Sandbox enabled; entitlements minimal; Hardened Runtime + Developer ID signing + notarization verified
- [ ] `App` protocol structure; every window has a stable `id`, `defaultSize`, and `windowResizability`
- [ ] `WindowGroup(id:for:)` per document; no global mutable state shared across windows
- [ ] `NavigationSplitView` or `Table` for structure; `ContentUnavailableView` for empty states
- [ ] `Commands`/`CommandGroup` covering every action, with shortcuts and `@FocusState` validation
- [ ] `Settings` scene with `@AppStorage`, `Form`/`.formStyle(.grouped)`, and `scenePadding`
- [ ] Secrets in the Keychain with a tight `kSecAttrAccessible`; `UserDefaults` limited to preferences
- [ ] `fileImporter`/`NSOpenPanel` with security-scoped bookmarks; bookmark regeneration tested across relaunch
- [ ] AppKit interop confined to `NSViewRepresentable` and the main actor
- [ ] XCUITest covering menus, commands, and window open/close; keyboard-only flow tested
