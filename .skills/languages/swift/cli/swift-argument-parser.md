---
name: swift-argument-parser-best-practices
description: Best practices for Swift Argument Parser. Use when building CLI tools with ParsableCommand, handling arguments, and configuring subcommands.
---

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

---

## 2. Arguments & Options

- **`@Argument` for positional parameters** — declares expected input order declaratively.
- **`@Option` for named flags** — `@Option(name: .shortAndLong, help: "Output path") var output: String` generates `-o`/`--output`.
- **`@Flag` for boolean toggles** — `@Flag(help: "Enable verbose mode") var verbose = false` handles presence/absence semantics.
- **`@OptionGroup` for shared options** — groups common flags (e.g., `--verbose`, `--quiet`) into a reusable struct.

```swift
struct Start: ParsableCommand {
    @Argument help: "The resource to start")
    var resource: String

    @Option(name: .shortAndLong, help: "Output path")
    var output: String

    @Flag(name: "verbose", help: "Enable verbose output")
    var verbose: Bool

    mutating func run() throws {
        print("Starting resource: \(resource)")
    }
}
```

---

## 3. Validation & Error Handling

- **`ValidationError` for argument validation** — `throw ValidationError("ID must be positive")` produces user-friendly errors.
- **`requires` and `conflicts_with`** — encode mutual exclusivity and requirements declaratively.
- **`env` for environment variable fallback** — `val token by option().envvar("API_TOKEN")` reads from env when flag is absent.

```swift
@Argument(help: "Resource ID")
var id: Int

// Validation
require(id > 0) // throws ValidationError if false

// Conflicting flags
@Option(name: "format", short: "f")
var format: String

// Requires relationship
@Option(name: "config", requires: "format")
var configPath: String?
```

---

## 4. Shell Completion

- **`.custom { }` for completions** — `.custom { ["user1", "user2"] }` or `.list()` generates completions from code.
- **Generate completions for bash, zsh, fish** — users expect this from mature CLIs.
- **`completion` command** — wire up via `cobra.Command{}` completion generation if distributing widely.

```swift
@Option(name: "user", completion: .custom { ["alice", "bob", "charlie"] })
var user: String
```

---

## 5. Quick-Start Checklist

- [ ] `@main` struct conforming to `ParsableCommand`
- [ ] `@Argument` for positional params, `@Option` for named flags, `@Flag` for booleans
- [ ] Validation with `require()` for preconditions
- [ ] `env` for environment variable fallbacks
- [ ] Shell completions configured via `.custom` or `.list()`
- [ ] `--version` flag present (use `VersionOption`)
- [ ] Help text filled in for all properties