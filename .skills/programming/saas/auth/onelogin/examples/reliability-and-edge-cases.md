# OneLogin Best Practices: 4. Security & Operations

## Scenario

A project is working on **4. security & operations** for OneLogin Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Enable MFA and adaptive/smart policies** for production
- Rate-limit **ACS/login endpoints**; monitor for credential stuffing
- Enforce **least-privilege roles**; audit admin usage in OneLogin
- **Never log assertions/tokens**; keep secrets server-side
- Rehearse **IdP outage handling** — local token validation keeps reads working
- Monitor:
- **SAML certificate expiry** (upstream rotation breaks login)

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Security & Operations** section of [SKILL.md](../SKILL.md).
