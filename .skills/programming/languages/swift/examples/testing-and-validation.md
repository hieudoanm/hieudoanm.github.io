# Swift Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`XCTest` / Swift Testing (`swift-testing` framework) with descriptive test names** — name tests as specifications:
- **Mirror test targets next to source** (`Sources/MyLib` → `Tests/MyLibTests`), one test file per source file where practical.
- **Favour dependency injection so tests pass fakes** — protocols behind services (see #7) make mocking a conformance, not a swizzle.
- **Test async code with `async` test functions and suspension points naturally** — no artificial `expectation`/`wait` plumbing for `await`-based code; use them only for callback-style legacy APIs.

## Example

```swift
@Test func loadConfigThrowsWhenFileMissing() throws {
    XCTAssertThrowsError(try loadConfig(at: missingURL))
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for swift-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
