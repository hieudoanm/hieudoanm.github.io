# Workflow notes

Focused reference for **swift-argument-parser-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
