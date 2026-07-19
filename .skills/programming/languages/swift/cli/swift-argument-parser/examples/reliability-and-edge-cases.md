# Swift Argument Parser Best Practices: 3. Validation & Error Handling

## Source guidance

This example applies the **3. Validation & Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`ValidationError` for argument validation** — `throw ValidationError("ID must be positive")` produces user-friendly errors.
- **`requires` and `conflicts_with`** — encode mutual exclusivity and requirements declaratively.
- **`env` for environment variable fallback** — `val token by option().envvar("API_TOKEN")` reads from env when flag is absent.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for swift-argument-parser-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
