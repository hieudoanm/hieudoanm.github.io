# Overview

Focused reference for **dart-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
