# Auth0 Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Auth0 Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] OIDC/OAuth2 flows chosen correctly (PKCE for public clients, M2M for services)
- [ ] Access tokens validated locally via JWKS — signature, issuer, audience, expiry
- [ ] Client secrets server-side only; no secrets in the browser
- [ ] MFA enforced; brute-force/bot protection enabled
- [ ] Least-privilege scopes for API/M2M clients
- [ ] JWKS cached with re-fetch on rotation; no token/secret logging
- [ ] Rate limits understood; auth outage handled gracefully

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
