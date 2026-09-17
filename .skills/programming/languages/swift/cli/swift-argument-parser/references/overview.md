# Overview

Focused reference for **swift-argument-parser-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Swift Argument Parser Best Practices

Swift Argument Parser (formerly `swift-argument-parser`) provides a declarative DSL for building CLI tools. Following conventions produces intuitive, discoverable, and consistent command-line interfaces.

---

## 1. Entry Point & Command Structure

- **`@main` struct with `ParsableCommand`** — declare the root entry point without boilerplate `main.swift`.
- **Keep command structs focused on parsing** — delegate business logic to separate functions or services.
- **Use `subcommands` for nested trees** — nest command types inside the root or use `Subcommand` protocol.

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
