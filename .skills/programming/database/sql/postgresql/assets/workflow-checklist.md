# PostgreSQL Best Practices: Workflow Checklist

A practical run sheet for applying [PostgreSQL Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Assume **PostgreSQL 13+** unless stated otherwise
- [ ] 1. Core Stack & Constraints: Use **parameterized queries** — never string-interpolate values
- [ ] 2. Data Modeling & Architecture: **Normalize by default; denormalize intentionally**
- [ ] 2. Data Modeling & Architecture: Choose correct types: uuid, timestamptz, numeric — not oversized text
- [ ] 3. Integrity & Safety: Use **transactions** for multi-step operations
- [ ] 3. Integrity & Safety: Understand **isolation levels** and locking (READ COMMITTED default; SERIALIZABLE when needed)
- [ ] 4. Reliability & Performance: **Index based on real queries** — not guesses
- [ ] 4. Reliability & Performance: **Avoid over-indexing write-heavy tables** (every index costs writes)
- [ ] 5. Security: Parameterized queries against SQL injection — **always**
- [ ] 5. Security: Least-privilege roles; separate read/write users

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
