# Workflow notes

Focused reference for **dart-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
