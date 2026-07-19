# Mordant Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

`TerminalRecorder` implements Mordant's `TerminalInterface` and captures everything a `Terminal` would have written, plus scripted input:
`TerminalRecorder` gives you `stdout()`, `stderr()`, `output()`, `clearOutput()`, plus settable `inputLines` and `inputEvents` for driving input.
Two tiers of testing, and you want both:
1. **Test the renderer as a pure function.** `Render.frame(state, kv): String` takes state and returns a frame — no terminal, no timing, no flakiness. Assert on substrings (`assertTrue(frame.contains(">1  user:alice"))`) and on column alignment, not on byte-for-byte equality.

## Example

```kotlin
import com.github.ajalt.mordant.rendering.AnsiLevel
import com.github.ajalt.mordant.terminal.Terminal
import com.github.ajalt.mordant.terminal.TerminalRecorder

val recorder = TerminalRecorder(ansiLevel = AnsiLevel.NONE, width = 80, height = 24)
val terminal = Terminal(terminalInterface = recorder)
terminal.println("hello")
assertEquals("hello\n", recorder.stdout())
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for mordant-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
