# Workflow notes

Focused reference for **r-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
