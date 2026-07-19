# Mailgun Best Practices: Workflow Checklist

A practical run sheet for applying [Mailgun Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Send API** for transactional email; **Message Login/Retry** for rebuilds
- [ ] 1. Core Stack & Concepts: **Sending**: REST send, MIME support, template variables
- [ ] 2. Sending Integration: **Verify your domain** (SPF/DKIM) and use a domain you control (not mailgun.org) in production
- [ ] 2. Sending Integration: Send **one message per request**; async, off the hot path
- [ ] 3. Inbound & Processing: Configure **inbound routes** (catch_all / specific addresses) to POST parsed events to your endpoint
- [ ] 3. Inbound & Processing: **Verify webhook signatures** (HMAC) before trusting data
- [ ] 4. Deliverability & Events: **Consume webhooks** and maintain suppression for bounces/unsubscribes/spam reports
- [ ] 4. Deliverability & Events: **Stop sending to hard-bounced/complained addresses**
- [ ] 5. Reliability & Operations: **Retry with backoff** on 429/5xx; accept 200 as queued-not-delivered
- [ ] 5. Reliability & Operations: Webhook consumer must **ackonwledge quickly** and be idempotent (duplicate events happen)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
