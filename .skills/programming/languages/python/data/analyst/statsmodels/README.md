# Statsmodels Best Practices

Statsmodels provides **formal statistical models (OLS, GLM, logit, time-series via ARIMA/ETS) with rich inference outputs — p-values, CIs, and assumption diagnostics** (vs sklearn's prediction-only focus). Practical statsmodels leans on **the formula API (smf.ols("y ~ x1 + x2", data)) for readable specs, .fit() results read deliberately (.params, .summary(), .conf_int()), and diagnostics (.resid, tests) as part of the...

## When to use

Use when writing, structuring, or reviewing statsmodels.

## Core topics

- 1. Building Models
- 2. Interpreting Results
- 3. Diagnostics
- 4. Time Series
- 5. GLM & Categorical Data
- 6. Reproducibility & Testing

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Statsmodels Best Practices: Basic Usage](./examples/basic-usage.md)
- [Statsmodels Best Practices: 3. Diagnostics](./examples/reliability-and-edge-cases.md)
- [Statsmodels Best Practices: 1. Building Models](./examples/setup-and-configuration.md)
- [Statsmodels Best Practices: 6. Reproducibility & Testing](./examples/testing-and-validation.md)

## Assets

- [Statsmodels Best Practices: Decision Record](./assets/decision-record.md)
- [Statsmodels Best Practices: Starter Template](./assets/starter-template.md)
- [Statsmodels Best Practices: Validation Plan](./assets/validation-plan.md)
- [Statsmodels Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
