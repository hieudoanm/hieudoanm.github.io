# Auth0 Best Practices: 4. Reliability & Operations

## Scenario

A project is working on **4. reliability & operations** for Auth0 Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Handle **JWKS fetch caching** (keys rotate); fall back to re-fetch on `kid` unknown
- **Gracefully handle auth outages** — token validation is local; only login/refresh needs the provider
- Monitor:
- **failed logins** and rate-limit rejections
- **signing-key caching errors**
- **MFA/brute-force events**
- Store tenant/config in env; use dedicated tenants for prod vs dev

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Operations** section of [SKILL.md](../SKILL.md).
