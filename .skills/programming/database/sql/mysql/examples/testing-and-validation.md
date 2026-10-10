# MySQL Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for MySQL Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] InnoDB, always-on primary key, explicit transactions
- [ ] Proper data types; no oversized `VARCHAR`; no `SELECT *` in production
- [ ] Indexes validated with `EXPLAIN`; no over-indexing write-heavy tables
- [ ] Foreign keys intentional; no polymorphic schemas
- [ ] Isolation levels chosen deliberately; deadlock retry handled
- [ ] Least-privilege users; parameterized SQL; no plaintext secrets
- [ ] Slow query log + connection pool tuning; short transactions

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
