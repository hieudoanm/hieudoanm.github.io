# Implementation notes

Focused reference for **swift-argument-parser-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
