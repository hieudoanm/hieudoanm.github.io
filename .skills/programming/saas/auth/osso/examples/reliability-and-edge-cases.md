# Osso Best Practices: 3. Deployment & Operations

## Scenario

A project is working on **3. deployment & operations** for Osso Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Self-host with its required dependencies** (Postgres, mailer, worker) on stable infrastructure
- **TLS everywhere**; restrict administrative access
- Back up the **DB (connections + metadata) and secrets**
- Pin versions; follow upgrade notes — SAML and IdP ecosystems move
- Monitor:
- **failed SAML exchanges / certificate errors**
- **IdP metadata staleness** (certificate rotation breaks login)

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Deployment & Operations** section of [SKILL.md](../SKILL.md).
