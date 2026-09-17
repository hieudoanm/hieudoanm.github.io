# .NET Best Practices: Basic Usage

Best practices for building .NET applications — the framework conventions for .NET projects, web APIs, and services. Use when writing, structuring, or reviewing .NET — covers project layout, DI and composition root, configuration, logging, hosting, testing, deployment, and observability. Use alongside csharp-best-practices for language-level C# rules.

## Scenario

Use this example as a starting point when applying **dotnet-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Dependency Injection & Composition Root** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```csharp
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddHttpClient<IPaymentsClient, PaymentsClient>();
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
