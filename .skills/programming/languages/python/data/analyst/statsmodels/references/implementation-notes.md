# Implementation notes

Focused reference for **statsmodels-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
