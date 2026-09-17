# MongoDB Best Practices: Workflow Checklist

A practical run sheet for applying [MongoDB Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: MongoDB **6+**
- [ ] 1. Core Stack & Constraints: **Design schema before writing queries**
- [ ] 2. Data Modeling & Architecture: Model data around **query patterns**, not entities
- [ ] 2. Data Modeling & Architecture: **Prefer embedding for one-to-few** relationships; **referencing for many-to-many or large fan-outs**
- [ ] 3. Security & Data Integrity: **Never expose MongoDB directly to the public internet**
- [ ] 3. Security & Data Integrity: Enable **authentication + role-based access control**; least-privilege users
- [ ] 4. Reliability & Performance: **Index all frequently queried fields**; understand index selectivity
- [ ] 4. Reliability & Performance: Monitor **slow queries and query plans** (db.currentOp, profiler)
- [ ] 5. General Rules of Thumb: **Schema first, queries second** — design is the product, not an afterthought
- [ ] 5. General Rules of Thumb: **Embed or reference by access pattern**, not purity

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
