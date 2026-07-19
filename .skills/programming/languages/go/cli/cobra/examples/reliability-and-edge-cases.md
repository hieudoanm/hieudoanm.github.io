# Cobra CLI Design Best Practices: 6. Error Handling

## Source guidance

This example applies the **6. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Return errors from `RunE`, not `Run` + manual `os.Exit` inside the command body — let Cobra propagate and format them, and let `main()` decide the exit code.
- Error messages should be **actionable**: state what went wrong and, where possible, how to fix it (`"config file not found at ~/.app/config.yaml — run 'app init' first"`), not just `"error: not found"`.
- Don't print the error _and_ Cobra's own usage/help block together on every failure — that's Cobra's default (`SilenceUsage`/`SilenceErrors` let you control this); reserve the full usage dump for actual flag/arg-parsing mistakes, not runtime failures.

## Example

```go
rootCmd.SilenceUsage = true // don't dump usage on every runtime error
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for cobra-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
