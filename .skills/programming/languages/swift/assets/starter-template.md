# Swift Best Practices: Starter Template

A reusable starting point derived from the **4. Enums & State Machines** section of [Swift Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```swift
enum LoadState {
    case idle
    case loading(progress: Double)
    case loaded([Item])
    case failed(error: Error)
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
