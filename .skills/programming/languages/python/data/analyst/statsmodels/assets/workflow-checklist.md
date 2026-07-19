# Statsmodels Best Practices: Workflow Checklist

A practical run sheet for applying [Statsmodels Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Building Models: **Formula API for readable specs; explicit data always:**
- [ ] 1. Building Models: **Native API (sm.OLS(endog, sm.add_constant(exog))) where formulas are a mismatch (vectorized inputs).**
- [ ] 2. Interpreting Results: **Read params, pvalues, conf_int(), and rsquared/aic; don't eyeball summary().**
- [ ] 2. Interpreting Results: **Coefficient units are the units of the data — interpretation must mention the scale.**
- [ ] 3. Diagnostics: **Residual checks are part of the fit:**
- [ ] 3. Diagnostics: **Heteroskedasticity: sm.stats.stattools.het_goldfeldquandt; robust SEs via cov_type="HC1" as the honest default when suspected.**
- [ ] 4. Time Series: **sm.tsa for ARIMA/ETS/exponential smoothing; seasonality explicitly modeled:**
- [ ] 4. Time Series: **Stationarity checks (adfuller) before differencing; acf/pacf inform order.**
- [ ] 5. GLM & Categorical Data: **Family+link chosen semantically (sm.families.Poisson for counts, Binomial for proportion).**
- [ ] 5. GLM & Categorical Data: **Categoricals via formula C(region, Treatment(reference="eu")) — named reference level, contrast documented.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
