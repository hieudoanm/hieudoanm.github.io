# Implementation notes

Focused reference for **material-design-m3**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Shape

- Shapes are **corner styles** (rounded, cut, squircle/pill) via `Shapes()` / `ShapeDefaults`.
- Component variants (`Default`, `Small`, `Medium`, `Large`, `Full`) via `MaterialTheme.shapes.*`:
  e.g., `cornerOverride` increase radii for expressive look.
- Keep consistent corner usage across cards and dialogs.
```kotlin
val AppShapes: Shapes = Shapes(
    extraSmall = RoundedCornerShape(4.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(20.dp),
    extraLarge = RoundedCornerShape(28.dp),
)
```

## 6. Components & State

- Interactive states share tokens: `stateLayer` (transparency overlay) + `indicator` (highlight).
- Use `MaterialTheme.colorScheme` + `LocalContentColor` correctly inside custom components.
- **AnimatedVisibility / transitions**: components animate between states; use `animateColorAsState` etc.
```kotlin
@Composable
fun SectionSurface(raised: Boolean, content: @Composable () -> Unit) {
    val containerColor: Color by animateColorAsState(
        targetValue = if (raised) MaterialTheme.colorScheme.surfaceContainerHigh
        else MaterialTheme.colorScheme.surfaceContainerLow,
        label = "sectionContainerColor",
    )
    Surface(
        shape = MaterialTheme.shapes.medium,
        color = containerColor,
        contentColor = MaterialTheme.colorScheme.onSurface,
        tonalElevation = if (raised) 3.dp else 0.dp,  // tint, not just a shadow
        shadowElevation = if (raised) 1.dp else 0.dp,
    ) { Column(modifier = Modifier.padding(Space.md)) { content() } }
}
```

## 7. Common Pitfalls

- Mixing M2 and M3 components — token mismatch (e.g., `Surface` with old elevation).
- Hardcoding colors instead of using scheme roles (breaks dark/dynamic theming).
- Ignoring **accessibility**: contrast on tonal surfaces, `localizedStrings`, touch targets (`minimumInteractiveComponentSize`).
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
