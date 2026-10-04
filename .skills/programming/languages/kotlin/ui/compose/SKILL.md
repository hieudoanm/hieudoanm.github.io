---
name: compose-best-practices
description: Best practices for building desktop UIs with Compose Multiplatform (Kotlin). Use when writing, structuring, styling, or reviewing a Compose app — covers Gradle setup, theming and design tokens, state and recomposition, side effects, lists and performance, desktop windows, accessibility, and testing, with suggested values.
---

# Compose Multiplatform Best Practices

Compose replaces the widget tree with a function tree: you describe what the UI should look like for the current state, and the runtime recomposes what changed. Best practice here is **state-first, token-driven, side-effect-free composition** — hoist state out of composables, consume design tokens instead of literal values, and keep the composable body a pure function of its parameters.

This document is written against **Kotlin 2.4+ / Compose 1.12+** and includes concrete values you can drop straight into code.

---

## 1. Core Stack & Gradle Setup

```kotlin
// settings.gradle.kts — google() is mandatory, not optional
pluginManagement {
    repositories { google(); mavenCentral(); gradlePluginPortal() }
}
dependencyResolutionManagement {
    repositories { google(); mavenCentral() }
}
```

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    kotlin("plugin.compose") version "2.4.20"   // required: the Compose compiler plugin
    id("org.jetbrains.compose") version "1.12.1"
}

dependencies {
    // MUST be referenced inline. Collecting these into a listOf(...) breaks
    // resolution, because the accessors are resolved at configuration time.
    implementation(compose.desktop.currentOs)
    implementation(compose.material3)
    implementation(compose.foundation)
}
```

- **Always apply `kotlin("plugin.compose")`** — since Kotlin 2.0 the Compose compiler ships as a Kotlin plugin, and the old `composeOptions { kotlinCompilerExtensionVersion }` is gone.
- **`google()` is required.** Compose pulls `androidx.lifecycle` and `androidx.savedstate`; resolution fails without it even for a pure-desktop target.
- **Reference Compose accessors inline in `dependencies {}`.** `val deps = listOf(compose.desktop.currentOs)` fails with "unresolved reference: currentOs" — the accessor is a delegated property that only works in the DSL scope.
- **`installDist` can fail on a duplicate jar.** The Compose plugin and the `application` plugin both contribute the desktop runtime:

```kotlin
tasks.installDist {
    duplicatesStrategy = DuplicatesStrategy.EXCLUDE
}
```

- **You do not need `compose.desktop { application { } }`.** That block exists to own `mainClass`. If your app already has its own entry point (a CLI framework, for instance), use Gradle's `application { mainClass }` and call `application { }` from your own `main`.
- **Let the accessors pick the library versions.** `compose.material3` under Compose Multiplatform `1.12.1` resolves to AndroidX Material3 `1.9.0`, not `1.12.1` — the versions are aligned per library, not shared. Pinning `androidx.compose.material3:material3:1.12.x` by hand will not resolve.

---

## 2. Theming: Define Tokens Once, Consume by Role

Never hardcode a color, size, or font. Define once at the root, consume via `MaterialTheme.*` everywhere else.

```kotlin
@Composable
fun App(content: @Composable () -> Unit) {
    val dark = isDesktopDarkTheme()
    MaterialTheme(
        colorScheme = if (dark) kevinDarkColorScheme() else kevinLightColorScheme(),
        typography = KevinTypography,
        shapes = KevinShapes,
        content = content,
    )
}
```

### Color

| Role                 | Light     | Dark      |
| -------------------- | --------- | --------- |
| `primary`            | `#3B7DD8` | `#7FB0FF` |
| `onPrimary`          | `#FFFFFF` | `#002F5F` |
| `surface`            | `#F7F7F9` | `#1A1A1E` |
| `onSurface`          | `#1A1A1E` | `#E8E8EC` |
| `surfaceVariant`     | `#E7E7EC` | `#2A2A30` |
| `onSurfaceVariant`   | `#6B6B75` | `#A8A8B3` |
| `outline`            | `#C4C4CC` | `#3E3E46` |
| `error`              | `#D64545` | `#FF6B6B` |
| `secondaryContainer` | `#DCE7FB` | `#1F3A5C` |

- **Pick one primary accent and use it sparingly** — primary actions, selection, focus. Not decoration.
- **Semantic roles over literal colors** — `MaterialTheme.colorScheme.error` survives a theme change; `Color.Red` does not.
- **`isSystemInDarkTheme()` does not exist on desktop.** It is Android-only and will not resolve. Detect the OS setting yourself (`UIManager`/AWT `Desktop` look-and-feel`, or `apple.awt.application.appearance`), and cache it — it is not a `State` and must not be re-read per frame.

### Typography

Use the M3 type ramp; do not invent sizes.

| Role          | Size / Weight | Use for                  |
| ------------- | ------------- | ------------------------ |
| `titleLarge`  | 22 / SemiBold | window/section titles    |
| `titleMedium` | 16 / SemiBold | counts, panel headers    |
| `bodyLarge`   | 16 / Regular  | primary content          |
| `bodyMedium`  | 14 / Regular  | table cells              |
| `labelLarge`  | 14 / Medium   | buttons                  |
| `labelSmall`  | 11 / Medium   | column headers, captions |

- **Line up hierarchy with the ramp, not with ad-hoc sizes.** If a value is not on the ramp, it is a design decision, not a style.
- **Give every `Text` an overflow policy** on a fixed-width layout: `maxLines` plus `overflow = TextOverflow.Ellipsis`. Unbounded text in a row is the single most common cause of a broken desktop layout.

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

---

## 5. Side Effects & Lifecycle

| Effect                   | Use for                                               |
| ------------------------ | ----------------------------------------------------- |
| `LaunchedEffect(key)`    | one async job per key; restarts when `key` changes    |
| `SideEffect`             | pushing state to non-Compose APIs after every commit  |
| `DisposableEffect`       | registering/unregistering listeners, timers, channels |
| `rememberCoroutineScope` | short-lived work tied to the composition's lifetime   |

- **Every `LaunchedEffect` needs a key.** `LaunchedEffect { }` with no key never restarts; `LaunchedEffect(state) { }` restarts on every state change, which in a polling loop means it never completes.
- **Key the effect on the identity that should trigger it,** not on the whole state object.
- **A polling loop belongs in one `LaunchedEffect(Unit)`** that calls `delay(...)` between reads, not in a timer that fires outside composition.
- **Stop polling when the window closes** — `DisposableEffect(Unit) { onDispose { job.cancel() } }`, or scope the job to the composition.

---

## 6. Lists & Performance

```kotlin
LazyColumn {
    items(rows, key = { it.key }) { row ->
        Row(modifier = Modifier.fillMaxWidth()) { /* ... */ }
    }
}
```

- **Always pass `key =`** to `items`/`itemsIndexed`. Without it, Compose identifies rows by index, so inserting or deleting one recomposes and re-animates every row below it — visibly janky on a long list.
- **Give items a stable identity** (a database key), not the list index.
- **Extract each row into its own composable** taking only the fields it needs, so a change to one row does not recompose its siblings.
- **Keep composables restartable and skippable** — no `equals`/`hashCode` overrides on `@Composable` types, no side effects in default arguments.
- **Do not nest scrollables** (a `LazyColumn` inside a scrollable `Column`). Use a single lazy container with item headers, or a fixed-height inner list.
- **Defer expensive derivation to `remember(derivedStateOf(...))`** so it survives recomposition.

---

## 7. Desktop Windows

```kotlin
fun main() = application {
    val state = remember { mutableStateOf(AppState()) }
    Window(
        onCloseRequest = ::exitApplication,
        state = rememberWindowState(
            size = DpSize(900.dp, 600.dp),
            position = WindowPosition(Alignment.Center),
        ),
        title = state.value.windowTitle,
    ) {
        App(state.value) { state.value = it }
    }
}
```

- **`WindowPosition(Alignment.Center)`**, not `WindowState.Position.Centered` — the `Position` enum does not exist on desktop. The factory is `WindowPosition(alignment)`.
- **`rememberWindowState` owns size/position;** it restores them across frames. Do not keep your own `DpSize` in a `MutableState`.
- **There is no `LocalWindow` in 1.12.x.** To reach the AWT/Swing window (e.g. for a custom title bar) go through the `WindowScope` receiver or the platform API directly.
- **Hoist state above `Window` to drive the title.** `title` is a plain parameter, so `state.value.windowTitle` recomposes the window chrome when it changes. Setting a title from inside the content via a `SideEffect` fights the framework.
- **`application { }` is the desktop entry point** and must be called from `main`; it blocks until the last window closes. `exitApplication()` is what `onCloseRequest` should call.
- **`MenuBar { }`, `DialogWindow`, and `Notification` live in `androidx.compose.ui.window` on desktop only.** Do not put them in a shared multiplatform `commonMain` file.
- **Callbacks that do not read composition state need no `remember`.** Wrapping them creates a new lambda identity per recomposition and defeats skipping.

---

## 8. Accessibility

- **Every icon-only control needs a content description.** `IconButton` with no `Modifier.semantics { contentDescription = "Delete key" }` is unusable with a screen reader.
- **Meet the 48dp minimum interactive size,** and make the whole row clickable rather than a 20dp target. `IconButton` and `TextButton` already enforce it — do not add `heightIn` on top.
- **Do not encode meaning in color alone** — a selected row needs a background _and_ a border or a leading marker.
- **Honor `contentColor`/`LocalContentColor`.** Hardcoding `Color.White` text on a surface breaks in dark mode and on high-contrast themes. Set the tint through `IconButtonDefaults.iconButtonColors(contentColor = …)` and let `Icon` read `LocalContentColor`.
- **Group rows semantically** with `Modifier.selectable(selected) { ... }` so a screen reader announces one row, not six disconnected cells. `selectable` already merges descendants and sets the `Selected` property — do not add `Modifier.semantics(mergeDescendants = true)` on top of it.
- **`Role` has no `Row` variant.** The values are `Button`, `Checkbox`, `Switch`, `RadioButton`, `Tab`, `DropdownList`, `Image`, `ValuePicker` and `Carousel`. For a selectable table row pass no `role` and let `selectable` supply the selected state.

### Icons

`compose.material3` does **not** bring the icon set, and the Compose Gradle plugin has **no icons accessor** — there is no `compose.materialIconsCore`. Declare the AndroidX coordinate:

```kotlin
dependencies {
    // ⚠️ Exclude the transitive tree — see below.
    implementation("androidx.compose.material:material-icons-core-desktop:1.7.8") {
        exclude(group = "androidx.compose.ui")
    }
}
```

| Fact                                                                 | Consequence                                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| The plugin exposes no icons accessor                                    | `compose.materialIconsCore` does not resolve; use the AndroidX coordinate |
| JetBrains' `org.jetbrains.compose.material:material-icons-core` stops at `1.7.3` | Do not use the JetBrains multiplatform icons artifact          |
| AndroidX froze the icon artifacts at `1.7.8`                          | Icons trail `material3` (1.9.0) — that is expected, not a mistake      |
| `material-icons-core-desktop` is 848 KB with 49 `Filled` glyphs        | Fine to ship; prefer it                                                |
| `material-icons-extended-desktop` is **37 MB**                        | Doubles a small distribution for glyphs you will not use               |
| The core set has no `ContentCopy`, `DeleteSweep`, `Save`, `Undo`, …    | Either hand-build the one glyph or accept `material-icons-extended`    |
| `1.7.8` depends on `compose-ui:1.6.0`                                 | Without the `exclude` above it ships a **second** `androidx.compose.ui` stack next to the JetBrains `1.12.1` artifacts |

- **Reach for `extended` only when you genuinely use many glyphs.** One or two missing icons are cheaper as inline `ImageVector` source than as 37 MB of dependency.
- **Check the core set before designing around a glyph** — 49 icons is not the full Material set, and a missing one fails at compile time with an unhelpful "unresolved reference".
- **`Icons.*` comes from `material-icons-core`; the `Icon` composable comes from `material3`.** Having one does not imply the other.

### Writing an icon by hand

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
