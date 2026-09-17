# SwiftUI Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Unit-test models/services** (state transitions, validation, error mapping) — the framework's concerns excluded:
- **`ViewInspector`/`XCTest` UI probes only where interaction logic matters** — keep the bulk of coverage in logic and data transforms.
- **Snapshot/visual regressions only for genuinely fragile chrome** — fast, deterministic, CI-friendly.
- **Deterministic async** — `async`/`await` with injected fakes; no `sleep`.

## Example

```swift
func testSignInFailure() async {
    let model = AuthModel(api: .failing)
    do { try await model.signIn(); XCTFail("expected failure") }
    catch { XCTAssertEqual(model.state, .error) }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for swiftui-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
