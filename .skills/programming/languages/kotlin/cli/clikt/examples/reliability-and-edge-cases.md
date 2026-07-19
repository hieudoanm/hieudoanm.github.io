# Clikt Best Practices: 4. Validation & Error Handling

## Source guidance

This example applies the **4. Validation & Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Clikt distinguishes _usage_ errors (the user typed something wrong → message, exit 1) from _program_ results (the run succeeded but wants a specific exit code).
`UsageError` prints to stderr with usage and exits 1. That is what you want for anything the user could fix by retyping. Reserve `ProgramResult` for "ran fine, exit non-zero" — for example `diff`-style or `grep`-style "no matches found".
Prefer a `validate`/`check` chain on the delegate for per-value rules, so the message is attached to the parameter in the help output:

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for clikt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
