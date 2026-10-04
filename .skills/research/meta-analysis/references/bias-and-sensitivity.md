# Bias and Sensitivity Analysis

A practical guide to identifying bias in meta-analysis and testing whether conclusions depend on particular studies, assumptions, or analytical decisions.

The central principle is:

> **A pooled estimate is only as credible as the evidence and analytical decisions that produce it. Bias assessment asks whether the evidence systematically points away from the truth; sensitivity analysis asks whether the conclusion survives reasonable alternative assumptions.**

---

# 1. Why Bias Matters

Suppose a meta-analysis estimates:

```text
Pooled effect = 0.60
```

This does not automatically mean:

> The true effect is 0.60.

The estimate may be affected by:

```text
Biased studies
Missing studies
Selective reporting
Measurement problems
Selective outcome reporting
Analytical choices
Dependence between observations
```

Therefore:

```text
Pooled estimate
      +
Bias assessment
      +
Sensitivity analysis
```

provides a more defensible interpretation.

---

# 2. Bias vs Random Error

These are different.

## Random error

Random error creates uncertainty around an estimate.

For example:

```text
True effect ≈ 0.50

Study estimate:
0.35
```

Another sample might produce:

```text
0.65
```

Random error can produce variation in either direction.

## Bias

Bias systematically shifts estimates away from the truth.

Conceptually:

```text
True effect
    ↓
Systematic distortion
    ↓
Observed effect
```

More data do not necessarily eliminate systematic bias.

---

# 3. Main Sources of Bias in Meta-Analysis

Important sources include:

```text
Study-level bias
Publication bias
Selective reporting
Selective analysis
Outcome measurement bias
Selection bias
Confounding
Small-study effects
Duplicate publication
Dependent samples
Researcher degrees of freedom
```

The exact risks depend on the research design.

---

# 4. Risk of Bias vs Reporting Bias

These concepts should be distinguished.

### Risk of bias

Concerns whether a study's design or conduct could systematically distort its result.

### Reporting bias

Concerns whether the evidence that becomes visible in the literature is systematically different from the evidence that exists.

For example:

```text
Study conducted
      ↓
Null result
      ↓
Not published
```

can create reporting bias even if the original study was methodologically sound.

---

# 5. Risk of Bias Assessment

Assess each included study using domains appropriate to its design.

Possible domains include:

```text
Randomisation
Allocation concealment
Blinding
Missing data
Outcome measurement
Selective reporting
Confounding
Participant selection
```

The assessment should be systematic rather than based on a general impression of whether a paper "looks good."

---

# 6. Randomisation Bias

In intervention studies, inadequate randomisation can create systematic differences between groups.

Potential problem:

```text
Treatment group
    ↓
More severe cases

Control group
    ↓
Less severe cases
```

An apparent treatment effect may then partly reflect baseline differences.

---

# 7. Allocation Concealment

Randomisation is not enough if researchers can predict or influence assignment.

For example:

```text
Researcher knows next assignment
        ↓
Participant selectively enrolled
        ↓
Groups become systematically different
```

Allocation concealment reduces this risk.

---

# 8. Blinding

Blinding can reduce certain forms of bias.

Potential sources include:

```text
Participants
Researchers
Outcome assessors
Data analysts
```

The importance of blinding depends on the intervention and outcome.

For example, subjective ratings may be more vulnerable than objective measurements.

---

# 9. Missing Outcome Data

Participants may drop out.

Suppose:

```text
Treatment:
100 recruited
60 assessed

Control:
100 recruited
95 assessed
```

If dropout is related to treatment response, the observed result may be biased.

Ask:

```text
Who is missing?
Why are they missing?
Are missingness patterns different between groups?
How were missing outcomes handled?
```

---

# 10. Outcome Measurement Bias

Measurement can systematically favour one condition.

For example:

```text
Subjective rating
        ↓
Rater knows treatment assignment
        ↓
Potentially biased outcome
```

Consider:

```text
Blinding
Reliability
Validity
Scale properties
Measurement timing
Outcome definition
```

---

# 11. Selective Outcome Reporting

A study may measure many outcomes but report only some.

Conceptually:

```text
20 outcomes measured
        ↓
3 outcomes reported
        ↓
3 happen to be favourable
```

The published results may overstate the evidence.

Compare:

```text
Protocol
Registration
Methods
Results
Supplementary material
```

when available.

---

# 12. Selective Analysis Reporting

Researchers may try several reasonable analyses and report only the most favourable one.

For example:

```text
Analysis A → p = .20
Analysis B → p = .08
Analysis C → p = .03
Analysis D → p = .15
```

If only C is reported, the published result can give a misleading impression of evidential strength.

Meta-analysis inherits this problem.

---

# 13. Publication Bias

Publication bias occurs when the probability that a study is published depends on its findings.

A simplified pattern:

```text
Positive result
      ↓
More likely published

Null result
      ↓
Less likely published
```

The observed literature can therefore overestimate the true effect.

---

# 14. File-Drawer Problem

Imagine:

```text
100 studies conducted

20 positive
80 null
```

If only the 20 positive studies are published:

```text
Published literature
= 20 positive studies
```

A meta-analysis based only on published papers could produce a strongly positive result even though most conducted studies were null.

---

# 15. Selective Publication Is Not the Only Problem

Missing evidence can arise from:

```text
Non-publication
Delayed publication
Language restrictions
Conference abstract loss
Selective outcome reporting
Selective subgroup reporting
Duplicate publication
```

Therefore:

> Searching only published journal articles may not recover the complete evidence base.

---

# 16. Search Strategy as Bias Control

A comprehensive search can reduce selection bias.

Consider:

```text
Published journals
+
Preprints
+
Trial registries
+
Dissertations
+
Conference proceedings
+
Reference lists
+
Citation tracking
```

The appropriate sources depend on the research question.

---

# 17. Funnel Plots

A funnel plot commonly plots:

```text
Effect size
    vs
Precision
```

A simplified pattern:

```text
             |
      •      |      •
        •    |    •
          •  |  •
             •
             |
```

If smaller studies are missing selectively, the distribution may appear asymmetric.

---

# 18. Funnel Plot Interpretation

An asymmetric funnel plot can be consistent with:

```text
Publication bias
```

but also with:

```text
Real heterogeneity
Small-study effects
Methodological differences
Measurement differences
Chance
```

Therefore:

> Funnel-plot asymmetry is not proof of publication bias.

---

# 19. Small-Study Effects

Small studies can produce systematically different estimates from large studies.

Possible explanations include:

```text
Publication bias
Poorer methodology
Different populations
Different interventions
Greater researcher flexibility
Chance
```

Therefore:

```text
Small-study effect
≠
Automatically publication bias
```

---

# 20. Statistical Tests for Funnel Asymmetry

Formal tests can be used to investigate asymmetry.

For example:

```text
Egger-type regression
```

However, these tests can have low power when there are few studies and can be influenced by heterogeneity.

They should therefore be treated as evidence contributing to an overall assessment rather than definitive proof.

---

# 21. Trim-and-Fill

Trim-and-fill methods attempt to estimate the impact of potentially missing studies under particular assumptions.

Conceptually:

```text
Observed studies
      ↓
Estimate asymmetry
      ↓
Impute potentially missing studies
      ↓
Recalculate pooled effect
```

These methods can be informative as sensitivity analyses.

They should not be interpreted as a reliable mechanism for "recovering" the true missing literature.

---

# 22. Bias Assessment Should Be Integrated

Do not treat bias assessment as a final checkbox.

Instead:

```text
Search
 ↓
Screen
 ↓
Extract
 ↓
Assess bias
 ↓
Pool
 ↓
Sensitivity analysis
 ↓
Interpret
```

Risk-of-bias information should influence how strongly the pooled result is interpreted.

---

# 23. Sensitivity Analysis

Sensitivity analysis asks:

> **Would the conclusion change if reasonable analytical assumptions changed?**

For example:

```text
Primary analysis:
All eligible studies

Sensitivity:
Exclude high-risk studies
```

If the conclusion remains similar:

```text
More robust
```

If it changes substantially:

```text
Conclusion is sensitive to study quality
```

---

# 24. Leave-One-Out Sensitivity Analysis

Remove each study one at a time.

Conceptually:

```text
All studies
   ↓
Pooled effect

Remove Study 1
   ↓
Pooled effect

Remove Study 2
   ↓
Pooled effect

Remove Study 3
   ↓
Pooled effect
```

This identifies influential studies.

---

# 25. Influence vs Error

An influential study is not necessarily an erroneous study.

It may be influential because it has:

```text
Large sample
High precision
Very different effect
```

Therefore:

```text
Influential
≠
Wrong
```

The correct response is investigation, not automatic removal.

---

# 26. Excluding High-Risk Studies

A useful sensitivity analysis may compare:

```text
All eligible studies
```

with:

```text
Lower-risk studies only
```

Example:

```text
All studies:
SMD = 0.52
95% CI = [0.35, 0.69]

Lower-risk studies:
SMD = 0.24
95% CI = [0.08, 0.40]
```

The intervention may still have a positive effect, but the magnitude appears smaller when higher-risk studies are excluded.

This should change the interpretation.

---

# 27. Alternative Effect-Size Definitions

Sensitivity analysis can test whether conclusions depend on effect-size decisions.

For example:

```text
Primary:
Hedges' g

Sensitivity:
Alternative justified standardisation method
```

or:

```text
Primary:
Post-treatment score

Sensitivity:
Change-from-baseline score
```

The alternatives must be scientifically defensible.

---

# 28. Alternative Time Points

Suppose studies report:

```text
Immediate
1 month
6 months
12 months
```

The primary analysis may use:

```text
Post-treatment
```

Sensitivity analyses can examine:

```text
Short-term
Long-term
```

This can reveal whether the apparent effect is temporary.

---

# 29. Alternative Statistical Models

For example:

```text
Primary:
Random-effects model

Sensitivity:
Alternative reasonable random-effects estimator
```

or, where scientifically justified:

```text
Fixed-effect model
```

The purpose is not to search for the model with the most significant result.

The purpose is to understand how modelling assumptions affect the estimate.

---

# 30. Robustness to Heterogeneity Assumptions

If heterogeneity is substantial, compare reasonable approaches.

For example:

```text
Random-effects pooled effect
+
Prediction interval
+
Influence analysis
+
Subgroup analysis
```

If conclusions are stable across approaches, confidence increases.

If they differ substantially, the uncertainty should be reported.

---

# 31. Cumulative Meta-Analysis

Cumulative analysis adds studies sequentially, often chronologically.

Conceptually:

```text
Study 1
   ↓
Studies 1–2
   ↓
Studies 1–3
   ↓
Studies 1–4
   ↓
...
```

This can show how evidence evolved over time.

It can also reveal whether later studies changed the estimated effect.

---

# 32. Sequential Decisions

Be careful when repeatedly inspecting accumulating results.

Repeatedly checking:

```text
"Is the result significant yet?"
```

and changing the analysis accordingly can introduce researcher degrees of freedom.

Predefined analysis plans reduce this risk.

---

# 33. Sensitivity Analysis Is Not a Fishing Exercise

Poor approach:

```text
Try many analyses
      ↓
Find one that looks good
      ↓
Report it
```

Better approach:

```text
Define plausible alternatives
        ↓
Run them systematically
        ↓
Compare results
        ↓
Explain differences
```

Sensitivity analysis should test assumptions, not manufacture preferred results.

---

# 34. Decision Rules Should Be Predefined

Before analysing results, specify:

```text
Primary outcome
Primary time point
Effect-size method
Primary model
Risk-of-bias rule
Influence criteria
Sensitivity analyses
```

This reduces:

```text
Researcher degrees of freedom
```

and makes the analysis more reproducible.

---

# 35. Sensitivity Analysis Matrix

A useful reporting table is:

| Analysis            | Studies | Effect | CI        | Interpretation |
| ------------------- | ------: | -----: | --------- | -------------- |
| Primary             |      24 |   0.48 | 0.32–0.64 | Positive       |
| Exclude high-risk   |      15 |   0.31 | 0.12–0.50 | Smaller        |
| Exclude influential |      23 |   0.44 | 0.29–0.59 | Similar        |
| Long-term only      |      11 |   0.18 | 0.02–0.34 | Small          |
| Alternative model   |      24 |   0.45 | 0.28–0.62 | Similar        |

The point is not to select the "best-looking" row.

The point is to show how conclusions respond to assumptions.

---

# 36. Sensitivity to Missing Studies

Ask:

```text
How large would unpublished evidence need to be
to materially change the conclusion?
```

Possible approaches include:

```text
Search for unpublished studies
Funnel analysis
Small-study analysis
Selection models
Sensitivity analyses
```

No single method can reliably reconstruct all missing evidence.

---

# 37. Bias in Observational Studies

Meta-analysis of observational studies requires particular attention to:

```text
Confounding
Selection bias
Measurement error
Reverse causality
Time-varying confounding
```

For example:

```text
Brain measure
    ↓
Cognitive outcome
```

may be associated because of:

```text
Age
Education
Disease severity
Socioeconomic factors
```

Pooling correlations does not remove confounding.

---

# 38. Bias in Neuroimaging Meta-Analysis

Neuroimaging studies may be affected by:

```text
Small samples
Selective reporting
Multiple comparisons
Flexible preprocessing
Thresholding choices
Peak reporting
Publication bias
Non-independent contrasts
```

A statistically significant reported brain region is therefore not automatically an unbiased estimate of the underlying effect.

---

# 39. Bias in Clinical Neuroscience

Clinical evidence may be affected by:

```text
Attrition
Treatment crossover
Selective outcome reporting
Baseline imbalance
Differences in standard care
Short follow-up
Small samples
Centre effects
```

Sensitivity analysis can examine whether conclusions survive these issues.

---

# 40. Bias in Machine Learning Meta-Analysis

Machine-learning studies have additional risks:

```text
Data leakage
Non-independent datasets
Repeated use of benchmark datasets
Test-set tuning
Selective metric reporting
Cherry-picked baselines
Lack of external validation
Different train/test splits
```

For example:

```text
Model A:
AUC = 0.90
```

cannot automatically be compared with:

```text
Model B:
AUC = 0.85
```

if they were evaluated on fundamentally different datasets or validation designs.

---

# 41. Multiple Publications From One Dataset

A research group may publish:

```text
Paper A
Paper B
Paper C
```

using the same participants.

If all three are entered as independent studies:

```text
Same participants
      ↓
Counted multiple times
      ↓
Artificially increased evidence
```

This is a major source of dependence.

Create a dataset-level identifier.

---

# 42. Sensitivity to Study Dependence

If dependence is uncertain, compare:

```text
Primary:
One effect per independent dataset
```

with:

```text
Alternative:
Model multiple effects explicitly
```

If results differ substantially, dependence should be part of the interpretation.

---

# 43. Bias and Certainty of Evidence

Bias assessment ultimately feeds into the certainty of the evidence.

Conceptually:

```text
Study quality
     ↓
Risk of bias
     ↓
Confidence in pooled effect
     ↓
Certainty of evidence
```

A narrow confidence interval does not guarantee high certainty.

---

# 44. What a Robust Result Looks Like

A particularly convincing pattern might be:

```text
Primary analysis
      ↓
Positive effect

Remove high-risk studies
      ↓
Similar effect

Remove influential studies
      ↓
Similar effect

Alternative reasonable model
      ↓
Similar effect

Publication-bias assessment
      ↓
No strong evidence of serious distortion
```

This does not prove the result is true.

It shows that the conclusion is relatively robust to investigated alternatives.

---

# 45. What a Fragile Result Looks Like

A fragile pattern might be:

```text
Primary analysis
      ↓
Large positive effect

Remove two high-risk studies
      ↓
Near-zero effect

Remove one influential study
      ↓
Null effect

Alternative model
      ↓
Wide uncertainty
```

The appropriate conclusion is not:

> The treatment definitely works.

Instead:

> The estimated effect is sensitive to study selection and modelling assumptions.

---

# 46. Bias and Sensitivity Reporting

A strong report should explain:

```text
Which biases were considered
How risk of bias was assessed
Which studies had important concerns
Which sensitivity analyses were performed
Why those analyses were chosen
How estimates changed
How this affected interpretation
```

Avoid simply writing:

> Sensitivity analyses were performed.

The reader needs to know what changed and why.

---

# 47. Practical Workflow

Use:

```text
1. Identify possible sources of bias
        ↓
2. Assess risk of bias study-by-study
        ↓
3. Identify reporting-bias risks
        ↓
4. Define primary analysis
        ↓
5. Define sensitivity analyses
        ↓
6. Run primary analysis
        ↓
7. Run sensitivity analyses
        ↓
8. Compare estimates
        ↓
9. Investigate influential studies
        ↓
10. Interpret robustness
        ↓
11. Adjust certainty of evidence
        ↓
12. Report limitations
```

---

# 48. Bias and Sensitivity Checklist

```text
□ Was risk of bias assessed systematically?
□ Were design-appropriate bias domains used?
□ Were duplicate datasets identified?
□ Was selective outcome reporting considered?
□ Was publication bias considered?
□ Was the search broad enough to reduce selection bias?
□ Were unpublished or grey-literature sources considered where appropriate?
□ Was funnel asymmetry examined when appropriate?
□ Were small-study effects considered?
□ Were influential studies identified?
□ Was leave-one-out analysis considered?
□ Were high-risk studies examined separately?
□ Were alternative effect-size choices tested where justified?
□ Were alternative time points examined where relevant?
□ Were alternative models examined?
□ Were sensitivity analyses predefined?
□ Were all reasonable analyses reported?
□ Did conclusions change materially?
□ Is the final interpretation calibrated to robustness?
```

---

# 49. Final Mental Model

Think of bias and sensitivity analysis as two complementary questions:

```text
BIAS

Could the evidence systematically point
away from the truth?

        +

SENSITIVITY

Would our conclusion change if reasonable
assumptions or influential studies changed?

        ↓

ROBUSTNESS OF CONCLUSION
```

The final question is not:

> "Is the pooled effect statistically significant?"

It is:

> **"How much confidence should we place in this pooled effect, given the possible biases and the ways in which the result changes under reasonable alternatives?"**
