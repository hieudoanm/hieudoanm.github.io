# Material Design 3: 7. Common Pitfalls

## Source guidance

This example applies the **7. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Mixing M2 and M3 components — token mismatch (e.g., `Surface` with old elevation).
- Hardcoding colors instead of using scheme roles (breaks dark/dynamic theming).
- Ignoring **accessibility**: contrast on tonal surfaces, `localizedStrings`, touch targets (`minimumInteractiveComponentSize`).
- Loading dynamic color on unsupported OS versions without fallback.

## Example

```kotlin
@Composable
fun KeyValueRow(label: String, value: String, selected: Boolean, onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .selectable(selected = selected, onClick = onClick) // merged semantics, no double semantics{}
            .background(if (selected) MaterialTheme.colorScheme.secondaryContainer else Color.Transparent)
            .padding(horizontal = Space.lg, vertical = Space.md),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        Icon(imageVector = Icons.Filled.Star, contentDescription = "$label is pinned")
        Text(text = value, style = MaterialTheme.typography.labelLarge, modifier = Modifier.weight(1f))
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for material-design-m3.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
