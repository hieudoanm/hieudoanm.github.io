# Overview

Focused reference for **macos-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# macOS Development

macOS is a **window-and-menu operating system**. There is no single screen, no app-level navigation stack, and no one app switcher entry — the user is always operating on documents and windows with a keyboard in hand. Practical Mac work leans on **scenes with stable window identities, a real menu bar with validated commands, the App Sandbox, and a keychain for secrets** — while SwiftUI conventions live in swiftui.md, language rules in swift.md, and touch platforms in ios.md.

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
