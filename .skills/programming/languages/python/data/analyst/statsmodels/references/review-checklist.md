# Review checklist

Focused reference for **statsmodels-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
