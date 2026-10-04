# Machine Learning Example

## Purpose

This example demonstrates how to conduct and interpret a meta-analysis of machine-learning studies.

The example is hypothetical. The numerical results are illustrative rather than results from a real evidence synthesis.

The example focuses on a common machine-learning research question:

> **How accurately can machine-learning models predict clinical outcomes from neuroimaging data?**

This example highlights challenges that are particularly important in machine-learning research:

- Different performance metrics
- Dataset differences
- Cross-validation strategies
- External validation
- Data leakage
- Model selection
- Sample size
- Hyperparameter tuning
- Reporting bias
- Repeated datasets
- Benchmark differences
- Generalisability

The central principle is:

> **A meta-analysis of machine-learning performance should synthesise comparable evaluations, not simply collect the highest reported scores.**

---

# 1. Define the Research Question

Suppose the research question is:

> Among studies using neuroimaging data to predict cognitive impairment, what is the average predictive performance of machine-learning models?

A structured version might be:

| Component  | Definition                                        |
| ---------- | ------------------------------------------------- |
| Population | Adults with neurocognitive assessment             |
| Input      | Neuroimaging data                                 |
| Task       | Prediction/classification of cognitive impairment |
| Model      | Supervised machine-learning models                |
| Outcome    | Predictive performance                            |
| Validation | Cross-validation or independent test data         |

A more specific question could be:

> What is the predictive performance of machine-learning models for identifying cognitive impairment from structural MRI?

The exact task should be defined carefully.

For example:

```text
Classification
    ↓
Impaired vs unimpaired
```

is not equivalent to:

```text
Regression
    ↓
Predict continuous cognitive score
```

---

# 2. Define Eligibility Criteria

Suppose the review includes:

### Include

- Human neuroimaging studies
- Structural MRI input
- Supervised machine-learning model
- Prediction of predefined cognitive outcome
- Quantitative performance metric
- Explicit validation procedure
- Sufficient information to extract performance

### Exclude

- Animal studies
- Purely descriptive analyses
- Unsupervised learning
- No predictive evaluation
- No validation procedure
- No usable performance metric
- Duplicate reports from the same dataset

Additional criteria might specify:

- Adult participants
- Clinical or population cohorts
- T1-weighted MRI only
- Binary classification only
- External or internal validation

These choices strongly affect what can legitimately be pooled.

---

# 3. Why Machine-Learning Meta-Analysis Is Difficult

Suppose ten studies report:

```text
Study 1: Accuracy = 91%
Study 2: Accuracy = 88%
Study 3: Accuracy = 84%
Study 4: Accuracy = 79%
...
```

It may be tempting to calculate:

```text
Mean accuracy = average(all accuracies)
```

But this can be misleading.

The studies may differ in:

- Sample size
- Class balance
- Dataset
- Feature representation
- Preprocessing
- Model
- Hyperparameter tuning
- Cross-validation
- Test-set design
- Outcome definition

Therefore:

> Two studies reporting 85% accuracy may provide very different levels of evidence.

---

# 4. Identify Independent Datasets

Machine-learning literature frequently contains multiple papers using the same dataset.

For example:

```text
ADNI
├── Study A
├── Study B
├── Study C
└── Study D
```

These studies may appear independent in the literature but share participants.

Treating them as independent evidence can produce serious problems.

For example:

```text
4 papers
      ↓
1 underlying dataset
      ↓
Should not automatically count as
4 independent studies
```

The review should identify:

- Dataset name
- Cohort
- Recruitment period
- Number of participants
- Site
- Authors
- Shared preprocessing
- Shared test sets

Dataset overlap should be explicitly documented.

---

# 5. Define the Prediction Target

Suppose studies predict:

```text
Mild cognitive impairment
vs
Healthy control
```

Other studies predict:

```text
Alzheimer's disease
vs
Healthy control
```

These are not necessarily the same prediction problem.

Likewise:

```text
Clinical diagnosis
```

is not equivalent to:

```text
Biomarker-defined disease
```

The target variable should therefore be defined carefully.

Potential sources of heterogeneity include:

- Diagnostic criteria
- Disease severity
- Follow-up period
- Clinical thresholds
- Cognitive test
- Biomarker definition

---

# 6. Choose the Performance Metric

Machine-learning studies report many metrics:

- Accuracy
- Sensitivity
- Specificity
- Precision
- Recall
- F1 score
- Balanced accuracy
- ROC-AUC
- PR-AUC
- Mean absolute error
- Root mean squared error
- R²

These metrics answer different questions.

For example:

```text
Accuracy
```

asks:

> What proportion of predictions were correct?

Whereas:

```text
Sensitivity
```

asks:

> Among positive cases, how many were detected?

And:

```text
Specificity
```

asks:

> Among negative cases, how many were correctly rejected?

Therefore, they should not automatically be treated as interchangeable.

---

# 7. Example: Classification Performance

Suppose a study reports:

```text
Accuracy = 0.86
Sensitivity = 0.81
Specificity = 0.90
AUC = 0.91
```

These numbers describe different aspects of performance.

A meta-analysis might choose:

> **ROC-AUC as the primary performance metric**

if the studies report sufficient information.

AUC is useful because it summarises discrimination across classification thresholds.

However, AUC still does not tell us:

- Whether calibration is good
- Whether performance transfers to a new hospital
- Whether the model is clinically useful
- Whether the prevalence matches the deployment population

---

# 8. Transform Performance Metrics Carefully

Some performance metrics have statistical properties that make direct pooling inappropriate.

For example, correlations are often transformed using Fisher's z.

For AUC, a suitable meta-analytic approach depends on:

- Available information
- Distributional assumptions
- Study design
- Whether variance can be estimated

For diagnostic accuracy studies, hierarchical models may be more appropriate when jointly analysing:

- Sensitivity
- Specificity

The principle is:

> Choose the statistical model based on the performance measure and study design, rather than forcing every metric into the same framework.

---

# 9. Extract the Data

A simplified extraction table might look like:

| Study   |   N | Dataset   | Model               | Validation    |  AUC |   SE | Risk of bias  |
| ------- | --: | --------- | ------------------- | ------------- | ---: | ---: | ------------- |
| Study 1 | 420 | Dataset A | SVM                 | Nested CV     | 0.89 | 0.03 | Low           |
| Study 2 | 180 | Dataset B | Random Forest       | 10-fold CV    | 0.83 | 0.05 | Some concerns |
| Study 3 |  95 | Dataset C | CNN                 | Hold-out test | 0.91 | 0.04 | Some concerns |
| Study 4 | 650 | Dataset D | Logistic regression | External test | 0.86 | 0.02 | Low           |
| ...     | ... | ...       | ...                 | ...           |  ... |  ... | ...           |

Important additional variables include:

- Training sample size
- Test sample size
- Number of features
- Feature selection
- Preprocessing
- Class balance
- Missing-data handling
- Hyperparameter optimisation
- Cross-validation method
- External validation
- Dataset source
- Number of sites

---

# 10. Validation Strategy Matters

Consider two studies.

### Study A

```text
Dataset
   ↓
Randomly split
   ↓
Train / Test
```

### Study B

```text
Site A + Site B
       ↓
Training

Site C
       ↓
Independent external test
```

Study B generally provides stronger evidence about transportability to a new site.

Therefore:

> Validation strategy should be treated as an important characteristic of the evidence, not merely a technical implementation detail.

---

# 11. Cross-Validation Is Not External Validation

Cross-validation can estimate performance under repeated train/test partitions within the available dataset.

For example:

```text
Dataset
   ↓
Fold 1
Fold 2
Fold 3
...
Fold 10
```

This can be useful for estimating internal predictive performance.

But external validation asks a different question:

```text
Training dataset
       ↓
New dataset
       ↓
Independent evaluation
```

The latter tests whether the model generalises beyond the development sample.

Therefore, pooling cross-validated and externally validated performance without considering validation type can obscure important differences.

---

# 12. Nested Cross-Validation

Hyperparameter tuning can create optimistic estimates if the same data are used improperly for:

- Model selection
- Hyperparameter optimisation
- Feature selection
- Performance estimation

A stronger procedure is nested cross-validation:

```text
Outer loop
    ↓
Performance estimation

Inner loop
    ↓
Hyperparameter tuning
```

The outer test fold should remain independent from the model-selection process.

A study using nested cross-validation may therefore provide more credible internal validation than a study that tunes and evaluates the model on overlapping data.

---

# 13. Data Leakage

Data leakage is one of the most important risks in machine-learning evidence.

Suppose preprocessing is performed:

```text
Entire dataset
      ↓
Feature scaling
      ↓
Cross-validation
```

Information from the future test folds may influence the preprocessing parameters.

A safer approach is:

```text
Training fold
     ↓
Fit preprocessing
     ↓
Apply to validation fold
```

The same principle applies to:

- Feature selection
- Dimensionality reduction
- Imputation
- Normalisation
- Batch correction

A study with leakage may report apparently excellent performance that does not generalise.

---

# 14. Neuroimaging-Specific Leakage

Neuroimaging introduces additional risks.

Suppose multiple scans from the same participant are randomly distributed across folds:

```text
Participant A
├── Scan 1 → Training
└── Scan 2 → Test
```

The model may effectively see the same participant in both sets.

This can inflate performance.

A more appropriate split might be:

```text
Participant A
├── All scans → Training
```

or:

```text
Participant A
├── All scans → Test
```

depending on the validation design.

Site-level leakage can also occur:

```text
Scanner/site characteristics
        ↓
Model learns site
        ↓
Appears to learn disease
```

This is particularly important in multi-site neuroimaging.

---

# 15. Pool the Effects

Suppose 25 eligible studies report comparable AUC estimates.

A random-effects model gives:

```text
Pooled AUC = 0.86
95% CI [0.83, 0.89]
```

A simple interpretation is:

> Across the included studies, models showed good average discriminative performance.

But this does not mean:

> A new clinical model will achieve AUC = 0.86.

The pooled estimate is an average across the evidence base.

We must still consider:

```text
Heterogeneity
Validation quality
Dataset overlap
Leakage
Class imbalance
Risk of bias
External validation
```

---

# 16. Examine Heterogeneity

Suppose:

```text
I² = 78%
τ² = 0.006
```

There is substantial between-study variation.

Possible explanations include:

- Dataset differences
- Model architecture
- Feature representation
- Sample size
- Class balance
- Validation strategy
- Preprocessing
- Scanner differences
- Clinical population

The correct question is:

> Which methodological or clinical characteristics explain the variation?

---

# 17. Validation Strategy as a Moderator

Suppose the studies are grouped as:

| Validation          | Studies | Pooled AUC |
| ------------------- | ------: | ---------: |
| Random CV           |      10 |       0.90 |
| Nested CV           |       8 |       0.86 |
| External validation |       7 |       0.80 |

This pattern might suggest that performance estimates are lower when the evaluation better approximates real-world deployment.

However, this does not prove that cross-validation causes optimistic estimates.

The groups may differ in:

- Dataset
- Sample size
- Model type
- Clinical population
- Data quality

Therefore, validation strategy is a potential moderator rather than automatically a causal explanation.

---

# 18. Dataset Size as a Moderator

Suppose smaller studies tend to report higher performance.

For example:

```text
N < 200
AUC = 0.91

N ≥ 200
AUC = 0.84
```

Possible explanations include:

- Overfitting
- Selection effects
- Publication bias
- Easier datasets
- More homogeneous participants
- Chance variation

A meta-regression could investigate sample size as a study-level moderator.

But:

> A study-level association between sample size and performance does not by itself prove that increasing sample size will cause performance to decrease.

---

# 19. Class Imbalance

Suppose a dataset contains:

```text
90% healthy
10% impaired
```

A naive classifier predicting everyone as healthy achieves:

```text
Accuracy = 90%
```

Yet it detects none of the impaired participants.

Therefore, accuracy alone may be misleading.

Useful complementary measures include:

- Sensitivity
- Specificity
- Balanced accuracy
- F1 score
- ROC-AUC
- PR-AUC

The appropriate metric depends on the prediction problem.

---

# 20. Calibration

Discrimination and calibration are different.

A model may have excellent discrimination:

```text
AUC = 0.90
```

but poor calibration.

Calibration asks approximately:

> When the model predicts 80% probability, does the event occur about 80% of the time?

Conceptually:

```text
Discrimination
    ↓
Can the model rank cases correctly?

Calibration
    ↓
Are predicted probabilities numerically reliable?
```

A meta-analysis focused only on AUC cannot establish that a model produces clinically reliable probabilities.

---

# 21. Clinical Utility

High predictive performance does not automatically imply clinical usefulness.

Suppose:

```text
AUC = 0.91
```

The model may still be difficult to deploy because of:

- Expensive MRI acquisition
- Long preprocessing
- Specialist hardware
- Poor interpretability
- Population mismatch
- High false-positive cost
- Poor calibration

Clinical utility may require additional analyses such as:

- Decision-curve analysis
- Cost-benefit analysis
- Threshold analysis
- Prospective validation

Therefore:

> Predictive accuracy is not the same thing as clinical utility.

---

# 22. Risk of Bias

Machine-learning studies require attention to risks beyond traditional clinical-trial bias.

Potential concerns include:

### Participant selection

Was the dataset representative?

### Outcome definition

Was the target label reliable?

### Data preprocessing

Was preprocessing performed independently within training data?

### Feature selection

Was feature selection separated from evaluation?

### Hyperparameter tuning

Was tuning performed without contaminating the test set?

### Validation

Was the test set genuinely independent?

### Reporting

Were multiple models or preprocessing pipelines tried and only the best result reported?

### Dataset reuse

Was the same dataset evaluated repeatedly across many studies?

---

# 23. Selective Reporting

Suppose researchers try:

```text
10 preprocessing pipelines
5 feature sets
8 algorithms
```

and report only:

```text
Best model
Best feature set
Best preprocessing
```

The reported performance may be optimistic.

This is analogous to selective outcome reporting in clinical research.

The meta-analysis should therefore consider:

- Number of models evaluated
- Number of feature sets
- Hyperparameter search
- Model-selection procedure
- Whether analysis plans were preregistered
- Whether all relevant evaluations were reported

---

# 24. Publication Bias

Suppose successful machine-learning studies are more likely to be published.

The literature might then contain:

```text
Published studies
        ↓
Mostly high-performing models
```

while unsuccessful models remain unpublished.

This creates a potentially inflated estimate.

A meta-analysis can investigate:

- Funnel-plot asymmetry
- Small-study effects
- Unpublished studies
- Conference abstracts
- Registered studies
- Preprints

But publication bias is difficult to establish conclusively.

---

# 25. Sensitivity Analysis

Suppose the main analysis gives:

```text
Pooled AUC = 0.86
95% CI [0.83, 0.89]
```

Now perform sensitivity analyses.

### Remove high-risk studies

```text
AUC = 0.83
95% CI [0.80, 0.86]
```

### External-validation studies only

```text
AUC = 0.80
95% CI [0.76, 0.84]
```

### Remove studies with suspected leakage

```text
AUC = 0.82
95% CI [0.79, 0.85]
```

The overall conclusion changes somewhat.

This is important.

The evidence may support:

> Models show useful discriminative performance under research conditions.

But it may not support:

> Current machine-learning models are ready for routine clinical deployment.

---

# 26. Prediction Interval

Suppose:

```text
Pooled AUC = 0.86
95% CI [0.83, 0.89]
```

but the prediction interval is:

```text
[0.71, 0.94]
```

This indicates substantial uncertainty about performance in a new comparable study.

A model that performs very well in one dataset may perform considerably worse in another.

This is particularly relevant to machine learning because distribution shift can occur between:

```text
Training population
        ↓
Validation population
        ↓
Deployment population
```

---

# 27. Dataset Shift

Machine-learning models may encounter different distributions after deployment.

For example:

```text
Training hospital
      ↓
Scanner A
      ↓
Patient population A
```

versus:

```text
Deployment hospital
      ↓
Scanner B
      ↓
Patient population B
```

Differences can arise in:

- Scanner hardware
- Acquisition protocol
- Demographics
- Disease prevalence
- Clinical workflow
- Referral patterns

A meta-analysis should therefore consider whether studies evaluate performance under comparable conditions.

---

# 28. External Validation

Suppose only 7 of 25 studies use genuinely independent external datasets.

This distinction should be visible in the synthesis.

For example:

```text
Internal validation
        ↓
Average AUC = 0.88

External validation
        ↓
Average AUC = 0.80
```

The lower external performance may indicate:

- Overfitting
- Dataset shift
- Site effects
- Selection bias
- Optimistic internal validation

External validation can therefore be more informative about real-world generalisation.

---

# 29. Model Architecture as a Moderator

Suppose studies use:

- Logistic regression
- Support vector machines
- Random forests
- Gradient boosting
- Convolutional neural networks

A subgroup analysis might compare them.

However, differences between models are confounded by:

- Dataset
- Sample size
- Feature representation
- Preprocessing
- Hyperparameter tuning
- Research team
- Validation strategy

Therefore:

> A higher pooled performance for one algorithm does not automatically mean that the algorithm itself is superior.

A fair comparison requires comparable evaluation conditions.

---

# 30. Interpreting a Pooled Performance Estimate

Suppose the final evidence is:

```text
Pooled AUC
0.86

95% CI
[0.83, 0.89]

I²
78%

External-validation AUC
0.80

Sensitivity analysis
0.82

Prediction interval
[0.71, 0.94]
```

A calibrated conclusion might be:

> Machine-learning models demonstrate good average discriminative performance for predicting cognitive impairment from structural MRI in the available research literature. However, substantial heterogeneity exists, and performance is lower in externally validated studies and after excluding studies with potential methodological concerns. The evidence therefore supports promising predictive capability but does not establish that current models will achieve similar performance in routine clinical deployment.

This is much stronger than:

> "AI can diagnose cognitive impairment with 86% accuracy."

---

# 31. What the Meta-Analysis Cannot Establish

A pooled predictive-performance estimate does not automatically establish:

- Clinical usefulness
- Generalisability to new hospitals
- Fairness across demographic groups
- Causal relationships
- Model interpretability
- Safety
- Cost-effectiveness
- Regulatory readiness
- Prospective clinical benefit

These require additional evidence.

---

# 32. Machine-Learning-Specific Checklist

Before trusting a meta-analysis of machine-learning performance, ask:

### Dataset

- Are datasets independent?
- Are participants duplicated?
- Is the sample representative?
- Is the dataset large enough?

### Prediction target

- Is the target clearly defined?
- Are diagnostic criteria consistent?
- Is the target clinically meaningful?

### Preprocessing

- Was preprocessing separated between training and test data?
- Could information leak across folds?

### Feature engineering

- Was feature selection performed within the training data?
- Was dimensionality reduction leakage-free?

### Model development

- Was hyperparameter tuning separated from performance estimation?
- Were multiple models tested?
- Was model selection accounted for?

### Validation

- Was cross-validation appropriate?
- Was nested cross-validation used?
- Is there an independent external test set?
- Is site-level generalisation tested?

### Metrics

- Is the performance metric appropriate?
- Is class imbalance considered?
- Is calibration assessed?
- Are confidence intervals available?

### Bias

- Could selective reporting inflate performance?
- Could publication bias be present?
- Are high-performing models disproportionately represented?

### Interpretation

- How heterogeneous are the studies?
- Does external performance differ from internal performance?
- Is the model clinically useful?
- Would the result survive realistic deployment conditions?

---

# 33. A Compact Analysis Workflow

For this example:

```text
Research question
        ↓
Define prediction task
        ↓
Define eligible datasets
        ↓
Search ML literature
        ↓
Screen studies
        ↓
Identify overlapping datasets
        ↓
Extract model + validation information
        ↓
Select comparable performance metric
        ↓
Assess methodological quality
        ↓
Pool performance estimates
        ↓
Assess heterogeneity
        ↓
Investigate validation strategy
        ↓
Investigate dataset characteristics
        ↓
Assess publication / reporting bias
        ↓
Run sensitivity analyses
        ↓
Examine external validation
        ↓
Assess prediction interval
        ↓
Evaluate clinical utility
        ↓
Draw calibrated conclusion
```

---

# 34. Final Mental Model

For machine-learning meta-analysis:

```text
WHAT IS THE PREDICTION TASK?
        ↓
ARE THE DATASETS INDEPENDENT?
        ↓
WHAT PERFORMANCE METRIC IS BEING POOLED?
        ↓
WAS THE VALIDATION PROCEDURE CREDIBLE?
        ↓
COULD DATA LEAKAGE INFLATE PERFORMANCE?
        ↓
WHAT IS THE AVERAGE PERFORMANCE?
        ↓
HOW MUCH DOES PERFORMANCE VARY?
        ↓
DO VALIDATION STRATEGIES MATTER?
        ↓
HOW DOES EXTERNAL PERFORMANCE COMPARE?
        ↓
COULD REPORTING OR PUBLICATION BIAS
INFLATE THE RESULT?
        ↓
DOES PERFORMANCE SURVIVE
SENSITIVITY ANALYSIS?
        ↓
WILL IT GENERALISE TO NEW DATA?
        ↓
IS IT CLINICALLY USEFUL?
        ↓
WHAT CAN WE CONFIDENTLY CLAIM?
```

The key lesson is:

> **In machine learning, a high pooled performance estimate is only convincing when the evaluation procedure is independent, leakage-free, appropriately validated, and representative of the environment in which the model will ultimately be used.**

The most important distinction is:

```text
Performance on available data
            ≠
Performance on unseen real-world data
            ≠
Clinical usefulness
```

A strong meta-analysis makes these distinctions explicit rather than reducing the evidence to a single accuracy or AUC number.
