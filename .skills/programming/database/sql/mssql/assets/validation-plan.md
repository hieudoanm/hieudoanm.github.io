# mssql: Validation Plan

Use this plan to verify work guided by [mssql](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Missing or redundant indexes; using SELECT *
- [ ] Fill factor puzzles without a concrete case (rarely needed)
- [ ] Implicit conversions of indexed columns (WHERE int_col = '1') making indexes useless
- [ ] NOLOCK everywhere for performance, shipping unbounded dirty reads
- [ ] Rare/nonexistent point-in-time restore — missing log backups

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
