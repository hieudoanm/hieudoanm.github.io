# libSQL Best Practices: Workflow Checklist

A practical run sheet for applying [libSQL Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: **SQLite compatibility first** — do not rely on non-portable SQL features
- [ ] 1. Core Stack & Constraints: **Design schemas that tolerate replication lag**
- [ ] 2. Data Modeling & Architecture: Prefer **stable primary keys** (UUIDs where appropriate)
- [ ] 2. Data Modeling & Architecture: **Avoid relying on write ordering across nodes**
- [ ] 3. Integrity & Safety: **Rely on SQLite constraints for local correctness**
- [ ] 3. Integrity & Safety: Understand **how constraints behave under replication** (unique/checks are local, not global)
- [ ] 4. Reliability & Performance: **Optimize for local reads** — read path should not touch the network
- [ ] 4. Reliability & Performance: **Batch writes** to reduce sync overhead
- [ ] 5. General Rules of Thumb: **SQLite semantics come first, replication second** — the core still behaves like SQLite
- [ ] 5. General Rules of Thumb: **Eventually consistent, not transparently global** — design reads for local, writes for sync

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
