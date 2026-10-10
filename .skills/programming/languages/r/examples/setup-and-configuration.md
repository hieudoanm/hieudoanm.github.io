# R Best Practices: 2. Functionality in Pipelines

## Source guidance

This example applies the **2. Functionality in Pipelines** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`dplyr` verbs over base loops** — `filter`, `select`, `mutate`, `summarise`, `arrange`, `group_by` read as a sentence:
- **`|>` (base pipe, R 4.1+) or `%>%` consistently** — one style per project; assign the pipeline result to a named object.
- **`mutate` for derived columns, `summarise` for reductions, `across()` for column-batch transforms**:
- **Long data for plotting/modeling** — `pivot_longer`/`pivot_wider` rather than wide matrices and reshape gymnastics.
- **`purrr::map*` for list-column iteration** — `map_dbl`, `map_chr`, `map_df` keep the result type in the name.

## Example

```r
summary <- df |>
  filter(!is.na(score)) |>
  group_by(status) |>
  summarise(mean_score = mean(score), n = n(), .groups = "drop")
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for r-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
