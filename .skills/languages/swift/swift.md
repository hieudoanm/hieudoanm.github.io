---
name: swift-best-practices
description: Idiomatic Swift best practices covering value types, optionals, protocols, Codable, concurrency and actors, error handling, testing, and tooling. Use when writing, structuring, or reviewing Swift code.
---

# Swift Best Practices

Swift is a multi-paradigm language built around value semantics and protocol-oriented design. Most of the classic Objective-C pain (nil-heavy code, unguarded state, shared mutable classes) is designed _out_ — the best practices here are about leaning into value types, `Codable`, `enum`-based state machines, and structured concurrency so whole classes of bugs become unrepresentable.

---

## 1. Project Structure

Swift Package Manager is the default for libraries and CLI tools; Xcode projects for app targets:

```txt
MyPackage/
├── Package.swift
├── Sources/
│   └── MyPackage/
│       ├── MyPackage.swift
│       ├── Models/
│       ├── Services/
│       └── Extensions/
├── Tests/
│   └── MyPackageTests/
└── .swiftlint.yml
```

- **SwiftPM for anything reusable** — one `Package.swift` per module layout; keep a binary/library split (`Sources/MyLibrary` + a thin `Sources/mycli/main.swift`) so logic is testable.
- One top-level type per file, named after the file — a file is a unit of discoverability, not just of code.
- Use subdirectories inside `Sources/<Target>/` for large tops (Models, Services, Views), matching module boundaries.
- Keep **extensions in dedicated files** (`String+Validation.swift`) or co-located with the type they extend — never scatter them randomly.

---

## 2. Value Types vs Reference Types

- **`struct` by default.** Value types give you `let`-immutability, no aliasing surprises, and value semantics that snapshot predictably:

```swift
struct Point { var x: Double; var y: Double }

var a = Point(x: 1, y: 2)
var b = a
b.x = 9            // a.x stays 1 — no shared state
```

- **`class` only when identity or shared mutable state is genuinely required** — a `UIViewController`, a cache, a connection pool. Mark such classes `final` unless you actually design for subclassing.
- **`protocol` over inheritance** — composition and protocol conformance beat class hierarchies for reuse; a type can conform to many protocols but inherit from one class.
- **Prefer `let` over `var`** — an immutable binding is a guarantee with no runtime cost; treat every `var` as something to justify.
- **`enum` with associated values for state machines** (see below) rather than `Bool` flags scattered across a class.

---

## 3. Optionals & Flow Control

- **Model absence explicitly with `Optional`** — the compiler forces you to handle "could be nil" at every use site; prefer `if let`/`guard let` over `!` force-unwrapping.
- **`guard` for early exit** on preconditions — keeps the happy path flat and left-aligned:

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

## 6. Concurrency & Actors

- **`async`/`await` over callbacks** — modern Swift concurrency is the default; write `async` functions instead of nesting completion-handler closures.
- **Actors isolate shared mutable state** — `actor` guarantees serialized access at compile time, replacing hand-rolled locks:

```swift
actor Counter {
    private var value = 0
    func increment() { value += 1 }
}
```

- **Mark sendable boundaries with `Sendable`** and prefer value types (`struct`/`enum`) at those boundaries so sharing across tasks is safe by construction.
- **Structured concurrency: `async let`, `TaskGroup`** — children complete before the scope does; cancellation propagates automatically. Avoid unstructured fire-and-forget `Task { }` unless the lifetime is explicit (view-model, service worker).
- **Keep the main actor for UI; `await` moving work** — `Task.detached`/`Task { }` on the right executor for CPU-bound or blocking work, don't block the main thread.
- **Prefer dependency injection via initialisers** (`init(service: Service)`) — the concurrency-safe, testable way to wire dependencies instead of singletons.

---

## 7. Protocols & Extensions

- **Protocols define capabilities; extensions provide implementations** — protocol-oriented programming keeps concrete types small:

```swift
protocol Validating { var isValid: Bool { get } }
extension String: Validating { var isValid: Bool { !isEmpty } }
```

- **Default implementations in `extension Protocol { }`** for shared behaviour; keep required members minimal so conformance is cheap.
- **Prefer `extension` to refine/group members** — conformance, helpers, and test-only API live in separate extensions by purpose.
- **`some Protocol` (opaque return) over `any Protocol` (existential) by default** for return types — better performance and fewer type-erasure surprises; reach for `any` when heterogeneous collections or dynamic dispatch are actually needed.
- **Name protocols for the capability or role** (`Sendable`, `Codable`, `PersistenceControlling`), not the concrete implementer.

---

## 8. Codable & Serialization

- **`Codable` for JSON and encoding** — adopt it on your models and get encode/decode (from)-free:

```swift
struct User: Codable {
    let id: Int
    let name: String
}
let user = try JSONDecoder().decode(User.self, from: data)
```

- **Custom `CodingKeys` for snake_case/different-key wire formats** rather than mirroring back-end naming; use `.convertFromSnakeCase` where the API is consistently snake_case.
- **Make `Codable` models immutable (`let`)** and decode in a failable/`throws` context, not over force-`try!` on untrusted JSON.
- **`Codable` conforms only when the round-trip is actually stable** — for ad-hoc transforms (dates, enums with raw values) write explicit `init(from:)`/`encode(to:)`.

---

## 9. Testing

- **`XCTest` / Swift Testing (`swift-testing` framework) with descriptive test names** — name tests as specifications:

```swift
@Test func loadConfigThrowsWhenFileMissing() throws {
    XCTAssertThrowsError(try loadConfig(at: missingURL))
}
```

- **Mirror test targets next to source** (`Sources/MyLib` → `Tests/MyLibTests`), one test file per source file where practical.
- **Favour dependency injection so tests pass fakes** — protocols behind services (see #7) make mocking a conformance, not a swizzle.
- **Test async code with `async` test functions and suspension points naturally** — no artificial `expectation`/`wait` plumbing for `await`-based code; use them only for callback-style legacy APIs.
- **Treat tests as documentation** — assert behaviour and outcomes, not internal call sequences.

---

## 10. Tooling (Non-negotiable)

- **`swift-format` (or `SwiftLint`) enforced in CI** — consistent formatting removes the style-noise from review; run `swift-format lint --strict`.
- **`SwiftLint` for rule-based checks** (`[artifact]`) with the conventions flag; treat violations as build failures in CI.
- **`swift build`/`swift test` over Xcode for CLI and library targets** — fast, CI-friendly, no scheme ceremony.
- **`swift-docc` for API documentation** — comment public symbols with `///` including example snippets that stay runnable.
- **Pin toolchains** — a `.swift-version` and CI matrix on macOS/Linux prevents "works on my machine".

---

## 11. General Rules of Thumb

- **Value semantics first, reference semantics when justified** — `struct`/`enum` over `class`, `let` over `var`, immutable `Codable` models. Sharing is the source of most bugs; avoid it by default.
- **Keep `ViewController`/`View` thin** — UI types capture and render state; logic lives in testable models/services injected via initialisers.
- **Single responsibility per type and screen** — if a file needs a table of contents, split it.
- **Exhaustive `switch` over runtime checks** — the compiler is the best reviewer of your state handling.
- **Dependencies explicit and injected** — no reaches into `UIApplication.shared`, singletons, or global mutable state.
- **String-literal state is a smell** — use `enum`s, `OptionSet` for flags, and `Codable`-friendly structures instead.

---

## Quick-Start Checklist

- [ ] `struct`/`enum` by default; `class` only for identity/shared state, marked `final`
- [ ] `let` preferred over `var`
- [ ] `guard let`/`if let` used; no unexplained `!` force-unwraps
- [ ] State modelled as `enum` with associated values, exhaustively `switch`ed
- [ ] `throws`/`Result` used instead of Optional-smuggled errors
- [ ] Concurrency via `async`/`await`, state via `actor`, `Sendable` at boundaries
- [ ] Dependencies injected via initialisers, not singletons
- [ ] `Codable` models immutable
- [ ] Swift Testing / XCTest tests named as specifications
- [ ] `swift-format`/`SwiftLint` green in CI
- [ ] UI types kept thin, logic in testable services
