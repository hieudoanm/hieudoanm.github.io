# SQLite Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for SQLite Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Explicit schemas; foreign keys enabled; `NOT NULL` + defaults explicit
- [ ] WAL mode for concurrent reads; journaling understood
- [ ] Transactions around multi-step/batched writes; no per-row autocommit
- [ ] Not used as a multi-writer server DB; write concurrency kept low
- [ ] No in-place file copies while open — backup via API/snapshot
- [ ] Indexes on hot query columns; `EXPLAIN QUERY PLAN` validation
- [ ] Versioned migrations; `busy_timeout`/locking behavior understood

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
