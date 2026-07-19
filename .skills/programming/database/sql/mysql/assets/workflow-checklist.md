# MySQL Best Practices: Workflow Checklist

A practical run sheet for applying [MySQL Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Assume **modern MySQL (8.x)**
- [ ] 1. Core Stack & Constraints: Use **InnoDB** by default (ACID, FK support)
- [ ] 2. Data Modeling & Architecture: **Normalize unless denormalization is justified**
- [ ] 2. Data Modeling & Architecture: Use proper data types — avoid oversized VARCHAR and misuse of TEXT
- [ ] 3. Integrity, Security & Safety: Use **transactions** to guarantee consistency; choose **isolation levels** deliberately (REPEATABLE READ default vs READ COMMITTED)
- [ ] 3. Integrity, Security & Safety: **Handle deadlocks explicitly** — retry on ERROR 1213; keep transactions short
- [ ] 4. Reliability, Performance & Operations: Use **EXPLAIN / EXPLAIN ANALYZE** and monitor **slow query log**
- [ ] 4. Reliability, Performance & Operations: Add and validate indexes deliberately — every index costs writes
- [ ] 5. General Rules of Thumb: **InnoDB + explicit PK + transactions** — the non-negotiables
- [ ] 5. General Rules of Thumb: **Indexes follow query patterns**; validate with EXPLAIN

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
