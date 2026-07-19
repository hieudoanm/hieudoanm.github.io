# R Best Practices: Decision Record

Use this record when applying [R Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing R — the language conventions for data analysis, statistics, and reproducible research. Use when writing, structuring, or reviewing R — covers tidy data, tibbles, functional pipelines, functions, error handling, plotting, testing, and reproducibility.

R is a functional, vectorized language for data analysis — the idiom is **tibbles, tidy verbs, and functional pipelines, not mutable loops**. Practical R leans on **tidy data (one row per observation), a dplyr/tidyr pipeline expressed as verbs, explicit functions for reused analysis** and **tests + reproducibility (testthat, renv, quarto) so a result isn't a one-off hallucination**. Vectorization is the performance law; for loops are the last resort.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with R and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Tidy Data & Tibbles
- [ ] 2. Functionality in Pipelines
- [ ] 3. Functions & Reuse
- [ ] 4. Vectorization & Performance
- [ ] 5. Errors & Missing Values
- [ ] 6. Plotting & Communication
- [ ] 7. Testing & Verification
- [ ] 8. Reproducibility

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
