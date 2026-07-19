# Resend Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Resend Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Verified domain with DKIM/SPF/DMARC in production (not resend.dev sender)
- [ ] One email per call; async sending; server-side only secrets
- [ ] React Email/server-rendered templates; versioned
- [ ] Webhooks consume delivered/bounced/complained/open events
- [ ] Bounces/complaints fed into suppression list
- [ ] Retry with backoff on 429/5xx; idempotency where duplicates matter
- [ ] Bounce/complaint rates monitored; domain warmed up

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
