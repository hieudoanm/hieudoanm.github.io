# Bubble Tea Design Best Practices: 3. Spacing & Sizing Tokens

## Source guidance

This example applies the **3. Spacing & Sizing Tokens** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Use the source section as the governing checklist and adapt its decisions to the project constraints.

## Example

```go
style := lipgloss.NewStyle().
    Padding(1, 2).
    Border(lipgloss.RoundedBorder()).
    BorderForeground(ColorBorder)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for bubbletea-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
