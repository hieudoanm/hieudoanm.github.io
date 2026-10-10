# Auth0 Best Practices: Validation Plan

Use this plan to verify work guided by [Auth0 Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] **Enable MFA** for production users; enforce for elevated roles
- [ ] **Enable brute-force protection and bot detection** for the login endpoints
- [ ] **Rate-limit your own token/authorization endpoints** — Auth0 rate limits apply per tenant
- [ ] **Never log tokens or secrets**; store refresh tokens server-side, not in localStorage
- [ ] **Apply least-privilege to M2M clients** — scoped clients, no wildcard grants
- [ ] Use **custom claims/sponsors** to carry authorization data only after defining the contract
- [ ] Handle **JWKS fetch caching** (keys rotate); fall back to re-fetch on kid unknown
- [ ] **Gracefully handle auth outages** — token validation is local; only login/refresh needs the provider
- [ ] Monitor:
- [ ] **failed logins** and rate-limit rejections

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
