# Review checklist

Focused reference for **compose-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```kotlin
internal val ContentCopyIcon: ImageVector = ImageVector.Builder(
    name = "ContentCopy",
    defaultWidth = 24.dp,
    defaultHeight = 24.dp,
    viewportWidth = 24f,
    viewportHeight = 24f,
).apply {
    path(fill = SolidColor(Color.Black)) { moveTo(16f, 1f); horizontalLineTo(4f); close() }
}.build()
```

- **The DSL names do not match the sealed subclasses.** `horizontalLineTo(x)` and `verticalLineTo(y)` take **one** argument each — the other coordinate is implicit. Cubic segments are `curveTo(x1, y1, x2, y2, x3, y3)`, **not** `cubicTo`. The parsed node types are `HorizontalTo`/`VerticalTo`, which is what you assert against in a test.
- **Fill with `SolidColor(Color.Black)` as a mask.** `Icon` recolours the whole vector, so the source colour is irrelevant.
- **A hole needs opposite winding, not a second fill.** Under the default non-zero fill rule, a subpath traced the other way cancels the overlap. Counter-winding the inner rect is simpler than switching `pathFillType`.
- **Assert the structure in a test** — viewport size, subpath count, and that every vertex lands inside the viewport. Hand-transcribed path data otherwise fails silently, as a blank square.

### Tooltips for icon-only controls

An icon with a `contentDescription` is labelled for screen readers but silent for sighted mouse users. Pair the two:

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ActionButton(icon: ImageVector, label: String, onClick: () -> Unit) {
    TooltipBox(
        positionProvider = TooltipDefaults.rememberTooltipPositionProvider(TooltipAnchorPosition.Above),
        tooltip = { PlainTooltip { Text(label) } },
        state = rememberTooltipState(),
    ) {
        IconButton(onClick = onClick) {
            Icon(imageVector = icon, contentDescription = label)
        }
    }
}
```

- `TooltipBox` and `PlainTooltip` are `@ExperimentalMaterial3Api`; the opt-in is required.
- **`rememberPlainTooltipPositionProvider()` is deprecated.** Use `rememberTooltipPositionProvider(TooltipAnchorPosition.Above)` — the no-argument overload of the new name is deprecated too, so pass the anchor position.
- Keep dialog buttons (`Cancel` / `Delete`) as text. Tooltips in a modal are noise, and the convention is universal.

---

## 9. Testing

- **Test the reducer, not the composable.** State transitions are plain Kotlin — fast, headless, no Skiko.
- **Test composables only for what a reducer cannot express:** that a row renders, that a click emits the right event, that a dialog appears.

```kotlin
@Test
fun `selecting a row emits the event`() = runComposeUiTest {
    val events = mutableListOf<TableEvent>()
    setContent { TableView(TableState(), onEvent = { events += it }) }
    onNodeWithText("apple").performClick()
    assertEquals(listOf(TableEvent.Select("apple")), events)
}
```

- **Inject the clock** for anything time-dependent; Compose tests with real delays are flaky.
- **Use stable test tags** (`Modifier.testTag("row-apple")`) over visible text, which is exactly what a copy change will break.
- **Preview with fixture state** — a composable that takes only immutable params can be rendered in `@Preview` with no setup.

---

## 10. Common Pitfalls

| Pitfall                                 | Why it hurts                          | Fix                                                |
| --------------------------------------- | ------------------------------------- | -------------------------------------------------- |
| Missing `google()` repo                 | Compose deps unresolvable             | add `google()` to both plugin and dependency repos |
| `listOf(compose.desktop.currentOs)`     | unresolved reference                  | reference accessors inline in `dependencies {}`    |
| Forgetting `kotlin("plugin.compose")`   | no Compose compiler                   | apply the plugin                                   |
| `isSystemInDarkTheme()` on desktop      | does not exist                        | detect the OS theme yourself                       |
| `WindowState.Position.Centered`         | does not exist                        | `WindowPosition(Alignment.Center)`                 |
| `LocalWindow`                           | not in 1.12.x                         | use `WindowScope` or the platform API              |
| Hardcoded `Color.White`/`Color.Gray`    | breaks dark mode                      | use `colorScheme` roles                            |
| Work in the composable body             | recomputes or re-triggers every frame | `remember(keys) { }` or `derivedStateOf`           |
| `LaunchedEffect` with no key            | never restarts                        | key it on the trigger                              |
| `items` without `key =`                 | whole list recomposes on insert       | pass a stable identity                             |
| `compose.materialIconsCore`             | unresolved — no such accessor         | declare the AndroidX coordinate, and exclude its transitive tree |
| `material-icons-extended` for one icon  | +37 MB in the distribution            | `material-icons-core`, or inline the one glyph      |
| `rememberPlainTooltipPositionProvider()` | deprecated                            | `rememberTooltipPositionProvider(TooltipAnchorPosition.Above)` |
| `cubicTo` / `horizontalLineTo(x, y)`     | unresolved / too many arguments       | `curveTo(...)`; line helpers take one coordinate    |
| `fillMaxSize()` on a `LazyColumn` child | unbounded height crash                | `Modifier.weight(1f)`                              |
| `weight` outside `Row`/`Column` scope   | compile error                         | move it into the scope                             |
| Unbounded `Text` in a row               | layout overflow                       | `maxLines` + `overflow`                            |
| Mutating state during composition       | race, dropped frames                  | effects only                                       |
| Mixing M2 and M3 components             | token mismatch                        | use M3 consistently                                |
| Icon-only button with no description    | inaccessible                          | `Modifier.semantics`                               |

---

## 11. General Rules of Thumb

- **Stateless by default, stateful at the edge** — hoist to one owner, pass down, emit events up.
- **Reducers own the logic; composables own the pixels.** If a rule is testable without Compose, it belongs outside Compose.
- **Tokens, not literals** — color, type, shape, spacing defined once and consumed by role.
- **Immutable state plus a single event type** — exhaustive, reviewable, skippable.
- **Effects for anything asynchronous or external; the body stays pure.**
- **Stable keys on every list item; extract rows into leaf composables.**
- **Prefer M3 components over hand-rolled visuals** — they bring theming, states, and accessibility for free.

---

## Quick-Start Checklist

- [ ] `google()` in both `pluginManagement` and `dependencyResolutionManagement`
- [ ] `kotlin("plugin.compose")` applied; Compose accessors referenced inline in `dependencies {}`
- [ ] `MaterialTheme` at the root with explicit light and dark `ColorScheme`, the M3 type ramp, and one `Shapes` family
- [ ] Desktop dark theme detected manually (no `isSystemInDarkTheme()`)
- [ ] Spacing tokens on the 4dp grid; padding applied once at the container, before `background`
- [ ] State hoisted above the composables that render it; state classes `@Immutable`
- [ ] A single `sealed interface` event type plus a pure reducer
- [ ] `remember(keys) { }` or `derivedStateOf` for any derived value — no work in the body
- [ ] `LaunchedEffect` keyed on its real trigger; `DisposableEffect` for cleanup
- [ ] `key =` on every `items`; rows extracted into leaf composables
- [ ] `WindowPosition(Alignment.Center)`, `rememberWindowState`, title hoisted above `Window`
- [ ] Content descriptions on icon-only controls, 48dp minimum targets, meaning not conveyed by color alone
- [ ] Icon dependency pinned deliberately (`core` vs `extended`) with its transitive tree excluded
- [ ] Every icon-only action also carries a tooltip, or a visible label
- [ ] Reducer unit-tested headless; composables tested only for render and event emission
