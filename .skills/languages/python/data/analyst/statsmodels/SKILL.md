---
name: statsmodels-best-practices
description: Best practices for statistical modeling in Python with Statsmodels — the linear models, GLM, time-series, and hypothesis-testing conventions. Use when writing, structuring, or reviewing statsmodels — covers formula API, results interpretation, diagnostics, and reproducibility.
---

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

- **Read `params`, `pvalues`, `conf_int()`, and `rsquared`/`aic`; don't eyeball `summary()`.**

```python
coef = model.params["momentum"]
ci = model.conf_int().loc["momentum"]
```

- **Coefficient units are the units of the data — interpretation must mention the scale.**
- **`model.t_test`/`f_test`/`wald_test` for hypothesis matrices; `compare_f_test` for nested models.**
- **Logit/GLM: interpret via odds ratios (`model.params.map(np.exp)`) and marginal effects, not raw coefficients alone.**

---

## 3. Diagnostics

- **Residual checks are part of the fit:**

```python
import statsmodels.api as sm
sm.stats.stattools.durbin_watson(model.resid)     # autocorrelation
sm.stats.omni_normtest(model.resid)               # normality
sm.graphics.plot_ccpr(model, "momentum")          # partial residuals
```

- **Heteroskedasticity: `sm.stats.stattools.het_goldfeldquandt`; robust SEs via `cov_type="HC1"` as the honest default when suspected.**
- **Multicollinearity: `VIF` (from variance inflation factor) if X's correlate — report in the write-up.**
- **Influential points: `model.get_influence().summary_frame()` — outliers can drive the fit; iterate deliberately.**

---

## 4. Time Series

- **`sm.tsa` for ARIMA/ETS/exponential smoothing; seasonality explicitly modeled:**

```python
from statsmodels.tsa.arima.model import ARIMA
fit = ARIMA(series, order=(1, 0, 1), seasonal_order=(0, 1, 1, 12)).fit()
```

- **Stationarity checks (`adfuller`) before differencing; `acf`/`pacf` inform `order`.**
- **Residual diagnostics for TS: `acf(resid)`, Ljung-Box (`sm.stats.acorr_ljungbox`).**
- **Forecast with CI — `fit.get_forecast(steps=12).summary_frame()`, don't present point-only.**

---

## 5. GLM & Categorical Data

- **Family+link chosen semantically (`sm.families.Poisson` for counts, `Binomial` for proportion).**
- **Categoricals via formula `C(region, Treatment(reference="eu"))` — named reference level, contrast documented.**
- **`fit()` defaults to MLE; assert convergence in `summary()` (no warnings).**
- **Overdispersion check for count data (`deviance/df_resid` > 1 → negative binomial).**

---

## 6. Reproducibility & Testing

- **Seeded/`random_state` where applicable; export `params`/`conf_int`/diagnostics to parquet/CSV for reporting.**
- **Tests: assert coefficient sign/range on synthetic data; pytest-parametrize spec variants; snapshot summary outputs.**
- **Version-pin `statsmodels`; note formula strings in comments so the spec travels.**

---

## General Rules of Thumb

- **Formula API for readable specs; results read deliberately (params, CIs).**
- **Diagnostics are part of the claim — residuals, VIF, robust SEs.**
- **TS: stationarity check first; seasonal order explicit; forecast + CIs.**
- **Interpret in data units; GLM via odds/marginal effects.**
- **Pre-register the hypothesis; document the formula.**

---

## Quick-Start Checklist

- [ ] `smf` formula with explicit `data`; hypothesis stated first
- [ ] `.params` + `.conf_int()` read deliberately; units interpreted
- [ ] Residual diagnostics (DW, normality, partial residuals) run
- [ ] Robust `cov_type` where heteroskedasticity suspected; VIF on correlates
- [ ] TS: `adfuller`, `acf`/`pacf` inform orders; forecast with CIs
- [ ] GLM family+link semantic; overdispersion checked; results exported