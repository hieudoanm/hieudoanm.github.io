# Swift Argument Parser Best Practices: Starter Template

A reusable starting point derived from the **1. Entry Point & Command Structure** section of [Swift Argument Parser Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```swift
@main
struct Run: ParsableCommand {
    static var configuration = CommandConfiguration(
        abstract: "CLI tool description",
        subcommands: [Start.self, Stop.self]
    )

    mutating func run() throws {
        // business logic delegated to subcommand handlers
    }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
