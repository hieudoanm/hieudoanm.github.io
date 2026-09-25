---
name: clikt-best-practices
description: Best practices for building command-line interfaces in Kotlin with Clikt. Use when writing, structuring, validating, or testing a Clikt CLI — covers Gradle setup, command hierarchies, options/flags/arguments, typed conversion, validation and exit codes, mutually exclusive and grouped options, prompting, testable command construction, help output, and testing, with suggested values.
---

# Clikt Best Practices

Clikt turns a command-line interface into a tree of Kotlin classes: each command is a `CliktCommand` subclass that declares its own parameters and does its work in `run()`. Best practice here is **one class per command, parameters as delegated properties, parsing separated from side effects, and errors as typed values** — so the same command object can be constructed in a test with a fake side-effect sink and asserted without touching the filesystem or the network.

This document is written against **Kotlin 2.4+ / Clikt 5.1+** and includes concrete values you can drop straight into code.

---

## 1. Core Stack & Gradle Setup

Clikt 5 is split into artifacts, and the split is not cosmetic. Add the **umbrella** coordinate unless you have a reason not to:

```kotlin
// build.gradle.kts
plugins {
    kotlin("jvm") version "2.4.20"
    application
}

kotlin { jvmToolchain(21) }

dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    testImplementation(kotlin("test"))
}

application { mainClass.set("io.example.cli.MainKt") }
```

| Coordinate                          | Ships                                  | Missing if you only need core                    |
| ----------------------------------- | -------------------------------------- | ------------------------------------------------ |
| `com.github.ajalt.clikt:clikt`      | core + Mordant-backed help + `testing` | — (recommended)                                  |
| `com.github.ajalt.clikt:clikt-core` | parsing, types, groups                 | no `com.github.ajalt.clikt.testing`, no `prompt` |

**Verified:** `test()` and `prompt()` live in the full `clikt-jvm` artifact, _not_ in `clikt-core-jvm`. Depending on `clikt-core` alone compiles your production code and then fails the moment you add a test.

Clikt's help formatter is Mordant-powered, so Clikt drags Mordant in transitively. It requests **Mordant 3.0.2**, which loses conflict resolution against any Mordant version you declare yourself. If the app also uses Mordant directly, pin it explicitly so the graph has exactly one Mordant version:

```kotlin
dependencies {
    implementation("com.github.ajalt.clikt:clikt:5.1.0")
    implementation("com.github.ajalt.mordant:mordant:3.1.0") // wins over Clikt's transitive 3.0.2
}
```

Check for a split brain with `./gradlew dependencies --configuration runtimeClasspath | grep mordant`. Two different `mordant-core-jvm` versions in one graph is a latent `NoSuchMethodError`, not a style nit.

## 2. Command Hierarchies

Every command is a class. The root owns nothing but structure, so give it a no-op body:

```kotlin
import com.github.ajalt.clikt.core.NoOpCliktCommand
import com.github.ajalt.clikt.core.main
import com.github.ajalt.clikt.core.subcommands

class Kevin : NoOpCliktCommand(name = "kevin")

class Version : NoOpCliktCommand(name = "version") {
    override fun run() = echo("kevin 1.0.0")
}

fun main(args: Array<String>) = Kevin().subcommands(Version(), ServeCommand()).main(args)
```

`NoOpCliktCommand` is exactly `CliktCommand` with an empty `run()`. Writing `override fun run() = Unit` by hand works but is noise — reach for the no-op base instead. Use `CliktCommand` only when the root itself does work.

`main` and `subcommands` are **extension functions** in `com.github.ajalt.clikt.core`, not members. Forget the import and Kotlin reports "unresolved reference" even though the class has the method in the bytecode.

| Base class                   | Use for                                                   |
| ---------------------------- | --------------------------------------------------------- |
| `CliktCommand`               | normal commands; you implement `run()`                    |
| `NoOpCliktCommand`           | root/grouping command; no `run()` needed                  |
| `SuspendingCliktCommand`     | `run()` is a `suspend` function                           |
| `SuspendingNoOpCliktCommand` | no-op root that is `suspend`                              |
| `ChainedCliktCommand<T>`     | a root whose subcommands share a type or a parent context |

Two structural rules that pay off immediately:

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

## 5. Mutually Exclusive & Grouped Options

Checking conflicts by hand in `run()` works but reports them late and generically. `mutuallyExclusiveOptions` makes the constraint part of the parse, so Clikt owns the message and the help layout:

```kotlin
import com.github.ajalt.clikt.parameters.groups.mutuallyExclusiveOptions

class ServeCommand : CliktCommand(name = "serve") {
    private val source: Path? by mutuallyExclusiveOptions(
        option("--file", help = "load keys from a JSON file").path(),
        option("--dir", help = "load keys from a directory").path(),
    )
}
```

Note the shape: `mutuallyExclusiveOptions` is an extension on `ParameterHolder` whose arguments are the **delegates themselves**, and the whole call is what you apply `by` to. The delegates are declared inline, not as separate properties — declaring them separately and passing the names does not compile.

**All options in one group must share a single type.** The factory is generic over one `T`, so `--file` (`Path?`) and `--url` (`String`) cannot go in the same group. When the alternatives genuinely differ in type, either normalize them to one type with `convert`, or keep them as separate options and validate the conflict in `run()` as a `UsageError`.

Two group APIs cover most needs:

| Need                              | API                                                                 |
| --------------------------------- | ------------------------------------------------------------------- |
| At most one of these              | `mutuallyExclusiveOptions(vararg delegates)`                        |
| A reusable, named set of options  | `ParameterGroup` subclass, delegated with `by`                      |
| Options shown as one help section | `OptionGroup` (the `ParameterGroup` that also collects its options) |

`ParameterGroup` bundles a fixed set of options into one reusable object — delegate it with `by` and import `provideDelegate`:

```kotlin
import com.github.ajalt.clikt.parameters.groups.ParameterGroup
import com.github.ajalt.clikt.parameters.groups.provideDelegate

class TlsOptions : ParameterGroup() {
    val cert: Path by option("--cert", help = "TLS certificate").path()
    val key: Path by option("--key", help = "TLS private key").path()
}

class ServeCommand : CliktCommand(name = "serve") {
    private val tls by TlsOptions() // help is now grouped under "TLS options"
}
```

If the conflict is a genuine business rule rather than a parse-shape rule, keep the `UsageError` in `run()`. Both are legitimate; the test is whether the message should appear next to the options in `--help`.

## 6. Prompting

`prompt()` asks only when the value is missing, and Clikt reads the answer from the context's input — which is what makes it testable. It lives in the full `clikt` artifact, not `clikt-core`:

```kotlin
import com.github.ajalt.clikt.parameters.options.prompt

private val name: String by option("--name", help = "instance name")
    .prompt("Instance name", default = "kevin")
```

`prompt` is interactive by definition. Rules that follow from that:

- **Never prompt in a command that is meant to run unattended.** A server that blocks on stdin in CI is worse than one that fails fast.
- **Always pass `default`** when a sensible value exists, so the user can accept with Enter.
- **Combine with `requireConfirmation` for destructive or expensive actions** (deleting a data file, overwriting a config) rather than hand-rolling a yes/no read.
- Feed scripted input through the test harness's `stdin` parameter; never through `System.in`.

## 7. Testable Command Construction

The single highest-leverage Clikt habit: **a command does not perform the side effect; it calls an injected one.** Default the parameter to the real implementation, so production code stays a one-liner, and tests pass a lambda that records instead.

```kotlin
/** The `kevin serve` command; [launch] is injected so tests can avoid binding a socket. */
class ServeCommand(private val launch: (ServeConfig) -> Unit = { ServeRunner(it).run() }) :
    CliktCommand(name = "serve") {

    private val port: Int by option("--port", "-p", help = "TCP port to listen on").int().default(6379)

    override fun run() = launch(ServeConfig(port = port))
}
```

Because the side effect is a constructor parameter with a default, the production call site stays `ServeCommand()` while the test gets full control. Follow the same shape for anything impure: clock, filesystem, HTTP client, process runner, random source.

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
