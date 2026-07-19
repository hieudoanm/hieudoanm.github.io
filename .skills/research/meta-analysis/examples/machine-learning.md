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

## Define the Research Question
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

## Selective Reporting
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

## Interpreting a Pooled Performance Estimate
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

## A Compact Analysis Workflow
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
