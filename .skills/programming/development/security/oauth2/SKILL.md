---
name: "oauth2-best-practices"
description: "Best practices for implementing OAuth 2.0 for authorization. Use when designing, implementing, or reviewing OAuth 2.0 implementations — covers grant types, token management, security considerations, and integration patterns."
tags:
  - "programming"
  - "development"
  - "security"
  - "oauth2"
when_to_use: "Use when designing, implementing, or reviewing OAuth 2.0 implementations."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../jwt/SKILL.md"
  - "../oidc/SKILL.md"
  - "../../architecture/hexagonal/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# OAuth 2.0 Best Practices

OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts. Best practice is to use appropriate grant types, implement proper security measures, handle tokens securely, and follow OAuth 2.0 security best practices.

## When to use

Use when designing, implementing, or reviewing OAuth 2.0 implementations.

## Prerequisites

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Authorization Code** — use authorization code grant for server-side apps
- **PKCE** — use PKCE for public clients
- **State parameter** — always use state parameter
- **HTTPS** — enforce HTTPS for all OAuth flows
- **Minimal scopes** — request only necessary scopes
- **Token storage** — store tokens securely
- **Token refresh** — implement token refresh
- **Error handling** — handle OAuth errors properly

## Focus areas

- 1. Core Concepts
- 2. Grant Types
- 3. Security Best Practices
- 4. Token Management
- 5. Scope Management
- 6. Client Registration
- 7. Error Handling
- 8. Implementation Examples
- 9. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
