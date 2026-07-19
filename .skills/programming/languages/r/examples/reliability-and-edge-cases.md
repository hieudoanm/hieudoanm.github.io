# R Best Practices: 4. Vectorization & Performance

## Source guidance

This example applies the **4. Vectorization & Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Vectorize by construction** — base R and the tidyverse operate on whole vectors; `for` loops copy semantics per iteration:
- **`purrr` for element-wise with type certainty; base `apply` (rows/cols) only when margins matter.**
- **Precompute/lookup** — `match`, `dplyr::join` for joins; never in-loop `which`/`sapply` scans.
- **Profile before optimizing** — `profvis`/`bench` measures the real hot spot:
- **`data.table` only when the data genuinely exceeds dplyr's copy semantics** (10^7+ rows) — it's a different idiom with a real cost ceiling.

## Example

```r
z <- sqrt(x^2 + y^2)        # vectorized
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for r-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
