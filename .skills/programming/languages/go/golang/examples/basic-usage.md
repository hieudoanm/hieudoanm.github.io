# Go Best Practices: Basic Usage

Idiomatic Go best practices covering project structure, error handling, concurrency, naming, testing, and tooling. Use when writing, structuring, or reviewing Go code.

## Scenario

Use this example as a starting point when applying **go-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Error Handling** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```go
data, err := os.ReadFile(path)
if err != nil {
    return fmt.Errorf("reading config at %s: %w", path, err)
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
