# iOS Development: Starter Template

A reusable starting point derived from the **2. Scene Lifecycle** section of [iOS Development](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            RootView()
                .task { await appModel.bootstrap() }
        }
    }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
