# Workflow notes

Focused reference for **cobra-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
