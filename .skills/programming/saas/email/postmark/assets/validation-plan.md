# Postmark Best Practices: Validation Plan

Use this plan to verify work guided by [Postmark Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Retry with backoff** on 422 (validation), 429 (rate limit), and 5xx — idempotent
- [ ] 200 means **accepted**, not delivered — delivery truth is in the webhooks
- [ ] Handle **rate limits / throughput plans** deliberately
- [ ] **PII-aware**: emails are personal data — minimal retention, aligned with policy

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
