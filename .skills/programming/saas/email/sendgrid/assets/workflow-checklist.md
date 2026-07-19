# SendGrid Best Practices: Workflow Checklist

A practical run sheet for applying [SendGrid Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Send API** (/v3/mail/send) for transactional email; **Marketing/SendGrid** for campaigns
- [ ] 1. Core Stack & Concepts: **Sender authentication**: domain verification (SPF/DKIM), optional DMARC + link-branding
- [ ] 2. Integration & Sending: **Verify and authenticate your sending domain(s)** — it is the prerequisite for deliverability
- [ ] 2. Integration & Sending: **One transactional send API** for app email; use Marketing for campaigns, not the Send API at scale
- [ ] 3. Deliverability & Events: **Consume Event Webhooks** (HTTPS POST) for delivered/bounced/spam-reports — don't poll
- [ ] 3. Deliverability & Events: Maintain a **suppression/unsubscribe list** from spam reports and unsubscribes
- [ ] 4. Reliability & Operations: **Retry with backoff** on 429 (rate-limited) and 5xx; treat 2xx as accepted (delivery is async)
- [ ] 4. Reliability & Operations: Understand **throttling** — plan send rates within your plan's limits
- [ ] 5. General Rules of Thumb: **Sender authentication first** — deliverability lives in DNS, not code
- [ ] 5. General Rules of Thumb: **Webhooks are the truth; 202 is not delivery** — manage expectations from events

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
