# npm Best Practices: Validation Plan

Use this plan to verify work guided by [npm Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **npm audit wired into CI (fail on high+); npm outdated quarterly:**
- [ ] **Trust the provenance: prefer scoped/official packages; avoid tall dependency trees that drift; overrides only with a reason documented.**
- [ ] **Registry mirrors (Verdaccio/proxy) for orgs; SSRF feel. Least-privilege tokens.**

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
