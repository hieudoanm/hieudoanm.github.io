# Statsmodels Best Practices: 1. Building Models

## Source guidance

This example applies the **1. Building Models** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Formula API for readable specs; explicit `data` always:**
- **Native API (`sm.OLS(endog, sm.add_constant(exog))`) where formulas are a mismatch (vectorized inputs).**
- **Ray-wise transforms in the formula (`I(np.log(price))`) for documented transformations; leave the original column untouched.**
- **Hypothesis about the model vs the experiment stated before fitting (pre-registration discipline).**

## Example

This excerpt is from the cited **1. Building Models** section.

```python
import statsmodels.formula.api as smf

model = smf.ols("revenue ~ price + country", data=df).fit()
print(model.summary())
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for statsmodels-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
