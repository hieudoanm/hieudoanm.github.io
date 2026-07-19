# iPadOS Development: Basic Usage

Best practices for building iPad apps in Swift — adaptive multi-column layouts, resizable windows, multitasking, pointer and Pencil input, and scene restoration. Use when creating, structuring, or reviewing an iPad experience.

## Scenario

Use this example as a starting point when applying **ipados-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Windowing & Scenes** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```swift
ViewThatFits {
    Dashboard().frame(minWidth: 320, minHeight: 480)
    ContentUnavailableView(
        "Window Too Small", systemImage: "arrow.up.left.and.arrow.down.right",
        description: Text("Resize the window to continue.")
    )
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
