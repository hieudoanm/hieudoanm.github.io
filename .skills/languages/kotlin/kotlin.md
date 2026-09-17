---
name: kotlin-best-practices
description: Idiomatic Kotlin best practices covering project structure, null safety, immutability, classes, coroutines and Flow, error handling, testing, and tooling. Use when writing, structuring, or reviewing Kotlin code.
---

# Kotlin Best Practices

Kotlin is a modern, pragmatic JVM (and multiplatform) language: null-safety, immutability, and first-class coroutines push most of the classic Java failure modes out of the language. "Best practice" here is about leaning into those features — `val` over `var`, sealed hierarchies over `if` chains, structured concurrency over raw threads — so problems become unrepresentable instead of just handled carefully.

---

## 1. Project Structure

Standard Gradle layout (Kotlin DSL + version catalog):

```txt
myapp/
├── settings.gradle.kts
├── build.gradle.kts
├── gradle/
│   └── libs.versions.toml   # version catalog — single source of truth for deps
├── gradlew / gradlew.bat
└── app/
    ├── build.gradle.kts
    └── src/
        ├── main/kotlin/com/example/myapp/
        │   ├── Main.kt
        │   ├── domain/
        │   ├── data/
        │   └── ui/
        └── test/kotlin/...
```

- **`gradle/libs.versions.toml` for dependency versions** — never scatter version strings across `build.gradle.kts` files; catalogs keep upgrades and review in one place.
- **`build.gradle.kts`, not `build.gradle`** — the Kotlin DSL is type-checked, and your IDE/AI can follow it reliably.
- **Package names: lowercase, reverse-domain** — and never start a segment with `java` or `kotlin` (reserved namespaces).
- **Layering by package, enforced by module** where possible — for bigger apps split `:core`, `:data`, `:ui` Gradle modules along real dependency boundaries, not arbitrarily.
- Keep a thin `main` — parse args/env, wire dependencies, start the app; business logic lives in testable classes.

---

## 2. Null Safety

- **`val` by default, `var` only when state genuinely changes.** Every `var` is a place where a bug can hide; each one should have a reason.
- **Model nullable state with `T?` and force handling with `?.` / `?:` / `!!` at the boundary.** Prefer safe calls and the Elvis operator in normal flow:

```kotlin
val name = user?.profile?.displayName ?: "Anonymous"
```

- **`!!` is a smell.** It's acceptable only when a value was just verified non-null by a smart cast that the compiler can't prove (`checkNotNull`, `requireNotNull`, or a `lateinit` invariant you control) — never as a routine unwrap of external input.
- **`lateinit` sparingly** (dependency injection, Android views) — prefer constructor parameters or `by lazy` so "set later" can't be silently skipped.
- **Smart casts do the work for you** — once a nullable is checked (`if (x != null)`), the compiler treats the rest of the visible scope as non-null; use that instead of copying values into locals.

---

## 3. Classes & Type Design

- **`data class` for value-bearing models** — you get `equals`/`hashCode`/`toString`/`copy`/destructuring for free. Prefer immutable `val` fields throughout.
- **`sealed class` / `sealed interface` for restricted hierarchies** — every `when` over them is exhaustive at compile time, so the compiler verifies you handled all cases:

```kotlin
sealed interface Result<out T> {
    data class Ok<T>(val value: T) : Result<T>
    data class Err(val reason: String) : Result<Nothing>
}
```

- **`@JvmInline value class` instead of raw primitives/Strings for domain ids** — `value class UserId(val id: Long)` catches `ProductId`/`UserId` mix-ups at compile time with no allocation overhead.
- **`object` for singletons and companion homes** — Kotlin has no `static`; singletons should be `object`, and type-level members go in `companion object` (keep the companion small).
- **Prefer composition and delegation over inheritance** — `interface Repository { ... }` and `class CachingRepository(private val delegate: Repository) : Repository by delegate` gets forwarding for free.
- **Access the public API with interfaces; expose implementations as concrete types.** `Injection with interface delegation`: `class Service(repo: Repository by RepoImpl())` makes dependencies explicit at construction.

---

## 4. Error Handling

Kotlin has no checked exceptions — so make failure modes _visible_ in the type system instead.

- **Expected, recoverable failures → sealed result types or `Result<T>`.** Code that can fail in ways callers should handle returns a value you `when` over, not an exception you pray gets caught.

```kotlin
when (val res = api.fetch(id)) {
    is Result.Ok -> render(res.value)
    is Result.Err -> showError(res.reason)
}
```

- **`runCatching` / `Result` for wrapping unexpected exceptions** — convert to a domain type quickly; don't let `Result` instances pile up across layers.
- **Abrupt or programmer failures → `require()` / `check()` (and `error()`) for invariants:**

```kotlin
require(amount > 0) { "amount must be positive, was $amount" }
check(isInitialized) { "state must be initialized before use" }
```

- **Don't swallow exceptions.** No `catch (_) {}`; if you must ignore, justify it and log. Wrap exceptions with context (`cause`, message) as they cross layers.
- **Closeables in `use { }`** — `resource.use { ... }` guarantees release regardless of failure path, no `try/finally` boilerplate.

---

## 5. Coroutines & Structured Concurrency

- **Never launch without a scope.** Coroutines must belong to a lifecycle-aware scope (`viewModelScope`, a custom `CoroutineScope`, or `coroutineScope {}`); `GlobalScope` is almost never correct.
- **Structure by default: `coroutineScope { }` / `supervisorScope { }`.** Children complete before the parent returns; failure in one cancels the parent (or, with `supervisorScope`, only itself). Cancellation and scoping become automatic.
- **Thread nothing by hand.** Use `withContext(Dispatchers.Default/IO)` for blocking work and keep the UI/main dispatcher for rendering. Move CPU-bound and IO work off the main thread explicitly.
- **Write `suspend` functions that do suspendable work** — `suspend fun fetch(id: Int): Result<Data>` — and prefer them over callback-style APIs.
- **Coöperate with cancellation:** make blocking loops cancellable (`ensureActive()` / `yield()`), don't swallow `CancellationException`.
- **Prefer `Flow` over `Channel` for reactive streams** (see below); reserve `Channel` for hot/backpressure-sensitive pipelines.

```kotlin
suspend fun loadUsers(): List<User> = withContext(Dispatchers.IO) {
    dao.selectAll() // blocking call off the main thread
}
```

---

## 6. Flow & Reactive Patterns

- **`Flow` is cold and compositional** — prefer it for streams; `StateFlow`/`SharedFlow` for state and events. Use `Channel` only when you need a hot queue with specific fusion semantics.
- **Expose `StateFlow` publicly, back it with `MutableStateFlow` privately:**

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

## 9. Testing

- **Use `kotlin.test` (+ JUnit 5 underneath) and `runTest` for coroutine code** — `StandardTestDispatcher` gives deterministic virtual time, so tests don't `delay()`-sleep:

```kotlin
@Test
fun `fetch returns ok when upstream succeeds`() = runTest {
    val repo = FakeRepo(Ok(...))
    assertEquals(Ok(...), repo.fetch(1))
}
```

- **Name tests as sentences** — backtick names read as specifications (`returns ok when upstream succeeds`), which the repo convention prefers over `testFetch()`. If backticks aren't used, use `camelCase` with the same descriptive intent.
- **Fake/mock the boundaries, not the internals** — `FakeRepo`, in-memory doubles; test behaviour and outcomes, not call-order implementation details.
- **Property-based / parameterized testing** for wide input spaces — JUnit 5 `@ParameterizedTest` + `@MethodSource`, or `kotlinx-benchmark`/`kover` where relevant.
- **Test coroutine cancellation and errors** — assert `withTimeout` failures, `runCatching` results, and scope survival (`supervisorScope`).
- **Isolate tests** — each test builds its own state; no shared singletons to reset (the `object`-singleton habit is the top source of test-order bugs).

---

## 10. Tooling (Non-negotiable)

- **`ktlint` for format + lint (`ktlint format`), `detekt` for static analysis** — run both in CI; treat failures as errors, not suggestions.
- **Kotlin DSL + version catalog (in Gradle 8+)** — enforce consistent dependency versions across modules.
- **`dokka` for API docs** — keep KDoc on public API, with `@param`/`@return` only where the signature doesn't already say everything.
- **Kover or JaCoCo for coverage** — aim for meaningful coverage on core/domain logic, not 100% line counts on wiring.
- **`gradle-wrapper` committed** (`gradlew`) so every environment builds identically without a global Gradle install.

---

## 11. General Rules of Thumb

- **Let the compiler enforce correctness.** `sealed` + `when`, immutable `val` data classes, non-null types — design so invalid states are _unrepresentable_, not just caught late.
- **Prefer interfaces for dependencies, constructor injection everywhere** — `class Service(repo: Repository)`; avoid singletons (`object`), service locators, and global mutable state the tests then have to reset.
- **Small, single-purpose functions** — if a function needs a paragraph to explain, it's probably doing three jobs.
- **Explicit over implicit where it costs nothing** — type annotations on public API, named arguments at complex call sites.
- **`when` over nested `if/else`** — exhaustive, flat, and linear to read.
- **Keep coroutine scopes explicit and lifecycle-bound** — no fire-and-forget `launch` without a parent scope that outlives the work.
- **Consistency over cleverness** — use the idioms every Kotlin dev expects (`data class`, sealed hierarchies, `Flow`, builders) before reaching for exotic patterns.

---

## Quick-Start Checklist

- [ ] `val` by default; every `var` justified
- [ ] `T?` + smart casts/Elvis over `!!`
- [ ] `data class` models with immutable `val` fields
- [ ] `sealed class`/`sealed interface` for bounded hierarchies, exhaustive `when`
- [ ] `value class` wrappers for domain ids/types
- [ ] `require()`/`check()` for invariants; sealed results for expected failures
- [ ] No unscoped coroutine launches; structure with `coroutineScope`/lifecycle scopes
- [ ] `StateFlow`/`MutableStateFlow` pattern (private setter exposed as `val`)
- [ ] `buildList`/`buildMap` builders used over mutable accumulators
- [ ] Extension functions instead of utility classes
- [ ] `runTest` for coroutine tests; tests named as sentences
- [ ] `ktlint` + `detekt` green in CI
- [ ] Version catalog in `gradle/libs.versions.toml`
- [ ] Constructor injection with interface delegation (`by`)
