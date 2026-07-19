# Klarna Best Practices: Overview

## Scenario

A project is working on **overview** for Klarna Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Klarna offers **Checkout (v2), Payment (v3), and Pay Later** products. Best practice is session-first integration: create a **Checkout Session** server-side, the client renders the iframe, your server **captures/holds the order** after authorization, and **webhooks** tell you the final state.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
