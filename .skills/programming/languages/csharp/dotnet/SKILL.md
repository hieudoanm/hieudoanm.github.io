---
name: "dotnet-best-practices"
description: "Best practices for building .NET applications — the framework conventions for .NET projects, web APIs, and services. Use when writing, structuring, or reviewing .NET — covers project layout, DI and composition root, configuration, logging, hosting, testing, deployment, and observability. Use alongside csharp-best-practices for language-level C# rules."
tags:
  - "programming"
  - "language"
  - "csharp"
  - "dotnet"
when_to_use: "Use when writing, structuring, or reviewing .NET."
prerequisites:
  - "Basic familiarity with C# and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../SKILL.md"
  - "../game/unity/SKILL.md"
  - "../../go/backend/chi/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# .NET Best Practices

.NET is the C# platform: a compiler pipeline, a runtime, and a convention-rich project model (csproj, sln, appsettings, a built-in DI container, structured logging). Practical .NET leans on **human-scale project layout, a single composition root registering dependencies via IServiceCollection, IOptions-typed configuration, and structured logging that carries a request context**. The SDK tooling — dotnet build/test/publish plus analyzers treated as CI gates — defines what "done" means.

## When to use

Use when writing, structuring, or reviewing .NET.

## Prerequisites

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Small focused projects; Core stays infrastructure-free.**
- **One composition root; constructor injection only.**
- **Typed options, validated at startup; secrets never in code.**
- **Structured logged + correlated; log once per boundary.**
- **dotnet build/test/publish with analyzers and -warnaserror end the loop.**
- **EF async tracked queries; CancellationToken flows everywhere.**
- [ ] Solution split by responsibility; Core free of infrastructure types
- [ ] Single composition root; interface-based DI registration; lifetimes by state

## Focus areas

- 1. Solution & Project Layout
- 2. Dependency Injection & Composition Root
- 3. Configuration
- 4. Logging & Observability
- 5. Hosting & Lifecycle
- 6. Data Access
- 7. Build & CI
- 8. Testing & Verification
- 9. Deployment & Delivery
- 10. Performance & Production

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
