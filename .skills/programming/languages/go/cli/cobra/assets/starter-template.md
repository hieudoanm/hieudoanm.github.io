# Cobra CLI Design Best Practices: Starter Template

A reusable starting point derived from the **2. Command Structure** section of [Cobra CLI Design Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
