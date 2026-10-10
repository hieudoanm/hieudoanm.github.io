# Yarn Best Practices: Validation Plan

Use this plan to verify work guided by [Yarn Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **yarn audit wired into CI (fail on high); yarn outdated quarterly.**
- [ ] **--cascade store/cache in CI (.yarn/cache committed for PnP zero-install); auth tokens env-scoped, none inline.**
- [ ] **yarn constraints for package.json lint (Modern) — catches drift declaratively.**

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
