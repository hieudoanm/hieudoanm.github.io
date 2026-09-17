# SQLite Best Practices: Workflow Checklist

A practical run sheet for applying [SQLite Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: SQLite **3.x**
- [ ] 1. Core Stack & Constraints: Use **explicit schemas** — no implicit typing assumptions
- [ ] 2. Data Modeling & Architecture: **Normalize unless denormalization is justified**
- [ ] 2. Data Modeling & Architecture: Use proper primary keys — INTEGER PRIMARY KEY when appropriate, UUIDs when portability matters
- [ ] 3. Integrity & Safety: **Always enable foreign keys**
- [ ] 3. Integrity & Safety: Use transactions to preserve consistency; **batch writes inside transactions**
- [ ] 4. Reliability & Performance: **Index frequently queried columns**; avoid full table scans in hot paths
- [ ] 4. Reliability & Performance: Validate queries with **EXPLAIN QUERY PLAN** (SQLite has no EXPLAIN ANALYZE)
- [ ] 5. General Rules of Thumb: **Know when SQLite is (not) appropriate** — embedded/local workloads yes; multi-writer server no
- [ ] 5. General Rules of Thumb: **File-based implications are real** — backing up an open DB corrupts it

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
