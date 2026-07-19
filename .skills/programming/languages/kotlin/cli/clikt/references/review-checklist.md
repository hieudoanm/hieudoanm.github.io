# Review checklist

Focused reference for **clikt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

Two related techniques:

- **Pass an immutable config object across the boundary.** `launch(ServeConfig(...))` gives the test one value to assert on instead of a pile of captured variables, and it keeps the command from knowing how the work is executed.
- **Use `echo` for user-facing output**, not `println`. `echo` writes through the context, so `test()` captures it in `.stdout`; a bare `println` bypasses the harness and leaks into the real console during tests.

## 8. Help Formatting

Help is generated, so the leverage is in the declarations, not in custom templates:

- Set `help` on the command class and on every parameter. Clikt infers the command name from the class name, but pass `name =` explicitly for anything user-visible.
- Document parameters in declaration order — that is the order they appear in help.
- Hide secrets and plumbing with `.hidden()`; the flag still parses but the help stays clean.
- Add `versionOption` in the root command so `--version` works without a subcommand.
- KDoc on the class becomes the long help description, so put the "what and why" there and leave the one-liner as `help`.

```kotlin
import com.github.ajalt.clikt.parameters.options.versionOption

class Kevin : NoOpCliktCommand(name = "kevin") {
    init { versionOption("1.0.0", "-V", "--version") }
}
```

## 9. Testing

`com.github.ajalt.clikt.testing.test` parses args, runs the command, and captures everything — without a process, a terminal, or a real clock. It requires the umbrella `clikt` artifact.

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

`CliktCommandTestResult` exposes `stdout`, `stderr`, `output`, and `statusCode` — assert on the _status code_ plus the specific message, not on whole-output equality, which breaks on every help-text tweak.

| Parameter              | Use for                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `stdin`                | scripted answers for `prompt()`                            |
| `envvars`              | environment-driven values, as a map                        |
| `includeSystemEnvvars` | opt in to the real environment (default off — keep it off) |
| `ansiLevel`            | `AnsiLevel.NONE` to assert plain text                      |
| `width`, `height`      | control help-text wrapping in assertions                   |

Use `varargTest(command, "--port", "7000")` when the args read better as separate strings, and pass a **fresh command instance per test** — Clikt commands hold parse state and are not designed for reuse.

Clikt 5 replaced the Clikt 4 `option(...).envvar(...)` modifier with **value sources** (`com.github.ajalt.clikt.sources`, including `MapValueSource` and `ValueSource.envvarKey()`). Drive environment behavior through the `envvars` test parameter or a source in `context { }` rather than porting the old modifier.

## 10. Common Pitfalls

| Pitfall                                        | Consequence                             | Fix                                      |
| ---------------------------------------------- | --------------------------------------- | ---------------------------------------- |
| Depending on `clikt-core` only                 | `test()` and `prompt()` do not resolve  | depend on `com.github.ajalt.clikt:clikt` |
| Missing `import ...core.main` / `.subcommands` | "unresolved reference" on a real method | import the extension functions           |
| `.default(x).int()`                            | does not typecheck                      | conversions first, default last          |
| `override fun run() = Unit` on a root          | hand-rolled no-op                       | `NoOpCliktCommand`                       |
| `println` instead of `echo`                    | output escapes the test harness         | `echo`, then assert `result.stdout`      |
| Reusing one command instance across tests      | leaked parse state                      | new instance per test                    |
| Hand-rolled conflict checks in `run()`         | late, generic errors                    | `mutuallyExclusiveOptions`               |
| Unversioned Mordant next to Clikt              | two Mordant versions in the graph       | pin Mordant explicitly                   |
| Prompting in a non-interactive path            | hangs forever in CI                     | `default` + no prompt on server paths    |
| `override fun run() = runBlocking { }`         | nested event loops                      | `SuspendingCliktCommand`                 |

## 11. General Rules of Thumb

- One `CliktCommand` subclass per command; name the class after the command.
- `NoOpCliktCommand` for anything that only groups subcommands.
- Every parameter gets `help =`; every option gets a long name, and a short one when unambiguous.
- Convert with `parameters.types`, default last, validate with `validate { }`.
- `UsageError` for anything the user can fix; `ProgramResult(n)` for a meaningful exit code.
- Model option conflicts in the parse `mutuallyExclusiveOptions` (same-typed options) or a `UsageError` rather than in `run()`.
- Inject side effects as constructor parameters with real defaults; that is what makes commands testable.
- `echo` for output, never `println`.
- Keep `main` to a single expression: build the tree, call `main(args)`.
- Test through `test()` with a fresh instance, asserting status code and message.

## Quick-Start Checklist

- [ ] Depend on `com.github.ajalt.clikt:clikt` (not `clikt-core`) and pin a Mordant version if Mordant is used directly
- [ ] One command class per command, `NoOpCliktCommand` for grouping-only roots
- [ ] `main` is a single expression ending in `.main(args)`
- [ ] Every command has `name =`; every parameter has `help =`
- [ ] Type conversions applied before defaults
- [ ] Booleans use `flag()`, not `convert()`
- [ ] Conflicts expressed with `mutuallyExclusiveOptions`
- [ ] `UsageError` for user-fixable input, `ProgramResult(n)` for exit codes
- [ ] Impure work injected via constructor parameter with a production default
- [ ] Output via `echo`, not `println`
- [ ] Every command constructible with zero arguments
- [ ] Tests use `test()` with a fresh instance and assert `statusCode` plus message
- [ ] No prompting on unattended/server code paths
