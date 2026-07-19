---
name: dart-best-practices
description: Best practices for writing Dart — the language conventions for client and server Dart code. Use when writing, structuring, or reviewing Dart — covers null safety, sound types, immutability, collections, async, classes, records/patterns, and tooling.
---

# Dart Best Practices

Dart is the language behind Flutter — sound-null-safe, type-inferred, and compiled to native or web. Practical Dart leans on **non-nullable by default with explicit null handling, `final` fields with constructor initialization, and async through `Future`/`Stream` that flows a token or completes cleanly**. The analyzer (`dart analyze`) is the review gate, and classes are assembled by composition, not hierarchy sprawl.

---

## 1. Null Safety

- **Non-nullable is the default** — a `String` promises it isn't null; only `String?` can be null:

```dart
final String name;        // never null
final String? nick;       // may be null — handle it
```

- **Handle null at the boundary, promote inside** — use `if (x != null)` or `?.`/`??`, and trust promotion:

```dart
final maybe = await repo.find(id);
if (maybe == null) throw NotFoundException('user $id');
return maybe;                              // promoted to non-null
```

- **`??` for defaults, `?.` for chains, `??=` for lazy init**:

```dart
final port = config.port ?? 8080;
final length = user?.cards?.length ?? 0;
```

- **`!` is a declaration, not a fix** — use it only after a verified invariant; treat `string!` on untrusted data in review as a suspect.
- **`late` for fields initialized once deterministically** (DI, lazy caches) — never `late` + nullable to fake null safety.
- **Patterns access nullable members**: `final user?.name` unboxes; use `switch`/`if-case` patterns to destructure safely.

---

## 2. Sound Types & Inference

- **Prefer explicit types at boundaries, inference inside functions** — public signatures always annotated:

```dart
User getUserById(int id, {bool eager = false});
```

- **`dynamic` is a leak** — it disables every prompt check; prefer `Object?` + a `switch`/patterns to narrow, or generics.
- **Prefer sealed hierarchies over `dynamic`/enum+casts** — sealed classes make exhaustiveness a compile-time property:

```dart
sealed class Result<T> {}
final class Ok<T> extends Result<T> { final T value; Ok(this.value); }
final class Err<T> extends Result<T> { final String reason; Err(this.reason); }
```

- **Generics carry contracts** — `List<T>`, `Future<T>`, `Map<K, V>` make the element type explicit; avoid raw `List` (implies `List<dynamic>`).
- **`covariant`/`contravariant` used deliberately** at inheritance boundaries, not to dodge type errors.

---

## 3. Immutability & Construction

- **`final` fields by default; `const` for compile-time-known values**:

```dart
class User {
  const User({required this.id, required this.name});
  final String id;
  final String name;
}
```

- **`const` constructor + `identical`-favored instances for shared immutable data** — caching and comparison get cheaper.
- **Fields set once in the initializer list or constructor**; prefer `required` named parameters over positional mystery.
- **Prefer `copyWith` for derived values** on immutable models (optionally generated) over mutable setters.
- **Using immutable data structure discipline** (no reassignment, no `!` casts) makes sharing across isolate/UI boundaries safe by construction.

---

## 4. Collections

- **Expose read-only views at boundaries** — `List.unmodifiable`, `Map.unmodifiable`, or expose `Iterable<T>` not the backing `List<T>`:

```dart
Iterable<String> get roles => _roles;   // never expose the mutable field
```

- **Collection literals beat manual loops** — spreads, `for`-in literals, and collection `if` compose declaratively:

```dart
final names = [
  for (final u in users) if (u.active) u.name,
];
```

- **`map`/`where`/`whereType`/`fold` over index loops**; avoid `.forEach` for value-producing work (prefer `map`/collection-for).
- **`Map` insertion and lookup by key, not by linear scan** — a repeated `where((e) => e.id == id).first` is a bug in performance disguise.
- **Know when `List` vs `Set` vs `Map` vs queues/stacks** — membership checks use `Set`, ordering+random access uses `List`.

---

## 5. Async & Streams

- **async/await down, not up** — never `.then` chains where `await` reads; never `unawaited` a Future whose error matters:

```dart
Future<User> load() async {
  final json = await _api.get(widgetId);     // token-less: bounded by caller
  return User.fromJson(json);
}
```

- **`Future.wait`/`Stream` batch for independent work** instead of awaiting sequentially.
- **`Stream` for sequences; `StreamSubscription` must be cancelled** — `await for` the idiomatic consumer; cancel in dispose/teardown.
- **Error strategy per Future** — `try/catch` or `.catchError`/`.onError` with a return; a `Future` error that nobody awaits is a silent failure.
- **`FutureOr<T>` only at internal seams**; expose `Future<T>` to let callers not care.
- **`Isolate`/`compute` for heavy CPU** — don't block the UI/client isolate; `compute` for one-shot work, explicit `Isolate.spawn` for long-lived.

---

## 6. Classes, Inheritance & Composition

- **Compose over inherit** — mixins (`mixin`) for shared behavior, not deep inheritance; interfaces for contracts:

```dart
mixin Validatable on HasErrors {
  bool validate() => errors.isEmpty;
}
```

- **`implements` over `extends` for contracts** — a class that only needs the shape should satisfy the interface without inheriting implementation.
- **`factory` constructors for objects with negotiation** (cache hits, subtype selection) — inside a class, returning subtypes legally.
- **Small focused classes** — one file ≈ one responsibility; split models, services and UI shells.
- **`with` mixins and `on` constraints keep hierarchies flat** — a deep 5-level class tree is usually missing a mixin or interface.

---

## 7. Errors & Domain Modeling

- **Exceptions for genuine failures; `Result`/sealed types for expected outcomes** — "not found", "already exists" are business cases:

```dart
final r = await repo.find(id);
return switch (r) {
  Ok(value: final u) => u,
  Err() => throw NotFoundException(),
};
```

- **Throw precise exceptions** — `FormatException`, `RangeError`, domain types — matching the failure to the type.
- **Catch narrowly** (`catch (on ApiException e)`) and rethrow/convert with the cause preserved; never swallow.
- **Validate input at the boundary before touching state** — fail fast, not after partial mutation.
- **Never `catch (e)` an empty block** — log + rethrow or return an explicit error.

---

## 8. Records, Patterns & Modern Dart

- **Records over ad-hoc tuples/types**: `(String name, int age)` describes a shape where a full class is overkill:

```dart
final (name, age) = describeUser(u);
```

- **Pattern matching as dispatch** — `switch` expressions, object patterns, and destructuring over nested `if` chains:

```dart
String describe(Result r) => switch (r) {
  Ok(:final value) => 'ok: $value',
  Err(:final reason) => 'err: $reason',
};
```

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
