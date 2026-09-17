# Statsmodels Best Practices: 3. Diagnostics

## Source guidance

This example applies the **3. Diagnostics** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Residual checks are part of the fit:**
- **Heteroskedasticity: `sm.stats.stattools.het_goldfeldquandt`; robust SEs via `cov_type="HC1"` as the honest default when suspected.**
- **Multicollinearity: `VIF` (from variance inflation factor) if X's correlate — report in the write-up.**
- **Influential points: `model.get_influence().summary_frame()` — outliers can drive the fit; iterate deliberately.**

## Example

```python
import statsmodels.api as sm
sm.stats.stattools.durbin_watson(model.resid)     # autocorrelation
sm.stats.omni_normtest(model.resid)               # normality
sm.graphics.plot_ccpr(model, "momentum")          # partial residuals
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for statsmodels-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
