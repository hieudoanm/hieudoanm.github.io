# Kotlin Best Practices: 4. Error Handling

## Source guidance

This example applies the **4. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Kotlin has no checked exceptions — so make failure modes _visible_ in the type system instead.
- **Expected, recoverable failures → sealed result types or `Result<T>`.** Code that can fail in ways callers should handle returns a value you `when` over, not an exception you pray gets caught.
- **`runCatching` / `Result` for wrapping unexpected exceptions** — convert to a domain type quickly; don't let `Result` instances pile up across layers.
- **Abrupt or programmer failures → `require()` / `check()` (and `error()`) for invariants:**

## Example

```kotlin
when (val res = api.fetch(id)) {
    is Result.Ok -> render(res.value)
    is Result.Err -> showError(res.reason)
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for kotlin-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
