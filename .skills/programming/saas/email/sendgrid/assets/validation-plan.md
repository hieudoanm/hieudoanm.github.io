# SendGrid Best Practices: Validation Plan

Use this plan to verify work guided by [SendGrid Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Retry with backoff** on 429 (rate-limited) and 5xx; treat 2xx as accepted (delivery is async)
- [ ] Understand **throttling** — plan send rates within your plan's limits
- [ ] Handle **async delivery** — a 202 means queued, not delivered; rely on events for truth
- [ ] Keep **template + recipient data minimal** and PII-aware
- [ ] Monitor:
- [ ] **send failure/error rates**
- [ ] **bounce + spam-report rates**
- [ ] **delivery latency (processed → delivered)**
- [ ] **webhook processing lag**

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
