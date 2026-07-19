# .NET Best Practices

.NET is the C# platform: a compiler pipeline, a runtime, and a convention-rich project model (csproj, sln, appsettings, a built-in DI container, structured logging). Practical .NET leans on **human-scale project layout, a single composition root registering dependencies via IServiceCollection, IOptions-typed configuration, and structured logging that carries a request context**. The SDK tooling — dotnet build/test/publish...

## When to use

Use when writing, structuring, or reviewing .NET.

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [.NET Best Practices: Basic Usage](./examples/basic-usage.md)
- [.NET Best Practices: 10. Performance & Production](./examples/reliability-and-edge-cases.md)
- [.NET Best Practices: 3. Configuration](./examples/setup-and-configuration.md)
- [.NET Best Practices: 8. Testing & Verification](./examples/testing-and-validation.md)

## Assets

- [.NET Best Practices: Decision Record](./assets/decision-record.md)
- [.NET Best Practices: Starter Template](./assets/starter-template.md)
- [.NET Best Practices: Validation Plan](./assets/validation-plan.md)
- [.NET Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
