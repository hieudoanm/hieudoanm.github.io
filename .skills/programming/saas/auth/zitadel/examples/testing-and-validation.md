# ZITADEL Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for ZITADEL Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Instance/org/project/grants modeled to match your tenancy
- [ ] OIDC flows correct: PKCE public clients, `client_credentials` M2M
- [ ] Access tokens validated locally (JWKS cached) — `iss`/`aud`/`exp`
- [ ] Authorization from claims/grants; no client-supplied headers
- [ ] MFA/passwordless + lockout policies enabled; admin access secured
- [ ] No token/secret logging; refresh tokens server-side
- [ ] Backups + HA planned; key rotation and failures monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
