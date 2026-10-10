# Mssql: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Mssql. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Design schema, clustered key, and secondary indexes per read patterns.
- [ ] Ensure SARGable predicates on hot queries (no functions on columns).
- [ ] Configure recovery model and backup schedule (full + diff + log for point-in-time).
- [ ] Enable `READ_COMMITTED_SNAPSHOT` for read-heavy concurrent workloads (or sequence apps).
- [ ] Set `MAXDOP`, memory, and tempdb files per workload.
- [ ] Add monitoring: index fragmentation, blocking, deadlocks.
- [ ] Run `STATISTICS IO/TIME`, examine and tune top queries.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
