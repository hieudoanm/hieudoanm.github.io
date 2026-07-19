# Auth0 Best Practices: 3. Security

## Scenario

A project is working on **3. security** for Auth0 Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Enable MFA** for production users; enforce for elevated roles
- **Enable brute-force protection and bot detection** for the login endpoints
- **Rate-limit your own token/authorization endpoints** — Auth0 rate limits apply per tenant
- **Never log tokens or secrets**; store refresh tokens server-side, not in localStorage
- **Apply least-privilege to M2M clients** — scoped clients, no wildcard grants
- Use **custom claims/sponsors** to carry authorization data only after defining the contract

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Security** section of [SKILL.md](../SKILL.md).
