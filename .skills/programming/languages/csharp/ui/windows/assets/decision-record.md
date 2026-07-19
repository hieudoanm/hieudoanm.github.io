# Windows App Development: Decision Record

Use this record when applying [Windows App Development](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Windows desktop apps with the Windows App SDK and WinUI 3 — architecture, MVVM, x:Bind, packaging, windowing, and testing. Use when creating, structuring, or reviewing a Windows app in C#.

Windows desktop development in C# has converged on the **Windows App SDK**: a NuGet-distributed framework providing WinUI 3, the modern Fluent UI, plus modern windowing, notifications, and AI APIs. It is the recommended platform for new Windows apps, and it can be adopted by existing WPF, Windows Forms, and Win32 apps for platform features without a rewrite. Practical Windows app work leans on **MVVM with the CommunityToolkit source generators, x:Bind instead of {Binding}, a real DI container, and a deliberate packaging decision**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Choosing the Stack
- [ ] 2. Version & Targeting
- [ ] 3. Architecture
- [ ] 4. MVVM
- [ ] 5. XAML & Performance
- [ ] 6. Packaging & Distribution
- [ ] 7. Storage, Settings & Security
- [ ] 8. Testing

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
