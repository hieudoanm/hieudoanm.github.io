# Workflow notes

Focused reference for **mordant-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

Mordant styles are values you interpolate, not escape codes you assemble:

```kotlin
import com.github.ajalt.mordant.rendering.TextColors
import com.github.ajalt.mordant.rendering.TextStyles

terminal.println("${TextColors.red("error")}: ${TextStyles.bold("something broke")}")
terminal.println(TextColors.brightGreen("ok"))
```

Because a styled string carries its own style, Mordant strips it back to plain text when the detected `AnsiLevel` is `NONE` — the same code produces colorless output in a pipe and color in a real terminal, with no `if` at the call site.

- **Prefer the named colors over raw 24-bit literals.** `TextColors.red` degrades predictably; a hardcoded `"\u001B[38;2;…m"` does not.
- **Style words, not whole lines.** A fully bold paragraph reads as noise; a bold label reads as structure.
- **Never hardcode `NO_COLOR` / `TERM=dumb` checks.** Mordant already honors them; duplicating the logic is how the two drift apart.
- **Let the renderer wrap.** `println` applies word wrap by default; a hand-built frame does not, which is why the two are treated differently below.

## 4. Widgets — and the One That Isn't There

Mordant 3 ships these widgets: `Panel`, `Padding`/`Padded`, `Text`, `HorizontalRule`, `VerticalLayout`, `HorizontalLayout`, `Viewport`, `DefinitionList`, `OrderedList`, `UnorderedList`, `ProgressBar`, `SelectList`, `Spinner`, `Caption`, `EmptyWidget`.

**There is no `Table` widget.** This is the single most common surprise, because every other TUI library has one. Reach for `Table` and it does not resolve.

For a key/value listing with aligned columns, hand-roll the layout. The payoff is that the frame becomes a pure function of state, which makes it assertable in a unit test with no terminal at all:

```kotlin
/** Renders [TuiState] to a plain-text frame; kept pure so it can be asserted in tests. */
internal object Render {
    fun frame(state: TuiState, kv: Db): String = buildString {
        appendLine("kevin — Key/Value (${kv.len()} keys)")
        appendLine("─".repeat(state.width))
        state.rows.forEachIndexed { index, key ->
            val marker = if (index == state.cursor) ">" else " "
            val value = kv.get(key).orEmpty()
            appendLine("%s%3d  %s  %s".format(marker, index + 1, padRight(key, 20), value))
        }
    }

    fun padRight(text: String, width: Int): String = text.padEnd(width).take(width)
}
```

`SelectList` is the exception worth knowing: it is a real interactive widget that handles its own keys. If your screen is a menu rather than an editable grid, use it instead of writing a loop.

## 5. Raw Mode & Keyboard Input

Raw mode stops the terminal from line-buffering and interpreting control characters, so a single keypress arrives immediately. Two entry points, and the difference is the whole error-handling story:

```kotlin
import com.github.ajalt.mordant.input.enterRawMode
import com.github.ajalt.mordant.input.enterRawModeOrNull

val strict = enterRawMode()    // throws when there is no tty
val maybe = enterRawModeOrNull() ?: run { println("no tty"); return }
```

**Verified API shape:** `RawMode` is a typealias for `RawModeScope`, which implements `AutoCloseable`. The reader is `readKeyOrNull(timeout: Duration): KeyboardEvent?`, and it is a **blocking call, not a `suspend` function** — it returns `null` when the timeout elapses. Siblings: `readKey`, `readMouse`, `readMouseOrNull`, `readEvent`, `readEventOrNull`. Passing `MouseTracking` enables mouse reporting; leaving it off avoids surprising the user's terminal.

`KeyboardEvent` is a data class with fields in this exact order:

```kotlin
KeyboardEvent(key: String, ctrl: Boolean, alt: Boolean, shift: Boolean)
```

`key` is a `String` following MDN `KeyboardEvent.key` conventions:

| Input              | `key`                                                     | Flags          |
| ------------------ | --------------------------------------------------------- | -------------- |
| Enter              | `"Enter"`                                                 | —              |
| Tab                | `"Tab"`                                                   | —              |
| Arrows             | `"ArrowUp"`, `"ArrowDown"`, `"ArrowLeft"`, `"ArrowRight"` | —              |
| Home / End         | `"Home"`, `"End"`                                         | —              |
| Backspace / Delete | `"Backspace"`, `"Delete"`                                 | —              |
| Escape             | `"Escape"`                                                | —              |
| Space              | `" "`                                                     | —              |
| `q`                | `"q"`                                                     | —              |
| `Ctrl-C`           | `"c"`                                                     | `ctrl = true`  |
| `Shift-D`          | `"D"`                                                     | `shift = true` |

Because it is a plain `String`, the natural design is to normalize once at the edge of your program and switch on your own sealed type — never on Mordant types — so the input layer stays testable:

```kotlin
private fun KeyboardEvent.toEvent(): TuiEvent.Press =
    TuiEvent.Press(key = key, ctrl = ctrl, shift = shift)
```
