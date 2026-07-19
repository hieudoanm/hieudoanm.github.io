# SendGrid Best Practices: 4. Reliability & Operations

## Scenario

A project is working on **4. reliability & operations** for SendGrid Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Retry with backoff** on 429 (rate-limited) and 5xx; treat 2xx as accepted (delivery is async)
- Understand **throttling** — plan send rates within your plan's limits
- Handle **async delivery** — a 202 means queued, not delivered; rely on events for truth
- Keep **template + recipient data minimal** and PII-aware
- Monitor:
- **send failure/error rates**
- **bounce + spam-report rates**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Operations** section of [SKILL.md](../SKILL.md).
