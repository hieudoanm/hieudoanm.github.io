---
name: "visual-studio-best-practices"
description: "Best practices for working in Visual Studio 2026 — solution structure, .slnx, MSBuild configuration, Roslyn analyzers, Hot Reload, the built-in test runner, and dotnet CLI parity. Use when setting up or debugging a C#/.NET project in Visual Studio or Rider."
tags:
  - "programming"
  - "language"
  - "csharp"
  - "ide"
  - "visual"
  - "studio"
when_to_use: "Use when setting up or debugging a C#/.NET project in Visual Studio or Rider."
prerequisites:
  - "Basic familiarity with C# and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../rider/SKILL.md"
  - "../../SKILL.md"
  - "../../dotnet/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Visual Studio

Visual Studio is the full-featured Windows IDE: Roslyn compilation and IntelliSense, the designer, a real debugger with Hot Reload, profilers, and a test runner. It is also the heaviest tool in the .NET ecosystem, and its main source of friction is that **it stores configuration in places CI never reads**. Practical Visual Studio work is about **keeping settings in project files, treating the IDE as a view over MSBuild, and not letting a solution-only setting become a production difference**. Language rules live in csharp.md and dotnet.md.

_Verified against Visual Studio 2026 18.10.2...

## When to use

Use when setting up or debugging a C#/.NET project in Visual Studio or Rider.

## Prerequisites

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Configuration living in the IDE rather than Directory.Build.props**, so CI builds something different
- **Editing a .sln by hand on a large solution** — merge conflicts in .sln are miserable; use .slnx or a generator
- **A missing global.json**, so the developer and CI silently resolve different SDKs
- **Relying on "startup project", which is meaningless outside the IDE.**
- **Commits of bin/, obj/, or .vs/** — enormous diffs and machine-specific state
- **Hot Reload applied to a change it cannot support**, which either fails silently or needs a restart anyway
- **Hand-written exception filters left on permanently**, making debugging genuinely painful
- **msbuild.exe in CI scripts** instead of dotnet build, failing on Linux agents

## Focus areas

- 1. Editions & Channels
- 2. Solution Structure
- 3. Build Configuration
- 4. Startup & Performance
- 5. Debugging
- 6. Refactoring & Analysis
- 7. Testing
- 8. CLI Parity
- 9. Extensions
- 10. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
