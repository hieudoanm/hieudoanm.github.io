# Bun Runtime Best Practices: Validation Plan

Use this plan to verify work guided by [Bun Runtime Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **bun test + bun:test** is a Jest-compatible runner with zero config — describe/it/expect, beforeEach/afterEach, mocks/spies, and TS native:
- [ ] **bun test --coverage for reports** (built-in coverage provider, no extra dependency); watch mode via bun test --watch
- [ ] **Test the service boundary with real Bun.serve on a random port** (Bun.serve({ port: 0 }) → server.url) for honest integration tests — spin-up is fast enough that dockerizing every test isn't needed for small services

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
