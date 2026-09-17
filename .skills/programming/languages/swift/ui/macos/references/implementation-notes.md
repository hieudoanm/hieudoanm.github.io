# Implementation notes

Focused reference for **macos-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
