# Review checklist

Focused reference for **mordant-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
