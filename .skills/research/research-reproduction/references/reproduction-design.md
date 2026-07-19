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

## Define the Reproduction Question
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

## Define the Expected Output
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

## Identify the Analysis Data
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

## Design for Failure Diagnosis
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

## Reproduction Design for Machine Learning
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

## Reproduction Design for Computational Models
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

## Final Principle
> **Design the reproduction as a controlled reconstruction of the original analysis. Define the target, inputs, environment, comparison criteria, and acceptable deviations before running the workflow.**
