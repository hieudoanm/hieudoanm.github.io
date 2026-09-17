# Implementation notes

Focused reference for **dart-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
