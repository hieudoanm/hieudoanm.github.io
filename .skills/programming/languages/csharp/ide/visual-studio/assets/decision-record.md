# Visual Studio: Decision Record

Use this record when applying [Visual Studio](../SKILL.md) to a concrete project decision.

## Context

Best practices for working in Visual Studio 2026 — solution structure, .slnx, MSBuild configuration, Roslyn analyzers, Hot Reload, the built-in test runner, and dotnet CLI parity. Use when setting up or debugging a C#/.NET project in Visual Studio or Rider.

Visual Studio is the full-featured Windows IDE: Roslyn compilation and IntelliSense, the designer, a real debugger with Hot Reload, profilers, and a test runner. It is also the heaviest tool in the .NET ecosystem, and its main source of friction is that **it stores configuration in places CI never reads**. Practical Visual Studio work is about **keeping settings in project files, treating the IDE as a view over MSBuild, and not letting a solution-only setting become a production difference**. Language rules live in csharp.md and dotnet.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Editions & Channels
- [ ] 2. Solution Structure
- [ ] 3. Build Configuration
- [ ] 4. Startup & Performance
- [ ] 5. Debugging
- [ ] 6. Refactoring & Analysis
- [ ] 7. Testing
- [ ] 8. CLI Parity

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
