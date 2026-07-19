# Overview

Focused reference for **statsmodels-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Statsmodels Best Practices

Statsmodels provides **formal statistical models (OLS, GLM, logit, time-series via ARIMA/ETS) with rich inference outputs — p-values, CIs, and assumption diagnostics** (vs sklearn's prediction-only focus). Practical statsmodels leans on **the formula API (`smf.ols("y ~ x1 + x2", data)`) for readable specs, `.fit()` results read deliberately (`.params`, `.summary()`, `.conf_int()`), and diagnostics (`.resid`, tests) as part of the model contract** — the model is a claim backed by checks.

---

## 1. Building Models

- **Formula API for readable specs; explicit `data` always:**

```python
import statsmodels.formula.api as smf

model = smf.ols("revenue ~ price + country", data=df).fit()
print(model.summary())
```

- **Native API (`sm.OLS(endog, sm.add_constant(exog))`) where formulas are a mismatch (vectorized inputs).**
- **Ray-wise transforms in the formula (`I(np.log(price))`) for documented transformations; leave the original column untouched.**
- **Hypothesis about the model vs the experiment stated before fitting (pre-registration discipline).**

---

## 2. Interpreting Results
