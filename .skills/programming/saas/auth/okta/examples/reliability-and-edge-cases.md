# Okta Best Practices: 4. Security & Operations

## Scenario

A project is working on **4. security & operations** for Okta Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Enable MFA + adaptive auth policies** for production
- **Rate-limit login endpoints**; monitor for credential-stuffing
- **Never store or log tokens**; refresh tokens server-side
- **Least-privilege scopes and groups** — no wildcard grants
- Rehearse **SSO outage handling** — validate tokens locally so reads work while the IdP is down

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Security & Operations** section of [SKILL.md](../SKILL.md).
