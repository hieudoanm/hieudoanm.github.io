# Kotlin Best Practices: 5. Coroutines & Structured Concurrency

## Source guidance

This example applies the **5. Coroutines & Structured Concurrency** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Never launch without a scope.** Coroutines must belong to a lifecycle-aware scope (`viewModelScope`, a custom `CoroutineScope`, or `coroutineScope {}`); `GlobalScope` is almost never correct.
- **Structure by default: `coroutineScope { }` / `supervisorScope { }`.** Children complete before the parent returns; failure in one cancels the parent (or, with `supervisorScope`, only itself). Cancellation and scoping become automatic.
- **Thread nothing by hand.** Use `withContext(Dispatchers.Default/IO)` for blocking work and keep the UI/main dispatcher for rendering. Move CPU-bound and IO work off the main thread explicitly.

## Example

```kotlin
suspend fun loadUsers(): List<User> = withContext(Dispatchers.IO) {
    dao.selectAll() // blocking call off the main thread
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for kotlin-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
