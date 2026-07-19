# Square Best Practices: Overview

## Scenario

A project is working on **overview** for Square Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Square provides commerce APIs (Payments, Subscriptions, Invoicing, Catalog). Best practice is using **access tokens scoped to a seller**, the **Payments API** with idempotency, hosted/fast checkout to avoid raw card handling, and **webhooks** as the source of payment truth.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
