# optimistic concurrency: create, then always send _rev back on update: Validation Plan

Use this plan to verify work guided by [optimistic concurrency: create, then always send _rev back on update](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Ignoring _rev and generating 409 conflicts — always marshal from latest revision
- [ ] Building views that emit for every document — this creates huge indexes and slows replication
- [ ] Using CouchDB as a relational DB with joins and transactions
- [ ] Letting attachment blobs clog the database — prefer external storage or large _attachment limits
- [ ] Not resolving conflicts: they silently accumulate and can cause data inconsistency

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
