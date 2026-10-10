# Postmark Best Practices: 4. Reliability & Operations

## Scenario

A project is working on **4. reliability & operations** for Postmark Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Retry with backoff** on 422 (validation), 429 (rate limit), and 5xx — idempotent
- 200 means **accepted**, not delivered — delivery truth is in the webhooks
- Handle **rate limits / throughput plans** deliberately
- **PII-aware**: emails are personal data — minimal retention, aligned with policy

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Operations** section of [SKILL.md](../SKILL.md).
