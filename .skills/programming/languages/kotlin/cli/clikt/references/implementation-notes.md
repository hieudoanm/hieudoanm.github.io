# Implementation notes

Focused reference for **clikt-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
