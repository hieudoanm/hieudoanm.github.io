# Postmark Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Postmark Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Verified sender domain (SPF/DKIM/DMARC) with sender signature configured
- [ ] Transactional-only use; message streams separated by purpose
- [ ] Scoped server tokens; async sending; no client-side secrets
- [ ] Webhooks consumed for delivered/bounced/complained
- [ ] In-app suppression aligns with Postmark's automatic suppressions
- [ ] Retry with backoff on 422/429/5xx; 200 ≠ delivered
- [ ] Bounce/complaint rates monitored per stream

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
