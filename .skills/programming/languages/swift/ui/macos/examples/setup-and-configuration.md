# macOS Development: 2. App Structure & Scenes

## Source guidance

This example applies the **2. App Structure & Scenes** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **The `App` protocol is the app.** Declare `WindowGroup`, `Window`, `Settings`, `MenuBarExtra`, and `DocumentGroup` there — no `main.swift` boilerplate.
- **Give every window a stable `id`.** `WindowGroup(id:for:)` plus `@Environment(\.openWindow)` is how you reopen a specific window onto specific data; stringly-typed global state is not.
- **Choose single vs multiple instance deliberately.** `Window` for exactly one (settings, inspector), `WindowGroup` for N (documents, dashboards).

## Example

This excerpt is from the cited **2. App Structure & Scenes** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for macos-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
