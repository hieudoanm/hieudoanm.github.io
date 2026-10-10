# Mailgun Best Practices: 5. Reliability & Operations

## Scenario

A project is working on **5. reliability & operations** for Mailgun Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Retry with backoff** on 429/5xx; accept 200 as queued-not-delivered
- Webhook consumer must **ackonwledge quickly** and be idempotent (duplicate events happen)
- **Buffer/fail-queue** inbound processing when your endpoint is down; Mailgun retries

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Reliability & Operations** section of [SKILL.md](../SKILL.md).
