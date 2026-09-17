---
name: cobra-cli-design
description: Best practices for building well-designed command-line tools with Cobra (Go). Use when creating, structuring, or reviewing a Cobra CLI app — covers command structure, flags, help text, output, and error conventions with suggested values.
---

# Cobra CLI Design Best Practices

Cobra (spf13/cobra) gives you command trees, flag parsing, and help generation for free. Good CLI design is mostly about _conventions_ — following the shape users already expect from tools like `git`, `kubectl`, and `docker` — rather than fighting Cobra's defaults.

---

## 1. Core Stack

- `github.com/spf13/cobra` — command tree, flags, help/usage generation
- `github.com/spf13/viper` — config file + env var + flag merging (pairs naturally with Cobra)
- `github.com/spf13/pflag` — POSIX-style flags (Cobra uses this under the hood)
- `github.com/fatih/color` or `github.com/charmbracelet/lipgloss` — colored terminal output
- `github.com/briandowns/spinner` or `charmbracelet/bubbles/spinner` — progress feedback

---

## 2. Command Structure

- **Noun-verb or verb-noun, pick one and stay consistent.** `kubectl get pods` (verb-noun) vs `git remote add` (noun-verb) — both work, mixing them within one CLI doesn't.
- **Keep the tree shallow.** 2 levels (`app noun verb`) is usually enough; avoid 3+ levels unless the domain genuinely needs it.
- **Root command should do something useful alone** or print help — never a silent no-op.
- **Group related subcommands** under a parent even if the parent itself has no action (`app config get`, `app config set`, `app config list`).

```go
var rootCmd = &cobra.Command{
    Use:   "app",
    Short: "One-line description shown in `app help`",
    Long:  "A longer paragraph shown in `app --help`, explaining what the tool is for.",
}

var configCmd = &cobra.Command{
    Use:   "config",
    Short: "Manage configuration",
}

var configGetCmd = &cobra.Command{
    Use:   "get <key>",
    Short: "Get a configuration value",
    Args:  cobra.ExactArgs(1),
    RunE:  runConfigGet,
}
```

---

## 3. Flags

| Convention      | Rule                                                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Long form       | Always provide (`--verbose`), never short-only                                                                                                            |
| Short form      | Only for genuinely frequent flags (`-v`, `-o`, `-n`, `-f`); don't assign shorthands to rarely-used flags just because a letter is free                    |
| Boolean flags   | Default `false`, name as an affirmative (`--force`, not `--no-safe`)                                                                                      |
| Naming          | `kebab-case`, never `camelCase` or `snake_case`                                                                                                           |
| Global vs local | Persistent flags (`PersistentFlags()`) for things like `--verbose`/`--config` that apply to all subcommands; local `Flags()` for command-specific options |
| Required flags  | Mark with `cmd.MarkFlagRequired("name")` rather than manually checking and erroring                                                                       |

```go
cmd.Flags().StringP("output", "o", "table", "Output format: table, json, yaml")
cmd.Flags().BoolP("verbose", "v", false, "Enable verbose logging")
cmd.PersistentFlags().String("config", "", "Path to config file")
```

**Don't reuse shorthand letters across sibling commands for different meanings** — `-o` should mean the same thing everywhere in your CLI (usually "output format").

---

## 4. Help Text

- `Short`: one line, no trailing period, imperative or noun phrase (`"Get a configuration value"`, not `"This command gets a config value."`).
- `Long`: 1–3 sentences of real explanation, not a restatement of `Short`.
- `Example`: **always fill this in** — Cobra renders it under an `Examples:` section and it's the single most useful part of `--help` for new users.

```go
var getCmd = &cobra.Command{
    Use:     "get <key>",
    Short:   "Get a configuration value",
    Example: "  app config get api.endpoint\n  app config get --output json api.endpoint",
    RunE:    runGet,
}
```

- Use `Args: cobra.ExactArgs(n)` / `MinimumNArgs` / `RangeArgs` so Cobra generates the correct usage error automatically instead of a manual `if len(args) != n`.

---

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

---

## 8. Shell Completion & Docs

- Cobra generates shell completion for free — wire up `app completion bash|zsh|fish|powershell` via `cobra.Command{}` completion generation; users expect this from mature CLIs.
- Generate man pages / markdown docs via `cobra/doc` package if distributing widely — keeps `--help` and external docs in sync.

---

## 9. General Rules of Thumb

- **Consistency beats cleverness** — match `git`/`kubectl`/`docker` conventions unless you have a strong reason not to; users transfer muscle memory across CLIs.
- **Never require a flag that could be a positional arg**, and vice versa — positional for the "main subject" (`app get <key>`), flags for options/modifiers.
- **Version flag always present** (`app --version` or `app version` subcommand).
- **Idempotent by default** where possible — re-running a command shouldn't error just because the desired state already exists.

---

## Quick-Start Checklist

- [ ] Consistent noun-verb or verb-noun structure across the whole tree
- [ ] Every command has `Short`, `Long`, and a filled-in `Example`
- [ ] Flags use `kebab-case`; shorthands reserved for genuinely frequent flags
- [ ] `--output`/`-o` supports at least `table` and `json`
- [ ] Errors go to stderr, human output to stdout
- [ ] Color respects TTY detection and `NO_COLOR`
- [ ] `RunE` used everywhere instead of manual `os.Exit`
- [ ] Destructive commands require confirmation or `--force`
- [ ] Shell completion wired up
- [ ] `--version` available
