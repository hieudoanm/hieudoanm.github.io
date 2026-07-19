# RevenueCat Best Practices: Validation Plan

Use this plan to verify work guided by [RevenueCat Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Verify webhook auth** (Authorization: Bearer RC Webhook Secret) before processing
- [ ] **Idempotent webhook handling** — dedup by event id; retries expected
- [ ] **Reconcile periodically** via GET /subscribers to catch lag between webhooks and truth
- [ ] Monitor:
- [ ] **entitlement grant/revoke spikes**
- [ ] **webhook failures / delivery lag**
- [ ] **trial conversion and churn**
- [ ] **Secrets server-side**; RC API key scoped, rotated; no receipts/keys logged

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
