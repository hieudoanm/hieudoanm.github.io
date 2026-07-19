# Braintree Best Practices: Validation Plan

Use this plan to verify work guided by [Braintree Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Credentials server-side**: merchant ID + keys (public/private) never in the client
- [ ] **Validate nonces are from your merchant account**; protect the Drop-in token surface
- [ ] **No PAN/CCV logging**, even masked copy-paste; store transaction.id as ground truth
- [ ] Monitor:
- [ ] **webhook failures**
- [ ] **decline rates and gateway errors**
- [ ] **chargeback / dispute rates**
- [ ] **Graceful gateway outage handling** — never block a user request on the gateway sync

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
