# apollo-client: Validation Plan

Use this plan to verify work guided by [apollo-client](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] Forgetting keyFields on types without id → wrong cache identity, stale UI
- [ ] Allowing **cache-first** everywhere for volatile data → stale sessions
- [ ] Mutating in update without read/write — shape mismatch causing console errors
- [ ] N+1 fragments or unnecessary nested queries on large collections
- [ ] Ignoring error graphQLErrors in favor of fat network errors

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
