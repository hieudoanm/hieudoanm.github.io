# Overview

Focused reference for **kotlin-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
