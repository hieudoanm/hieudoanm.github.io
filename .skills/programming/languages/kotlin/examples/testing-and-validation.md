# Kotlin Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Use `kotlin.test` (+ JUnit 5 underneath) and `runTest` for coroutine code** — `StandardTestDispatcher` gives deterministic virtual time, so tests don't `delay()`-sleep:
- **Name tests as sentences** — backtick names read as specifications (`returns ok when upstream succeeds`), which the repo convention prefers over `testFetch()`. If backticks aren't used, use `camelCase` with the same descriptive intent.
- **Fake/mock the boundaries, not the internals** — `FakeRepo`, in-memory doubles; test behaviour and outcomes, not call-order implementation details.

## Example

```kotlin
@Test
fun `fetch returns ok when upstream succeeds`() = runTest {
    val repo = FakeRepo(Ok(...))
    assertEquals(Ok(...), repo.fetch(1))
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for kotlin-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
