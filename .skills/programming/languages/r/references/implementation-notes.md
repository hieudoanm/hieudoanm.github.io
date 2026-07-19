# Implementation notes

Focused reference for **r-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Plotting & Communication

- **`ggplot2` grammar over `plot()` mystery** — `ggplot(df, aes(...)) + geom_*()` reads as prose:

```r
df |>
  filter(status == "active") |>
  ggplot(aes(x = date, y = score, colour = region)) +
  geom_line() +
  labs(title = "Scores over time", x = NULL, y = NULL) +
  theme_minimal()
```

- **Every plot comparable** — fixed scales, legends, titles; `labs()` states the claim the figure makes.
- **`{gtsummary}`/`{gt}` for tables and summaries** over hand-rolled table matrices.
- **`quarto`/`rmarkdown` renders analysis into the report** — code + prose + figures in one artifact.
- **Caps the `ggplot` custom-theme Frankensteining** — define `theme_set(theme_minimal())` + shared `scale_*`s in one place.

---

## 7. Testing & Verification

- **`testthat` for functions and data contracts**:

```r
test_that("compute_scores averages within status", {
  expect_equal(nrow(compute_scores(test_df)), 2)
  expect_s3_class(compute_scores(test_df), "data.frame")
})
```

- **Table-driven expectations** over hand-written branches:

```r
cases <- tribble(~input, ~expected,
                 "a@b.co", TRUE,
                 "nope",   FALSE)
for (i in seq_len(nrow(cases))) {
  test_that(paste("email valid", cases$input[i]), {
    expect_equal(is_valid_email(cases$input[i]), cases$expected[i])
  })
}
```

- **Data checks are tests** — `tests/testthat` asserts computed totals against known hand-computed fixtures.
- **Deterministic RNG** — `set.seed()`/`withr::with_seed` in any random-dependent test.
- **`check`-pack style: run tests in CI alongside the analysis pipeline.**

---

## 8. Reproducibility

- **`renv` locks the package environment** — the project's `renv.lock` reproduces the session:

```r
renv::init()
renv::snapshot()
```
