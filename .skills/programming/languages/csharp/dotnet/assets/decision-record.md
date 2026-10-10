# .NET Best Practices: Decision Record

Use this record when applying [.NET Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building .NET applications — the framework conventions for .NET projects, web APIs, and services. Use when writing, structuring, or reviewing .NET — covers project layout, DI and composition root, configuration, logging, hosting, testing, deployment, and observability. Use alongside csharp-best-practices for language-level C# rules.

.NET is the C# platform: a compiler pipeline, a runtime, and a convention-rich project model (csproj, sln, appsettings, a built-in DI container, structured logging). Practical .NET leans on **human-scale project layout, a single composition root registering dependencies via IServiceCollection, IOptions-typed configuration, and structured logging that carries a request context**. The SDK tooling — dotnet build/test/publish plus analyzers treated as CI gates — defines what "done" means.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Solution & Project Layout
- [ ] 2. Dependency Injection & Composition Root
- [ ] 3. Configuration
- [ ] 4. Logging & Observability
- [ ] 5. Hosting & Lifecycle
- [ ] 6. Data Access
- [ ] 7. Build & CI
- [ ] 8. Testing & Verification

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
