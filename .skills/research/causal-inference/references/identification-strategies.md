# Identification Strategies

An identification strategy explains why the observed data can recover the target causal contrast under stated assumptions.

| Strategy | Typical identifying basis | Key threats |
|---|---|---|
| Randomized assignment | Randomization makes assignment independent of baseline causes in expectation | Nonadherence, attrition, interference, compromised allocation |
| Backdoor adjustment | Measured sufficient confounder set blocks noncausal paths | Unmeasured confounding, poor measurement, positivity violations |
| Instrumental variables | Instrument relevance, independence, exclusion, and often monotonicity | Weak or invalid instrument; local effect interpretation |
| Regression discontinuity | Continuity around a threshold and no precise manipulation | Sorting, bandwidth sensitivity, local generalizability |
| Difference-in-differences | Parallel trends and no differential concurrent shocks | Pretrend evidence limits, anticipation, composition changes |

These assumptions are substantive, not guaranteed by model fit. State which are testable, which are not, and how design knowledge supports them. Choosing a method by name is not an identification argument.
