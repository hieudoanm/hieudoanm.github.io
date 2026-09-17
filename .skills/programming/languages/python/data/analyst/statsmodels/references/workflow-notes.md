# Workflow notes

Focused reference for **statsmodels-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
