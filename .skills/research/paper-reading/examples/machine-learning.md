# Example: Machine Learning Paper

A worked example of applying the `paper-reading` skill to a machine learning research paper.

The example uses a hypothetical study so that the focus remains on the reading process rather than reproducing a specific publication.

---

## Pass 2 — Reconstruct the Research Question
### Problem

Recovery after stroke varies substantially between patients.

Knowing expected recovery could potentially support:

- Treatment planning
- Patient counselling
- Rehabilitation design
- Clinical decision-making

### Research gap

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

## Understand the Prediction Target
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

## Results
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

## Sample Size vs Feature Dimension
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

## Example Evidence Record
```text
### Research Question

Can multimodal clinical, behavioural, and neuroimaging
features predict language recovery after stroke?

### Population

180 stroke patients.

### Target

Language score at 6-month follow-up.

### Inputs

Clinical, behavioural, and neuroimaging features.

### Models

Linear regression, random forest, SVM, neural network.

### Evaluation

Cross-validation with comparison against clinical baseline.

### Main Result

The multimodal model outperformed the clinical baseline
on the selected prediction metric.

### Important Limitation

Validation was internal and no independent external
clinical cohort was used.

### Interpretation

Multimodal information may improve prediction of recovery.

### What It Does Not Establish

It does not establish that the important predictive
features causally determine recovery.

### Open Questions

- Does the model generalise across hospitals?
- Does it generalise across scanners?
- Does it improve clinical decisions?
- Does it work in different patient populations?
- Which features provide unique predictive information?
```

---
