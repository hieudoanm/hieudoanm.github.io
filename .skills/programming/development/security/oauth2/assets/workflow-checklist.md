# OAuth 2.0 Best Practices: Workflow Checklist

A practical run sheet for applying [OAuth 2.0 Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Roles** — resource owner, client, authorization server, resource server
- [ ] 1. Core Concepts: **Grant types** — authorization code, implicit, client credentials, device code, refresh token
- [ ] 2. Grant Types: **Authorization Code** — most secure for server-side apps:
- [ ] 2. Grant Types: **Authorization Code with PKCE** — for mobile and SPA apps:
- [ ] 3. Security Best Practices: **State parameter** — use state parameter to prevent CSRF:
- [ ] 3. Security Best Practices: **PKCE** — use PKCE for public clients:
- [ ] 4. Token Management: **Token storage** — store tokens securely:
- [ ] 4. Token Management: **Token refresh** — implement token refresh:
- [ ] 5. Scope Management: **Request minimal scopes** — request only necessary scopes:
- [ ] 5. Scope Management: **Scope validation** — validate scopes on resource server:

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
