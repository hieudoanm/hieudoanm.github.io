# Implementation notes

Focused reference for **cobra-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Output Conventions

| Rule                                           | Detail                                                                                                               |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Human output → stdout                          | Always                                                                                                               |
| Errors/warnings → stderr                       | Always — never mix into stdout, breaks piping                                                                        |
| Support `--output`/`-o` for structured formats | `table` (default, human-readable), `json`, `yaml` — critical for scripting/CI use                                    |
| Exit codes                                     | `0` success, `1` generic failure, use distinct codes (`2`, `3`...) only if callers need to distinguish failure types |
| Color                                          | Auto-detect TTY (`isatty`) and disable color when piped; respect `NO_COLOR` env var and add a `--no-color` flag      |
| Quiet/verbose                                  | Support `-q`/`--quiet` and `-v`/`--verbose` (or `-vvv` counted verbosity) consistently across all commands           |

```go
if !isatty.IsTerminal(os.Stdout.Fd()) || os.Getenv("NO_COLOR") != "" {
    color.NoColor = true
}
```

---

## 6. Error Handling

- Return errors from `RunE`, not `Run` + manual `os.Exit` inside the command body — let Cobra propagate and format them, and let `main()` decide the exit code.
- Error messages should be **actionable**: state what went wrong and, where possible, how to fix it (`"config file not found at ~/.app/config.yaml — run 'app init' first"`), not just `"error: not found"`.
- Don't print the error _and_ Cobra's own usage/help block together on every failure — that's Cobra's default (`SilenceUsage`/`SilenceErrors` let you control this); reserve the full usage dump for actual flag/arg-parsing mistakes, not runtime failures.

```go
rootCmd.SilenceUsage = true // don't dump usage on every runtime error
```

---

## 7. Progress & Feedback

- Any operation >300ms: show a spinner or progress bar — a silently hanging CLI reads as broken.
- Long-running commands should support `--quiet` to suppress progress output when scripted.
- Confirm destructive actions interactively unless `--force`/`--yes` is passed (critical for anything that deletes or overwrites).
