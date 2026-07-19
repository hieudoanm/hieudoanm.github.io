# Dodo Payments Best Practices: Overview

## Scenario

A project is working on **overview** for Dodo Payments Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Dodo Payments is a payments platform (payments + subscriptions, checkout links/SDK). Best practice is the standard payment-service contract: **server-side session/checkout**, **webhook signatures verified**, **idempotent entitlement grants**, and **no client-trusted amounts**.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
