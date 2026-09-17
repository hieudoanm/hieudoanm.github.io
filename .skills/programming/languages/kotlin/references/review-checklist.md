# Review checklist

Focused reference for **kotlin-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
