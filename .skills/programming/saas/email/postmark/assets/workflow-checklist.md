# Postmark Best Practices: Workflow Checklist

A practical run sheet for applying [Postmark Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Concepts: **Send API** for transactional email; **Deposit API** (beta) for inbound/replies
- [ ] 1. Core Stack & Concepts: **Templates** (API + dashboard) for structured messages
- [ ] 2. Integration & Sending: **Use Message Streams** to separate e.g. transaction vs notification streams with independent deliverability reputation
- [ ] 2. Integration & Sending: Send **asynchronously** — never block web requests
- [ ] 3. Deliverability & Events: **Verify your sending domain** (SPF/DKIM/DMARC) before send volume ramps
- [ ] 3. Deliverability & Events: **Consume webhooks** for bounced/spam-complaint and react (unsubscribe, alert)
- [ ] 4. Reliability & Operations: **Retry with backoff** on 422 (validation), 429 (rate limit), and 5xx — idempotent
- [ ] 4. Reliability & Operations: 200 means **accepted**, not delivered — delivery truth is in the webhooks
- [ ] 5. General Rules of Thumb: **Transactional means behavioral** — Postmark is not a campaign tool
- [ ] 5. General Rules of Thumb: **Streams isolate reputation** — separate transactional from notifications

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
