# Mailgun Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Mailgun Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Domain verified (SPF/DKIM); own domain in production
- [ ] One message per request; async; scoped API keys server-side
- [ ] Inbound routes parse replies/notifications to your endpoint
- [ ] Webhook + route signatures verified (HMAC)
- [ ] Suppression list maintained from bounces/unsubscribes/spam reports
- [ ] Retry with backoff on 429/5xx; 200 ≠ delivered
- [ ] Bounce/complaint rates + inbound failures monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
