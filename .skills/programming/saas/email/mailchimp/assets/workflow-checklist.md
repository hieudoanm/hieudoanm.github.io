# Mailchimp Best Practices: Workflow Checklist

A practical run sheet for applying [Mailchimp Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Audiences** (lists) with tags/segments for targeting
- [ ] 1. Core Stack & Concepts: **Campaigns** (bulk email), **automations** (triggered journeys), **templates**
- [ ] 2. Integration & Audience Management: **Sync audiences from your app via API** (marketing-consent opt-ins only; use subscriber status properly)
- [ ] 2. Integration & Audience Management: Use **tags and segments** rather than duplicate lists
- [ ] 3. Campaigns & Automation: Prefer **automations** for lifecycle/journey mail (welcome, onboarding, re-engagement)
- [ ] 3. Campaigns & Automation: Use **campaigns** for deliberate sends (digests, newsletters) — not every app event
- [ ] 4. Deliverability & Compliance: **Verify your sending domain** (SPF/DKIM/DMARC in Mailchimp settings)
- [ ] 4. Deliverability & Compliance: **Consent matters**: only send to opted-in audiences; honor unsubscribe
- [ ] 5. General Rules of Thumb: **Marketing owns Mailchimp; transactional lives elsewhere** — the clean split
- [ ] 5. General Rules of Thumb: **Consent is data** — status and tags are your targeting contract

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
