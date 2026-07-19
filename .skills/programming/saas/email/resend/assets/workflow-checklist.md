# Resend Best Practices: Workflow Checklist

A practical run sheet for applying [Resend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **REST API + SDKs** for sending; **React Email** for composing server-rendered templates
- [ ] 1. Core Stack & Concepts: **Emails API** (/emails) for transactional send
- [ ] 2. Integration & Sending: **Send one message per call** with a clear from (verified domain, not the default onboarding@resend.dev in prod)
- [ ] 2. Integration & Sending: **Validate sender domain** — verified domain matters for deliverability
- [ ] 3. Deliverability & Events: **Configure DKIM/SPF/DMARC** in your DNS; verify the domain in the dashboard
- [ ] 3. Deliverability & Events: **Consume webhooks** to track delivered/opened/clicked/bounced/complained
- [ ] 4. Reliability & Operations: **Retry with backoff on 4xx/5xx** (429 rate limit, 500) — idempotent sends only
- [ ] 4. Reliability & Operations: Handle **rate limits** explicitly; batch vs throttle according to plan
- [ ] 5. General Rules of Thumb: **Email is a deliverability system, not just an API** — DNS verification and event handling matter more than the send call
- [ ] 5. General Rules of Thumb: **Webhooks over polling** — track lifecycle, react to bounces/complaints

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
