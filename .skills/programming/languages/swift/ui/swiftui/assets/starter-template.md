# SwiftUI Best Practices: Starter Template

A reusable starting point derived from the **1. State & Data Flow** section of [SwiftUI Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```swift
struct CounterView: View {
    @State private var count = 0
    var body: some View {
        Button("Count = \(count)") { count += 1 }
    }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
