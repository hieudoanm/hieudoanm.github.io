# Keycloak Best Practices: 4. Token & Integration Security

## Scenario

A project is working on **4. token & integration security** for Keycloak Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Validate access tokens locally** (RS256 + JWKS), checking `iss`/`aud`/`exp` — avoid per-request calls to Keycloak
- **Cache JWKS** and handle key rotation (re-fetch on unknown `kid`)
- Use **claims** (roles, groups, `aud`) for authorization — don't trust client-sent headers
- **Never store or log tokens**; keep refresh tokens server-side
- Protect the **Admin API** and admin account with strong auth; rotate admin credentials

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Token & Integration Security** section of [SKILL.md](../SKILL.md).
