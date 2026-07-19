# Clikt Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

`com.github.ajalt.clikt.testing.test` parses args, runs the command, and captures everything — without a process, a terminal, or a real clock. It requires the umbrella `clikt` artifact.
`CliktCommandTestResult` exposes `stdout`, `stderr`, `output`, and `statusCode` — assert on the _status code_ plus the specific message, not on whole-output equality, which breaks on every help-text tweak.
Use `varargTest(command, "--port", "7000")` when the args read better as separate strings, and pass a **fresh command instance per test** — Clikt commands hold parse state and are not designed for reuse.

## Example

```kotlin
import com.github.ajalt.clikt.testing.test
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class ServeCommandTest {
    @Test
    fun `applies defaults`() {
        var captured: ServeConfig? = null
        val result = ServeCommand { captured = it }.test("")

        assertEquals(0, result.statusCode)
        assertEquals(6379, captured?.port)
        assertEquals("0.0.0.0", captured?.bind)
    }

    @Test
    fun `rejects both frontends`() {
        val result = ServeCommand { }.test("--gui --tui")

        assertEquals(1, result.statusCode)
        assertTrue(result.stderr.contains("mutually exclusive"))
    }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for clikt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
