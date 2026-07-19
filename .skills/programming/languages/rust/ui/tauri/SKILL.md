---
name: "tauri-best-practices"
description: "Best practices for building cross-platform desktop applications with Tauri (Rust + web frontend). Use when creating, structuring, or reviewing a Tauri app — covers app structure, commands, state management, security, and frontend integration."
tags:
  - "programming"
  - "language"
  - "rust"
  - "ui"
  - "tauri"
when_to_use: "Use when creating, structuring, or reviewing a Tauri app."
prerequisites:
  - "Basic familiarity with Rust and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../slint/SKILL.md"
  - "../../../typescript/frontend/frameworks/hybrid/electron/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Tauri Best Practices

Tauri is a framework for building tiny, fast binaries for all major desktop platforms using a web frontend. Best practice is to leverage Rust's safety and performance while maintaining a clean separation between the Rust backend and web frontend, with secure command passing and proper state management.

## When to use

Use when creating, structuring, or reviewing a Tauri app.

## Prerequisites

- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Separate concerns** — keep Rust backend and web frontend separate
- **Type safety** — use TypeScript and Rust's type system
- **Security first** — validate all input, follow least privilege
- **Performance** — leverage Rust's performance for heavy operations
- **Error handling** — use Result for proper error handling
- **Testing** — test both Rust commands and frontend integration
- [ ] Proper project structure with src-tauri/ and src/
- [ ] Commands organized in modules by domain

## Focus areas

- 1. Core Stack
- 2. Project Structure
- 3. Tauri Commands
- 4. State Management
- 5. Frontend Integration
- 6. Security
- 7. Window Management
- 8. System Integration
- 9. Testing
- 10. Build & Distribution

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
