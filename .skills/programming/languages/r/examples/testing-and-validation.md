# R Best Practices: 7. Testing & Verification

## Source guidance

This example applies the **7. Testing & Verification** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`testthat` for functions and data contracts**:
- **Table-driven expectations** over hand-written branches:
- **Data checks are tests** — `tests/testthat` asserts computed totals against known hand-computed fixtures.
- **Deterministic RNG** — `set.seed()`/`withr::with_seed` in any random-dependent test.
- **`check`-pack style: run tests in CI alongside the analysis pipeline.**

## Example

```r
test_that("compute_scores averages within status", {
  expect_equal(nrow(compute_scores(test_df)), 2)
  expect_s3_class(compute_scores(test_df), "data.frame")
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for r-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
