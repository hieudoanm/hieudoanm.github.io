# Better Auth Best Practices: Validation Plan

Use this plan to verify work guided by [Better Auth Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Rate-limit auth endpoints; CSRF-safe cookie flows (library default) verified for the framework.**
- [ ] **Secrets rotated; AUTH_SECRET/BETTER_AUTH_SECRET not committed.**
- [ ] **Lighthouse: multi-tenant/SSRF-sensitive flows — trust boundaries documented.**
- [ ] **Tests: integration against the pinned version; CI key rotation drill.**

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
