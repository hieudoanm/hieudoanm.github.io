# Review checklist

Focused reference for **dart-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`if-case`/`switch` with exhaustiveness on sealed types** — the compiler enforces every branch.
- **`extension` for member-style conveniences** on types you don't own — keep them small and documented.
- **`augmentation` (Dart 3.x) for additive member extension across files where the feature is available.**

---

## 9. Tooling & Style

- **`dart analyze` clean as a pre-commit/CI gate**; `dart format` for canonical formatting.
- **Run tests with `dart test`** — fast, parallel, deterministic (no wall-clock sleeps).
- **`do_not_submit`/`TODO` discipline** — analyzer flags, CI blocks.
- **Lock the SDK** (`environment: sdk` in `pubspec.yaml`) and pin dependency versions (`pubspec.lock` committed for apps).
- **`dart doc` on public API** — public members documented to contract level; private code free.

---

## 10. Testing

- **`test` + `expect` on behavior** — contract tests for success, failure, validation, empty, and cancellation paths:

```dart
test('parseUser rejects invalid email', () {
  expect(() => parseUser('nope'), throwsA(isA<FormatException>()));
});
```

- **`group` for suites; table-driven via `for` in `test()` with a named case**:

```dart
for (final (input, valid) in [('a@b.co', true), ('bad', false)]) {
  test('email $input validity', () => expect(isValidEmail(input), valid));
}
```

- **Fake the seams, not the framework** — interfaces + fakes over mock-heavy setups; `FakeAsync` for time-dependent code.
- **Test async completion properly** — `await expectLater(stream, emitsThrough(...))`; test both happy path and error/close of streams.

---

## General Rules of Thumb

- **Non-nullable by default; `?` is a promise to handle absence.**
- **`final` first, `const` where possible, `late` only with a real invariant.**
- **Compose with mixins/interfaces; keep hierarchies flat.**
- **Exhaustive sealed types over dynamic dispatch.**
- **Async flows a single completion path — with an error story.**
- **`dart analyze` + `dart format` + `dart test` are part of "done".**

---

## Quick-Start Checklist

- [ ] Non-nullable types; `?.`/`??`/promotion over `!` on untrusted data
- [ ] Public signatures annotated; `dynamic` avoided; sealed types for hierarchies
- [ ] `final` fields with `const` constructors; `copyWith` for derived models
- [ ] Read-only views at boundaries; collection `for`/`if`/spreads over loops
- [ ] `await` throughout; subscription cancellation; Future errors handled
- [ ] Mixins + composition over inheritance; small focused classes
- [ ] `Result`/sealed types for expected outcomes; specific exceptions otherwise
- [ ] Records/patterns/switch expressions for modern dispatch
- [ ] `dart analyze` clean; `dart format`; SDK/lock file disciplined
- [ ] Contract tests incl. failure/empty/cancellation paths
