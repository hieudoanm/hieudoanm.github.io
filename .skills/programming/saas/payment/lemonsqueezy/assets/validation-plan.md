# Lemon Squeezy Best Practices: Validation Plan

Use this plan to verify work guided by [Lemon Squeezy Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Retry/queue webhook processing** — LS retries failures; your consumer must be idempotent
- [ ] **Sandbox vs production** keys separated; webhook secret server-side only
- [ ] Monitor:
- [ ] **webhook delivery failures/lag**
- [ ] **subscription churn and payment failures**
- [ ] **refund / dispute rates**
- [ ] Mind **LS → Stripe migration** if you onboard onto Stripe-backed subscription features

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
