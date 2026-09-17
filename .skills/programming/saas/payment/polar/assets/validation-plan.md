# Polar Best Practices: Validation Plan

Use this plan to verify work guided by [Polar Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Retry/backoff webhook consumer**; idempotent handlers (dedup by event id)
- [ ] Persist **order/subscription ids** in your DB as ground truth for support/refund handling
- [ ] **Sandbox vs production** separated; webhook secret server-side only
- [ ] Monitor:
- [ ] **webhook failures / lag**
- [ ] **subscription churn and failed renewals**
- [ ] **benefit grant failures** (license generation, repo invite)
- [ ] **MoR tax handling** means leaning on Polar's invoices, not your own VAT logic

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
