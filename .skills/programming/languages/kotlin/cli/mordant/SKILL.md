---
name: mordant-best-practices
description: Best practices for building interactive terminal UIs in Kotlin with Mordant. Use when writing, structuring, or debugging a Mordant TUI — covers Gradle setup, terminal and ANSI capability detection, colors and styled output, widgets, raw mode and keyboard input, cursor and screen control, event loops, responsive layout, line endings, and testing with a terminal recorder, with suggested values.
---

# Mordant Best Practices

Mordant is a terminal rendering and input library: it detects what the terminal can do, renders widgets to it, and — in raw mode — reads individual keypresses. Best practice here is **detect, degrade, and keep rendering pure** — probe the terminal once instead of guessing from environment variables, build frames as plain strings that are trivial to assert, and treat the terminal as a resource you must restore no matter how the program exits.

This document is written against **Kotlin 2.4+ / Mordant 3.1+** and includes concrete values you can drop straight into code.

---

## 1. Core Stack & Gradle Setup

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    application
}

kotlin { jvmToolchain(21) }

dependencies {
    implementation("com.github.ajalt.mordant:mordant:3.1.0")
    testImplementation(kotlin("test"))
}
```

`com.github.ajalt.mordant:mordant` is the umbrella coordinate and pulls two layers:

| Layer              | Provides                                                                   |
| ------------------ | -------------------------------------------------------------------------- |
| `mordant-core-jvm` | `Terminal`, `TerminalRecorder`, widgets, `KeyboardEvent`, `RawModeScope`   |
| platform modules   | the real terminal, with **three FFI backends** (`jna`, `graal-ffi`, `ffm`) |

The three backends are not a mistake and not something you configure; they are alternative native bindings for terminal size and raw mode, and all of them end up on the runtime classpath. On a JVM without FFI support the size query degrades instead of throwing, but **do not assume `terminal.size` is correct in a container or over a plain pipe** — always keep a sane fallback width.

If the project also uses Clikt, declare Mordant explicitly: Clikt 5.1.0 requests Mordant 3.0.2 transitively for its help formatter, and an explicit 3.1.0 wins. Verify there is only one `mordant-core-jvm` version in `./gradlew dependencies --configuration runtimeClasspath`.

## 2. Terminal & Capability Detection

Never branch on `System.getenv("TERM")` or `System.console()` yourself. `Terminal()` already probes, and its answers are available as structured data:

```kotlin
import com.github.ajalt.mordant.rendering.AnsiLevel
import com.github.ajalt.mordant.terminal.Terminal

val terminal = Terminal()

if (!terminal.terminalInfo.inputInteractive) {
    System.err.println("kevin: interactive terminal required for the TUI")
    return
}

if (terminal.terminalInfo.ansiLevel == AnsiLevel.NONE) {
    println("running without color")
}
```

`TerminalInfo` exposes `ansiLevel`, `ansiHyperLinks`, `outputInteractive`, `inputInteractive`, `supportsAnsiCursor`, and `interactive`. In Mordant 3 these are **mutable properties**, which is exactly what makes a forced mode possible:

```kotlin
val plain = Terminal().apply {
    terminalInfo.ansiLevel = AnsiLevel.NONE          // deterministic, colorless output
    terminalInfo.inputInteractive = false            // pretend there is no keyboard
}
```

`AnsiLevel` is a four-step ladder, and the level you get decides how much color you may use:

| Level       | Meaning                    |
| ----------- | -------------------------- |
| `NONE`      | no escape sequences at all |
| `ANSI16`    | 16 colors                  |
| `ANSI256`   | 256-color palette          |
| `TRUECOLOR` | 24-bit color               |

Rules that follow:

- **Check `inputInteractive` before entering raw mode.** It is the honest test for "is there a human attached", and it fails fast in CI instead of blocking on a read.
- **Use `Terminal(width = .., height = ..)` to pin the size** in tests and when embedding; the constructor takes `ansiLevel`, `theme`, `width`, `height`, `terminalWidth`, `terminalHeight`, `interactive`, and a `terminalInterface`.
- **Reuse one `Terminal` instance.** It caches the probe. Constructing a `Terminal` per frame re-detects the terminal on every redraw.

## 3. Colors & Styled Output

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

**Case pitfall:** for a letter with Shift held, `key` is the _shifted character_ (`"D"`), and its meaning depends on the user's keyboard layout. Match `key.lowercase()` together with the `shift` flag rather than hardcoding an uppercase letter — `"d" == key.lowercase() && shift` survives non-US layouts, while `key == "D"` does not.

## 6. Cursor & Screen Control

```kotlin
terminal.cursor.move { clearScreen() }              // once, on entry
terminal.cursor.move { clearScreenBeforeCursor() }  // every frame
terminal.cursor.hide()
terminal.cursor.show()
```

`TerminalCursor` offers `show()`, `hide(behind: Boolean = false)`, and `move { }`, whose receiver `CursorMovements` provides `clearScreen`, `clearScreenBeforeCursor`, `clearScreenAfterCursor`, `clearLine`, `clearLineBeforeCursor`, and `clearLineAfterCursor`.

Screen-control rules:

- **Hide the cursor for the whole session and restore it in a `finally`.** A program that exits with the cursor hidden makes the user's shell unusable until they run `reset`.
- **Prefer `clearScreenBeforeCursor()` per frame** over `clearScreen()`. It avoids the full-screen flash and the scrollback pollution that a full clear produces.
- **Only move the cursor if `terminalInfo.supportsAnsiCursor`.** Terminals that cannot do it will emit garbage otherwise.
- **Never build redraws out of `println`.** `println` word-wraps and appends newlines; a repainting UI needs `rawPrint` (see §9).

## 7. The Event Loop

The canonical shape is poll-with-timeout, which gives you both responsiveness and a periodic tick for shared state that changes outside your program:

```kotlin
private const val POLL_MILLIS = 250L

fun run(kv: Db, terminal: Terminal = Terminal()) {
    val raw = terminal.enterRawModeOrNull() ?: error("raw terminal mode is not available")
    try {
        terminal.cursor.move { clearScreen() }
        terminal.cursor.hide()
        var state = TuiState(width = terminal.size.width).reload(kv)
        while (state.running) {
            draw(terminal, state, kv)
            val event = raw.readKeyOrNull(POLL_MILLIS.milliseconds)?.toEvent() ?: TuiEvent.Reload
            state = TuiReducer.reduce(state, event, kv)
        }
    } finally {
        raw.close()
        terminal.cursor.show()
        terminal.println()
    }
}
```

Every part of that is load-bearing:

| Piece                                | Why                                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `enterRawModeOrNull() ?: error(...)` | fail loudly instead of blocking forever on a pipe                                                 |
| `try` / `finally`                    | raw mode and a hidden cursor are restored on **every** exit, including exceptions                 |
| `raw.close()` in `finally`           | restores the terminal's original cooked mode                                                      |
| `?: TuiEvent.Reload`                 | a timeout is an event: this is how a TUI stays in sync with a database another process is writing |
| `state = reduce(state, event, kv)`   | state is a value; the loop only swaps it                                                          |
| `POLL_MILLIS = 250L`                 | 4 Hz: responsive to keys, cheap on CPU, fast enough to look live                                  |

Use a **250 ms** timeout as the default tick and a **16–50 ms** timeout only for a full-screen editor that must feel instantaneous. Do not poll below ~10 ms; you will spin a core for no benefit.

Handle `Ctrl-C` explicitly if you install a signal handler or otherwise suppress the default: `key == "c" && ctrl`. Do not assume the runtime's default behavior survives a raw-mode loop on every platform.

## 8. Layout: Width, Truncation & Columns

`terminal.size` returns a `Size` with `width` and `height`. Because it can be wrong (containers, pipes, FFI fallback), derive layout from state with a floor:

```kotlin
fun lineWidth(state: TuiState): Int = if (state.width < 40) 80 else state.width

fun truncate(text: String, max: Int): String = if (text.length <= max) text else text.take(max) + "…"

fun padRight(text: String, width: Int): String = text.padEnd(width).take(width)
```

| Rule                 | Value                                                                           |
| -------------------- | ------------------------------------------------------------------------------- |
| Minimum usable width | 40 columns; below that, fall back to 80                                         |
| Truncation marker    | `…` (one char, so it never overflows the budget)                                |
| Pad then clip        | `padEnd(w).take(w)` — clipping a padded string keeps the frame exactly `w` wide |
| Row marker column    | 1 char (`>` for the cursor row, space otherwise)                                |
| Horizontal rule      | `"─".repeat(width)` — box drawing, not `-` or `=`                               |

`padRight` is the one to watch: `padEnd` alone does not truncate, so an over-long value silently widens every row and wraps the frame. Always pair the two.

For wide characters and emoji, `String.length` counts UTF-16 units, not display columns, so a naive `take(n)` can split a surrogate pair or overflow a CJK glyph. If your keys or values can contain such text, measure by display width before truncating.

## 9. Line Endings in Raw Mode

This one silently breaks every raw-mode TUI built from `println`: **raw mode disables the terminal's newline translation**, so `\n` no longer returns the carriage to column 0 and the output staircases. Emit `\r\n` explicitly:

```kotlin
private fun draw(terminal: Terminal, state: TuiState, kv: Db) {
    terminal.cursor.move { clearScreenBeforeCursor() }
    terminal.rawPrint(Render.frame(state, kv) + "\r\n\r\n")
}
```

`rawPrint` writes the string with no wrapping, no newline, and no style processing — which is exactly right for a pre-rendered frame. Use it **only** for frames you built yourself; for ordinary user-facing messages use `println`, which handles wrapping and the trailing newline correctly.

## 10. Testing

`TerminalRecorder` implements Mordant's `TerminalInterface` and captures everything a `Terminal` would have written, plus scripted input:

```kotlin
import com.github.ajalt.mordant.rendering.AnsiLevel
import com.github.ajalt.mordant.terminal.Terminal
import com.github.ajalt.mordant.terminal.TerminalRecorder

val recorder = TerminalRecorder(ansiLevel = AnsiLevel.NONE, width = 80, height = 24)
val terminal = Terminal(terminalInterface = recorder)
terminal.println("hello")
assertEquals("hello\n", recorder.stdout())
```

`TerminalRecorder` gives you `stdout()`, `stderr()`, `output()`, `clearOutput()`, plus settable `inputLines` and `inputEvents` for driving input.

Two tiers of testing, and you want both:

1. **Test the renderer as a pure function.** `Render.frame(state, kv): String` takes state and returns a frame — no terminal, no timing, no flakiness. Assert on substrings (`assertTrue(frame.contains(">1  user:alice"))`) and on column alignment, not on byte-for-byte equality.
2. **Test terminal I/O with the recorder.** Pin `AnsiLevel.NONE` and a fixed width so the assertions do not depend on the developer's terminal.

Reduce input handling to a pure reducer as well, so every key has a testable meaning:

```kotlin
object TuiReducer {
    fun reduce(state: TuiState, event: TuiEvent, kv: Db): TuiState = when (event) {
        is TuiEvent.Resize -> state.copy(width = event.width)
        TuiEvent.Reload -> state.reload(kv)
        is TuiEvent.Press -> press(state, event, kv)
    }
}
```

Immutable state with a single reducer means the key map in §5 is testable without a terminal, and the loop in §7 is thin enough to read in one glance.

## 11. Common Pitfalls

| Pitfall                                   | Consequence                                                         | Fix                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Looking for a `Table` widget              | does not exist                                                      | hand-roll columns in a pure render function                             |
| `println` inside a redraw loop            | wrapped, staircased output                                          | `rawPrint` with explicit `\r\n`                                         |
| `\n` in raw mode                          | carriage never returns                                              | `\r\n`                                                                  |
| `key == "D"` for a Shift shortcut         | breaks on non-US layouts                                            | `key.lowercase()` + the `shift` flag                                    |
| Expecting `readKeyOrNull` to be `suspend` | does not compile inside a plain function; blocks a coroutine thread | it is a blocking call; wrap long waits in `withContext(Dispatchers.IO)` |
| `RawMode` used as a class name            | it is a typealias for `RawModeScope`                                | use the functions, or `use { }`                                         |
| Not restoring the cursor in `finally`     | broken shell after exit                                             | `try`/`finally` with `cursor.show()`                                    |
| `enterRawMode()` on a pipe                | exception or hang                                                   | `enterRawModeOrNull()` and exit cleanly                                 |
| Trusting `terminal.size` in a container   | 0 or absurd width                                                   | floor it, fall back to 80                                               |
| `padEnd` without `take`                   | frame width grows, wraps                                            | `padEnd(w).take(w)`                                                     |
| `String.take(n)` on emoji/CJK             | broken glyphs, column drift                                         | measure display width, not `length`                                     |
| A `Terminal` per frame                    | re-probes the terminal every redraw                                 | construct once, pass it down                                            |
| Testing only through a real terminal      | flaky, environment-dependent                                        | pure renderer + `TerminalRecorder`                                      |
| Polling at 1 ms                           | burns a core                                                        | 250 ms tick, 16–50 ms for editors                                       |

## 12. General Rules of Thumb

- Detect with `terminal.terminalInfo`; never sniff `TERM` or `NO_COLOR` yourself.
- Construct one `Terminal` and pass it down; the probe result is cached per instance.
- Keep the renderer a pure function of state — it is the cheapest test you will ever write.
- `enterRawModeOrNull()` for anything that might not be a tty; `try`/`finally` around raw mode and the cursor, always.
- Poll with a timeout (250 ms default) and treat the timeout as a real event.
- `readKeyOrNull` is blocking and returns `null` on timeout; wrap long waits, never assume `suspend`.
- Normalize `KeyboardEvent` into your own sealed type at the boundary; match letters with `lowercase()` + flags.
- `rawPrint` + `\r\n` for repainted frames; `println` for ordinary messages.
- `clearScreenBeforeCursor()` per frame; `clearScreen()` only on entry.
- Truncate with `…` and pad with `padEnd(w).take(w)` so frames are exactly the terminal width.
- There is no `Table` widget — align columns yourself, in pure code.
- Test with `TerminalRecorder(ansiLevel = AnsiLevel.NONE)` and fixed width; assert substrings, not whole frames.

## Quick-Start Checklist

- [ ] Depend on `com.github.ajalt.mordant:mordant`; pin one Mordant version if Clikt is also present
- [ ] Capability checks read `terminalInfo`, never environment variables
- [ ] One `Terminal` instance, constructed once and passed down
- [ ] `inputInteractive` checked before attempting raw mode
- [ ] `enterRawModeOrNull()` with a clear message when unavailable
- [ ] Raw mode and hidden cursor restored in a `finally` block
- [ ] Loop polls with a 250 ms timeout and treats timeout as an event
- [ ] `KeyboardEvent` normalized to an internal sealed type at the boundary
- [ ] Letter shortcuts matched via `lowercase()` + `shift`, not uppercase literals
- [ ] Redraws use `rawPrint` with `\r\n`; messages use `println`
- [ ] `clearScreenBeforeCursor()` per frame, `clearScreen()` on entry
- [ ] Width floored at 40 with an 80-column fallback; `padEnd(w).take(w)` for columns
- [ ] Renderer is pure and unit-tested; terminal I/O tested with `TerminalRecorder`
- [ ] Display width measured (not `String.length`) if values may contain emoji or CJK
