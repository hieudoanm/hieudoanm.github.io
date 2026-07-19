# Dodo Payments Best Practices: Validation Plan

Use this plan to verify work guided by [Dodo Payments Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **API/webhook secrets server-side only**; never in the client
- [ ] Store **payment/subscription ids + metadata** for reconciliation and support
- [ ] **No raw payment data in logs**; keep amounts/ids minimal
- [ ] **Sandbox (test) vs production** separated; use test keys for integration work
- [ ] **Retry with backoff** on rate limits and transient errors; idempotent calls
- [ ] **Queue webhook processing** — a failure shouldn't lose entitlement events
- [ ] Monitor:
- [ ] **webhook delivery failures / lag**
- [ ] **payment failures and declines**
- [ ] **subscription churn / failed renewals**

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
