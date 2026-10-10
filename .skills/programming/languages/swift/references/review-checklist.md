# Review checklist

Focused reference for **swift-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
