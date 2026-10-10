# C# Best Practices: Basic Usage

Best practices for writing C# — the language conventions for .NET code. Use when writing, structuring, or reviewing C# code — covers type design, null safety, error handling, async discipline, collections, concurrency, diagnostics, and tooling.

## Scenario

Use this example as a starting point when applying **csharp-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Type Design & Immutability** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```csharp
public sealed class User
{
    public required string Email { get; init; }
    public required string Name { get; init; }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
