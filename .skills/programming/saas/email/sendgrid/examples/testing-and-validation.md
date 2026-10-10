# SendGrid Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for SendGrid Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Sending domain verified (SPF/DKIM/DMARC); no naked/root defaults in prod
- [ ] Transactional via Send API or dynamic templates; Marketing for campaigns
- [ ] Scoped API keys server-side only
- [ ] Event webhooks consumed for delivered/bounced/spam-report
- [ ] Suppression list honored + maintained from events
- [ ] Retry with backoff on 429/5xx; throttle within limits
- [ ] Bounce/spam rates + latency monitored

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
