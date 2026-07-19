---
name: "jwt-best-practices"
description: "Best practices for implementing JSON Web Tokens (JWT) for authentication and authorization. Use when designing, implementing, or reviewing JWT implementations — covers token generation, validation, security considerations, and token management."
tags:
  - "programming"
  - "development"
  - "security"
  - "jwt"
when_to_use: "Use when designing, implementing, or reviewing JWT implementations."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../oauth2/SKILL.md"
  - "../oidc/SKILL.md"
  - "../../architecture/hexagonal/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# JWT Best Practices

JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between parties. Best practice is to use JWTs with proper security measures, implement proper validation, handle token lifecycle correctly, and follow security best practices.

## When to use

Use when designing, implementing, or reviewing JWT implementations.

## Prerequisites

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Strong algorithms** — use RS256 or ES256
- **Short expiration** — access tokens should expire quickly
- **Refresh tokens** — use refresh tokens for long-lived sessions
- **Secure storage** — store tokens securely (HTTP-only cookies)
- **Token revocation** — implement token revocation
- **HTTPS only** — always use HTTPS in production
- [ ] Strong signing algorithm (RS256/ES256)
- [ ] Short access token expiration (15 minutes)

## Focus areas

- 1. Core Concepts
- 2. JWT Structure
- 3. Token Generation
- 4. Token Validation
- 5. Token Storage
- 6. Token Refresh
- 7. Security Best Practices
- 8. Implementation Examples
- 9. Common Vulnerabilities
- 10. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
