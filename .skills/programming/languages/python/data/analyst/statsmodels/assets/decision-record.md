# Statsmodels Best Practices: Decision Record

Use this record when applying [Statsmodels Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for statistical modeling in Python with Statsmodels — the linear models, GLM, time-series, and hypothesis-testing conventions. Use when writing, structuring, or reviewing statsmodels — covers formula API, results interpretation, diagnostics, and reproducibility.

Statsmodels provides **formal statistical models (OLS, GLM, logit, time-series via ARIMA/ETS) with rich inference outputs — p-values, CIs, and assumption diagnostics** (vs sklearn's prediction-only focus). Practical statsmodels leans on **the formula API (smf.ols("y ~ x1 + x2", data)) for readable specs, .fit() results read deliberately (.params, .summary(), .conf_int()), and diagnostics (.resid, tests) as part of the model contract** — the model is a claim backed by checks.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Building Models
- [ ] 2. Interpreting Results
- [ ] 3. Diagnostics
- [ ] 4. Time Series
- [ ] 5. GLM & Categorical Data
- [ ] 6. Reproducibility & Testing
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

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
