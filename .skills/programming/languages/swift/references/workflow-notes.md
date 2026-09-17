# Workflow notes

Focused reference for **swift-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```swift
func render(_ user: User?) {
    guard let user else { return }        // `guard let x else` — Swift 5.7+
    print(user.name)
}
```

- **`??` for sensible defaults**, `if case`/`switch` for destructuring, and **`if let x { ... }`** shorthand (Swift 5.7+) over the older `if let x = x`.
- **Avoid bare `!` force-unwrap outside tests and IBOutlets/`implicitlyUnwrappedOptional` boundaries** — each `!` is a runtime-crash guarantee you're making.
- **Optional chaining composes**: `user?.profile?.displayName` short-circuits without nested `if let`.

---

## 4. Enums & State Machines

- **`enum` with associated values models state explicitly** — the compiler knows every state, and `switch` is exhaustive:

```swift
enum LoadState {
    case idle
    case loading(progress: Double)
    case loaded([Item])
    case failed(error: Error)
}
```

- **`switch` over `if/else` chains** for state — exhaustive, flat, and self-documenting; Swift's switch handles ranges, patterns, and `where` clauses for free.
- **`Result<Success, Failure>` in signatures for fallible work done on other dispatch queues or in escaping closures** — it makes success and failure explicit at the type level.
- **Nested/`private` enums for scoped flags** — an `enum Mode { case normal, editing }` beats two `Bool`s that can represent an impossible combination.

---

## 5. Error Handling

- **`throws` + `try` for normal error paths** — Swift's `do/catch` is the idiomatic mechanism; don't smuggle failures out through `Optional` or global state:

```swift
func loadConfig(at url: URL) throws -> Config {
    let data = try Data(contentsOf: url)
    return try JSONDecoder().decode(Config.self, from: data)
}
```

- **Custom error enums with readable descriptions** — conform to `LocalizedError`/`CustomStringConvertible` so messages are actionable:

```swift
enum ConfigError: LocalizedError {
    case missingFile(URL)
    case parseFailed(String)
    var errorDescription: String? { ... }
}
```

- **`guard`-style precondition checks: `precondition()`/`require`-equivalent before work**, and `assert` for programmer-only invariants that strip in `-O`.
- **Don't catch what you won't handle** — `catch` specific cases; a bare `catch {}` swallows root causes.
- **`Result` return for delegate/callback flows where `try` can't reach.**

---
