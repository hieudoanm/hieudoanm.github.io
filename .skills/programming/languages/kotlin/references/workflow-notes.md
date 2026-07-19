# Workflow notes

Focused reference for **kotlin-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
