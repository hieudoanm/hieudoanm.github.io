# Kotlin Best Practices: Starter Template

A reusable starting point derived from the **5. Coroutines & Structured Concurrency** section of [Kotlin Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```kotlin
suspend fun loadUsers(): List<User> = withContext(Dispatchers.IO) {
    dao.selectAll() // blocking call off the main thread
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
