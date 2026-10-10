# Chart.js Best Practices: Validation Plan

Use this plan to verify work guided by [Chart.js Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Large datasets: down-sample/aggregate before render (Chart.js is canvas but still rsps).**
- [ ] **decimation plugin for streaming; animation: false for bulk updates.**
- [ ] **Reuse chart instances; destroy unused — repeated mounts leak canvas listeners.**

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
