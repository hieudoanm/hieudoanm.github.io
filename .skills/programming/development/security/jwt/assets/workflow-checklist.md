# JWT Best Practices: Workflow Checklist

A practical run sheet for applying [JWT Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **JWT structure** — JWT consists of three parts: header, payload, and signature
- [ ] 1. Core Concepts: **Signing algorithms** — use strong signing algorithms (RS256, ES256)
- [ ] 2. JWT Structure: **Header** — contains algorithm and token type:
- [ ] 2. JWT Structure: **Payload** — contains claims:
- [ ] 3. Token Generation: **Access token generation** — generate access tokens:
- [ ] 3. Token Generation: **Refresh token generation** — generate refresh tokens:
- [ ] 4. Token Validation: **Token validation** — validate JWT tokens:
- [ ] 4. Token Validation: **Asymmetric validation** — validate with public key:
- [ ] 5. Token Storage: **HTTP-only cookies** — store tokens in HTTP-only cookies:
- [ ] 5. Token Storage: **Local storage** — store tokens in local storage (less secure):

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
