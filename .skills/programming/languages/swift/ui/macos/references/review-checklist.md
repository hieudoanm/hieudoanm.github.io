# Review checklist

Focused reference for **macos-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
