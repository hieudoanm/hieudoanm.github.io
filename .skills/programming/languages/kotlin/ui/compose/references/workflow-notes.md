# Workflow notes

Focused reference for **compose-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

### Shape

```kotlin
val KevinShapes = Shapes(
    extraSmall = RoundedCornerShape(4.dp),
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(12.dp),
    large = RoundedCornerShape(16.dp),
)
```

- One corner-radius family, used consistently. Mixing 2/6/12/20dp radii looks accidental.

---

## 3. Spacing & Layout: Use the 4dp Grid

Define spacing as named tokens; never inline `12.dp` in twenty places.

| Token          | Value | Use for                       |
| -------------- | ----- | ----------------------------- |
| `SpaceXs`      | 4.dp  | icon-to-label, table cell gap |
| `SpaceSm`      | 8.dp  | between related controls      |
| `SpaceMd`      | 12.dp | default component padding     |
| `SpaceLg`      | 16.dp | section separation            |
| `SpaceXl`      | 24.dp | page/window padding           |
| `MinTouchSize` | 48.dp | minimum interactive target    |

```kotlin
object Space {
    val xs = 4.dp; val sm = 8.dp; val md = 12.dp
    val lg = 16.dp; val xl = 24.dp
    val minTouch = 48.dp
}
```

- **One parent owns padding; children own none.** Nesting `padding()` three deep multiplies into accidental 20dp gaps. Apply padding once at the container.
- **`Modifier.weight` is scope-bound** — it only resolves inside `RowScope`/`ColumnScope`. Calling it in a sibling composable is a compile error, which is the compiler doing you a favor.
- **Order matters:** `padding()` then `background()` leaves the background inside the padding (correct for a card); the reverse leaves a colored halo. Always `padding` before `background` when the background should hug the content.
- **Fill remaining space with `Modifier.weight(1f)`,** not with `fillMaxSize()` on every child. A `LazyColumn` inside a `Column` needs `weight(1f)` or it claims unbounded height and throws.

---

## 4. State & Recomposition — The Core Discipline

### Hoist everything

A composable that reads no external mutable state is trivially previewable and testable. Pass state in, emit events out.

```kotlin
// Stateless: pure function of (state, events). This is what you test.
@Composable
fun KeyValueTable(state: TableState, onEvent: (TableEvent) -> Unit) { /* ... */ }

// Stateful: the only place that owns the MutableState.
@Composable
private fun Manager(kv: Store) {
    var state by remember { mutableStateOf(TableState()) }
    TableView(state, kv) { state = reducer(state, it, kv) }
}
```

- **Compose should not be where business rules live.** A reducer over an immutable state class is plain Kotlin: no composition, no coroutine, trivially unit-testable. Push logic there and let composables render it.
- **Reduce with a single event type.** `sealed interface TableEvent` + `fun reduce(state, event): State` keeps the state machine exhaustive and reviewable; scattered `onClick { state = state.copy(...) }` handlers do not.

### Keep state objects immutable and honestly annotated

```kotlin
@Immutable
data class RowModel(val index: Int, val key: String, val value: String, val selected: Boolean)
```

- **A `data class` is not automatically skippable.** Without `@Immutable`/`@Stable`, Compose must assume any property may have changed and recomposes the subtree. Annotate when all properties are primitives or immutable.
- **Returning a new `List` from a composable defeats skipping.** Allocate row models with `remember` keyed on the data, or derive them in the reducer so the reference only changes when content changes.

### Never do work in the composable body

```kotlin
val visible = remember(query, allKeys) { allKeys.filter { it.contains(query, true) } }  // ok
val total = allKeys.count { it.active }                                                   // re-runs every recomposition
```

- **`remember` caches, it does not memoize.** `remember { expensive() }` without keys recomputes whenever its keys change — or never, if you forget the key entirely.
- **Never mutate during composition.** `LaunchedEffect` for suspend work, `SideEffect` to push state out, `DisposableEffect` to clean up. A `while (true)` loop or a `Thread.sleep` in a composable body freezes the UI thread permanently.
- **`derivedStateOf` for derived state you read often** so changes only invalidate when the value actually changes, not on every upstream write.
- **Mutate state on a background dispatcher, never on the composition thread.** `viewModelScope`/`Dispatchers.IO` for I/O, `withContext` for compute.
