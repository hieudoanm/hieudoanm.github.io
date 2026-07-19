# dgraph: Validation Plan

Use this plan to verify work guided by [dgraph](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Not declaring indexes in the schema, then wondering why filters do a full scan
- [ ] Over-fetching nested data with deep traversals; add pagination/limits
- [ ] Using DQL where GraphQL suffices — GraphQL is more constrained and easier to maintain
- [ ] Forgetting @cascade when you need strict join semantics
- [ ] Ignoring @upsert and getting duplicate edges under concurrent mutations

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
