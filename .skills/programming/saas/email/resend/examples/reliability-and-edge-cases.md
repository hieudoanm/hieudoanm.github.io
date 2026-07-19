# Resend Best Practices: 4. Reliability & Operations

## Scenario

A project is working on **4. reliability & operations** for Resend Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Retry with backoff on 4xx/5xx** (429 rate limit, 500) — idempotent sends only
- Handle **rate limits** explicitly; batch vs throttle according to plan
- **Secret/API key server-side only**; never in client bundles
- Keep **templates + addresses** data-separated (PII minimal; email = personal data)
- Monitor:
- **send success/failure rates**
- **bounce/complaint rates per domain**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Operations** section of [SKILL.md](../SKILL.md).
