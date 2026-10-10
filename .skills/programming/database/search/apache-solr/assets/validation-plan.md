# apache-solr: Validation Plan

Use this plan to verify work guided by [apache-solr](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Indexing text/general fields that should be string for exact sorting/faceting
- [ ] Running schema-less mode in prod — unpredictable field types and analysis
- [ ] Full-*:* scans, missing fq usage, unbounded rows
- [ ] Under-provisioning the ZooKeeper/Cloud layer causing cluster instability

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
