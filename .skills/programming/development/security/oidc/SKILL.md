---
name: "oidc-best-practices"
description: "Best practices for implementing OpenID Connect (OIDC) for authentication. Use when designing, implementing, or reviewing OIDC implementations — covers authentication flows, token validation, claims handling, and security considerations."
tags:
  - "programming"
  - "development"
  - "security"
  - "oidc"
when_to_use: "Use when designing, implementing, or reviewing OIDC implementations."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../jwt/SKILL.md"
  - "../oauth2/SKILL.md"
  - "../../architecture/cqrs/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# OpenID Connect Best Practices

OpenID Connect (OIDC) is an authentication layer built on top of OAuth 2.0. Best practice is to use OIDC for authentication, implement proper ID token validation, handle claims correctly, and follow OIDC security best practices.

## When to use

Use when designing, implementing, or reviewing OIDC implementations.

## Prerequisites

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Authorization Code Flow** — use authorization code flow
- **PKCE** — use PKCE for public clients
- **Nonce validation** — always validate nonce
- **State parameter** — always use state parameter
- **ID token validation** — validate all ID token claims
- **HTTPS** — enforce HTTPS for all OIDC flows
- **Discovery** — use discovery document
- **Logout** — implement proper logout

## Focus areas

- 1. Core Concepts
- 2. OIDC Flows
- 3. ID Token Validation
- 4. Claims Handling
- 5. UserInfo Endpoint
- 6. Discovery
- 7. Session Management
- 8. Logout
- 9. Security Best Practices
- 10. Implementation Examples
- 11. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
