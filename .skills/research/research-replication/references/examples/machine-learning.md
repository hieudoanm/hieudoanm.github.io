# Machine Learning Replication Example

## Purpose

This example demonstrates how to design and evaluate a replication of a machine-learning study.

The example focuses on a hypothetical neuroimaging model that predicts cognitive impairment from structural MRI.

The goal is to show how replication principles apply when:

- Models can overfit
- Datasets differ across sites
- Preprocessing can leak information
- Hyperparameter tuning can contaminate evaluation
- Performance depends strongly on the evaluation protocol
- External validation may be more informative than internal cross-validation

---

# 1. Research question

Suppose an original study asks:

> Can structural MRI predict whether an individual has mild cognitive impairment?

The original study reports that a machine-learning model achieves high classification performance.

The replication should begin with:

```text
Does structural MRI contain predictive information
that generalises to new individuals?
```

Not:

```text
Can we reproduce the original accuracy?
```

---

# 2. Original scientific claim

Suppose the original study reports:

```text
Participants:
500

Input:
Structural MRI

Target:
MCI vs cognitively healthy

Model:
Support Vector Machine

Evaluation:
5-fold cross-validation

Performance:
AUC = 0.89
```

The claim is approximately:

> Structural MRI contains information that can distinguish people with mild cognitive impairment from cognitively healthy individuals.

A stronger version might claim:

> The model generalises to new patients.

That stronger claim requires stronger evidence.

---

# 3. Identify the replication target

Before designing the replication, specify:

```text
Population:
Adults with and without MCI

Input:
Structural MRI

Target:
MCI classification

Primary metric:
AUC

Secondary metrics:
Sensitivity
Specificity
Balanced accuracy
Calibration
```

If the original study emphasises AUC, preserve it as the primary metric.

---

# 4. Reproduction versus replication

### Reproduction

```text
Original dataset
        ↓
Original code
        ↓
Original result
```

### Replication

```text
New dataset
        ↓
Prespecified model
        ↓
New result
```

### External validation

```text
Original cohort
        ↓
Train model

Independent cohort
        ↓
Evaluate model
```

External validation is especially important for ML.

---

# 5. Why ML replication is difficult

Performance depends on more than the algorithm.

It depends on:

```text
Dataset
+
Labels
+
Preprocessing
+
Feature extraction
+
Model
+
Hyperparameters
+
Cross-validation
+
Evaluation metric
```

Therefore:

```text
"Same algorithm"
```

does not necessarily mean:

```text
"Same experiment."
```

---

# 6. Dataset independence

A replication dataset should ideally contain:

```text
New participants
```

and preferably:

```text
New acquisition sessions
```

Potential contamination includes:

```text
Duplicate subjects
Repeated scans
Shared test data
Public benchmark leakage
```

Check identifiers where possible.

---

# 7. Subject-level splitting

Suppose one participant has:

```text
Scan 1
Scan 2
Scan 3
```

Do not randomly split scans:

```text
Scan 1 → training
Scan 2 → testing
```

This allows subject-specific information to leak across the split.

Instead:

```text
Participant A
  all scans → training

Participant B
  all scans → testing
```

The unit of splitting should match the unit of generalisation.

---

# 8. Site-level splitting

For multi-site neuroimaging data, random subject-level splitting can still be optimistic.

Example:

```text
Site A:
Training + testing

Site B:
Training + testing
```

The model may learn site-specific characteristics.

A stronger test might be:

```text
Train:
Sites A+B+C

Test:
Site D
```

This evaluates cross-site generalisation.

---

# 9. Label definition

The target must be defined consistently.

For example:

```text
MCI
```

may depend on:

```text
Clinical criteria
Cognitive thresholds
Functional impairment
Physician diagnosis
Biomarker criteria
```

A replication with different diagnostic criteria is not necessarily testing the same target.

---

# 10. Label noise

Clinical labels are not always perfectly reliable.

Suppose:

```text
Observed label
      ↓
MCI
```

but:

```text
True underlying state
      ↓
uncertain
```

Label noise can reduce replication performance.

Compare:

```text
Original diagnostic protocol
```

with:

```text
Replication diagnostic protocol
```

---

# 11. Class balance

Suppose:

```text
Original:
50% MCI
50% control
```

Replication:

```text
20% MCI
80% control
```

Accuracy becomes difficult to compare directly.

For example:

```text
80% accuracy
```

could be achieved by predicting:

```text
Control
```

for everyone.

Therefore consider:

```text
AUC
Balanced accuracy
Sensitivity
Specificity
Precision
Recall
```

as appropriate.

---

# 12. Baseline classifier

Always compare against a meaningful baseline.

For example:

```text
Complex MRI model
```

versus:

```text
Age + sex
```

or:

```text
Age + sex + education
```

If:

```text
MRI model:
AUC = .89

Demographic baseline:
AUC = .87
```

the MRI contribution may be much smaller than the headline performance suggests.

---

# 13. Feature extraction

Suppose the original study uses:

```text
Voxel-based features
```

The replication should determine whether this means:

```text
Raw voxels
Regional volume
Cortical thickness
Gray-matter density
```

These are different feature spaces.

A feature mismatch can change the scientific question.

---

# 14. Neuroimaging preprocessing

A typical pipeline might be:

```text
MRI
 ↓
Quality control
 ↓
Bias correction
 ↓
Registration
 ↓
Segmentation
 ↓
Normalisation
 ↓
Feature extraction
 ↓
Scaling
 ↓
Model
```

Every stage can affect predictive performance.

Document the pipeline precisely.

---

# 15. Preprocessing leakage

A common error is:

```text
Entire dataset
    ↓
Standardise features
    ↓
Cross-validation
```

The correct approach is:

```text
Training fold
    ↓
Fit scaler

Training fold
    ↓
Transform

Validation fold
    ↓
Apply fitted scaler
```

The validation data must not influence the preprocessing parameters.

---

# 16. Feature selection leakage

Suppose there are:

```text
100,000 MRI features
```

Researchers select the:

```text
1,000 best features
```

using all participants.

Then they perform cross-validation.

This leaks test-fold information.

Correct:

```text
Training fold
    ↓
Feature selection
    ↓
Model fitting
    ↓
Validation fold
```

Feature selection belongs inside the validation loop.

---

# 17. Hyperparameter leakage

Suppose the model has:

```text
C
gamma
kernel
```

and researchers select the best combination based on test-set performance.

The test set is no longer an unbiased evaluation set.

Use:

```text
Nested cross-validation
```

or:

```text
Independent validation set
```

for hyperparameter selection.

---

# 18. Nested cross-validation

Conceptually:

```text
Outer loop
    ↓
Estimate generalisation

Inner loop
    ↓
Select hyperparameters
```

Example:

```text
Outer training set
        ↓
Inner CV
        ↓
Choose hyperparameters
        ↓
Fit outer model
        ↓
Outer test set
        ↓
Performance
```

This prevents the evaluation data from influencing model selection.

---

# 19. External validation

The strongest replication design may be:

```text
Original dataset
       ↓
Train + tune

Independent dataset
       ↓
Frozen model
       ↓
Evaluate
```

The model should not be re-tuned on the external test set if the goal is pure external validation.

---

# 20. Model freezing

Before external evaluation, define:

```text
Feature pipeline
Model architecture
Hyperparameters
Decision threshold
Preprocessing
```

Then freeze them.

Conceptually:

```text
MODEL LOCK
    ↓
NEW DATA
    ↓
PREDICTIONS
    ↓
EVALUATION
```

This provides a cleaner test of generalisation.

---

# 21. Performance metrics

For binary classification:

```text
AUC
Sensitivity
Specificity
Balanced accuracy
Precision
Recall
F1
Calibration
```

Do not report every metric without purpose.

Choose:

```text
Primary metric
+
clinically relevant secondary metrics
```

before evaluation.

---

# 22. AUC interpretation

Suppose:

```text
Original:
AUC = 0.89

Replication:
AUC = 0.82
```

The replication performance is lower.

Possible explanations include:

```text
Overfitting
Dataset shift
Label differences
Scanner differences
Population differences
```

The key question is whether:

```text
AUC = 0.82
```

remains useful for the intended application.

---

# 23. Confidence intervals

Always report uncertainty.

Example:

```text
Original:
AUC = .89
95% CI [.85, .93]

Replication:
AUC = .82
95% CI [.77, .87]
```

This provides much more information than:

```text
AUC = .82
```

alone.

---

# 24. Compare effect estimates

For ML replication, the analogue of an effect size may be:

```text
AUC
RMSE
MAE
R²
Accuracy
F1
```

Compare:

```text
Estimate
+
Confidence interval
+
Evaluation protocol
```

rather than only:

```text
Best reported score
```

---

# 25. Accuracy versus balanced accuracy

Suppose:

```text
90% controls
10% MCI
```

A classifier predicting:

```text
Control for everyone
```

achieves:

```text
90% accuracy.
```

But:

```text
Sensitivity = 0%
```

Therefore accuracy can be misleading under class imbalance.

---

# 26. Calibration

A classifier can rank people correctly while producing poorly calibrated probabilities.

Example:

```text
Predicted probability = 0.90
Observed frequency = 0.60
```

For clinical applications, this matters.

Evaluate:

```text
Calibration curve
Calibration intercept
Calibration slope
Brier score
```

where appropriate.

---

# 27. Threshold selection

Suppose the original model uses:

```text
Threshold = 0.50
```

The replication should preserve this if testing the frozen model.

Do not select:

```text
The threshold producing the best sensitivity/specificity
```

on the external test set.

That would optimise the evaluation data.

---

# 28. ROC curve versus operating point

The ROC curve evaluates ranking performance across thresholds.

A clinical system may require a specific operating point.

For example:

```text
High sensitivity
```

may be more important than:

```text
Maximum accuracy
```

The replication should report performance relevant to the intended use.

---

# 29. Dataset shift

A model trained on:

```text
Dataset A
```

may encounter:

```text
Dataset B
```

with different distributions.

Examples:

```text
Age
Scanner
Acquisition
Prevalence
Disease severity
Clinical protocol
```

This is:

```text
Distribution shift.
```

---

# 30. Covariate shift

The relationship:

```text
P(X)
```

may change between datasets while:

```text
P(Y|X)
```

remains approximately stable.

For example:

```text
Replication participants
```

may be older on average.

The model can still work, but the input distribution differs.

---

# 31. Label shift

The class prevalence may change:

```text
Original:
P(MCI) = 0.50

Replication:
P(MCI) = 0.20
```

This can affect predictive values and calibration.

Therefore report prevalence explicitly.

---

# 32. Concept shift

The relationship between features and labels may change:

```text
P(Y|X)
```

For example:

```text
Diagnostic criteria changed.
```

Now the model may genuinely be solving a different prediction problem.

---

# 33. Site effects in neuroimaging

MRI data can contain site-specific information.

A model may accidentally learn:

```text
Scanner
```

instead of:

```text
Disease.
```

For example:

```text
Site A → mostly MCI
Site B → mostly controls
```

The model could classify:

```text
Site
```

rather than:

```text
Brain pathology.
```

This is a major replication risk.

---

# 34. Harmonisation

Possible approaches include:

```text
Scanner harmonisation
Site-aware modelling
ComBat-like methods
Domain adaptation
Hierarchical models
```

However, harmonisation itself must be performed without leaking information from the evaluation set.

---

# 35. Explainability

Suppose the original study reports:

```text
Important features:
hippocampus
temporal cortex
```

The replication should distinguish:

```text
Predictive importance
```

from:

```text
Causal importance.
```

A feature can be predictive without causing the clinical condition.

---

# 36. Feature-importance replication

If the original claim includes a biological interpretation, replicate both:

```text
Predictive performance
```

and, where justified:

```text
Feature importance
```

But do not assume that the same feature ranking must appear exactly.

Feature importance can be unstable across samples.

---

# 37. Stability analysis

Useful questions include:

```text
Do important features remain important
across folds?

Across bootstrap samples?

Across sites?

Across random seeds?
```

Stable prediction with unstable feature importance may support the model while weakening claims about specific biological features.

---

# 38. Random seeds

Some ML algorithms are stochastic.

A replication should distinguish:

```text
Random variation
```

from:

```text
Scientific variation.
```

Where relevant, evaluate performance across multiple seeds.

Do not report only the best random seed.

---

# 39. Hyperparameter sensitivity

Suppose performance changes from:

```text
AUC = .81
```

to:

```text
AUC = .88
```

with small hyperparameter changes.

This indicates instability.

A robust model should not depend excessively on arbitrary tuning choices.

---

# 40. Algorithm replication

Suppose the original study uses:

```text
SVM
```

and the replication uses:

```text
Random forest
```

This is not necessarily a direct replication.

It may be:

```text
Conceptual replication
```

if the scientific question is preserved but the modelling approach changes.

---

# 41. Architecture replication

For deep learning, distinguish:

```text
Same architecture
```

from:

```text
Same scientific question.
```

A new architecture may produce different performance while still testing the same prediction problem.

Do not interpret algorithmic differences as biological contradictions without evidence.

---

# 42. Dataset-size effects

Suppose:

```text
Original:
N = 500

Replication:
N = 5,000
```

A larger sample can produce:

```text
More precise performance
```

but may also expose:

```text
Smaller true effect
```

or:

```text
Greater population heterogeneity.
```

Sample size changes should therefore be documented.

---

# 43. Train/test contamination through preprocessing

Consider:

```text
MRI dataset
    ↓
Dimensionality reduction
    ↓
Cross-validation
```

If PCA is fitted on the full dataset before cross-validation, information from the test folds enters the feature representation.

Correct:

```text
Training fold
    ↓
Fit PCA
    ↓
Transform training

Test fold
    ↓
Transform using training PCA
```

---

# 44. Train/test contamination through augmentation

Data augmentation can also leak information.

For example:

```text
Original image
    ↓
Augmented image A → training
Augmented image B → testing
```

The test example is not genuinely independent.

Keep all related observations within the same split.

---

# 45. Repeated measurements

If each participant has multiple scans:

```text
Participant A:
Scan 1
Scan 2
Scan 3
```

the participant should usually remain within one evaluation partition when testing participant-level generalisation.

Otherwise:

```text
Participant identity
```

can leak across splits.

---

# 46. External validation without retraining

Suppose:

```text
Original:
AUC = .89

External cohort:
AUC = .80
```

This is informative because the model was frozen.

It answers:

> Does the original model transfer?

If the model is retrained on the new data, the question becomes:

> Can the modelling approach be rebuilt successfully?

These are different questions.

---

# 47. Model updating

A model may require recalibration in a new population.

For example:

```text
Original model
     ↓
External cohort
     ↓
Calibration adjustment
```

This can improve performance.

But report:

```text
Before updating
```

and:

```text
After updating
```

separately.

Otherwise external validation and model development become mixed.

---

# 48. ML replication result example

Suppose:

```text
Original:
AUC = .89
95% CI [.86, .92]

Replication:
AUC = .83
95% CI [.79, .87]
```

The model performs worse but remains above chance and potentially useful.

A reasonable interpretation is:

> The predictive relationship generalises to the independent cohort, but performance is lower than originally reported.

Do not claim:

```text
The replication failed.
```

without defining what would count as failure.

---

# 49. Strong replication

Suppose:

```text
Original:
AUC = .89

Replication:
AUC = .88
```

with:

```text
Similar evaluation
Independent participants
No leakage
Narrow confidence intervals
```

This provides stronger evidence that the predictive relationship is robust.

---

# 50. Weak replication

Suppose:

```text
Original:
AUC = .89

Replication:
AUC = .60
95% CI [.48, .72]
```

This weakens confidence, but the wide interval may make the result inconclusive.

Investigate:

```text
Sample size
Dataset shift
Labels
Preprocessing
Scanner
Model implementation
```

before concluding that the original claim is false.

---

# 51. Contradictory replication

Suppose a sufficiently precise external validation produces:

```text
AUC = .50
95% CI [.48, .52]
```

and the study has:

```text
Independent cohort
Correct implementation
No leakage
Adequate sample
Equivalent target
```

This provides strong evidence that the original reported predictive performance does not generalise.

---

# 52. Reproducibility versus predictive validity

A model can be:

```text
Perfectly reproducible
```

but:

```text
Poorly generalisable.
```

For example:

```text
Original code
+
Original data
=
AUC .89
```

does not establish:

```text
New patients
=
AUC .89
```

Therefore distinguish:

```text
Computational reproducibility
```

from:

```text
Predictive generalisation.
```

---

# 53. Benchmark replication

For public datasets, researchers may repeatedly evaluate models on:

```text
Same benchmark test set.
```

This can create:

```text
Benchmark overfitting.
```

Repeated optimisation against a public test set gradually turns the test set into a development resource.

A stronger replication should use:

```text
Fresh evaluation data.
```

when possible.

---

# 54. Leaderboard effects

A model may appear better because:

```text
Researchers repeatedly optimise
against the same benchmark.
```

The reported performance can therefore become inflated.

Replication should consider whether the benchmark remains genuinely held out.

---

# 55. ML result hierarchy

A useful hierarchy is:

```text
Same data
    ↓
Reproduction

New split
    ↓
Internal validation

New participants
    ↓
Independent replication

New site
    ↓
External validation

New population
    ↓
Generalisability

Prospective deployment
    ↓
Real-world validation
```

The further the evaluation moves from the original development environment, the stronger the test of generalisation.

---

# 56. Machine-learning replication report

A useful report structure is:

```text
## Original Claim

[Prediction claim]

## Dataset

[Original and replication cohorts]

## Target

[Outcome definition]

## Model

[Algorithm and frozen configuration]

## Evaluation

[Cross-validation/external validation]

## Primary Metric

[AUC / R² / RMSE / etc.]

## Original Result

[Effect + uncertainty]

## Replication Result

[Effect + uncertainty]

## Dataset Shift

[Differences between cohorts]

## Leakage Assessment

[Potential sources and controls]

## Generalisation

[What the result supports]

## Updated Confidence

[Higher / similar / lower / uncertain]
```

---

# 57. ML replication checklist

```text
[ ] Original prediction claim is explicit
[ ] Target definition is preserved
[ ] Replication data are independent
[ ] Subject-level splitting is correct
[ ] Site-level leakage is considered
[ ] Label definition is comparable
[ ] Class balance is reported
[ ] Baseline model is included
[ ] Preprocessing is specified
[ ] Preprocessing is fitted within training data
[ ] Feature selection is nested
[ ] Hyperparameter tuning is nested
[ ] External test data remain untouched
[ ] Model is frozen before external evaluation
[ ] Primary metric is prespecified
[ ] Confidence intervals are reported
[ ] Calibration is assessed where relevant
[ ] Threshold selection is not test-set optimised
[ ] Scanner/site effects are considered
[ ] Distribution shift is assessed
[ ] Feature-importance claims are treated cautiously
[ ] Random-seed variation is considered
[ ] Model updating is separated from validation
[ ] Computational reproducibility is distinguished from generalisation
[ ] Clinical or practical significance is considered
```

---

# 58. Recommended workflow

```text
ORIGINAL ML CLAIM
        ↓
DEFINE TARGET
        ↓
DEFINE PRIMARY METRIC
        ↓
IDENTIFY ESSENTIAL PIPELINE
        ↓
CHECK DATA INDEPENDENCE
        ↓
DEFINE SPLITTING UNIT
        ↓
PRESPECIFY PREPROCESSING
        ↓
PRESPECIFY MODEL
        ↓
PRESPECIFY HYPERPARAMETER PROCEDURE
        ↓
LOCK EVALUATION PROTOCOL
        ↓
COLLECT / ACCESS NEW DATA
        ↓
TRAIN WITHOUT LEAKAGE
        ↓
EVALUATE ON HELD-OUT DATA
        ↓
REPORT EFFECT + UNCERTAINTY
        ↓
COMPARE WITH ORIGINAL
        ↓
ASSESS DATASET SHIFT
        ↓
ASSESS PRACTICAL SIGNIFICANCE
        ↓
UPDATE CONFIDENCE
```

---

# 59. Key lessons

The most important lessons for machine-learning replication are:

```text
1. Replicate the prediction claim, not merely the algorithm.

2. New data provide stronger evidence than new random splits.

3. Define the unit of independence before splitting.

4. Prevent leakage at every stage.

5. Keep feature selection inside the validation loop.

6. Keep hyperparameter tuning inside the validation loop.

7. Freeze models before external evaluation.

8. Report uncertainty, not only point estimates.

9. Compare against simple baselines.

10. Evaluate calibration when probabilities matter.

11. Treat site and scanner differences as possible distribution shift.

12. Distinguish predictive importance from causal importance.

13. Distinguish external validation from model updating.

14. Do not equate lower performance with complete failure.

15. Do not equate high benchmark performance with real-world generalisation.

16. Treat replication as a test of transportability.
```

---

# Final principle

For machine learning, replication is fundamentally a test of whether a predictive relationship survives new data.

The core logic is:

```text
ORIGINAL PREDICTION CLAIM
          ↓
WHAT IS THE TARGET?
          ↓
WHAT DATA GENERATE THE PREDICTORS?
          ↓
WHAT MUST REMAIN FIXED?
          ↓
WHAT IS THE UNIT OF INDEPENDENCE?
          ↓
NEW INDEPENDENT DATA
          ↓
LEAKAGE-FREE PIPELINE
          ↓
FROZEN EVALUATION
          ↓
PERFORMANCE + UNCERTAINTY
          ↓
COMPARE WITH ORIGINAL
          ↓
ASSESS DISTRIBUTION SHIFT
          ↓
TEST GENERALISATION
          ↓
UPDATED CONFIDENCE
```

> **A machine-learning replication is strongest when a model developed under one set of data, preprocessing, and assumptions continues to make useful predictions on genuinely independent data without allowing the new evaluation set to influence model development.**
