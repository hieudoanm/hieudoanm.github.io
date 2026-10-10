# R Best Practices: Workflow Checklist

A practical run sheet for applying [R Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Tidy Data & Tibbles: **Tidy data is the schema contract**: one row per observation, one column per variable:
- [ ] 1. Tidy Data & Tibbles: **tibble()/as_tibble() over data.frame** — lazy columns, no stringsAsFactors surprise, print-friendly
- [ ] 2. Functionality in Pipelines: **dplyr verbs over base loops** — filter, select, mutate, summarise, arrange, group_by read as a sentence:
- [ ] 2. Functionality in Pipelines: **|> (base pipe, R 4.1+) or %>% consistently** — one style per project; assign the pipeline result to a named object
- [ ] 3. Functions & Reuse: **Turn a repeated analysis step into a function** — named, parameterized, documented:
- [ ] 3. Functions & Reuse: **Explicit function(x) with named params and defaults**; argument order = data first, options after (tidyverse convention)
- [ ] 4. Vectorization & Performance: **Vectorize by construction** — base R and the tidyverse operate on whole vectors; for loops copy semantics per iteration:
- [ ] 4. Vectorization & Performance: **purrr for element-wise with type certainty; base apply (rows/cols) only when margins matter.**
- [ ] 5. Errors & Missing Values: **NA is data, not an accident** — be explicit about who carries NA (nullable columns) and handle every is.na contract
- [ ] 5. Errors & Missing Values: **stop() with a message for unrecoverable states; warning() for recoverable surprises; tryCatch()/finally for cleanup:**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
