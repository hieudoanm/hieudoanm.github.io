# Compose Multiplatform Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test the reducer, not the composable.** State transitions are plain Kotlin — fast, headless, no Skiko.
- **Test composables only for what a reducer cannot express:** that a row renders, that a click emits the right event, that a dialog appears.
- **Inject the clock** for anything time-dependent; Compose tests with real delays are flaky.
- **Use stable test tags** (`Modifier.testTag("row-apple")`) over visible text, which is exactly what a copy change will break.
- **Preview with fixture state** — a composable that takes only immutable params can be rendered in `@Preview` with no setup.

## Example

```kotlin
@Test
fun `selecting a row emits the event`() = runComposeUiTest {
    val events = mutableListOf<TableEvent>()
    setContent { TableView(TableState(), onEvent = { events += it }) }
    onNodeWithText("apple").performClick()
    assertEquals(listOf(TableEvent.Select("apple")), events)
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for compose-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
