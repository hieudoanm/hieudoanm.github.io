---
name: r-best-practices
description: Best practices for writing R — the language conventions for data analysis, statistics, and reproducible research. Use when writing, structuring, or reviewing R — covers tidy data, tibbles, functional pipelines, functions, error handling, plotting, testing, and reproducibility.
---

# R Best Practices

R is a functional, vectorized language for data analysis — the idiom is **tibbles, tidy verbs, and functional pipelines, not mutable loops**. Practical R leans on **tidy data (one row per observation), a `dplyr`/`tidyr` pipeline expressed as verbs, explicit functions for reused analysis** and **tests + reproducibility (`testthat`, `renv`, `quarto`) so a result isn't a one-off hallucination**. Vectorization is the performance law; `for` loops are the last resort.

---

## 1. Tidy Data & Tibbles

- **Tidy data is the schema contract**: one row per observation, one column per variable:

```r
library(dplyr)
df <- tibble(
  user   = c("ada", "grace", "linus"),
  status = c("active", "inactive", "active"),
  score  = c(10, 4, 8),
)
```

- **`tibble()`/`as_tibble()` over `data.frame`** — lazy columns, no `stringsAsFactors` surprise, print-friendly.
- **Column types deliberately set** — `parse_number`, `as_factor`, `as.Date`, `readr::read_csv` typed columns from the file boundary.
- **Rename/relocate to stable names** — analysis code reads the *name contract*, never positions.

---

## 2. Functionality in Pipelines

- **`dplyr` verbs over base loops** — `filter`, `select`, `mutate`, `summarise`, `arrange`, `group_by` read as a sentence:

```r
summary <- df |>
  filter(!is.na(score)) |>
  group_by(status) |>
  summarise(mean_score = mean(score), n = n(), .groups = "drop")
```

- **`|>` (base pipe, R 4.1+) or `%>%` consistently** — one style per project; assign the pipeline result to a named object.
- **`mutate` for derived columns, `summarise` for reductions, `across()` for column-batch transforms**:

```r
df |>
  mutate(across(c(score_1, score_2), ~ ifelse(.x < 0, NA_real_, .x)))
```

- **Long data for plotting/modeling** — `pivot_longer`/`pivot_wider` rather than wide matrices and reshape gymnastics.
- **`purrr::map*` for list-column iteration** — `map_dbl`, `map_chr`, `map_df` keep the result type in the name.

---

## 3. Functions & Reuse

- **Turn a repeated analysis step into a function** — named, parameterized, documented:

```r
compute_scores <- function(df, weight = 1) {
  stopifnot(is.data.frame(df), hasName(df, "score"))
  df |>
    mutate(weighted = score * weight) |>
    summarise(total = sum(weighted), .by = status)
}
```

- **Explicit `function(x)` with named params and defaults**; argument order = data first, options after (tidyverse convention).
- **`...` used only for genuine variable argument forwards; validate with `rlang::check_dots_used`.**
- **One file per analysis phase**; a package (`R/` folder + `DESCRIPTION`) when functions outgrow a script.
- **`stopifnot`/`assert_that` for preconditions** — the contract is checked at entry:

```r
stopifnot(is.numeric(df$score), all(df$score >= 0))
```

---

## 4. Vectorization & Performance

- **Vectorize by construction** — base R and the tidyverse operate on whole vectors; `for` loops copy semantics per iteration:

```r
z <- sqrt(x^2 + y^2)        # vectorized
```

- **`purrr` for element-wise with type certainty; base `apply` (rows/cols) only when margins matter.**
- **Precompute/lookup** — `match`, `dplyr::join` for joins; never in-loop `which`/`sapply` scans.
- **Profile before optimizing** — `profvis`/`bench` measures the real hot spot:

```r
bench::mark(base_loop, vectorized, iterations = 50)
```

- **`data.table` only when the data genuinely exceeds dplyr's copy semantics** (10^7+ rows) — it's a different idiom with a real cost ceiling.

---

## 5. Errors & Missing Values

- **`NA` is data, not an accident** — be explicit about who carries `NA` (nullable columns) and handle every `is.na` contract.
- **`stop()` with a message for unrecoverable states; `warning()` for recoverable surprises; `tryCatch()`/`finally` for cleanup:**

```r
result <- tryCatch(
  read_csv(path),
  error = function(e) stop("unable to read ", path, ": ", conditionMessage(e))
)
```

- **`rlang::abort("msg", class = "my_import_error")`** — classed errors for programmatic handling (`conditionMessage` contract).
- **Fear the silent `FALSE`/`NA`** from `ifelse` on `NA` — use `dplyr::case_when`/`coalesce` for explicit NA routing.
- **No `print` dumping in functions** — return values; log if side effects are wanted.

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

- **Pin the R version (`DESCRIPTION`/CI)** alongside `renv.lock` — an analysis from a different R is a different analysis.
- **Deterministic data access** — files referenced by path/version, not scratch; `here::here()` for project-relative paths:

```r
here::here("data", "raw", "survey_2026.csv")
```

- **No floating global state** — options, working directory and RNG set at the top of the analysis file.
- **Keep the analysis data + code + `renv.lock` in the repo** so a colleague (or CI job) can reproduce every number.

---

## 9. Style & Tooling

- **`styler`/`lintr` enforcing consistent style in CI**:

```r
lintr::lintr(project_root = here::here())
styler::style_pkg()
```

- **Prices of tidy conventions**: keep functions small, names verbs/data-words; read a script top-down as a story.
- **`devtools::check()`/`rcmdcheck::rcmdcheck` for package-quality gates; `usethis` for project scaffolding.**
- **Structured logging for long pipelines** (`loginfo`/`logger`) over scattered `print`.

---

## General Rules of Thumb

- **Tidy data first; the pipeline is the sentence.**
- **Vectorize; loops are the exception, profiled, and justified.**
- **Reused analysis becomes a tested function.**
- **`NA` is data — be explicit about who carries it.**
- **Every figure says something (`labs`) and every number a test can re-derive.**
- **`renv` + pinned R + `testthat` + lintr = reproducible "done".**

---

## Quick-Start Checklist

- [ ] tibbles with typed columns; tidy data (one row per observation)
- [ ] dplyr verbs + `|>` pipeline; `across()`/`purrr::map*` over loops
- [ ] Named functions for repeated analysis with `stopifnot` preconditions
- [ ] Vectorized ops; profiled optimizations; `data.table` only for scale
- [ ] `NA` handled explicitly (`case_when`/`coalesce`); classed errors via `rlang::abort`
- [ ] ggplot2 with scales + titles; Quarto renders analysis to a report
- [ ] `testthat` contract/table tests run in CI
- [ ] `renv` snapshot committed; R pinned; `here::here()` paths
- [ ] `styler`/`lintr` clean; `devtools::check`-level gates