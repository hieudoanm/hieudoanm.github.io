# Cobra CLI Design Best Practices: 2. Command Structure

## Source guidance

This example applies the **2. Command Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Noun-verb or verb-noun, pick one and stay consistent.** `kubectl get pods` (verb-noun) vs `git remote add` (noun-verb) — both work, mixing them within one CLI doesn't.
- **Keep the tree shallow.** 2 levels (`app noun verb`) is usually enough; avoid 3+ levels unless the domain genuinely needs it.
- **Root command should do something useful alone** or print help — never a silent no-op.
- **Group related subcommands** under a parent even if the parent itself has no action (`app config get`, `app config set`, `app config list`).

## Example

This excerpt is from the cited **2. Command Structure** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for cobra-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
