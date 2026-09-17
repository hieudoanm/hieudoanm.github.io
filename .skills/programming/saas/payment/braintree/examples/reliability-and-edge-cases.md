# Braintree Best Practices: 5. Security & Operations

## Scenario

A project is working on **5. security & operations** for Braintree Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Credentials server-side**: merchant ID + keys (public/private) never in the client
- **Validate nonces are from your merchant account**; protect the Drop-in token surface
- **No PAN/CCV logging**, even masked copy-paste; store `transaction.id` as ground truth
- Monitor:
- **webhook failures**
- **decline rates and gateway errors**
- **chargeback / dispute rates**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Security & Operations** section of [SKILL.md](../SKILL.md).
