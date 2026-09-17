# Review checklist

Focused reference for **r-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
