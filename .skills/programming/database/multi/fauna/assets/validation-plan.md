# fauna: Validation Plan

Use this plan to verify work guided by [fauna](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] It is a managed service — no installation; use the web dashboard or CLI (fauna npm)
- [ ] Driver: official fauna-js (ESM, FQL, or legacy fql-lite)
- [ ] Deploy code with fauna/fauna shell; use respitory connection via the dashboard env vars
- [ ] Backups: Fauna has automatic rollback/windowing; configure retention settings
- [ ] Using FQL like SQL with implicit JOINs on every document → documented read amplification
- [ ] Indexing everything—individual index cost and schema drift
- [ ] Forgetting temporal reads — you might overwrite a value and lose history if access is restricted
- [ ] Building complex relational joins when a document-shaped graph fits better
- [ ] Not understanding the pricing model (queries measured per read + compute units)

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
