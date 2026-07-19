# Zustand Best Practices: Validation Plan

Use this plan to verify work guided by [Zustand Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Store tests run without React — plain model tests:**
- [ ] **Reset per test** (useX.setState(initial)); async actions tested with fetch mocked
- [ ] **Selector stability tested** (useShallow snapshots equivalent data → no re-render) where perf matters

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
