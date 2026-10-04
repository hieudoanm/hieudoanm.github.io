# Research Reproduction

## Overview

`research-reproduction` is a research skill for systematically reproducing published scientific results using the original study's data, computational procedures, analysis methods, and research artifacts.

The central question is:

> **Can the published result be obtained again from the original evidence and analytical procedure?**

In this skill, **reproduction** refers primarily to computational reproduction: using the same input data and the same or equivalent computational steps to obtain consistent results. Terminology differs between scientific communities, so the exact operational definition should always be stated.

---

# What This Skill Is For

Use this skill when you want to:

- reproduce a published statistical result
- reproduce a figure or table
- rerun a published analysis
- verify a computational model
- rerun a machine-learning experiment
- reproduce a neuroimaging analysis
- reproduce EEG/MEG analysis
- reconstruct a published data-processing pipeline
- investigate why a published result cannot be reproduced
- evaluate computational reproducibility
- document deviations from an original analysis

---

# What This Skill Is Not For

This skill is not primarily for:

- conducting a new experiment
- collecting a new participant sample
- performing a replication study
- performing an unrelated reanalysis
- reviewing the literature
- summarising a paper
- merely checking whether code exists
- blindly rerunning code without understanding the analysis

---

# Core Mental Model

Think of reproduction as rebuilding the original path from evidence to conclusion.

```text
ORIGINAL STUDY

Data
  ↓
Preprocessing
  ↓
Analysis
  ↓
Statistics
  ↓
Results
  ↓
Conclusion
```

The reproduction asks:

```text
Can we reconstruct this path?

Data
  ↓
Same / equivalent preprocessing
  ↓
Same / equivalent analysis
  ↓
Same / equivalent statistics
  ↓
Reproduced results
```

Then:

```text
Original Result
      ↕
Reproduced Result
```

The goal is to understand both **agreement** and **disagreement**.

---

# Reproduction vs Replication

This distinction should be established before beginning the project.

|               | Reproduction                      | Replication                  |
| ------------- | --------------------------------- | ---------------------------- |
| Data          | Original data                     | New data                     |
| Main purpose  | Recompute original result         | Test whether finding holds   |
| Analysis      | Same/equivalent                   | Same/closely related         |
| Participants  | Usually original participants     | Usually new participants     |
| Main question | Can the result be obtained again? | Does the finding hold again? |

The National Academies similarly distinguishes computational reproducibility, which uses the same input data and computational procedures, from replicability, which concerns consistency across studies using their own data.

---

# Typical Workflow

```text
1. Identify Study
       ↓
2. Define Reproduction Target
       ↓
3. Recover Data
       ↓
4. Recover Code
       ↓
5. Recover Methods
       ↓
6. Reconstruct Pipeline
       ↓
7. Reproduce Environment
       ↓
8. Run Analysis
       ↓
9. Validate Intermediate Results
       ↓
10. Compare Final Results
       ↓
11. Investigate Differences
       ↓
12. Classify Reproduction
       ↓
13. Interpret Findings
```

---

# 1. Identify the Study

Record:

```text
Title
Authors
Year
DOI
Version
Repository
Dataset
Code repository
Supplementary material
Preregistration
```

The reproduction should begin with an unambiguous identification of the source study.

---

# 2. Define the Target

Do not vaguely attempt to "reproduce the paper."

Select a concrete target.

Examples:

```text
Reproduce Figure 2
Reproduce Table 3
Reproduce the primary t-test
Reproduce the regression model
Reproduce the classification accuracy
Reproduce the neural decoding result
Reproduce the main fMRI contrast
```

A well-defined target makes the reproduction testable.

---

# 3. Recover Research Artifacts

Look for:

### Data

```text
Raw data
Processed data
Analysis-ready data
Metadata
Annotations
Labels
```

### Code

```text
Preprocessing
Analysis
Statistics
Modelling
Visualisation
```

### Environment

```text
Python
R
MATLAB
Operating system
Packages
Libraries
Containers
```

### Documentation

```text
README
Supplementary methods
Notebooks
Configuration
Workflow files
```

---

# 4. Reconstruct the Pipeline

Before executing the code, understand the workflow.

For example:

```text
Raw data
→ Cleaning
→ Participant exclusion
→ Feature extraction
→ Statistical analysis
→ Multiple-comparison correction
→ Figure generation
```

This is important because code alone does not necessarily reveal the full scientific procedure.

---

# 5. Preserve the Original Conditions

A strict reproduction should preserve important conditions such as:

- dataset version
- preprocessing
- exclusion rules
- statistical model
- hyperparameters
- random seeds
- software versions
- package versions
- analysis order

If a condition must change, document it.

---

# 6. Validate Intermediate Results

Do not only compare the final result.

Check:

```text
Number of participants
↓
Number of trials
↓
Excluded observations
↓
Processed dataset
↓
Descriptive statistics
↓
Model inputs
↓
Model outputs
↓
Final statistics
```

If the final result differs, this makes it possible to locate where the divergence began.

---

# 7. Compare Results

Possible comparison targets include:

```text
Mean
SD
Effect size
Regression coefficient
Confidence interval
p-value
Correlation
Classification accuracy
AUC
Model parameter
Figure
Table
```

Use appropriate numerical tolerance rather than requiring every floating-point value to be identical.

---

# 8. Investigate Differences

Differences can arise from:

```text
Dataset versions
Missing data
Participant exclusions
Preprocessing
Software versions
Package versions
Random seeds
Numerical precision
Algorithm implementations
Undocumented decisions
Hardware
```

The goal is to identify the cause rather than simply report that the numbers differ.

---

# 9. Classify the Outcome

A useful classification is:

### Exact reproduction

The reported result is recovered essentially exactly.

### Close reproduction

Small differences occur, but the result is consistent with expected computational variation.

### Partial reproduction

Some important results reproduce while others do not.

### Failed reproduction

The reported result cannot be obtained using the available procedure.

### Not reproducible

Necessary research artifacts are unavailable or insufficient.

---

# Important Distinction

A failed reproduction does **not** automatically mean:

```text
The original study was wrong.
```

It may instead mean:

```text
Data unavailable
Code unavailable
Documentation incomplete
Software changed
Dataset changed
Undocumented analysis decision
```

A reproduction study should therefore diagnose the failure before drawing conclusions.

---

# Research Domains

This skill can be applied to many research areas.

## Neuroscience

Important checks include:

- participant N
- trial N
- preprocessing
- electrode/sensor information
- MRI parameters
- brain coordinates
- ROI definitions
- frequency bands
- time windows
- statistical correction

## Psychology

Important checks include:

- participant demographics
- exclusion criteria
- experimental conditions
- reaction-time preprocessing
- accuracy
- questionnaire scoring
- ANOVA
- effect sizes

## Clinical Neuroscience

Important checks include:

- diagnosis
- patient/control groups
- clinical scales
- outcome direction
- lesion measurements
- MRI measures
- follow-up time points
- missing data

## Machine Learning

Important checks include:

- dataset version
- feature dimensions
- train/test split
- subject-level splitting
- preprocessing
- feature selection
- model architecture
- hyperparameters
- random seeds
- cross-validation
- evaluation metrics

---

# Reproduction vs Reanalysis

These should not be conflated.

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

A reanalysis may reveal something important, but it is not the same scientific exercise.

---

# Reproduction Report Structure

A final reproduction report can use:

```text
# Study

## Reproduction Target

## Original Data

## Original Methods

## Computational Environment

## Reproduction Procedure

## Deviations

## Intermediate Validation

## Reproduced Results

## Comparison With Original

## Differences

## Cause of Differences

## Reproduction Classification

## Scientific Interpretation

## Limitations

## Recommendations
```

---

# Relationship to Other Research Skills

This skill works particularly well with the other research skills in this collection.

```text
paper-pdf-to-markdown
        ↓
Recover paper structure
        ↓
paper-reading
        ↓
Understand scientific argument
        ↓
research-reproduction
        ↓
Reconstruct original analysis
        ↓
research-replication
        ↓
Test finding using new evidence
```

Other useful combinations:

```text
literature-review
      ↓
Identify important studies
      ↓
research-gap
      ↓
Identify unresolved evidence
      ↓
research-reproduction
      ↓
Verify whether important findings
can actually be reproduced
```

---

# Recommended Reproduction Record

Maintain a structured record:

```markdown
# Reproduction Record

## Study

- Title:
- Authors:
- DOI:
- Year:

## Target

- Result:
- Figure/Table:
- Analysis:

## Data

- Dataset:
- Version:
- Participants:
- Source:

## Environment

- Language:
- Version:
- OS:
- Dependencies:
- Hardware:

## Procedure

1. ...
2. ...
3. ...

## Deviations

| Original | Reproduction | Reason |
| -------- | ------------ | ------ |
| ...      | ...          | ...    |

## Result

Original:
...

Reproduced:
...

## Classification

- Exact / Close / Partial / Failed / Not reproducible

## Explanation

...

## Limitations

...
```

This record makes the reproduction auditable and easier for another researcher to inspect.

---

# Quality Checklist

Before completing the reproduction:

- [ ] Study correctly identified
- [ ] Reproduction target clearly defined
- [ ] Original data identified
- [ ] Data version recorded
- [ ] Original code recovered where available
- [ ] Methods reconstructed
- [ ] Computational environment documented
- [ ] Preprocessing verified
- [ ] Exclusion criteria verified
- [ ] Statistical analysis verified
- [ ] Intermediate outputs checked
- [ ] Final result compared
- [ ] Deviations documented
- [ ] Differences investigated
- [ ] Reproduction status classified
- [ ] Scientific interpretation separated from computational comparison
- [ ] Limitations documented

---

# Final Principle

> **Reproduction is an evidence audit of the path from original data to published result.**

The strongest reproduction does not simply say:

> "I ran the code."

It demonstrates:

```text
What the original study did
        ↓
What was actually available
        ↓
What was reproduced
        ↓
What differed
        ↓
Why it differed
        ↓
Whether the original result was recovered
        ↓
What that means scientifically
```

This keeps computational reproducibility separate from replication and from broader claims about whether a scientific finding is true.
