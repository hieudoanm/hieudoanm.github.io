# Example: Clinical Neuroscience Paper

A worked example of applying the `paper-reading` skill to a hypothetical clinical neuroscience paper.

The example focuses on reading research that connects:

- Brain measures
- Clinical symptoms
- Behaviour
- Disease or injury
- Diagnosis
- Prognosis
- Treatment
- Recovery

Clinical neuroscience requires particular attention to **measurement validity, patient heterogeneity, clinical outcomes, causality, and generalisability**.

---

## Longitudinal Design
Suppose patients are measured:

```text
Acute stage
    ↓
3 months
    ↓
6 months
```

This is a longitudinal design.

It provides temporal information that a cross-sectional study cannot.

For example:

```text
Early brain measurement
        ↓
Later language outcome
```

is more informative for prediction than:

```text
Brain measurement
        ↔
Language score
```

measured at the same time.

However, temporal ordering alone does not establish causality.

---

## External Validation
Suppose the model was developed at:

```text
Hospital A
```

and tested at:

```text
Hospital B
```

This is stronger evidence of generalisation than evaluating it only through internal cross-validation.

Differences between hospitals may include:

```text
Patient population
Scanner hardware
Imaging protocols
Treatment practices
Clinical assessment
Referral patterns
```

If performance remains strong, confidence in generalisation increases.

---

## Statistical Uncertainty
Record:

```text
Effect estimate
Confidence interval
Prediction interval
Sample size
Variability
```

Suppose:

```text
R² = 0.41
95% CI = [0.25, 0.53]
```

The model may appear reasonably predictive, but uncertainty remains.

A clinical model should not be evaluated only by its point estimate.

---

## Evidence Hierarchy
For a clinical neuroscience paper, distinguish:

```text
Direct clinical measurement
        ↓
Statistical result
        ↓
Prediction performance
        ↓
Association with outcome
        ↓
Biological interpretation
        ↓
Clinical implication
        ↓
Treatment recommendation
```

Each step moves further from the direct evidence.

Confidence should generally decrease as claims become more inferential.

---

## Clinical Neuroscience Reading Checklist
When reading a clinical neuroscience paper, ask:

```text
□ What is the clinical problem?
□ What disease or injury is being studied?
□ Who are the patients?
□ How heterogeneous is the clinical population?
□ What exactly is the clinical outcome?
□ Is the outcome clinically meaningful?
□ What are the predictors?
□ When were predictors measured?
□ When was the outcome measured?
□ Is the study longitudinal?
□ How many patients were recruited?
□ How many completed the study?
□ Was there systematic attrition?
□ How was treatment exposure handled?
□ How was spontaneous recovery handled?
□ Are the measurements valid?
□ Are imaging measurements interpreted appropriately?
□ Was preprocessing appropriate for patients?
□ Are there important confounders?
□ Is the model compared with a clinical baseline?
□ Is validation internal or external?
□ Is the model calibrated?
□ Does performance generalise across subgroups?
□ Is statistical uncertainty reported?
□ Are predictive claims separated from causal claims?
□ Are biological interpretations supported?
□ Is clinical utility demonstrated?
□ Does the conclusion go beyond the evidence?
```

---
