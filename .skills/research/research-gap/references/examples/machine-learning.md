````markdown id="r6p2kv"
# Research Gap Example: Machine Learning

## Purpose

This example demonstrates how to identify, validate, and formulate research gaps in machine learning research.

The example focuses on **machine learning for neuroimaging-based prediction**, but the reasoning applies more broadly to:

- Computer vision
- Natural language processing
- Healthcare AI
- Time-series modelling
- Computational neuroscience
- Recommender systems
- Predictive modelling
- Generative AI

The example is intentionally simplified. It demonstrates the research-gap reasoning process rather than representing a complete systematic review.

---

# 1. Initial topic

Suppose the research topic is:

> Using machine learning to predict cognitive impairment from structural MRI.

This is already reasonably specific, but it contains several separate research questions.

Possible questions include:

- Can MRI predict cognitive impairment?
- Which brain regions are most informative?
- Which machine-learning algorithm works best?
- Can the model generalise across hospitals?
- Can the model generalise across scanners?
- Can it predict future cognitive decline?
- Is the model clinically useful?
- Can the model provide interpretable predictions?

These should not be treated as one research question.

---

# 2. Define the scope

Suppose the focus is:

```text
Population:
Adults undergoing cognitive assessment

Input:
Structural MRI

Target:
Cognitive impairment

Task:
Individual-level prediction

Evaluation:
Independent external validation

Goal:
Assess generalisability
```

This immediately shifts the research problem away from:

> Which algorithm gets the highest accuracy?

toward:

> Does the predictive relationship generalise beyond the dataset on which the model was developed?

---

# 3. Initial literature map

Imagine the literature contains:

```text
Study A
MRI + SVM
      ↓
90% accuracy

Study B
MRI + Random Forest
      ↓
87% accuracy

Study C
MRI + Neural Network
      ↓
92% accuracy

Study D
MRI + Deep Learning
      ↓
94% accuracy
```

At first glance, the field appears to be improving rapidly.

But these numbers alone tell us very little about generalisability.

The critical questions are:

- Were the datasets independent?
- Was the test set truly held out?
- Was preprocessing performed separately?
- Was feature selection performed inside cross-validation?
- Were participants shared between studies?
- Was external validation performed?
- Was class imbalance handled appropriately?
- Were confidence intervals reported?

---

# 4. Establish what is known

A reasonable synthesis might be:

> Machine-learning models can extract predictive information from structural MRI for cognitive classification and prediction tasks.

This is an established finding.

It does **not** establish:

> MRI-based machine-learning models can reliably predict cognitive impairment in new clinical populations.

That is a generalisation question.

---

# 5. Candidate gap A: no machine-learning models exist

Candidate:

> Machine learning has not been applied to MRI-based cognitive prediction.

If many studies already exist:

```text
Status: Closed
```

Reject this candidate.

---

# 6. Candidate gap B: which algorithm is best?

Candidate:

> It is unclear whether SVM, random forests, or neural networks provide the best performance.

This may appear attractive, but it is often a weak research gap.

Why?

Because the answer may depend heavily on:

- Dataset
- Preprocessing
- Features
- Hyperparameters
- Sample size
- Evaluation protocol
- Target definition

A small performance difference between algorithms may not represent an important scientific discovery.

Therefore:

```text
Algorithm comparison
        ≠
Automatically meaningful research gap
```

Algorithm choice should be justified by the scientific problem.

---

# 7. Candidate gap C: external generalisation

A stronger candidate is:

> Many MRI prediction models report strong internal validation, but their performance on independent datasets remains uncertain.

This is a genuine scientific problem because:

```text
Training dataset
        ↓
Internal validation
        ↓
High performance
```

does not guarantee:

```text
New population
        ↓
New scanner
        ↓
New acquisition protocol
        ↓
New clinical setting
        ↓
High performance
```

---

# 8. Validate the generalisation gap

Search for evidence of:

- External validation
- Multi-site validation
- Independent cohorts
- Prospective validation
- Scanner variation
- Protocol variation
- Demographic variation
- Disease-spectrum variation

Suppose the literature shows:

```text
Internal validation
████████████████████

External validation
████
```

This supports the candidate gap.

But the search should continue.

---

# 9. Search for evidence against the gap

Search specifically for:

```text
MRI cognitive impairment external validation

multisite MRI machine learning validation

cross-site neuroimaging prediction

external validation neuroimaging machine learning

prospective validation MRI cognitive prediction
```

Suppose several recent papers now demonstrate strong multi-site validation.

The original gap:

> External validation is absent.

is no longer defensible.

The gap must be narrowed.

---

# 10. Narrow the gap

Suppose recent studies show:

```text
Multi-site validation:
Available

But:

Performance varies by scanner
Performance varies by population
Calibration deteriorates
Small sites perform worse
Rare clinical subgroups underrepresented
```

The stronger gap becomes:

> Although multi-site validation of MRI-based prediction models has increased, the robustness of model performance across clinically and technically heterogeneous datasets remains uncertain.

This is a **dataset-shift and generalisation gap**.

---

# 11. Dataset shift

Machine-learning systems often assume:

```text
Training distribution ≈ Test distribution
```

Real-world deployment violates this assumption.

For example:

```text
Training:
Scanner A
Adults 60–75
Mostly European participants
Specific MRI protocol

Deployment:
Scanner B
Adults 75–90
Different demographic composition
Different protocol
```

The input distribution has changed.

This is a form of **distribution shift**.

The model may therefore experience:

```text
High development performance
        ↓
Lower deployment performance
```

This can be an important research gap.

---

# 12. Candidate gap: scanner generalisation

Suppose models are usually trained on one MRI scanner type.

A candidate gap is:

> It remains unclear whether MRI-based predictive models learn disease-related structure or scanner/site-specific characteristics.

This is important because the model might exploit:

```text
True disease signal
        +
Scanner/site signal
```

rather than only the intended biological information.

Potential research question:

> How robust is MRI-based cognitive-impairment prediction to changes in scanner and acquisition protocol?

---

# 13. Candidate gap: demographic generalisation

Suppose most datasets contain participants from similar demographic backgrounds.

A candidate gap:

> Model performance across demographic groups is insufficiently established.

Potential factors include:

- Age
- Sex
- Education
- Ethnicity
- Socioeconomic background
- Recruitment source

The important question is not merely:

> Are some groups missing?

It is:

> Does the model perform differently when applied to populations that differ from the development cohort?

This turns a representation problem into a measurable generalisation problem.

---

# 14. Candidate gap: target definition

Machine-learning models are only as meaningful as their target.

Suppose "cognitive impairment" is defined differently across studies:

```text
Clinical diagnosis
        vs
Cut-off on cognitive test
        vs
Composite score
        vs
Expert judgement
```

A model trained on one definition may not generalise to another.

Candidate gap:

> Variation in cognitive-impairment definitions limits comparability and may affect the apparent generalisability of MRI-based prediction models.

This is a **measurement/label-definition gap**.

---

# 15. Candidate gap: prediction versus explanation

Suppose a model identifies:

```text
Hippocampal volume
        ↓
Important feature
```

It is tempting to conclude:

> Hippocampal volume causes cognitive impairment.

That is not justified.

Machine-learning feature importance answers something closer to:

> How useful is this feature for the model's prediction?

It does not necessarily answer:

> What causes cognitive impairment?

Therefore:

```text
Predictive importance
        ≠
Causal importance
```

and:

```text
Model explanation
        ≠
Neuroscientific mechanism
```

This distinction can generate an important mechanistic gap.

---

# 16. Candidate gap: interpretability

Suppose a model predicts well but provides little insight into what it has learned.

A candidate gap is:

> It remains unclear whether high-performing MRI prediction models rely on neurobiologically meaningful patterns or imaging artefacts and confounds.

Potential research question:

> Do features identified as predictive by MRI-based machine-learning models correspond to biologically plausible markers of cognitive impairment?

This connects predictive modelling with neuroscience.

---

# 17. Candidate gap: calibration

Suppose two models have:

```text
Model A:
AUC = 0.90

Model B:
AUC = 0.88
```

It might appear that Model A is better.

But suppose:

```text
Model A:
Poor calibration

Model B:
Good calibration
```

For clinical decision-making, this difference can matter substantially.

A well-calibrated model should produce predictions whose estimated probabilities correspond reasonably to observed frequencies.

For example:

```text
Predicted risk = 80%
        ↓
Approximately 80% of comparable patients
should experience the outcome
```

Therefore:

```text
Discrimination
    ≠
Calibration
```

A gap may exist if studies focus heavily on discrimination while neglecting calibration.

---

# 18. Candidate gap: clinical utility

Even a well-performing model may not improve clinical decisions.

Suppose:

```text
AUC = 0.91
```

This does not tell us:

- Whether clinicians would use the model
- Whether treatment decisions improve
- Whether false positives are acceptable
- Whether false negatives are acceptable
- Whether the model is cost-effective
- Whether patient outcomes improve

Therefore:

```text
Predictive performance
        ≠
Clinical utility
```

A clinical ML research gap may therefore concern whether predictions actually improve decisions.

---

# 19. Candidate gap: leakage

Neuroimaging machine learning is particularly vulnerable to leakage.

Consider:

```text
All subjects
     ↓
Normalisation
     ↓
Feature selection
     ↓
Cross-validation
```

If information from the test folds influences preprocessing or feature selection, reported performance can be optimistic.

A safer conceptual workflow is:

```text
Training fold
     ↓
Fit preprocessing
     ↓
Feature selection
     ↓
Fit model
     ↓
Validation/test fold
```

If many studies use inconsistent leakage controls, this represents a methodological gap.

---

# 20. Candidate gap: sample size versus dimensionality

Consider:

```text
N = 150 participants

MRI features = 100,000+
```

The ratio between observations and potential features is challenging.

A model may fit complex patterns that do not generalise.

Potential gap:

> It remains unclear how stable MRI-based predictive performance is across independently sampled cohorts of limited size and high-dimensional feature spaces.

This is not necessarily solved by choosing a more complex algorithm.

---

# 21. Candidate gap: external validation versus benchmark performance

Suppose researchers repeatedly compare models on the same benchmark dataset.

The field may produce:

```text
Model A → 91%
Model B → 92%
Model C → 93%
Model D → 94%
```

This can create the appearance of progress.

But if all models are evaluated on the same dataset:

```text
Benchmark improvement
        ≠
Real-world generalisation
```

A more meaningful research question may be:

> Do improvements observed on the benchmark dataset transfer to independent datasets?

This can expose a benchmark-generalisation gap.

---

# 22. Compare candidate gaps

| Candidate                   | Evidence    | Importance | Novelty     | Feasibility |
| --------------------------- | ----------- | ---------- | ----------- | ----------- |
| New algorithm               | Low         | Low/Medium | Low         | High        |
| External validation         | High        | Very high  | High        | Medium      |
| Scanner generalisation      | High        | Very high  | High        | Medium      |
| Demographic generalisation  | High        | Very high  | High        | Medium      |
| Label-definition robustness | Medium/High | High       | High        | Medium      |
| Biological interpretability | High        | High       | High        | Medium      |
| Calibration                 | High        | High       | Medium/High | High        |
| Clinical utility            | High        | Very high  | High        | Medium/Low  |
| Leakage robustness          | Medium/High | High       | High        | High        |
| Benchmark generalisation    | High        | High       | High        | Medium      |

Again, the most interesting gap is not necessarily the one involving the newest algorithm.

---

# 23. Formulate a validated gap

Suppose the literature supports:

> Machine-learning models can predict cognitive impairment from structural MRI with strong performance under internal validation. Increasing numbers of studies have also evaluated multi-site datasets. However, performance often varies across sites, scanners, and populations, and calibration and biological interpretability are less consistently evaluated than discrimination. Consequently, it remains unclear how robustly these models capture generalisable neurobiological signals rather than site-specific characteristics.

A defensible gap is:

> The extent to which structural-MRI prediction models capture generalisable neurobiological information rather than site-specific imaging characteristics remains uncertain, particularly when models are evaluated across heterogeneous scanners and patient populations.

---

# 24. Convert the gap into a research question

A corresponding question could be:

> How does structural-MRI model performance change when predicting cognitive impairment across independent sites with different scanners and participant populations?

This directly targets the generalisation problem.

---

# 25. Possible objective

> To evaluate the robustness, calibration, and feature stability of a structural-MRI prediction model across independent sites with heterogeneous acquisition protocols and participant populations.

This is stronger than:

> To develop a new deep-learning model for cognitive impairment.

The second focuses on algorithmic novelty.

The first addresses an unresolved scientific problem.

---

# 26. Possible hypothesis

If supported by prior evidence:

> Predictive performance will decrease when the model is evaluated on independent sites compared with internal validation, with the magnitude of degradation depending on scanner and population differences.

This creates a testable prediction.

---

# 27. Example: natural-language processing

The same reasoning applies outside neuroimaging.

Suppose the topic is:

> Large language models for clinical text classification.

A weak gap:

> More powerful language models are needed.

A stronger gap:

> It remains unclear whether clinical NLP models trained on one hospital's documentation style generalise to other hospitals with different patient populations and documentation practices.

Potential question:

> How robust is clinical text classification performance across hospitals with different documentation distributions?

The key issue is **domain generalisation**, not simply model size.

---

# 28. Example: computer vision

Suppose:

> Deep learning for medical image classification.

A weak gap:

> Existing models are not accurate enough.

A stronger gap:

> High performance is often reported on curated datasets, but robustness to changes in acquisition conditions and clinically realistic image quality remains uncertain.

Potential question:

> How does diagnostic performance change under realistic variation in image acquisition and quality?

Again:

```text
Benchmark performance
        ≠
Real-world robustness
```

---

# 29. Example: computational neuroscience

Suppose the topic is:

> Neural decoding from MEG.

A weak gap:

> Better neural decoding models are needed.

A stronger gap:

> Many decoding studies demonstrate high within-subject performance, but it remains unclear how reliably learned neural representations generalise across participants and recording sessions.

Potential question:

> To what extent do MEG-based neural decoding models generalise across participants and recording sessions?

This connects machine learning methodology with a neuroscience question.

---

# 30. Important machine-learning considerations

When evaluating a machine-learning research gap, pay particular attention to:

### Data leakage

Could information from evaluation data influence training?

### Overfitting

Could high performance reflect memorisation rather than generalisable structure?

### External validation

Was the model evaluated on genuinely independent data?

### Dataset shift

Does the deployment distribution differ from the development distribution?

### Class imbalance

Could accuracy hide poor minority-class performance?

### Calibration

Are predicted probabilities reliable?

### Feature stability

Do important features remain important across datasets?

### Interpretability

Are model explanations stable and scientifically meaningful?

### Reproducibility

Can another researcher reproduce the pipeline?

### Benchmark saturation

Are researchers improving benchmark scores without improving real-world performance?

### Clinical utility

Does the model improve a decision or outcome?

### Fairness and subgroup performance

Does performance vary across relevant populations?

---

# 31. What this example demonstrates

The progression is:

```text
ML application
      ↓
Define prediction task
      ↓
Separate development from deployment
      ↓
Map existing performance
      ↓
Investigate validation strategy
      ↓
Identify generalisation problems
      ↓
Investigate dataset shift
      ↓
Investigate measurement and labels
      ↓
Separate prediction from explanation
      ↓
Evaluate calibration and utility
      ↓
Challenge candidate gaps
      ↓
Validate strongest gap
      ↓
Research question
```

---

# 32. Key lessons

### Lesson 1

A new algorithm is not automatically a new scientific contribution.

### Lesson 2

High benchmark performance does not establish real-world generalisation.

### Lesson 3

Internal cross-validation and external validation answer different questions.

### Lesson 4

Prediction is not explanation, and explanation is not causation.

### Lesson 5

Neuroimaging models are particularly vulnerable to leakage and site-specific confounds.

### Lesson 6

Discrimination and calibration measure different aspects of predictive quality.

### Lesson 7

Dataset shift is often more scientifically important than small differences between algorithms.

### Lesson 8

A clinically useful model must ultimately support a meaningful decision or outcome.

### Lesson 9

Feature importance should not automatically be interpreted as biological importance.

### Lesson 10

A strong ML research gap often concerns **whether the learned relationship survives outside the conditions in which it was discovered**.

---

# Final mental model

For machine-learning research-gap identification:

```text
PROBLEM
  ↓
DATA
  ↓
TARGET
  ↓
MODEL
  ↓
INTERNAL PERFORMANCE
  ↓
IS THERE LEAKAGE?
  ↓
DOES IT GENERALISE?
  ↓
EXTERNAL VALIDATION
  ↓
DATASET SHIFT
  ↓
CALIBRATION
  ↓
INTERPRETABILITY
  ↓
CLINICAL / REAL-WORLD UTILITY
  ↓
WHAT IMPORTANT CLAIM
CAN CURRENT EVIDENCE STILL NOT SUPPORT?
  ↓
VALIDATED GAP
  ↓
RESEARCH QUESTION
```

The key question is:

> **"Does the model learn something genuinely generalisable about the problem, or does it only work under the conditions in which it was developed?"**
````
