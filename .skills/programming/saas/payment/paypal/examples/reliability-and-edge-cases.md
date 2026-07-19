# PayPal Best Practices: 5. Security & Operations

## Scenario

A project is working on **5. security & operations** for PayPal Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Access token cached** (don't fetch per request); scoped to your app credentials
- **Client ID/secret server-side only**; never in frontend bundles
- **OAuth2 and IPN are legacy** — prefer v2 API + REST webhooks for new integrations
- Monitor:
- **webhook failures / delivery lag**
- **capture/denial rates**
- **dispute/chargeback counts**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Security & Operations** section of [SKILL.md](../SKILL.md).
