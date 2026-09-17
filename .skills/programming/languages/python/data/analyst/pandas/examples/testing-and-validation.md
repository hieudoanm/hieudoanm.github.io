# Pandas Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Pandas Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `dtype`/`parse_dates` at read; schema check first
- [ ] `df.loc`/boolean masks; no chained-index writes
- [ ] Column ops vectorized; `groupby().agg`; `.apply` only for row-wise logic
- [ ] Merges with explicit `on`/`how`; key cardinality verified
- [ ] Categorical dtype used; date range filters on DatetimeIndex
- [ ] Named `assign` steps + parquet checkpoints; small-frame tests

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
