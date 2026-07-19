# Square Best Practices: Validation Plan

Use this plan to verify work guided by [Square Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Per-seller tokens** — separate access tokens per merchant/location, rotated
- [ ] **Never log card data or tokens**; store only payment/order IDs
- [ ] **Location awareness**: payments are against a location — choose the right one
- [ ] **Secrets and tokens server-side only**; never in the client bundle
- [ ] **Retry with backoff** on rate limits (429) and transient errors, using fresh idempotency keys
- [ ] Monitor:
- [ ] **webhook delivery failures**
- [ ] **payment failures / declines**
- [ ] **subscription cancellations and retry failures**
- [ ] Plan for **Square outages** — queue + retry over blocking the request path

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
