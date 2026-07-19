# Cobra CLI Design Best Practices: Basic Usage

Best practices for building well-designed command-line tools with Cobra (Go). Use when creating, structuring, or reviewing a Cobra CLI app — covers command structure, flags, help text, output, and error conventions with suggested values.

## Scenario

Use this example as a starting point when applying **cobra-cli-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Command Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
