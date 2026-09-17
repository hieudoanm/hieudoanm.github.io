# C# Best Practices: Starter Template

A reusable starting point derived from the **8. Modern C# Patterns** section of [C# Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```csharp
public string Describe(Payment p) => p switch
{
    { Kind: PaymentKind.Card, Verified: true } when p.Amount > 0 => "valid card",
    { Kind: PaymentKind.Card } => "card requires verification",
    _ => "unknown",
};
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
