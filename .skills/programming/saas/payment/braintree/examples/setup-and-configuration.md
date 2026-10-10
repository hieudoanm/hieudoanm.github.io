# Braintree Best Practices: Overview

## Scenario

A project is working on **overview** for Braintree Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Braintree is a payments gateway with a strong async-first API and owned by PayPal. Best practice is keeping the **card/sensitive data out of your server** (client token + Drop-in UI), running transaction requests server-side with idempotency, and consuming **webhooks** for state changes.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
