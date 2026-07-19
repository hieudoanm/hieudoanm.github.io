# couchbase: Validation Plan

Use this plan to verify work guided by [couchbase](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Querying N1QL without indexes → full bucket scans and timeouts
- [ ] Treating buckets like SQL schemas and over-normalizing JSON
- [ ] Ignoring **replica/durability** settings in environments that require durability guarantees
- [ ] Using a bucket per tenant at high scale — prefer a shared bucket with scope/collection partitioning
- [ ] Not planning for **garbage collection of tombstones** and expired documents (TTL)

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
