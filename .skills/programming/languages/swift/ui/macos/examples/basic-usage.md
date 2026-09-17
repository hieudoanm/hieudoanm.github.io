# macOS Development: Basic Usage

Best practices for building native macOS apps in Swift — windows and scenes, menus and commands, settings, sandboxing, Keychain, and AppKit interop. Use when creating, structuring, or reviewing a Mac app.

## Scenario

Use this example as a starting point when applying **macos-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. App Structure & Scenes** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
