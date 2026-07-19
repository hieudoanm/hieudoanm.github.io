# Stripe Best Practices: Validation Plan

Use this plan to verify work guided by [Stripe Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Retry with backoff** on 429 / connection errors; honor rate limits
- [ ] **Downstream idempotence**: after payment_intent.succeeded, granting access must be idempotent (dedup by event/payment ID)
- [ ] Monitor:
- [ ] **webhook failures / delivery lag**
- [ ] **failed payments & disputes**
- [ ] **balance/account negatives**
- [ ] Plan for **Stripe outages** — queues and retries over synchronous blocking

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
