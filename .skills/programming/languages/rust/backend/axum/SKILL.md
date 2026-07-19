---
name: "axum-best-practices"
description: "Best practices for building Rust web services with Axum — the ergonomic web framework built on Tokio. Use when writing, structuring, or reviewing Axum — covers routing, extractors, state, error handling, middleware, and testing."
tags:
  - "programming"
  - "language"
  - "rust"
  - "backend"
  - "axum"
when_to_use: "Use when writing, structuring, or reviewing Axum."
prerequisites:
  - "Basic familiarity with Rust and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../actix/SKILL.md"
  - "../warp/SKILL.md"
  - "../gotham/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Axum Best Practices

Axum is an ergonomic web framework built on Tokio that provides a type-safe, modular API. Best practice is to leverage Axum's extractor system, use proper state management, implement error handling with IntoResponse, and follow Rust's ownership patterns for clean, performant web services.

## When to use

Use when writing, structuring, or reviewing Axum.

## Prerequisites

- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Extractors for request data; keep handlers thin.**
- **State via Arc; constructed once at startup.**
- **Error types implement IntoResponse.**
- **Tower middleware for cross-cutting concerns.**
- **SQLx for type-safe database access.**
- **Test with tower::ServiceExt.**
- **Serde for JSON serialization.**
- [ ] Router composition with state

## Focus areas

- 1. Core Stack
- 2. Project Structure
- 3. Application Setup
- 4. Routing & Handlers
- 5. State Management
- 6. Error Handling
- 7. Middleware
- 8. Database Integration
- 9. Extractors
- 10. Testing
- 11. JSON & Serialization
- 12. WebSocket Support

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
