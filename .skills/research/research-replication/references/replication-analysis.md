# Replication Analysis

## Purpose

Replication analysis defines how to statistically evaluate new evidence against an original scientific finding.

The central principle is:

> **Analyse the replication according to the scientific claim, not according to whether the result produces the same p-value as the original study.**

A replication analysis should answer:

```text
What was the original effect?
        ↓
What is the new effect?
        ↓
How uncertain are both estimates?
        ↓
Are they compatible?
        ↓
If they differ, how much?
        ↓
Could methodological differences explain the difference?
        ↓
What does the new evidence imply about the original claim?
```

---

# 1. Analysis starts with the claim

Before choosing a statistical test, define:

```text
Original scientific claim
        ↓
Target effect
        ↓
Outcome
        ↓
Comparison
        ↓
Statistical estimand
```

For example:

> Working-memory training improves performance on an independent working-memory task.

The target estimand might be:

```text
Mean difference between training and active-control groups
```

or:

```text
Standardised mean difference
```

The analysis should estimate the quantity that corresponds to the claim.

---

# 2. Do not target the original p-value

A common mistake is:

```text
Original:
p = .02

Replication:
p = .07

Therefore:
Replication failed.
```

This is not sufficient.

A replication should compare:

```text
Effect size
+
Uncertainty
+
Direction
+
Scientific importance
```

The original p-value is not itself the scientific finding.

---

# 3. Primary analysis

Before seeing replication results, define:

```text
Primary outcome
Primary contrast
Primary estimand
Primary statistical model
Primary inference procedure
```

Example:

```text
Primary outcome:
Language score

Primary comparison:
Treatment vs active control

Estimand:
Adjusted mean difference

Model:
ANCOVA

Covariates:
Baseline language score
```

This prevents analysis decisions from being driven by the observed results.

---

# 4. Estimands

An estimand describes precisely what effect is being estimated.

Useful components include:

```text
Population
Treatment/intervention
Comparison
Outcome
Time point
Summary measure
```

Example:

```text
Population:
Adults with post-stroke aphasia

Treatment:
Language rehabilitation

Comparison:
Usual care

Outcome:
Naming score

Time:
6 months

Estimand:
Adjusted mean difference in naming score
```

---

# 5. Match the analysis to the design

Different replication designs require different analyses.

### Independent groups

```text
Group A
vs
Group B
```

Possible analyses:

- t-test
- Regression
- ANCOVA
- Robust regression
- Bayesian models

### Repeated measures

```text
Pre
↓
Post
```

Possible analyses:

- Paired analysis
- Mixed-effects model
- Repeated-measures model

### Clustered data

```text
Participants
    ↓
Sites
```

Possible analyses:

- Multilevel models
- Cluster-robust inference

### Prediction

```text
Observed outcome
vs
Predicted outcome
```

Possible metrics:

- AUC
- R²
- MAE
- RMSE
- Calibration

---

# 6. Preserve the original estimand where appropriate

If the original study estimated:

```text
Mean difference
```

the replication should not silently replace it with:

```text
Correlation
```

If the original study estimated:

```text
Odds ratio
```

do not automatically report:

```text
Risk ratio
```

The statistical representation should remain connected to the original scientific claim.

---

# 7. Effect sizes

Report an interpretable effect estimate.

Examples:

```text
Mean difference
Standardised mean difference
Correlation
Odds ratio
Risk ratio
Hazard ratio
AUC
R²
MAE
RMSE
```

The choice depends on the scientific question.

---

# 8. Standardised versus unstandardised effects

Suppose:

```text
Original:
Mean difference = 5 points

Replication:
Mean difference = 4 points
```

If both studies use the same outcome scale, the raw difference is highly interpretable.

Standardisation may be useful when:

```text
Outcome scales differ
```

but it can also make interpretation less direct.

Prefer the most scientifically meaningful representation.

---

# 9. Confidence intervals

Always report uncertainty around the replication estimate.

Example:

```text
Replication:
d = 0.28
95% CI [0.08, 0.48]
```

This communicates:

```text
Estimated effect
+
Precision
```

rather than just:

```text
p < .05
```

---

# 10. Confidence intervals are not proof intervals

A 95% confidence interval should not be described as:

> There is a 95% probability that the true value lies inside this interval.

Under the usual frequentist interpretation, the procedure has 95% long-run coverage under its assumptions.

For practical communication, it is usually sufficient to say:

> The estimate is 0.28, with a 95% confidence interval from 0.08 to 0.48.

---

# 11. Compare effect directions

First inspect:

```text
Original:
+

Replication:
+
```

versus:

```text
Original:
+

Replication:
-
```

Directionally consistent effects provide more support than effects pointing in opposite directions.

But direction alone is not enough.

---

# 12. Compare effect magnitudes

Example:

```text
Original:
d = 0.50

Replication:
d = 0.45
```

These are similar.

Another example:

```text
Original:
d = 0.50

Replication:
d = 0.05
```

These differ substantially.

The analysis should quantify uncertainty around that difference rather than relying only on visual comparison.

---

# 13. Test whether effects differ

If the question is:

> Is the replication effect statistically different from the original effect?

use an appropriate comparison of effect estimates.

Conceptually:

```text
Difference =
Replication effect
-
Original effect
```

Then estimate:

```text
Difference
+
Uncertainty
```

Possible methods include:

- Interaction models
- Meta-analytic comparisons
- Difference-of-estimates tests
- Hierarchical models
- Bayesian models

The method depends on the study design and available information.

---

# 14. Significant versus non-significant

Avoid:

```text
Original:
p < .05

Replication:
p > .05

Therefore:
Effects are different.
```

This is the:

> **"significance versus non-significance" error.**

Two effects can both be statistically significant or both non-significant while still differing substantially.

Conversely, one can be significant and the other non-significant while the underlying effect estimates are compatible.

---

# 15. Example of the significance error

Suppose:

```text
Original:
d = 0.30
SE = 0.10
p = .003

Replication:
d = 0.25
SE = 0.15
p = .096
```

The p-values differ.

But:

```text
0.30
vs
0.25
```

may be quite compatible.

The replication's larger uncertainty may explain why its p-value is not below .05.

---

# 16. Statistical compatibility

Ask:

> Are the replication data compatible with the original effect?

This is more informative than asking:

> Did the replication achieve statistical significance?

Compatibility can be evaluated using:

```text
Effect estimates
Confidence intervals
Formal effect-comparison tests
Equivalence tests
Bayesian methods
```

---

# 17. Smallest effect of interest

Define a scientifically meaningful threshold:

```text
SESOI
=
Smallest Effect Size Of Interest
```

Example:

```text
SESOI = d = 0.20
```

Then distinguish:

```text
Effect clearly above 0.20
```

from:

```text
Effect close to zero
```

and:

```text
Estimate uncertain across the threshold.
```

---

# 18. Equivalence testing

Suppose:

```text
Equivalence bounds:
-0.20 to +0.20
```

and the replication gives:

```text
d = 0.04
95% CI [-0.08, 0.16]
```

If the equivalence procedure is appropriately conducted and the interval lies within the predefined bounds, the evidence supports:

```text
Effect smaller than the meaningful threshold.
```

This is stronger than:

```text
p > .05
```

---

# 19. Non-inferiority

Sometimes the question is:

> Is the replication effect no worse than a predefined amount?

For example:

```text
Original effect:
d = 0.40

Acceptable reduction:
0.10
```

The replication may test whether the new effect remains within:

```text
0.30
```

of the original or specified benchmark.

This is useful when the goal is to establish that a new method or implementation retains acceptable performance.

---

# 20. Bayesian replication analysis

Bayesian analysis can directly quantify evidence for competing hypotheses.

For example:

```text
H₀:
Effect is negligible

H₁:
Effect is meaningfully positive
```

The analysis can produce:

```text
Posterior distribution
Bayes factor
Credible interval
Posterior probability
```

This can be particularly useful when interpreting null or ambiguous replication results.

---

# 21. Posterior updating

Conceptually:

```text
Prior belief
      ↓
Original evidence
      ↓
Updated belief
      ↓
Replication evidence
      ↓
Further updated belief
```

The important question is:

> How much should confidence in the claim change after observing the replication?

---

# 22. Prediction intervals

If multiple replication studies exist, prediction intervals can be useful.

A confidence interval asks approximately:

```text
Where is the average effect?
```

A prediction interval asks:

```text
Where might the effect of a future study fall?
```

This distinction matters when effects vary substantially across populations or contexts.

---

# 23. Heterogeneity

If several replications exist:

```text
Study 1:
d = .40

Study 2:
d = .25

Study 3:
d = .05

Study 4:
d = .32
```

the variation may be scientifically meaningful.

Potential moderators include:

```text
Population
Task
Measurement
Site
Age
Training dose
Clinical severity
```

Replication analysis should investigate heterogeneity when enough evidence exists.

---

# 24. Random-effects perspective

When studies estimate effects under different conditions, a random-effects model may be appropriate.

Conceptually:

```text
Observed effect
=
Underlying study-specific effect
+
Sampling error
```

The goal is not necessarily to assume:

```text
One identical true effect
```

across all settings.

---

# 25. Meta-analytic replication analysis

If an original study and several replications are available:

```text
Original
Replication 1
Replication 2
Replication 3
Replication 4
       ↓
Meta-analysis
```

Possible outputs:

```text
Pooled effect
Confidence interval
Heterogeneity
Prediction interval
Moderator effects
```

Use appropriate meta-analytic methods rather than averaging effect sizes manually.

---

# 26. Avoid naive averaging

Incorrect:

```text
(d₁ + d₂ + d₃) / 3
```

unless the analysis specifically justifies equal weighting.

Studies may differ in:

```text
Sample size
Precision
Variance
Design
```

Meta-analysis typically weights studies according to their uncertainty and model assumptions.

---

# 27. Original-study weighting

Do not automatically give the original study special statistical weight simply because it was first.

If:

```text
Original:
N = 30

Replication:
N = 500
```

the replication may contribute substantially more precise evidence.

Historical priority does not determine statistical weight.

---

# 28. Multiple outcomes

A replication may measure:

```text
Primary outcome
Secondary outcomes
Exploratory outcomes
```

Clearly distinguish them.

For example:

```text
Primary:
Language comprehension

Secondary:
Naming

Exploratory:
Speech fluency
```

Do not select the most favourable outcome after analysis and present it as the primary replication result.

---

# 29. Multiple comparisons

If the replication tests:

```text
20 outcomes
```

the chance of observing at least one apparently significant result increases.

Possible approaches include:

```text
Predefined primary outcome
Multiplicity correction
Hierarchical testing
False discovery rate
```

The appropriate approach depends on the research question.

---

# 30. Exploratory analysis

Exploratory analyses are valuable.

They should simply be labelled honestly.

For example:

```text
Primary:
Prespecified replication test

Secondary:
Prespecified additional analysis

Exploratory:
Post hoc moderator analysis
```

Exploration should not be treated as if it had been preregistered.

---

# 31. Missing data

Replication analysis should specify:

```text
What data are missing?
Why are they missing?
How are missing values handled?
```

Potential approaches include:

- Complete-case analysis
- Multiple imputation
- Model-based approaches

The appropriate method depends on the missing-data mechanism and study design.

---

# 32. Outliers

Do not remove observations merely because they reduce the replication effect.

Define outlier handling before analysis where possible.

Potential approaches:

```text
Robust methods
Prespecified exclusion criteria
Sensitivity analysis
```

A useful replication report can show:

```text
Primary analysis
+
Sensitivity analysis
```

---

# 33. Sensitivity analysis

Ask:

> Would the conclusion change under reasonable alternative assumptions?

Examples:

```text
With vs without influential observations
Alternative preprocessing
Alternative covariates
Alternative exclusion criteria
Alternative model specification
```

If conclusions remain stable, confidence increases.

If conclusions change dramatically, report that uncertainty.

---

# 34. Robustness versus replication

These are related but distinct.

### Replication

```text
New evidence
```

tests whether a finding holds again.

### Robustness analysis

```text
Same evidence
+
reasonable analytical variations
```

tests whether the conclusion depends on analytical choices.

A strong replication can include both.

---

# 35. Covariate adjustment

Suppose the original analysis uses:

```text
Outcome ~ Group
```

while the replication uses:

```text
Outcome ~ Group + Age + Baseline
```

The estimands may differ.

Therefore document:

```text
Which covariates were included?
Why?
Were they prespecified?
```

Do not treat adjusted and unadjusted effects as automatically interchangeable.

---

# 36. Regression to the mean

For repeated measurements:

```text
Extreme baseline score
        ↓
Less extreme follow-up score
```

can occur even without a true intervention effect.

Replication analyses should account for this where relevant.

---

# 37. Measurement error

Observed effects can be affected by measurement reliability.

Conceptually:

```text
True construct
     ↓
Measurement error
     ↓
Observed score
```

Greater measurement noise can attenuate associations.

If replication measurements are less reliable than the original, a smaller effect may not necessarily indicate that the underlying phenomenon disappeared.

---

# 38. Reliability comparison

Where relevant, compare:

```text
Original reliability
vs
Replication reliability
```

Examples:

```text
Test-retest reliability
Inter-rater reliability
Internal consistency
Sensor reliability
Imaging signal quality
```

Measurement quality is part of replication validity.

---

# 39. Clustered observations

Examples:

```text
Participants within hospitals
Students within schools
Trials within participants
Patients within clinicians
```

Ignoring clustering can produce overly optimistic uncertainty estimates.

Consider:

```text
Mixed-effects models
Cluster-robust standard errors
Hierarchical Bayesian models
```

when appropriate.

---

# 40. Repeated trials

Psychology and neuroscience often have:

```text
Participant
    ↓
Many trials
```

Do not automatically treat every trial as an independent participant.

For example:

```text
30 participants
×
100 trials
=
3000 trials
```

does not mean:

```text
N = 3000 independent participants.
```

The analysis must represent the hierarchical structure.

---

# 41. Neuroimaging analysis

Replication analysis in neuroimaging may involve:

```text
Sensor-level effects
Voxel-level effects
ROI effects
Source-level effects
Connectivity
Decoding
RSA
Encoding
```

The primary analysis should be defined before data inspection.

---

# 42. Neuroimaging multiple comparisons

Thousands of voxels or sensors can create a substantial multiple-comparison problem.

Approaches include:

```text
ROI analysis
Cluster-based inference
Permutation testing
False discovery rate
Family-wise error control
```

The correction strategy should match the scientific hypothesis.

---

# 43. Permutation testing

Permutation tests can be useful when:

```text
Distributional assumptions are difficult
```

or:

```text
Complex neuroimaging statistics
```

are being evaluated.

Conceptually:

```text
Observed effect
      ↓
Compare with effects
under shuffled labels
      ↓
Null distribution
```

The permutation scheme must preserve the relevant dependency structure.

---

# 44. Decoding analysis

For neural decoding replication, report:

```text
Metric
Cross-validation scheme
Train/test unit
Class balance
Preprocessing
Feature selection
Hyperparameter tuning
Chance level
Confidence interval
```

Most importantly:

> Define the unit of independence.

For example:

```text
Cross-trial
Cross-stimulus
Cross-session
Cross-participant
```

are different generalisation questions.

---

# 45. Machine-learning analysis

For ML replication, separate:

```text
Model development
```

from:

```text
Model evaluation
```

The evaluation data should not influence:

```text
Feature selection
Hyperparameter tuning
Architecture selection
Threshold selection
Preprocessing fitting
```

when those operations are intended to remain unbiased.

---

# 46. Clinical prediction analysis

For clinical prediction, evaluate:

```text
Discrimination
Calibration
Clinical utility
```

where appropriate.

For example:

```text
AUC
+
Calibration
+
Decision utility
```

provides a more complete picture than:

```text
AUC alone.
```

---

# 47. Practical significance

A replication effect should be interpreted relative to the scientific context.

Example:

```text
Effect:
0.5 ms improvement
```

may be statistically reliable in a large sample but practically irrelevant.

Conversely:

```text
5-point clinical improvement
```

may be highly meaningful even if the p-value is not conventionally significant in a small sample.

---

# 48. Statistical versus scientific conclusions

Separate:

```text
Statistical conclusion
```

from:

```text
Scientific interpretation.
```

Example:

```text
Statistical:
Replication effect is positive.

Scientific:
The result provides evidence that
the original cognitive effect is robust.
```

The second statement requires consideration of:

```text
Design fidelity
Measurement
Precision
Alternative explanations
```

---

# 49. Replication success criteria

Define criteria before analysis when possible.

For example:

```text
Strongly consistent:
Same direction + compatible meaningful magnitude

Broadly consistent:
Same direction + somewhat smaller/larger effect

Partially consistent:
Some primary components supported

Inconclusive:
Insufficient precision

Inconsistent:
Meaningfully different effect

Contradictory:
Reliable effect in opposite direction
```

These categories should be linked to predefined scientific reasoning rather than arbitrary p-value thresholds.

---

# 50. Evidence table

A useful analysis table is:

| Quantity        |     Original |  Replication | Interpretation     |
| --------------- | -----------: | -----------: | ------------------ |
| Effect          |         0.40 |         0.32 | Similar            |
| 95% CI          | [0.20, 0.60] | [0.12, 0.52] | Compatible         |
| Direction       |            + |            + | Consistent         |
| SESOI           |         0.20 |         0.20 | Both above         |
| N               |          100 |          200 | Replication larger |
| Design fidelity |            — |         High | Strong             |
| Overall         |            — |            — | Broadly consistent |

This makes the reasoning transparent.

---

# 51. Analysis decision tree

```text
What is the primary scientific claim?
        ↓
What is the target estimand?
        ↓
What is the primary outcome?
        ↓
What is the data structure?
        ↓
What statistical model estimates the target?
        ↓
What effect size should be reported?
        ↓
What uncertainty should be reported?
        ↓
Is a formal comparison with the original needed?
        ↓
Is a SESOI available?
        ↓
Would equivalence/non-inferiority be informative?
        ↓
Are there important moderators?
        ↓
Are sensitivity analyses needed?
        ↓
What does the complete evidence imply?
```

---

# 52. Recommended replication analysis workflow

```text
ORIGINAL CLAIM
      ↓
DEFINE ESTIMAND
      ↓
DEFINE PRIMARY OUTCOME
      ↓
DEFINE SESOI
      ↓
PRE-SPECIFY MODEL
      ↓
COLLECT NEW DATA
      ↓
QUALITY CONTROL
      ↓
RUN PRIMARY ANALYSIS
      ↓
ESTIMATE EFFECT
      ↓
ESTIMATE UNCERTAINTY
      ↓
COMPARE WITH ORIGINAL
      ↓
ASSESS STATISTICAL COMPATIBILITY
      ↓
ASSESS PRACTICAL SIGNIFICANCE
      ↓
RUN PRESPECIFIED SENSITIVITY ANALYSES
      ↓
INVESTIGATE MODERATORS
      ↓
CLASSIFY REPLICATION EVIDENCE
      ↓
UPDATE SCIENTIFIC CONFIDENCE
```

---

# 53. Reporting the final result

A strong replication result should report:

```text
Original effect
Replication effect
Uncertainty for both
Sample sizes
Primary outcome
Primary analysis
Design fidelity
Important deviations
SESOI
Statistical comparison where appropriate
Sensitivity analyses
Potential moderators
Practical significance
Overall interpretation
```

Avoid reducing the result to:

```text
Replicated: Yes/No
```

---

# 54. Example: psychology

Original:

```text
d = 0.42
95% CI [0.20, 0.64]
```

Replication:

```text
d = 0.28
95% CI [0.10, 0.46]
```

SESOI:

```text
d = 0.20
```

Interpretation:

```text
Same direction
+
Both estimates above SESOI
+
Intervals compatible
```

Possible conclusion:

> The replication provides broadly consistent evidence for a meaningful effect, although the estimated effect was smaller than in the original study.

---

# 55. Example: neuroscience

Original:

```text
Semantic decoding:
AUC = .72
```

Replication:

```text
AUC = .69
```

The replication should additionally report:

```text
Chance level
Cross-validation structure
Participant independence
Stimulus independence
Time window
Preprocessing
Confidence interval
```

AUC similarity alone is insufficient to establish replication.

---

# 56. Example: clinical neuroscience

Original:

```text
Prediction:
R² = .42
```

Replication:

```text
R² = .31
```

Also report:

```text
Baseline clinical model
Calibration
MAE
Population differences
Scanner/site differences
Outcome definition
```

The relevant question is:

> Does the model retain clinically useful predictive information in new patients?

---

# 57. Example: machine learning

Original:

```text
AUC = .89
```

Replication:

```text
AUC = .82
```

Before interpreting the difference, verify:

```text
No leakage
Independent subjects
Same target
Comparable labels
Frozen model
Equivalent preprocessing
Appropriate evaluation
```

Only then should the performance difference be interpreted scientifically.

---

# 58. Common analysis mistakes

## Mistake 1: Comparing p-values

```text
p < .05
vs
p > .05
```

does not test whether effects differ.

---

## Mistake 2: Treating non-significance as no effect

```text
p > .05
```

does not prove:

```text
effect = 0
```

---

## Mistake 3: Ignoring uncertainty

A point estimate without a confidence interval can be misleading.

---

## Mistake 4: Changing the primary outcome

Do not select the most favourable result after seeing the data.

---

## Mistake 5: Ignoring data structure

Do not treat:

```text
trials
```

as independent:

```text
participants
```

---

## Mistake 6: Test-set optimisation

Do not tune:

```text
hyperparameters
thresholds
features
preprocessing
```

using the final evaluation set.

---

## Mistake 7: Overinterpreting small differences

```text
Original:
.40

Replication:
.37
```

is not automatically evidence of meaningful disagreement.

---

## Mistake 8: Ignoring practical significance

Statistical evidence does not automatically establish real-world importance.

---

## Mistake 9: Overclaiming generalisation

A replication in:

```text
same population
```

does not automatically establish:

```text
cross-cultural generalisation.
```

---

## Mistake 10: Calling every discrepancy a failure

A difference can reveal:

```text
Moderator
Measurement problem
Population effect
Context dependence
```

---

# 59. Minimum analysis standard

At minimum, a replication should report:

```text
[ ] Primary outcome
[ ] Primary estimand
[ ] Effect size
[ ] Confidence interval
[ ] Sample size
[ ] Primary analysis
[ ] Original effect
[ ] Replication effect
[ ] Direction comparison
[ ] Practical significance
[ ] Important methodological differences
[ ] Overall interpretation
```

---

# 60. Strong analysis standard

A stronger replication should additionally report:

```text
[ ] SESOI
[ ] Formal effect comparison
[ ] Equivalence/non-inferiority where appropriate
[ ] Sensitivity analyses
[ ] Measurement reliability
[ ] Moderator analyses
[ ] Data-quality analysis
[ ] Missing-data analysis
[ ] Multiple-comparison handling
[ ] Generalisability assessment
[ ] Prediction interval when multiple studies exist
```

---

# Final principle

Replication analysis should move from:

```text
DID WE GET p < .05?
```

to:

```text
WHAT EFFECT DID WE OBSERVE?
          ↓
HOW PRECISE IS IT?
          ↓
HOW DOES IT COMPARE WITH THE ORIGINAL?
          ↓
IS THE DIFFERENCE SCIENTIFICALLY IMPORTANT?
          ↓
COULD DESIGN OR MEASUREMENT EXPLAIN IT?
          ↓
DOES THE EVIDENCE SUPPORT THE ORIGINAL CLAIM?
          ↓
HOW SHOULD OUR CONFIDENCE CHANGE?
```

> **The purpose of replication analysis is not to classify a study as a success or failure. It is to quantify what the new evidence tells us about the robustness, magnitude, uncertainty, and generalisability of the original scientific claim.**
