# iOS Development: Basic Usage

Best practices for building iPhone apps in Swift — the platform layer of iOS. Use when creating, structuring, or reviewing an iOS app — covers scene lifecycle, adaptive layout, permissions, background execution, persistence, Liquid Glass, performance, and App Store distribution.

## Scenario

Use this example as a starting point when applying **ios-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Scene Lifecycle** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
