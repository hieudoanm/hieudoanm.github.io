# Swift Argument Parser Best Practices: Basic Usage

Best practices for Swift Argument Parser. Use when building CLI tools with ParsableCommand, handling arguments, and configuring subcommands.

## Scenario

Use this example as a starting point when applying **swift-argument-parser-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Entry Point & Command Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
