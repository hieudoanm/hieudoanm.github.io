# Pandas Best Practices: Workflow Checklist

A practical run sheet for applying [Pandas Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Reading & Clean Types: **Declare dtypes at read — dtype=, parse_dates=, usecols= minimize post-import fixing:**
- [ ] 1. Reading & Clean Types: **pd.read_parquet/to_parquet for storage efficiency; explicit dtype maps for schema.**
- [ ] 2. Indexing & Selection: **.loc/.iloc for label/position selection; boolean masks for filtering:**
- [ ] 2. Indexing & Selection: **df.query("role == 'admin' and active") for readable filters.**
- [ ] 3. Transformations: **Column ops vectorized, assign for column-building:**
- [ ] 3. Transformations: **groupby(...).agg({"amount": "sum", "count": "count"}) over frigid loop-hammers.**
- [ ] 4. Tidy Data & Merges: **One column per variable; pivot/unstack only to reshape the view, not the storage.**
- [ ] 4. Tidy Data & Merges: **merge/join with explicit on=/how=; check key cardinality post-merge (.duplicated on keys).**
- [ ] 5. Performance: **Vectorized ops over loops; df.to_numpy() for NumPy math, back to columns after.**
- [ ] 5. Performance: **Categorical dtype for low-cardinality string columns (memory + speed).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
