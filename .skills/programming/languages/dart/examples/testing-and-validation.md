# Dart Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`test` + `expect` on behavior** — contract tests for success, failure, validation, empty, and cancellation paths:
- **`group` for suites; table-driven via `for` in `test()` with a named case**:
- **Fake the seams, not the framework** — interfaces + fakes over mock-heavy setups; `FakeAsync` for time-dependent code.
- **Test async completion properly** — `await expectLater(stream, emitsThrough(...))`; test both happy path and error/close of streams.

## Example

```dart
test('parseUser rejects invalid email', () {
  expect(() => parseUser('nope'), throwsA(isA<FormatException>()));
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for dart-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
