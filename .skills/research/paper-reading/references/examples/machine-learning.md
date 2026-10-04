# Example: Machine Learning Paper

A worked example of applying the `paper-reading` skill to a machine learning research paper.

The example uses a hypothetical study so that the focus remains on the reading process rather than reproducing a specific publication.

---

# 1. Example Paper

Consider a hypothetical paper:

> **Predicting language recovery after stroke using multimodal machine learning**

The study investigates whether demographic, behavioural, and neuroimaging features can predict language recovery following stroke.

The basic pipeline is:

```text
Patients
    ↓
Clinical + behavioural + neuroimaging data
    ↓
Preprocessing
    ↓
Feature representation
    ↓
Machine-learning model
    ↓
Prediction
    ↓
Evaluation
```

The important question is not simply:

> "Which model performs best?"

Instead ask:

> **What was predicted, from what information, using what evaluation procedure, and how convincing is the evidence that the model will generalise?**

---

# 2. Pass 1 — Orientation

Read:

- Title
- Abstract
- Figures
- Tables
- Conclusion
- Section headings

Create a short initial summary:

```text
This study uses multimodal patient data to predict
language recovery after stroke using machine-learning models.
```

Then identify:

```text
Question:
Can recovery be predicted?

Input:
Clinical, behavioural, and neuroimaging features.

Output:
Language recovery score.

Model:
Machine-learning prediction model.

Evaluation:
Held-out or cross-validated performance.
```

Do not decide yet whether the model is useful.

---

# 3. Pass 2 — Reconstruct the Research Question

## Problem

Recovery after stroke varies substantially between patients.

Knowing expected recovery could potentially support:

- Treatment planning
- Patient counselling
- Rehabilitation design
- Clinical decision-making

## Research gap

Suppose previous studies have:

```text
Used small samples
Used single data modalities
Used simple predictors
Reported inconsistent generalisation
```

The study therefore asks:

> Can multimodal information improve prediction of language recovery after stroke?

---

# 4. Hypothesis

A possible hypothesis:

```text
Models combining clinical, behavioural, and neuroimaging
features will predict recovery better than models using
individual feature types alone.
```

This creates a comparison:

```text
Clinical model
      vs
Behavioural model
      vs
Neuroimaging model
      vs
Multimodal model
```

That comparison is important because simply reporting the performance of one model does not establish that multimodal information is useful.

---

# 5. Understand the Prediction Target

First determine exactly what the model predicts.

Possible targets include:

```text
Continuous recovery score
Binary good/poor outcome
Change from baseline
Follow-up language score
Treatment response
```

Suppose the target is:

```text
Language score at 6 months
```

This is different from:

```text
Amount of recovery
```

because final score may depend heavily on baseline ability.

This distinction matters.

---

# 6. Understand the Dataset

Suppose:

```text
N = 180 stroke patients
```

with:

```text
Demographics
Clinical severity
Language scores
Lesion information
MRI measures
Follow-up outcome
```

Ask:

- How were patients recruited?
- Were all patients included?
- How many had complete data?
- How much missing data existed?
- Were patients from one hospital?
- Were multiple hospitals included?
- Were patients recruited at different times?

These factors affect generalisation.

---

# 7. Identify the Independent Unit

One of the most important questions in machine learning research is:

> **What constitutes one independent example?**

If the dataset contains:

```text
180 patients
```

and each patient contributes:

```text
1000 imaging features
```

there are still only:

```text
180 independent participants
```

not:

```text
180 × 1000 independent observations
```

This distinction matters for validation and uncertainty.

---

# 8. Inspect the Data Split

A critical part of reading ML papers is understanding:

```text
Training
Validation
Testing
```

For example:

```text
Dataset
   ↓
Train 70%
   ↓
Validation 15%
   ↓
Test 15%
```

Ask:

- Was the test set truly held out?
- Was it used only once?
- Were preprocessing parameters learned from training data only?
- Were feature-selection decisions made using the test data?
- Were hyperparameters tuned using test performance?

If information from the test set influences model development, evaluation may be optimistic.

---

# 9. Data Leakage

Data leakage occurs when information that should be unavailable during prediction enters the modelling process.

Example:

```text
Full dataset
    ↓
Feature normalisation
    ↓
Train/test split
```

This can leak information because the transformation used information from the test set.

A safer approach is:

```text
Train/test split
        ↓
Fit preprocessing on training data
        ↓
Apply same transformation to test data
```

For patient data, also watch for:

```text
Same patient
    ↓
Train and test
```

or:

```text
Same hospital / acquisition session
    ↓
Train and test
```

which can create overly optimistic estimates of generalisation.

---

# 10. Preprocessing

Record important preprocessing operations.

For example:

```text
Missing-value handling
    ↓
Scaling
    ↓
Feature selection
    ↓
Dimensionality reduction
    ↓
Model training
```

Ask:

> Was each preprocessing step performed separately inside each training fold?

If not, information may leak across folds.

This is especially important for:

- Feature selection
- Standardisation
- PCA
- Imputation
- Normalisation

---

# 11. Feature Engineering

Identify exactly what information the model receives.

For example:

```text
Clinical features
    ↓
Age
Baseline language score
Stroke severity

Imaging features
    ↓
Lesion volume
Lesion location
White-matter integrity

Behavioural features
    ↓
Naming score
Comprehension score
Fluency score
```

Ask:

> Would these features actually be available at the time the prediction is intended to be made?

A model cannot be clinically useful if it relies on information unavailable at prediction time.

---

# 12. Baselines

A strong machine-learning study should compare against meaningful baselines.

Possible baselines:

```text
Mean prediction
      ↓
Simple clinical model
      ↓
Linear regression
      ↓
Existing published model
      ↓
Proposed model
```

Suppose:

```text
Mean baseline:
R² = 0.00

Clinical model:
R² = 0.31

Imaging model:
R² = 0.35

Multimodal model:
R² = 0.39
```

The important question is not:

> "Is R² = 0.39 good?"

It is:

> **Does the additional complexity provide meaningful improvement over simpler alternatives?**

---

# 13. Model Choice

Suppose the authors compare:

```text
Linear regression
Random forest
Support vector machine
Neural network
```

Do not assume:

```text
Neural network
    >
Random forest
    >
Linear model
```

More complex does not automatically mean better.

Ask:

- Why was each model selected?
- Are the models appropriate for the sample size?
- Are hyperparameters tuned fairly?
- Are model capacities comparable?
- Does complexity improve generalisation?

---

# 14. Evaluation Metrics

Identify the metric.

For regression:

```text
MAE
RMSE
R²
Correlation
```

For classification:

```text
Accuracy
Precision
Recall
F1
AUROC
AUPRC
Sensitivity
Specificity
```

Different metrics answer different questions.

For example:

```text
Accuracy = 90%
```

may be misleading when:

```text
90% of patients belong to one class.
```

A model predicting the majority class every time could also achieve 90% accuracy.

Always compare performance with a meaningful baseline.

---

# 15. Cross-Validation

Suppose the paper uses five-fold cross-validation.

Conceptually:

```text
Fold 1:
Train → Folds 2–5
Test  → Fold 1

Fold 2:
Train → Folds 1,3–5
Test  → Fold 2

...

Fold 5:
Train → Folds 1–4
Test  → Fold 5
```

This provides multiple estimates of generalisation.

Ask:

- Was cross-validation repeated?
- Was it stratified when appropriate?
- Was feature selection inside the folds?
- Was hyperparameter tuning nested?
- Were participants, rather than individual observations, used as the split unit?

---

# 16. Nested Cross-Validation

If hyperparameters are tuned, a nested procedure may be needed.

Conceptually:

```text
Outer loop
    ↓
Estimate generalisation

Inner loop
    ↓
Choose hyperparameters
```

Without proper separation:

```text
Model selection
    +
Performance estimation
```

can become entangled.

This can produce optimistic performance estimates.

---

# 17. Results

Suppose the multimodal model performs best.

Record:

```text
Model:
Multimodal model

Metric:
R²

Performance:
0.39

Baseline:
Clinical model R² = 0.31

Improvement:
ΔR² = 0.08
```

Then ask:

> Is the improvement statistically and practically meaningful?

A small numerical improvement may not justify substantial additional complexity.

---

# 18. Generalisation

A central question is:

> **Where was the model tested?**

There are levels of validation:

```text
Same dataset
    ↓
Cross-validation
    ↓
Held-out participants
    ↓
Different hospital
    ↓
Different scanner
    ↓
Different country
    ↓
Different population
```

The farther the validation moves from the training environment, the stronger the evidence for generalisation.

External validation is particularly important for clinical machine learning.

---

# 19. Distribution Shift

Clinical datasets can change across environments.

For example:

```text
Training hospital
    ↓
Different hospital
```

may involve differences in:

- Patient demographics
- Scanner hardware
- Clinical protocols
- Diagnostic criteria
- Treatment practices
- Data quality

A model can therefore perform well internally but poorly externally.

Ask:

> **What assumptions about the data distribution are required for the model to work?**

---

# 20. Feature Importance

Suppose the authors report:

```text
Feature importance:

Baseline language score → high
Lesion volume → high
Age → moderate
MRI feature X → low
```

Do not automatically interpret this as:

```text
Baseline language ability causes recovery.
```

Feature importance indicates that a feature contributes to prediction under the model.

It does not automatically establish:

```text
Causality
Mechanism
Clinical importance
```

---

# 21. Explainability

If the paper uses explainability methods, distinguish:

```text
Prediction explanation
```

from:

```text
Causal explanation
```

For example, SHAP values may indicate:

```text
Feature X strongly influenced this prediction.
```

That does not necessarily mean:

```text
Feature X biologically causes the outcome.
```

Explainability helps interpret a model's behaviour, but does not automatically convert prediction into causal inference.

---

# 22. Overfitting

Overfitting occurs when a model learns patterns specific to the training data that do not generalise.

Conceptually:

```text
Training performance
       ↑
       │
       │      /
       │     /
       │    /
       │   /
       │  /
       └────────────
             Model complexity
```

As complexity increases, training performance can continue improving while test performance stops improving or declines.

Look for:

- Large feature-to-sample ratios
- Very complex models
- Weak validation
- Large train/test performance gaps
- Extensive hyperparameter search
- Small clinical datasets

---

# 23. Sample Size vs Feature Dimension

A common issue in neuroimaging is:

```text
N = 100 participants

Features = 100,000 voxels
```

The feature space is much larger than the number of independent participants.

This can make:

- Overfitting
- Feature selection
- Regularisation
- Validation
- Interpretation

particularly important.

Do not assume that more features automatically provide more useful information.

---

# 24. Missing Data

Clinical datasets often contain missing observations.

Ask:

- How much data were missing?
- Which variables were missing?
- Were missing cases systematically different?
- How were missing values handled?
- Was imputation performed?
- Was imputation performed inside the training folds?

Missingness can affect both:

```text
Model performance
```

and:

```text
Generalisability
```

---

# 25. Clinical Meaning

A machine-learning paper may report strong predictive performance.

That does not automatically mean:

```text
The model is clinically useful.
```

Ask:

- Does it improve clinical decisions?
- Does it outperform existing clinical information?
- Is the performance sufficiently accurate?
- Is calibration appropriate?
- Does it work across hospitals?
- Is the model available early enough to matter?
- Does using the model improve patient outcomes?

Prediction quality and clinical utility are different questions.

---

# 26. Example Critical Assessment

Suppose the paper concludes:

> "Our multimodal deep-learning model enables accurate prediction of language recovery."

A critical reading might produce:

```text
Evidence:
The model predicts follow-up language scores
with moderate cross-validated performance.

Strength:
Performance exceeds a baseline clinical model.

Concern:
Validation was performed only within the same dataset.

Concern:
The sample is relatively small compared with
the number of imaging features.

Concern:
The model's performance has not been demonstrated
in an independent clinical cohort.

Conclusion:
The study provides promising evidence for prediction,
but external generalisation remains uncertain.
```

This is stronger than simply saying:

```text
The model works.
```

---

# 27. Example Evidence Record

```text
## Research Question

Can multimodal clinical, behavioural, and neuroimaging
features predict language recovery after stroke?

## Population

180 stroke patients.

## Target

Language score at 6-month follow-up.

## Inputs

Clinical, behavioural, and neuroimaging features.

## Models

Linear regression, random forest, SVM, neural network.

## Evaluation

Cross-validation with comparison against clinical baseline.

## Main Result

The multimodal model outperformed the clinical baseline
on the selected prediction metric.

## Important Limitation

Validation was internal and no independent external
clinical cohort was used.

## Interpretation

Multimodal information may improve prediction of recovery.

## What It Does Not Establish

It does not establish that the important predictive
features causally determine recovery.

## Open Questions

- Does the model generalise across hospitals?
- Does it generalise across scanners?
- Does it improve clinical decisions?
- Does it work in different patient populations?
- Which features provide unique predictive information?
```

---

# 28. Machine-Learning Reading Checklist

When reading an ML paper, ask:

```text
□ What is the prediction target?
□ What information is available to the model?
□ What is the independent unit?
□ How large is the dataset?
□ How are train/validation/test sets defined?
□ Is there data leakage?
□ Is preprocessing performed correctly?
□ How are missing values handled?
□ What features are used?
□ What baseline is used?
□ Why were these models selected?
□ How are hyperparameters tuned?
□ What evaluation metric is used?
□ Is cross-validation appropriate?
□ Is nested validation needed?
□ Is the test set truly held out?
□ Is there external validation?
□ Does the model generalise?
□ Is feature importance being mistaken for causality?
□ Is prediction being mistaken for explanation?
□ Is the performance clinically meaningful?
```

---

# 29. Final Mental Model

For a machine-learning paper, reconstruct:

```text
DATA
  ↓
What information exists?

TARGET
  ↓
What is being predicted?

SPLIT
  ↓
How is generalisation tested?

FEATURES
  ↓
What information enters the model?

MODEL
  ↓
How is the prediction generated?

BASELINE
  ↓
Is the model actually better than simpler alternatives?

EVALUATION
  ↓
How is performance measured?

GENERALISATION
  ↓
Does it work beyond the development data?

INTERPRETATION
  ↓
What can the model actually tell us?

CLINICAL / SCIENTIFIC VALUE
  ↓
Why does the prediction matter?
```

The central lesson is:

> **In machine-learning research, the model is only one part of the evidence. Dataset construction, validation, leakage control, baselines, evaluation, and generalisation are equally important.**

```

```
