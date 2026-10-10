# Swift Argument Parser Best Practices: 1. Entry Point & Command Structure

## Source guidance

This example applies the **1. Entry Point & Command Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`@main` struct with `ParsableCommand`** — declare the root entry point without boilerplate `main.swift`.
- **Keep command structs focused on parsing** — delegate business logic to separate functions or services.
- **Use `subcommands` for nested trees** — nest command types inside the root or use `Subcommand` protocol.

## Example

This excerpt is from the cited **1. Entry Point & Command Structure** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for swift-argument-parser-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
