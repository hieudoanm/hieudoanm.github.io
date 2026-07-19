# Swift Best Practices: Basic Usage

Idiomatic Swift best practices covering value types, optionals, protocols, Codable, concurrency and actors, error handling, testing, and tooling. Use when writing, structuring, or reviewing Swift code.

## Scenario

Use this example as a starting point when applying **swift-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Value Types vs Reference Types** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```swift
struct Point { var x: Double; var y: Double }

var a = Point(x: 1, y: 2)
var b = a
b.x = 9            // a.x stays 1 — no shared state
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
