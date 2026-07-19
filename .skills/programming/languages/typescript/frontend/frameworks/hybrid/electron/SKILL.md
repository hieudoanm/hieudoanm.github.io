---
name: "electron-best-practices"
description: "Best practices for building cross-platform desktop applications with Electron (JavaScript/TypeScript). Use when creating, structuring, or reviewing an Electron app — covers main/renderer process architecture, IPC, security, packaging, and performance."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "frontend"
  - "hybrid"
  - "electron"
when_to_use: "Use when creating, structuring, or reviewing an Electron app."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../ionic/SKILL.md"
  - "../react-native/SKILL.md"
  - "../lynx/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Electron Best Practices

Electron is a framework for building cross-platform desktop applications using web technologies. Best practice is to maintain clear separation between main and renderer processes, use secure IPC communication, optimize performance, and follow security best practices.

## When to use

Use when creating, structuring, or reviewing an Electron app.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Process separation** — maintain clear separation between main and renderer
- **Security first** — always enable context isolation and disable node integration
- **Type safety** — use TypeScript and share types between processes
- **Performance** — optimize startup time and memory usage
- **IPC communication** — use preload scripts for secure IPC
- **Testing** — test both processes and IPC communication
- [ ] Clear project structure with main/renderer/preload separation
- [ ] Context isolation enabled, node integration disabled

## Focus areas

- 1. Core Stack
- 2. Project Structure
- 3. Main Process
- 4. IPC Communication
- 5. Security
- 6. Performance
- 7. Packaging
- 8. Testing
- 9. Debugging

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
