# SwiftUI Best Practices: Basic Usage

Best practices for building SwiftUI apps — the framework conventions for Apple platform UIs. Use when writing, structuring, or reviewing SwiftUI — covers state and data flow, view composition, layout, lists, navigation, theming, previews, testing, and performance.

## Scenario

Use this example as a starting point when applying **swiftui-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. State & Data Flow** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```swift
struct CounterView: View {
    @State private var count = 0
    var body: some View {
        Button("Count = \(count)") { count += 1 }
    }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
