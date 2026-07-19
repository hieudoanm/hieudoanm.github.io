# Overview

Focused reference for **r-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
