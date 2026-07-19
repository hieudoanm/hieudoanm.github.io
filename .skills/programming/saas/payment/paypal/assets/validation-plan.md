# PayPal Best Practices: Validation Plan

Use this plan to verify work guided by [PayPal Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Access token cached** (don't fetch per request); scoped to your app credentials
- [ ] **Client ID/secret server-side only**; never in frontend bundles
- [ ] **OAuth2 and IPN are legacy** — prefer v2 API + REST webhooks for new integrations
- [ ] Monitor:
- [ ] **webhook failures / delivery lag**
- [ ] **capture/denial rates**
- [ ] **dispute/chargeback counts**

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
