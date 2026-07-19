# .NET Best Practices: Starter Template

A reusable starting point derived from the **3. Configuration** section of [.NET Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```csharp
"Payments": {
  "BaseUrl": "https://api.example.com",
  "Retries": 3
}
builder.Services.Configure<PaymentOptions>(builder.Configuration.GetSection("Payments"));
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
