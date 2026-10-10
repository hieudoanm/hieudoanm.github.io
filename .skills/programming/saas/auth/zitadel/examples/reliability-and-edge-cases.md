# ZITADEL Best Practices: 4. Security & Operations

## Scenario

A project is working on **4. security & operations** for ZITADEL Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Enable MFA and passwordless** (passkeys) per policy; enforce for admins
- **Brute-force protection and lockout policies** configured
- Secure the **admin (console/API)** surface; least-privilege machine users
- **Backups and HA** are part of operations — event-sourced store still needs consistent backups
- Monitor:
- **login failures/lockouts**
- **JWKS/key rotation errors**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Security & Operations** section of [SKILL.md](../SKILL.md).
