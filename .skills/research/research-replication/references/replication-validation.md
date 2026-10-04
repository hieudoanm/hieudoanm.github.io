````markdown id="rvn64p"
# Replication Validation

## Purpose

Replication validation determines how strongly new evidence supports, weakens, qualifies, or contradicts an original scientific finding.

The central question is:

> **What does the new evidence actually tell us about the original claim?**

Validation should not reduce replication to:

```text
p < .05
    ↓
Replicated

p > .05
    ↓
Failed
```

Instead, evaluate:

```text
Effect
+
Uncertainty
+
Design fidelity
+
Evidence independence
+
Methodological differences
+
Population/context
+
Scientific importance
```

---

# 1. Replication is evidence updating

Think of replication as an evidence-updating process:

```text
Original evidence
      ↓
Initial confidence
      ↓
New independent evidence
      ↓
Updated confidence
```

The result may:

```text
Increase confidence
Maintain confidence
Reduce confidence
Qualify the claim
Create uncertainty
Contradict the claim
```

The purpose is not to produce a binary verdict.

---

# 2. Validate the replication before interpreting the result

Before interpreting the scientific finding, check whether the replication itself was informative.

Ask:

```text
Was the evidence genuinely new?
Was the sample appropriate?
Was the study sufficiently powered?
Was the measurement reliable?
Was the primary outcome preserved?
Was the analysis appropriate?
Were major deviations introduced?
Was data leakage avoided?
```

A poorly executed replication can be inconclusive even when the result differs from the original.

---

# 3. Validation dimensions

Evaluate replication evidence across at least these dimensions:

```text
1. Independence
2. Fidelity
3. Statistical precision
4. Effect compatibility
5. Measurement quality
6. Population/context
7. Methodological differences
8. Bias
9. Practical significance
10. Generalisability
```

No single dimension should determine the conclusion automatically.

---

# 4. Evidence independence

First ask:

> Is this genuinely new evidence?

Check:

- New participants
- New observations
- Independent dataset
- Independent recording session
- No participant overlap
- No train/test contamination
- No reused observations

Example:

```text
Original dataset
     ↓
New analysis
```

is usually reproduction.

Whereas:

```text
Original dataset
     ↓
New independent dataset
```

supports replication.

---

# 5. Participant independence

For human studies, check:

```text
Original participants
        vs
Replication participants
```

Potential overlap can occur when:

- The same participant pool is reused
- Longitudinal participants are treated as independent
- Follow-up participants are analysed as a new sample
- Shared control groups appear across studies

Document any overlap explicitly.

---

# 6. Dataset independence

For computational studies, check:

```text
Dataset A
    ↓
Original model

Dataset B
    ↓
Replication
```

Dataset B should be independent enough to provide new empirical evidence.

Watch for:

- Duplicate subjects
- Duplicate images
- Duplicate recordings
- Shared preprocessing
- Shared labels
- Shared benchmark test sets

---

# 7. Design fidelity

Ask:

> Did the replication actually test the original scientific claim?

Evaluate:

```text
Population
Intervention
Control
Task
Outcome
Timing
Context
Analysis
```

Classify fidelity as:

```text
High
Moderate
Low
```

Low fidelity does not automatically invalidate the study, but it changes what can be concluded.

---

# 8. Essential-component check

Create a table:

| Component    | Original     | Replication  | Consequence |
| ------------ | ------------ | ------------ | ----------- |
| Population   | Young adults | Young adults | Low         |
| Intervention | Training A   | Training A   | None        |
| Control      | Active       | Active       | None        |
| Outcome      | Attention    | Attention    | None        |
| Site         | Lab A        | Lab B        | Possible    |
| Device       | Device X     | Device Y     | Possible    |

Then ask:

> Could any difference plausibly change the effect?

---

# 9. Statistical precision

A replication must be sufficiently informative to distinguish:

```text
Meaningful effect
```

from:

```text
Small/negligible effect
```

A wide confidence interval may mean:

> The replication is inconclusive.

Do not interpret every non-significant result as evidence against the original claim.

---

# 10. Effect-size comparison

Always compare effect estimates.

Example:

```text
Original:
d = 0.45

Replication:
d = 0.31
```

The estimates differ.

That is normal.

Ask:

```text
How large is the difference?
How uncertain is each estimate?
Are the estimates compatible?
```

---

# 11. Confidence intervals

Example:

```text
Original:
d = 0.45
95% CI [0.20, 0.70]

Replication:
d = 0.31
95% CI [0.05, 0.57]
```

The intervals overlap and the estimates point in the same direction.

This provides evidence that is broadly compatible with the original result.

---

# 12. Do not use confidence-interval overlap mechanically

Overlap of confidence intervals is a useful visual intuition but is not a formal test of whether two effects differ.

If the scientific question is:

> Are the two effect estimates different?

use an appropriate statistical comparison of effects.

The principle is:

```text
Visual comparison
    ↓
Useful first step

Formal inference
    ↓
Required for claims about effect differences
```

---

# 13. Statistical significance is not replication

Suppose:

```text
Original:
p = .01

Replication:
p = .08
```

This alone does not establish a failed replication.

Likewise:

```text
Original:
p = .08

Replication:
p = .03
```

does not automatically prove the replication succeeded.

Compare:

```text
Effect size
Uncertainty
Direction
Study design
```

rather than significance thresholds alone.

---

# 14. Smallest effect of interest

Define:

```text
Smallest effect of interest (SESOI)
```

This is the smallest effect considered scientifically meaningful.

Example:

```text
SESOI:
d = 0.20
```

Then ask whether the replication can distinguish:

```text
Meaningful:
|d| ≥ 0.20

from

Negligible:
|d| < 0.20
```

This is particularly useful when interpreting apparently null replications.

---

# 15. Equivalence testing

If the goal is to test whether the effect is sufficiently small, consider equivalence testing.

Example:

```text
Equivalence bounds:
-0.20 to +0.20

Replication estimate:
d = 0.03
```

If the confidence interval lies entirely within the equivalence bounds, this provides evidence that the effect is smaller than the predefined meaningful threshold.

This is stronger than simply observing:

```text
p > .05
```

---

# 16. Bayesian validation

Bayesian methods can evaluate evidence for competing explanations.

For example:

```text
H₁:
Meaningful effect exists

H₀:
Effect is negligible
```

Bayesian approaches can estimate:

- Bayes factors
- Posterior probabilities
- Credible intervals
- Posterior effect distributions

The useful question becomes:

> How much does the new evidence change belief in the original claim?

---

# 17. Directional consistency

Check whether the effect points in the same direction.

```text
Original:
Positive

Replication:
Positive
```

is more consistent than:

```text
Original:
Positive

Replication:
Negative
```

But direction alone is insufficient.

A tiny positive estimate does not necessarily replicate a large positive effect.

---

# 18. Magnitude consistency

Compare:

```text
Original effect
Replication effect
```

Possible interpretations:

### Similar magnitude

Strongly compatible.

### Smaller magnitude

Potential attenuation.

### Much smaller

Could indicate:

- Original inflation
- Context dependence
- Measurement differences
- Population differences

### Opposite direction

Requires investigation.

---

# 19. Precision consistency

A replication may have:

```text
Same effect
+
Much narrower CI
```

This increases confidence.

Or:

```text
Same effect
+
Very wide CI
```

This provides less information.

Therefore evaluate:

```text
Effect
+
Precision
```

together.

---

# 20. Statistical power

A low-powered replication can produce:

```text
True effect
    ↓
No statistical significance
```

Therefore ask:

> Could this study reasonably have detected the effect?

Do not infer absence from low-powered null results.

---

# 21. Power is not the whole story

A highly powered study can still be scientifically weak if:

- Measurement is invalid
- Outcome is inappropriate
- Sample is irrelevant
- Analysis is biased
- Data are contaminated

Therefore:

```text
Power
```

is necessary but not sufficient.

---

# 22. Measurement reliability

Replication failure can arise from measurement noise.

Conceptually:

```text
True effect
     ↓
Reliable measurement
     ↓
Observed effect

True effect
     ↓
Noisy measurement
     ↓
Attenuated observed effect
```

Check:

- Internal consistency
- Test-retest reliability
- Inter-rater reliability
- Signal-to-noise ratio
- Measurement validity

depending on the field.

---

# 23. Neuroimaging measurement quality

For MRI/EEG/MEG studies, inspect:

```text
Signal-to-noise ratio
Motion
Bad channels
Artifact rejection
Head movement
Acquisition differences
Preprocessing
Source localisation
Spatial resolution
Temporal resolution
```

A weaker neural signal can reduce replication sensitivity.

---

# 24. Methodological differences

Classify differences as:

```text
Minor
Moderate
Major
```

### Minor

Likely little scientific impact.

### Moderate

Potentially affects effect magnitude.

### Major

May change the scientific question.

Example:

```text
Original:
fMRI semantic contrast

Replication:
Different task measuring lexical decision
```

This may not be a direct replication.

---

# 25. Context dependence

A finding may depend on context.

Potential moderators include:

```text
Population
Culture
Language
Age
Task
Environment
Time
Laboratory
Equipment
Training history
Clinical status
```

If the replication changes one of these, determine whether it was intended as:

```text
Replication
```

or:

```text
Generalisation test
```

---

# 26. Check manipulation fidelity

For experimental studies, ask:

> Did the manipulation actually work?

Example:

```text
Training intervention
      ↓
Expected behavioural change
```

If the manipulation failed, a null outcome may not test the original hypothesis adequately.

This is especially important in:

- Training studies
- Clinical interventions
- Priming
- Experimental psychology
- Pharmacological studies

---

# 27. Check control fidelity

The control condition should preserve the original comparison.

For example:

```text
Original:
Treatment vs active control

Replication:
Treatment vs no treatment
```

The new contrast is different.

A difference in results may therefore reflect the altered control rather than failure of the original effect.

---

# 28. Check outcome fidelity

Verify:

```text
Same construct?
Same measurement?
Same timing?
Same scoring?
Same reliability?
```

If the outcome changed, determine whether this is:

```text
Direct replication
```

or:

```text
Conceptual replication
```

---

# 29. Check analysis fidelity

Compare:

```text
Original statistical model
```

with:

```text
Replication statistical model
```

Check:

- Outcome transformation
- Covariates
- Random effects
- Exclusions
- Multiple-comparison correction
- Thresholds
- Model specification

A different analysis can test a different statistical hypothesis.

---

# 30. Researcher degrees of freedom

Potential sources include:

- Outcome selection
- Exclusion criteria
- Covariate selection
- Time-window selection
- ROI selection
- Preprocessing choices
- Hyperparameter tuning
- Stopping rules

The more flexible the analysis, the harder it is to interpret replication evidence.

---

# 31. Preregistration quality

Ask:

```text
Was the primary outcome specified?
Was the primary analysis specified?
Were exclusions specified?
Was sample size specified?
Were stopping rules specified?
```

A replication does not become unbiased simply because the word:

> preregistered

appears in the paper.

Evaluate what was actually registered.

---

# 32. Deviations from preregistration

Create a deviation table:

| Planned     | Actual      | Reason      | Impact   |
| ----------- | ----------- | ----------- | -------- |
| N=150       | N=142       | Recruitment | Moderate |
| Analysis A  | Analysis A  | —           | None     |
| Exclusion X | Exclusion Y | QC issue    | Moderate |

Transparency is more important than pretending the plan was followed perfectly.

---

# 33. Data-quality validation

Before interpreting a null result, verify:

```text
Data completeness
Signal quality
Participant compliance
Task performance
Manipulation success
Preprocessing quality
Missingness
```

A technically failed experiment should not be interpreted as evidence against the scientific claim.

---

# 34. Detect floor and ceiling effects

Suppose the outcome has:

```text
Maximum score = 100
```

and most participants score:

```text
98–100
```

The measure may be unable to detect improvement.

Similarly:

```text
Most participants = 0–2
```

may indicate a floor effect.

This can suppress observed replication effects.

---

# 35. Evaluate practical significance

A replication may produce:

```text
Statistically significant
```

but:

```text
Scientifically trivial
```

Example:

```text
Mean improvement = 0.3 ms
```

Even if statistically detectable, this may not support the substantive interpretation of a meaningful cognitive improvement.

Interpret:

```text
Statistical significance
+
Effect magnitude
+
Scientific importance
```

---

# 36. Assess generalisability

Determine what the replication actually generalises to.

Possible levels:

```text
Same population
      ↓
Different participants
      ↓
Different site
      ↓
Different population
      ↓
Different context
      ↓
Different method
      ↓
Broader theoretical claim
```

Do not claim more generality than the design supports.

---

# 37. Replication outcome categories

A useful qualitative classification is:

```text
1. Strongly consistent
2. Broadly consistent
3. Partially consistent
4. Inconclusive
5. Inconsistent
6. Contradictory
```

These are interpretive categories, not universal statistical thresholds.

---

# 38. Strongly consistent

Typical evidence:

```text
Same direction
Compatible magnitude
Good precision
High methodological fidelity
Independent evidence
No major deviations
```

Interpretation:

> The new evidence strongly supports the robustness of the original finding.

---

# 39. Broadly consistent

Typical evidence:

```text
Same direction
Somewhat different magnitude
Compatible uncertainty
Minor methodological differences
```

Interpretation:

> The new evidence is broadly compatible with the original finding, although the estimated effect may differ.

---

# 40. Partially consistent

Some claims replicate and others do not.

Example:

```text
Behavioural effect:
Replicated

Neural mediation:
Not replicated
```

Interpret each claim separately.

Do not collapse the entire paper into:

```text
Success
```

or:

```text
Failure
```

---

# 41. Inconclusive

Typical characteristics:

```text
Wide confidence interval
Low precision
Major measurement problems
Insufficient sample
Substantial design deviation
```

Interpretation:

> The replication does not provide sufficient evidence to determine whether the original claim holds.

---

# 42. Inconsistent

The replication differs meaningfully from the original.

Example:

```text
Original:
d = 0.50

Replication:
d = 0.05
```

If the replication is sufficiently precise to exclude the original effect size, confidence in the original claim should decrease.

---

# 43. Contradictory

The replication provides strong evidence in the opposite direction.

Example:

```text
Original:
Positive effect

Replication:
Reliable negative effect
```

Investigate:

```text
Moderation
Methodological difference
Measurement
Population
Context
Original statistical error
Replication error
```

before making strong causal claims about why the results differ.

---

# 44. Null replication

A null result should be decomposed into:

```text
No effect
```

versus:

```text
Insufficient evidence
```

The distinction depends on:

- Precision
- Sample size
- Measurement
- Smallest meaningful effect
- Equivalence analysis
- Bayesian evidence

---

# 45. Comparing effects formally

When appropriate, compare original and replication effects statistically.

Possible approaches include:

- Meta-analytic comparison
- Interaction models
- Tests of effect differences
- Hierarchical models
- Bayesian comparison

The method should match the data structure.

Avoid informal conclusions based solely on:

```text
One significant
vs
one non-significant
```

---

# 46. Heterogeneity across replications

If several replications exist, ask:

```text
Do effect sizes vary?
```

Potential sources:

```text
Population
Method
Context
Measurement
Sample characteristics
Site
Task
```

This turns replication into a study of:

```text
When does the effect occur?
```

rather than only:

```text
Does the effect exist?
```

---

# 47. Replication and meta-analysis

A single replication gives one additional estimate.

Multiple replications can be synthesised.

```text
Original
Replication 1
Replication 2
Replication 3
       ↓
Meta-analysis
       ↓
Pooled evidence
```

This can estimate:

- Average effect
- Heterogeneity
- Moderators
- Prediction interval

Use the `meta-analysis` skill for quantitative synthesis.

---

# 48. Publication bias in replication

Replication evidence can itself be selectively reported.

For example:

```text
Successful replications
        ↓
More likely published

Null replications
        ↓
Less likely published
```

This can create an overly optimistic impression of robustness.

When evaluating a replication literature, consider selective reporting.

---

# 49. Multiple replication attempts

Suppose:

```text
Original:
Positive

Replication 1:
Positive

Replication 2:
Null

Replication 3:
Positive

Replication 4:
Negative
```

Do not choose only the studies supporting the original.

Consider the complete evidence base.

---

# 50. Failed replication as scientific information

A discrepancy can be valuable.

It may reveal:

```text
Boundary condition
Moderator
Measurement problem
Population difference
Context dependence
Statistical issue
Theoretical limitation
```

A failed replication is not necessarily a failed research project.

It may reveal a better research question.

---

# 51. Replication discrepancy workflow

When results differ:

```text
Different result
      ↓
Check data quality
      ↓
Check evidence independence
      ↓
Check design fidelity
      ↓
Check manipulation
      ↓
Check measurement
      ↓
Check analysis
      ↓
Check statistical precision
      ↓
Check population/context
      ↓
Check moderators
      ↓
Evaluate original claim
```

This prevents premature conclusions.

---

# 52. Neuroscience validation example

Original:

```text
MEG study
Semantic decoding:
AUC = 0.72
```

Replication:

```text
MEG study
Semantic decoding:
AUC = 0.69
```

If uncertainty overlaps substantially and the design is highly similar, this may be broadly consistent.

But:

```text
Replication:
AUC = 0.51
95% CI excludes 0.70
```

would provide substantially weaker support for the original performance claim.

---

# 53. OPM-MEG validation example

Original:

```text
Conventional MEG
Semantic decoding:
AUC = 0.72
```

Replication:

```text
OPM-MEG
AUC = 0.68
```

This result cannot automatically be interpreted as a direct replication.

It is also a:

```text
Cross-method replication
```

The interpretation should consider whether the sensor technology affects:

- Signal quality
- Spatial sampling
- Sensor geometry
- Noise
- Source reconstruction

---

# 54. Clinical prediction validation example

Original:

```text
Model A
AUC = 0.84
```

Independent cohort:

```text
AUC = 0.76
```

The decrease does not automatically mean model failure.

Evaluate:

```text
Calibration
Confidence interval
Population shift
Outcome definition
Class balance
Site effects
```

External validation may reveal that the model is useful but less generalisable than originally suggested.

---

# 55. Machine-learning replication validation

For ML:

```text
Original:
Accuracy = 92%

Replication:
Accuracy = 88%
```

Do not interpret immediately.

Check:

```text
Dataset
Preprocessing
Target definition
Class balance
Evaluation metric
Confidence interval
Baseline
Data leakage
Distribution shift
```

A performance reduction may reflect real-world generalisation rather than failure of the underlying modelling approach.

---

# 56. Final validation report

A replication validation should produce:

```text
## Original Claim

[Claim]

## New Evidence

[Independent evidence]

## Design Fidelity

[High / Moderate / Low]

## Primary Result

[Effect + uncertainty]

## Comparison

[Original vs replication]

## Methodological Differences

[Important differences]

## Statistical Interpretation

[Compatibility / difference / inconclusive]

## Practical Significance

[Meaning of effect]

## Generalisability

[What population/context is supported]

## Replication Assessment

[Strongly consistent / broadly consistent / etc.]

## Updated Confidence

[Higher / similar / lower / uncertain]

## Remaining Questions

[Unresolved issues]
```

---

# 57. Validation checklist

```text
[ ] Evidence is genuinely independent
[ ] Participants/data are new
[ ] Original claim is clearly defined
[ ] Essential components were preserved
[ ] Deviations are documented
[ ] Sample size is adequate
[ ] Measurement is reliable
[ ] Manipulation was successful
[ ] Primary outcome was preserved
[ ] Primary analysis was predefined
[ ] Effect size is reported
[ ] Confidence interval is reported
[ ] Smallest meaningful effect was considered
[ ] Statistical significance was not used alone
[ ] Practical significance was considered
[ ] Population differences were assessed
[ ] Context differences were assessed
[ ] Methodological differences were assessed
[ ] Exploratory analyses are distinguished
[ ] Alternative explanations were considered
[ ] Generalisation claims are appropriately limited
```

---

# Final principle

Replication validation is not a search for a binary verdict.

It is an evidence assessment:

```text
NEW EVIDENCE
      ↓
IS IT INDEPENDENT?
      ↓
IS THE TEST FIDELITY ADEQUATE?
      ↓
HOW PRECISE IS THE ESTIMATE?
      ↓
HOW DOES THE EFFECT COMPARE?
      ↓
COULD DIFFERENCES HAVE EXPLANATIONS?
      ↓
WHAT DOES THE NEW EVIDENCE SUPPORT?
      ↓
UPDATED CONFIDENCE
```

> **A replication becomes scientifically useful when its result can be interpreted in relation to the original claim, its uncertainty, and the conditions under which both studies were conducted.**
````
