# Compose Multiplatform Best Practices: 6. Lists & Performance

## Source guidance

This example applies the **6. Lists & Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Always pass `key =`** to `items`/`itemsIndexed`. Without it, Compose identifies rows by index, so inserting or deleting one recomposes and re-animates every row below it — visibly janky on a long list.
- **Give items a stable identity** (a database key), not the list index.
- **Extract each row into its own composable** taking only the fields it needs, so a change to one row does not recompose its siblings.
- **Keep composables restartable and skippable** — no `equals`/`hashCode` overrides on `@Composable` types, no side effects in default arguments.

## Example

```kotlin
LazyColumn {
    items(rows, key = { it.key }) { row ->
        Row(modifier = Modifier.fillMaxWidth()) { /* ... */ }
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for compose-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
