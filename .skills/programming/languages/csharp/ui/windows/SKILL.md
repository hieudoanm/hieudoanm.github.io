---
name: "windows-best-practices"
description: "Best practices for building Windows desktop apps with the Windows App SDK and WinUI 3 — architecture, MVVM, x:Bind, packaging, windowing, and testing. Use when creating, structuring, or reviewing a Windows app in C#."
tags:
  - "programming"
  - "language"
  - "csharp"
  - "ui"
  - "windows"
when_to_use: "Use when creating, structuring, or reviewing a Windows app in C#."
prerequisites:
  - "Basic familiarity with C# and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../../dotnet/SKILL.md"
  - "../../game/unity/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Windows App Development

Windows desktop development in C# has converged on the **Windows App SDK**: a NuGet-distributed framework providing WinUI 3, the modern Fluent UI, plus modern windowing, notifications, and AI APIs. It is the recommended platform for new Windows apps, and it can be adopted by existing WPF, Windows Forms, and Win32 apps for platform features without a rewrite. Practical Windows app work leans on **MVVM with the CommunityToolkit source generators, x:Bind instead of {Binding}, a real DI container, and a deliberate packaging decision**.

_Verified against Windows App SDK 2.4.0 (stable, Aug...

## When to use

Use when creating, structuring, or reviewing a Windows app in C#.

## Prerequisites

- Basic familiarity with C# and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **{Binding} where x:Bind works**, giving up compiled bindings, reflection, and build-time rename checking
- **A Visibility-toggled mega-tree** instead of x:Load="False" and separate UserControls
- **A ViewModel referencing Page, Window, or ContentDialog**, which makes the layer untestable and the app unportable
- **Hand-written INotifyPropertyChanged and ICommand** when the MVVM source generators do it at compile time
- **Returning null from a service locator**, converting a registration mistake into a NullReferenceException three pages away
- **Leaving AnyCPU**, which self-contained builds reject
- **Choosing the packaging model after writing the features**, then discovering you cannot call the notification APIs
- **Committing a signing certificate or password.**

## Focus areas

- 1. Choosing the Stack
- 2. Version & Targeting
- 3. Architecture
- 4. MVVM
- 5. XAML & Performance
- 6. Packaging & Distribution
- 7. Storage, Settings & Security
- 8. Testing
- 9. AI & Newer Platform APIs
- 10. Common Pitfalls

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
