# PayPal Best Practices: Overview

## Scenario

A project is working on **overview** for PayPal Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

PayPal offers checkout and merchant APIs (REST v2 Orders/Catalog/Subscriptions) plus the classic flow. Best practice is using the **Orders v2 API** for modern checkout, **verifying webhooks** for order/billing state, and reconciling against the order ID rather than trusting client callbacks.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
