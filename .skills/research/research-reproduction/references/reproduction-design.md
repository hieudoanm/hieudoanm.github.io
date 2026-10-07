# Reproduction Design

## Purpose

A reproduction should be designed before running the original code.

The goal is to establish:

1. what will be reproduced
2. what evidence will be used
3. what procedure will be followed
4. what deviations are allowed
5. how success will be evaluated

A well-designed reproduction is an experiment on the **original analytical pipeline**.

---

# 1. Define the Reproduction Question

Avoid vague questions such as:

> Can I reproduce this paper?

Instead define a specific target:

> Can Figure 3B be reproduced using the authors' dataset and analysis pipeline?

or:

> Can the primary regression reported in Table 2 be reproduced using the original analysis dataset?

A good reproduction question specifies:

```text
Study
+
Target
+
Data
+
Analysis
+
Expected result
```

---

# 2. Select the Target

Possible targets include:

### Primary result

Usually the strongest choice.

Examples:

```text
Primary behavioural effect
Primary regression
Primary neuroimaging contrast
Primary classification result
```

### Figure

```text
Figure 2
Figure 3B
Supplementary Figure 4
```

### Table

```text
Table 1
Table 3, Model 2
Supplementary Table S4
```

### Computational output

```text
Model parameter
Prediction accuracy
AUC
Correlation
Effect size
```

---

# 3. Define the Expected Output

Record the original result before running the reproduction.

Example:

```text
Target:
Table 2, Model 3

Outcome:
Regression coefficient for lesion volume

Original:
β = −0.31
95% CI [−0.48, −0.14]
p < .001
```

This prevents the reproduction from becoming an exploratory analysis.

---

# 4. Identify the Input Data

Determine exactly which data produced the original result.

Record:

```text
Dataset name
Dataset version
Download/source location
Access date
File names
File hashes where possible
Number of participants
Number of observations
Preprocessing state
```

For example:

```text
Dataset:
StudyData v2.1

Participants:
N = 84

Analysis file:
analysis_ready.csv

Hash:
...
```

A dataset name alone is often insufficient.

---

# 5. Identify the Analysis Data

Distinguish between:

```text
Raw data
    ↓
Processed data
    ↓
Analysis-ready data
```

The original paper may not have analysed the raw dataset directly.

If the analysis-ready dataset is available, determine:

- how it was created
- which observations were excluded
- which transformations were applied
- which variables were derived

---

# 6. Reconstruct the Analysis Pipeline

Build a dependency graph.

Example:

```text
raw_data.csv
      ↓
clean.py
      ↓
clean_data.csv
      ↓
analysis.py
      ↓
model_results.csv
      ↓
plot.py
      ↓
figure3.png
```

This makes the reproduction auditable.

A reproducible workflow should capture the sequence from data to final outputs rather than relying on manual execution.

---

# 7. Establish the Environment

Record:

```text
Operating system
Programming language
Language version
Package versions
System dependencies
Compiler
GPU/CUDA
Random seed
Hardware
```

Prefer pinned environments.

Examples:

```text
requirements.txt
environment.yml
uv.lock
poetry.lock
renv.lock
Dockerfile
Apptainer/Singularity image
```

Environment capture is important because dependency changes can alter computational results.

---

# 8. Version the Code

Identify the exact code version.

Prefer:

```text
Git commit
Git tag
Archived release
Persistent repository snapshot
```

Avoid relying only on:

```text
main
master
latest
```

A repository can change after publication.

Record:

```text
Repository:
...

Commit:
abc123...

Tag:
v1.2.0
```

---

# 9. Control Randomness

Many analyses are stochastic.

Examples:

- machine-learning training
- bootstrap
- permutation tests
- Monte Carlo simulations
- random train/test splits
- parameter initialisation

Record:

```text
Random seed:
42
```

But do not assume that the same seed guarantees identical output across different software or hardware.

---

# 10. Define Deviations Before Running

Possible deviations include:

```text
Different Python version
Different package version
Unavailable GPU
Missing dataset
Unavailable proprietary software
Different operating system
Missing preprocessing tool
```

For each deviation record:

```text
Original
Replacement
Reason
Expected impact
Actual impact
```

Example:

| Component | Original | Reproduction | Reason               |
| --------- | -------- | ------------ | -------------------- |
| Python    | 3.9      | 3.12         | Original unavailable |
| CUDA      | 11.3     | 12.4         | Hardware limitation  |
| Dataset   | v1       | v1           | Same                 |

---

# 11. Separate Exact and Equivalent Components

Not every component needs to be literally identical.

For example:

```text
Original:
MATLAB implementation

Equivalent:
Python implementation
```

may be acceptable for a **methodological reconstruction**, but it is not necessarily an exact computational reproduction.

Clearly distinguish:

```text
Exact reproduction
```

from:

```text
Equivalent reimplementation
```

---

# 12. Define Comparison Criteria

Before execution, decide how results will be compared.

Possible criteria:

### Numerical tolerance

```text
|reproduced − original| < tolerance
```

### Relative error

```text
|reproduced − original| / |original|
```

### Statistical agreement

Compare:

- effect direction
- confidence interval
- test statistic
- p-value
- effect size

### Structural agreement

For figures:

- same trends
- same groups
- same ordering
- same statistical annotations

---

# 13. Predefine Success Criteria

Example:

```text
SUCCESS

Primary coefficient within ±0.01
AND
95% CI overlaps substantially
AND
effect direction is identical
AND
statistical conclusion is unchanged
```

The exact criterion depends on the analysis.

Do not invent a universal tolerance.

---

# 14. Use Intermediate Checkpoints

Define checkpoints before the final result.

Example:

```text
Checkpoint 1:
N after participant exclusions

Checkpoint 2:
N after trial exclusions

Checkpoint 3:
Mean and SD

Checkpoint 4:
Model parameters

Checkpoint 5:
Final statistical result
```

This allows the divergence point to be identified.

---

# 15. Avoid Researcher Degrees of Freedom

During reproduction, avoid changing the analysis simply because it improves agreement.

Bad workflow:

```text
Run analysis
↓
Different result
↓
Change preprocessing
↓
Different result
↓
Change model
↓
Result matches
```

This introduces researcher degrees of freedom.

Instead:

```text
Original specification
↓
Run
↓
Difference
↓
Investigate documented causes
↓
Document deviation
```

---

# 16. Use a Reproduction Log

Maintain a machine-readable or human-readable log.

```markdown
# Reproduction Log

## Target

Figure 3B

## Original

AUC = 0.91

## Environment

Python 3.10
scikit-learn 1.x

## Execution

2026-10-07

## Result

AUC = 0.90

## Difference

−0.01

## Investigation

Different BLAS implementation suspected.

## Status

Close reproduction.
```

---

# 17. Design for Failure Diagnosis

The reproduction should allow you to answer:

> At what step did the reproduced workflow diverge?

A useful structure is:

```text
Original
   ↓
Input validation
   ↓
Preprocessing
   ↓
Intermediate output
   ↓
Analysis
   ↓
Final output
```

Compare each stage.

---

# 18. Reproduction Design for Neuroscience

### EEG/MEG

Record:

```text
Sampling rate
Reference
Filtering
Bad channels
Artifact rejection
Epoching
Baseline
Sensor selection
Time windows
Frequency bands
Source reconstruction
```

### fMRI

Record:

```text
TR
Voxel size
Preprocessing
Motion correction
Registration
Normalization
Smoothing
GLM
Contrasts
ROI
Multiple-comparison correction
```

### Behavioural experiments

Record:

```text
Participant N
Trial N
Exclusion rules
RT threshold
Accuracy threshold
Condition definitions
Statistical model
```

---

# 19. Reproduction Design for Machine Learning

Record:

```text
Dataset version
Feature definition
Train/test split
Subject-level split
Preprocessing
Feature selection
Model architecture
Hyperparameters
Cross-validation
Random seed
Evaluation metric
Baseline models
```

Especially verify that the reproduction uses the same **unit of splitting**.

For example:

```text
Subject-level split
```

is not equivalent to:

```text
Trial-level split
```

when multiple observations come from the same participant.

---

# 20. Reproduction Design for Computational Models

Record:

```text
Equations
Parameters
Initial conditions
Input distributions
Noise
Random seed
Optimiser
Objective function
Time step
Simulation duration
Stopping criterion
```

A model implementation should be compared at the level of the actual equations and parameters, not just the model's name.

---

# Final Principle

> **Design the reproduction as a controlled reconstruction of the original analysis. Define the target, inputs, environment, comparison criteria, and acceptable deviations before running the workflow.**
