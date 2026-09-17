# OpenID Connect Best Practices: Workflow Checklist

A practical run sheet for applying [OpenID Connect Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **OIDC vs OAuth 2.0** — OIDC adds authentication to OAuth 2.0 authorization
- [ ] 1. Core Concepts: **ID Token** — JWT that contains user identity information
- [ ] 2. OIDC Flows: **Authorization Code Flow** — recommended for server-side apps:
- [ ] 2. OIDC Flows: **Authorization Code Flow with PKCE** — for mobile and SPA apps:
- [ ] 3. ID Token Validation: **ID token structure** — ID token is a JWT with specific claims:
- [ ] 3. ID Token Validation: **ID token validation** — validate ID token properly:
- [ ] 4. Claims Handling: **Standard claims** — handle standard OIDC claims:
- [ ] 4. Claims Handling: **Custom claims** — handle custom claims:
- [ ] 5. UserInfo Endpoint: **UserInfo request** — request additional user information:
- [ ] 5. UserInfo Endpoint: **UserInfo claims** — handle UserInfo response:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
