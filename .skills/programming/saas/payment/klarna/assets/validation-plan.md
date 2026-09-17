# Klarna Best Practices: Validation Plan

Use this plan to verify work guided by [Klarna Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Credentials server-side** (username/password for API, not in browser)
- [ ] Separate **Playground and Production** credentials; never share across envs
- [ ] **No sensitive data in logs** (session/order ids ok; amounts/emails minimal)
- [ ] Monitor:
- [ ] **authorization → capture mismatch** (biggest money risk)
- [ ] **capture failures / expiries**
- [ ] **checkout abandonment**
- [ ] Region/availability: Klarna is **not available in every country** — feature-flag accordingly

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
