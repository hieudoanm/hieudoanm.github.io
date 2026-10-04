---
name: research-reproduction
description: Reproduce published scientific research by reconstructing the original data, methods, computational workflow, analyses, and results, then systematically evaluating whether the reported findings can be obtained again.
---

# Research Reproduction

## Purpose

Use this skill to reproduce a published research result as faithfully as possible using the original study's data, methods, code, analysis procedures, and computational conditions.

The goal is not to create a new study.

The goal is to answer:

> **Can the reported result be obtained again from the original evidence and analytical procedure?**

Terminology around reproducibility and replication varies between disciplines. In this skill, **reproduction** means re-running or reconstructing the original analysis using the original data and equivalent computational procedures. This corresponds to the computational reproducibility distinction used by the National Academies.

---

# Core Principle

> **Reproduce the analysis before judging the result.**

Do not begin by asking whether the published conclusion is correct.

First reconstruct:

```text
ORIGINAL PAPER
      ↓
Research Question
      ↓
Data
      ↓
Preprocessing
      ↓
Analysis
      ↓
Statistical Model
      ↓
Results
      ↓
Reported Conclusion
```

Then attempt:

```text
ORIGINAL DATA
      ↓
SAME / EQUIVALENT PROCESSING
      ↓
SAME / EQUIVALENT ANALYSIS
      ↓
REPRODUCED RESULTS
      ↓
COMPARE WITH ORIGINAL
```

---

# Reproduction vs Replication

The distinction is fundamental.

```text
REPRODUCTION
Original data
+
Original or equivalent computational procedure
→
Can we obtain the original result again?

REPLICATION
New data
+
Same or closely related scientific question
→
Does the finding hold again?
```

The National Academies distinguishes computational reproducibility from replicability by whether the analysis uses the same input data or newly collected data.

A reproduction therefore does **not** normally involve collecting new participants.

---

# What Can Be Reproduced?

A research reproduction can target different levels.

## 1. Data Processing

Can the published dataset be transformed into the analysis dataset described in the paper?

```text
Raw Data
→ Cleaning
→ Exclusion
→ Transformation
→ Final Dataset
```

## 2. Statistical Analysis

Can the reported statistical tests be reproduced?

Examples:

```text
t-test
ANOVA
Regression
Correlation
Mixed-effects model
Permutation test
```

## 3. Computational Analysis

Can the published computational result be regenerated?

Examples:

```text
Machine-learning model
Neural decoding
Time-frequency analysis
fMRI preprocessing
MEG analysis
Simulation
Computational model fitting
```

## 4. Figures and Tables

Can the published:

- figures
- tables
- summary statistics
- model outputs

be regenerated?

## 5. Inferential Reproduction

Can the same evidence support the same interpretation?

This is distinct from obtaining identical numerical output. A reproduction may obtain slightly different numerical values while supporting the same scientific conclusion.

---

# Reproduction Workflow

## Step 1 — Identify the Target Study

Record:

- title
- authors
- publication year
- DOI
- version
- repository
- supplementary materials
- associated datasets
- code repository
- preregistration
- analysis scripts

Create a study record:

```text
Study:
Authors:
Year:
DOI:
Dataset:
Code:
Supplementary material:
Preregistration:
Target result:
```

---

# Step 2 — Define the Reproduction Target

Do not attempt to reproduce everything automatically.

Identify the specific result to reproduce.

Examples:

```text
Table 2, Model 3
Figure 3B
Main behavioural effect
Primary regression
Primary neuroimaging contrast
Classification accuracy
Correlation between X and Y
```

Record:

```text
Target:
Original result:
Original analysis:
Expected output:
```

---

# Step 3 — Recover the Research Artifacts

Collect the original artifacts.

### Data

Look for:

- raw data
- processed data
- analysis-ready data
- metadata
- participant information
- labels
- annotations

### Code

Look for:

- preprocessing scripts
- analysis scripts
- statistical scripts
- model-fitting code
- plotting scripts
- configuration files

### Environment

Look for:

- programming language
- package versions
- operating system
- MATLAB version
- Python version
- R version
- GPU/CUDA version
- container
- environment file

### Documentation

Look for:

- README
- analysis instructions
- supplementary methods
- code comments
- notebooks
- workflow definitions

---

# Step 4 — Map the Original Pipeline

Reconstruct the analysis pipeline before running it.

Example:

```text
Raw EEG
   ↓
Filtering
   ↓
Artifact removal
   ↓
Epoching
   ↓
Baseline correction
   ↓
Time-frequency analysis
   ↓
Condition comparison
   ↓
Permutation test
   ↓
Figure 3
```

For machine learning:

```text
Raw Dataset
   ↓
Cleaning
   ↓
Feature Extraction
   ↓
Train/Test Split
   ↓
Cross-validation
   ↓
Model Training
   ↓
Prediction
   ↓
Evaluation
   ↓
AUC / Accuracy
```

The pipeline should make dependencies explicit.

---

# Step 5 — Establish the Computational Environment

Record:

```text
Language:
Version:
Operating system:
Dependencies:
Package versions:
Hardware:
Random seed:
Environment:
```

Prefer reproducible environments such as:

- `requirements.txt`
- `environment.yml`
- `uv.lock`
- `poetry.lock`
- `package-lock.json`
- containers
- MATLAB project files
- workflow managers

Do not silently update dependencies unless necessary.

---

# Step 6 — Run the Original Workflow

First attempt to execute the authors' workflow with minimal modification.

Do not immediately rewrite the analysis in another language.

For example:

```text
Original MATLAB
→ Run MATLAB

Original Python
→ Run Python

Original R
→ Run R
```

Only reconstruct or translate the analysis when the original workflow cannot be executed.

---

# Step 7 — Record Every Deviation

Maintain a reproduction log.

```markdown
## Deviation Log

| Step      | Original  | Reproduction | Reason               |
| --------- | --------- | ------------ | -------------------- |
| Python    | 3.8       | 3.12         | Original unavailable |
| Package X | 1.4       | 2.1          | Dependency conflict  |
| Dataset   | version A | version B    | Original unavailable |
```

Never silently change:

- preprocessing
- exclusion criteria
- statistical model
- hyperparameters
- random seeds
- sample selection
- outcome definitions

---

# Step 8 — Reproduce Intermediate Results

Do not jump directly to the final figure.

Validate intermediate outputs.

```text
Raw data
↓
N participants
↓
Excluded participants
↓
Final N
↓
Preprocessed data
↓
Descriptive statistics
↓
Model inputs
↓
Model outputs
↓
Final statistics
```

This helps identify where divergence begins.

---

# Step 9 — Compare Results

Compare the reproduced result with the original using appropriate quantities.

Examples:

```text
Original mean
Reproduced mean

Original SD
Reproduced SD

Original effect size
Reproduced effect size

Original β
Reproduced β

Original 95% CI
Reproduced 95% CI

Original p-value
Reproduced p-value

Original accuracy
Reproduced accuracy
```

Do not use exact numerical equality as the only criterion.

---

# Step 10 — Investigate Differences

If results differ, determine where the difference originates.

Possible causes:

```text
Data version
Missing data
Participant exclusions
Preprocessing
Software version
Package version
Random seed
Numerical precision
Algorithm implementation
Model initialization
Statistical defaults
Hardware
Undocumented analysis choices
```

Trace the first point at which the reproduced pipeline diverges.

---

# Step 11 — Classify the Outcome

Use explicit categories.

### Exact reproduction

The reported computational result is recovered essentially exactly.

### Close reproduction

The numerical result differs slightly but is consistent with expected computational variation.

### Partial reproduction

Some results reproduce while others cannot be reproduced.

### Failed reproduction

The reported result cannot be obtained using the available evidence and documented procedure.

### Not reproducible

The necessary data, code, or methodological information is unavailable.

These categories should not automatically be interpreted as judgments about whether the original research was correct.

---

# Step 12 — Diagnose the Cause

Separate:

```text
RESULT DIFFERENCE
```

from:

```text
REPRODUCTION FAILURE
```

For example:

```text
Original result differs
        ↓
Why?
        ↓
Different dataset version
        ↓
Not necessarily an error in the original analysis
```

Another case:

```text
Original result differs
        ↓
Why?
        ↓
Published method does not produce
the reported result
        ↓
Potential methodological discrepancy
```

The distinction matters.

---

# Step 13 — Evaluate Scientific Meaning

Ask:

1. Was the original numerical result recovered?
2. Was the same effect direction recovered?
3. Was the effect magnitude similar?
4. Was uncertainty similar?
5. Was statistical inference similar?
6. Was the same substantive conclusion supported?
7. Were differences caused by the reproduction environment?
8. Were differences caused by ambiguities in the original study?

Do not equate:

```text
Different p-value
```

with:

```text
Different scientific conclusion
```

---

# Reproduction in Neuroscience

Additional checks may include:

```text
Participant N
Trial N
Electrode locations
Sensor geometry
MRI acquisition
Preprocessing
Registration
ROI definitions
Brain coordinates
Frequency bands
Time windows
Statistical correction
Random seeds
```

For MEG/EEG:

```text
Sampling rate
Filtering
Reference
Bad-channel detection
Artifact rejection
Epoching
Baseline
Source reconstruction
Sensor selection
```

For fMRI:

```text
TR
Voxel size
Motion correction
Spatial normalization
Smoothing
GLM specification
Contrasts
ROI definitions
Multiple-comparison correction
```

---

# Reproduction in Machine Learning

Check:

```text
Dataset version
Train/test split
Subject-level split
Preprocessing
Feature selection
Model architecture
Hyperparameters
Random seed
Cross-validation
Evaluation metric
Baseline models
Hardware
Software versions
```

Pay particular attention to data leakage.

A model can reproduce the reported accuracy while using an invalid evaluation procedure.

---

# Reproduction in Computational Neuroscience

For computational models, preserve:

```text
Model equations
Parameters
Initial conditions
Boundary conditions
Simulation duration
Time step
Random seed
Optimisation method
Parameter fitting
Objective function
Stopping criteria
```

Do not replace the original model with a superficially similar implementation and call it an exact reproduction.

---

# Reproduction Report

A useful final report should contain:

```text
1. Study
2. Reproduction target
3. Original data
4. Original methods
5. Computational environment
6. Reproduction procedure
7. Deviations
8. Intermediate validation
9. Reproduced results
10. Comparison with original
11. Differences
12. Cause of differences
13. Reproduction classification
14. Scientific interpretation
15. Limitations
16. Reproducibility recommendations
```

---

# Reproduction vs Reanalysis

Do not confuse reproduction with reanalysis.

### Reproduction

```text
Original data
+
Original analysis
→
Original result
```

### Reanalysis

```text
Original data
+
Different analysis
→
New result
```

A reanalysis can be scientifically valuable, but it answers a different question.

---

# Reproduction vs Replication

Use this decision rule:

```text
Are you using the original data?
        │
        ├── YES
        │    ↓
        │  Reproduction / reanalysis
        │
        └── NO
             ↓
        Are you collecting new data
        to test the same question?
             │
             ├── YES → Replication
             │
             └── NO → Different study
```

Terminology varies across disciplines, so always state the operational definition being used.

---

# Common Failure Modes

## Treating Reproduction as Replication

Collecting new participants does not reproduce the original computational result.

## Targeting the Final p-value Only

A matching p-value does not demonstrate that the original analysis was reproduced.

## Ignoring Intermediate Outputs

Matching the final number while using a different preprocessing pipeline is weak evidence of reproduction.

## Silent Method Changes

Changing preprocessing, exclusions, model parameters, or statistical defaults without documenting them invalidates a strict reproduction claim.

## Ignoring Software Versions

Different versions can produce different results.

## Assuming Missing Information

Do not invent undocumented analysis choices.

Instead:

```text
Original paper: unclear
Reproduction: assumption required
Impact: potentially substantial
```

## Overinterpreting Failure

Failure to reproduce does not automatically mean the original study was fraudulent, incorrect, or scientifically false.

---

# Quality Checklist

Before declaring a reproduction complete, verify:

### Study

- [ ] Original paper identified
- [ ] Correct version identified
- [ ] Target result defined

### Data

- [ ] Dataset identified
- [ ] Dataset version recorded
- [ ] Sample size verified
- [ ] Exclusions verified

### Methods

- [ ] Preprocessing reconstructed
- [ ] Analysis reconstructed
- [ ] Statistical model verified
- [ ] Parameters verified

### Environment

- [ ] Software versions recorded
- [ ] Dependencies recorded
- [ ] Random seeds recorded where relevant
- [ ] Hardware recorded where relevant

### Validation

- [ ] Intermediate outputs checked
- [ ] Final results compared
- [ ] Differences documented
- [ ] Deviations documented

### Interpretation

- [ ] Reproduction status classified
- [ ] Causes of differences investigated
- [ ] Scientific implications assessed
- [ ] Limitations documented

---

# Final Principle

> **A strong reproduction is not merely obtaining the same number. It is reconstructing the original evidence-to-result pathway well enough to determine whether the published result can be obtained again, where differences arise, and how much confidence should be placed in the comparison.**
