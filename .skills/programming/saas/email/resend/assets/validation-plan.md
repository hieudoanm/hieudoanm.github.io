# Resend Best Practices: Validation Plan

Use this plan to verify work guided by [Resend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Retry with backoff on 4xx/5xx** (429 rate limit, 500) — idempotent sends only
- [ ] Handle **rate limits** explicitly; batch vs throttle according to plan
- [ ] **Secret/API key server-side only**; never in client bundles
- [ ] Keep **templates + addresses** data-separated (PII minimal; email = personal data)
- [ ] Monitor:
- [ ] **send success/failure rates**
- [ ] **bounce/complaint rates per domain**
- [ ] **webhook processing lag**
- [ ] **Log event IDs**, not full payloads; keep privacy in mind

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
