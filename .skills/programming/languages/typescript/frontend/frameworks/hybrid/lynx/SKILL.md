---
name: "lynx-best-practices"
description: "Best practices for building applications with Lynx (React Native web runtime). Use when creating, structuring, or reviewing Lynx applications — covers components, navigation, web runtime integration, and performance."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "hybrid"
  - "lynx"
when_to_use: "Use when creating, structuring, or reviewing Lynx applications."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../react-native/SKILL.md"
  - "../ionic/SKILL.md"
  - "../electron/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Lynx Best Practices

Lynx is a React Native-based web runtime that allows React Native applications to run in web browsers. Best practice is to write React Native code that works across platforms, handle web-specific differences, and optimize for web performance.

## When to use

Use when creating, structuring, or reviewing Lynx applications.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Cross-platform first** — write code that works across platforms
- **Platform detection** — detect platform for platform-specific behavior
- **Web optimization** — optimize for web performance
- **React Native components** — use React Native components
- **State management** — use appropriate state management solution
- **Testing** — test both native and web functionality
- [ ] React Native components used consistently
- [ ] Platform detection for platform-specific code

## Focus areas

- 1. Core Stack
- 2. Component Structure
- 3. Web Runtime Integration
- 4. Navigation
- 5. Performance
- 6. Styling
- 7. State Management
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
