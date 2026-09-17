# R Best Practices: Basic Usage

Best practices for writing R — the language conventions for data analysis, statistics, and reproducible research. Use when writing, structuring, or reviewing R — covers tidy data, tibbles, functional pipelines, functions, error handling, plotting, testing, and reproducibility.

## Scenario

Use this example as a starting point when applying **r-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Tidy Data & Tibbles** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```r
library(dplyr)
df <- tibble(
  user   = c("ada", "grace", "linus"),
  status = c("active", "inactive", "active"),
  score  = c(10, 4, 8),
)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
