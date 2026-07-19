# Workflow notes

Focused reference for **clikt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **A command class must be constructible with zero arguments.** Tests build it with `Kevin().subcommands(ServeCommand())`; a constructor that requires live resources cannot be tested. Inject side effects instead (see §7).
- **Parse eagerly, act once.** Reading delegated properties inside `run()` forces parsing at that moment. Reading them in a `Pair`/config object first makes the parse phase a single, obvious step.

Nested subcommands are just nesting. `subcommands()` accepts varargs or an `Iterable`, and it returns the receiver, so it chains:

```kotlin
class Admin : NoOpCliktCommand(name = "admin")
class Reset : CliktCommand(name = "reset")

fun main(args: Array<String>) =
    Kevin().subcommands(Admin().subcommands(Reset()), ServeCommand()).main(args)
```

## 3. Options, Flags & Arguments

Declare a parameter as a `by` delegated property. The delegate _is_ the declaration; the type conversion and default chain off it.

```kotlin
import com.github.ajalt.clikt.core.CliktCommand
import com.github.ajalt.clikt.parameters.options.default
import com.github.ajalt.clikt.parameters.options.flag
import com.github.ajalt.clikt.parameters.options.option
import com.github.ajalt.clikt.parameters.types.int
import com.github.ajalt.clikt.parameters.types.path
import java.nio.file.Path

class ServeCommand : CliktCommand(name = "serve") {
    private val port: Int by option("--port", "-p", help = "TCP port to listen on")
        .int()
        .default(6379)

    private val bind: String by option("--bind", help = "Address to bind to")
        .default("0.0.0.0")

    private val data: Path? by option("--data", help = "path to JSON data file for persistence")
        .path(mustExist = false, canBeDir = false)

    private val gui: Boolean by option("--gui", help = "open the manager GUI alongside the server")
        .flag()

    override fun run() = Unit
}
```

Conventions worth keeping:

- **Long flag first, short second.** `--port` / `-p` renders the help text in that order and matches every other CLI your users know.
- **Always write `help =`.** It is the entire discoverability surface of the tool. A missing `help` is a bug, not a style choice.
- **Put the type conversion before the default.** `.int().default(6379)` is correct; `.default(6379).int()` does not typecheck.
- **Use `flag()` for booleans, not an option with `convert()`.** A flag is `--gui` with no value; `flag(default = ...)` supplies the off-state. `count()` is available for `-vvv`-style repetition.
- **Nullable types are how "was it passed?" is expressed.** `Path?` plus `mustExist = false` is different from `Path` with a default: only the nullable form can distinguish "user said `--data`" from "user said nothing".
- **Arguments are positional.** Use `argument().multiple()` for variable arity, and mark optional ones `.optional()`; the order of declaration is the order on the command line.

Type conversions are extension functions in `com.github.ajalt.clikt.parameters.types`, each with a matching import: `int`, `long`, `path`, `file`, `choice`, `enum`, `range`, `float`, `double`.

```kotlin
import com.github.ajalt.clikt.parameters.types.choice
import com.github.ajalt.clikt.parameters.types.enum

private val mode: Mode by option("--mode", help = "storage backend")
    .enum<Mode>()
    .default(Mode.Memory)

private val backend: String by option("--backend", help = "persistence backend")
    .choice("file", "redis", "memory")
    .default("file")
```

`choice` fails with a `BadParameterValue` listing the valid options, so you never write that error message by hand.

## 4. Validation & Error Handling

Clikt distinguishes _usage_ errors (the user typed something wrong → message, exit 1) from _program_ results (the run succeeded but wants a specific exit code).

| Need                               | Throw                                                  | Exit code |
| ---------------------------------- | ------------------------------------------------------ | --------- |
| Bad combination of valid options   | `UsageError("--gui and --tui are mutually exclusive")` | 1         |
| Value failed conversion/validation | `BadParameterValue`                                    | 1         |
| Success, but signal a status       | `ProgramResult(3)`                                     | 3         |
| Print a message, exit 0            | `PrintMessage("nothing to do")`                        | 0         |
| Print help, exit 0                 | `PrintHelpMessage(ctx)`                                | 0         |
| Custom code + stderr control       | `CliktError(msg, cause, statusCode, printError)`       | yours     |

```kotlin
import com.github.ajalt.clikt.core.ProgramResult
import com.github.ajalt.clikt.core.UsageError

override fun run() {
    if (gui && tui) throw UsageError("--gui and --tui are mutually exclusive")
    if (port !in 1..65535) throw UsageError("--port must be between 1 and 65535")
    if (rows.isEmpty()) throw ProgramResult(0)
    launch(ServeConfig(port, bind, data, gui))
}
```

`UsageError` prints to stderr with usage and exits 1. That is what you want for anything the user could fix by retyping. Reserve `ProgramResult` for "ran fine, exit non-zero" — for example `diff`-style or `grep`-style "no matches found".

Prefer a `validate`/`check` chain on the delegate for per-value rules, so the message is attached to the parameter in the help output:

```kotlin
import com.github.ajalt.clikt.parameters.options.validate

private val port: Int by option("--port", "-p", help = "TCP port to listen on")
    .int()
    .default(6379)
    .validate { require(it in 1..65535) { "must be between 1 and 65535" } }
```

Anything that is _not_ about a single parameter — two options conflicting, a required option missing given another — belongs in a group (§5) or in `run()` as a `UsageError`.
