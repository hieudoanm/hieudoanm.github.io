# Postmark Best Practices: Overview

## Scenario

A project is working on **overview** for Postmark Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Postmark is a transactional-email-only service (it rejects marketing/bulk by policy). Best practice is using it for **behavioral, app-triggered email** with high deliverability expectations: plain send API + templates, webhooks for bounces, and strict suppression handling.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
