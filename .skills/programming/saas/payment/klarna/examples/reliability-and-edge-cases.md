# Klarna Best Practices: 5. Security & Operations

## Scenario

A project is working on **5. security & operations** for Klarna Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Credentials server-side** (username/password for API, not in browser)
- Separate **Playground and Production** credentials; never share across envs
- **No sensitive data in logs** (session/order ids ok; amounts/emails minimal)
- Monitor:
- **authorization → capture mismatch** (biggest money risk)
- **capture failures / expiries**
- **checkout abandonment**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Security & Operations** section of [SKILL.md](../SKILL.md).
