# Implementation notes

Focused reference for **kotlin-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```kotlin
private val _uiState = MutableStateFlow(UiState())
val uiState: StateFlow<UiState> = _uiState.asStateFlow()
```

Immutable `val` exposure guarantees the source can't be mutated from outside.

- **Operators over imperative loops:** `map`, `filter`, `flatMapConcat/Latest`, `combine`, `distinctUntilChanged`, `collectLatest` read the pipeline instead of simulating loop state.
- **Use `flowOf`/`asFlow`/`channelFlow` for the shape you need** — don't oscillate between `Flow` and collections without reason.
- **Collect with lifecycle _collection_ in mind** — `repeatOnLifecycle`/`collectLatest` on the UI side so collection stops when the UI stops.

---

## 7. Idioms: Scope Functions & Builders

- **`apply` to configure and return the receiver** (object setup), **`also` for side-effects**, **`let` to transform/carry a non-null value**, **`run`/`with` to compute a result with a receiver.** Use them for the _intent_, not for their own sake:

```kotlin
val svc = HttpClient().apply { install(ContentNegotiation) }
userDTO?.let { repo.save(it) }
```

- **`buildList`/`buildMap`/`buildSet`/`buildString` builders** — collect imperatively, get an immutable collection back, no mutable accumulator leaking:

```kotlin
val tags = buildList {
    add("kotlin")
    if (wantsRust) add("rust")
}
```

- **`use` for resources** (see Error Handling).
- **Double-bang-free null handling in chain:** `?.let { } ?: fallback`.
- **Named arguments + default parameter values over overloads** — `send(to = user.id, quiet = true)` is self-documenting and removes the overload explosion most languages accumulate.

---

## 8. Extension Functions & DSL

- **Prefer extension functions over utility/static classes** — `fun String.isEmail(): Boolean` is discoverable, composable, and needs no sidecar "Utils" object:

```kotlin
fun String.isEmail(): Boolean =
    Regex("[^@\\s]+@[^@\\s]+\\.[^@\\s]+").matches(this)
```

- **Put extensions in a package that makes them discoverable and importable** — `String.isEmail` belongs in a `strings`/`validation` package with a clean import surface.
- **Use `private`/`internal` extensions for file-local helpers** — don't pollute a public API with one-off helpers.
- **DSLs via `@DslMarker` and receiver lambdas** when a nested declarative API earns its weight (builders, UI, config) — but keep DSLs thin; a DSL for its own sake is a hidden cost.
- **Top-level functions and `const val` for constants** instead of `object Kwargs`-style bags.

---
