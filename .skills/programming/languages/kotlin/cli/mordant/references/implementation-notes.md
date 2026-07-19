# Implementation notes

Focused reference for **mordant-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
