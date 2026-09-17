# Pandas Best Practices: Validation Plan

Use this plan to verify work guided by [Pandas Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Vectorized ops over loops; df.to_numpy() for NumPy math, back to columns after.**
- [ ] **Categorical dtype for low-cardinality string columns (memory + speed).**
- [ ] **filters on date ranges with a DatetimeIndex (df.loc[df.index >= "2024-01-01"]) — not string compares.**
- [ ] **Parallelism: polars-style alternatives or swifter only when numpy-vectorized paths exhausted.**

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
