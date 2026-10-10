# MariaDB Best Practices: Workflow Checklist

A practical run sheet for applying [MariaDB Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Assume **modern MariaDB (10.6+)**
- [ ] 1. Core Stack & Constraints: **Choose storage engines explicitly** per workload
- [ ] 2. Data Modeling & Architecture: **Normalize unless denormalization is justified**
- [ ] 2. Data Modeling & Architecture: Select engines per workload — **OLTP vs analytics** differ
- [ ] 3. Integrity, Security & Safety: Use **transactions** to ensure consistency; select **isolation levels** consciously
- [ ] 3. Integrity, Security & Safety: **Handle deadlocks explicitly** — retry, keep transactions short
- [ ] 4. Reliability, Performance & Operations: Use **EXPLAIN** and engine-specific diagnostics
- [ ] 4. Reliability, Performance & Operations: Monitor **slow queries and lock waits**
- [ ] 5. General Rules of Thumb: **MariaDB is its own database** — verify MySQL assumptions that may not hold
- [ ] 5. General Rules of Thumb: **Engines are a workload decision** — OLTP vs analytics must not be an accident

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
