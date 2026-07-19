# Recharts Best Practices: Validation Plan

Use this plan to verify work guided by [Recharts Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **isAnimationActive toggle for bulk/inital — animation cost is real:**
- [ ] **Memoize heavy chart children (React.memo) where data props scalar-fluent.**
- [ ] **Aggregate/down-sample before prop-drilling into charts; cap series count.**

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
