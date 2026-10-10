# Implementation notes

Focused reference for **compose-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
