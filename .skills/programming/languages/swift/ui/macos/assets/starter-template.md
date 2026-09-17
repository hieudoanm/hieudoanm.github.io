# macOS Development: Starter Template

A reusable starting point derived from the **2. App Structure & Scenes** section of [macOS Development](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
