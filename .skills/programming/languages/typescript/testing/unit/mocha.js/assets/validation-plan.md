# Mocha Best Practices: Validation Plan

Use this plan to verify work guided by [Mocha Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Async via async/await or explicit done — never silently ignore:**
- [ ] **A done that's never called = timeout — set this.timeout(...) realistically; always call done on every path.**
- [ ] **Rejected promises fail the spec — await expect(p).to.be.rejected (chai-as-promised).**

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
