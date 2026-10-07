# Paper Structure

A practical guide to understanding the structure of a research paper and the role each section plays in the scientific argument.

## Purpose

Research papers are usually organised into sections, but those sections are not independent pieces.

They form a connected argument:

```text
Introduction
    ↓
Why was the study necessary?

Methods
    ↓
How was the question tested?

Results
    ↓
What did the data show?

Discussion
    ↓
What do the findings mean?
```

The most common structure is based on:

```text
IMRaD

Introduction
Methods
Results
and
Discussion
```

However, papers vary substantially across disciplines and publication formats.

---

# 1. The Scientific Argument

Before looking at individual sections, understand the paper as one connected system.

```text
Background
    ↓
Research problem
    ↓
Research question
    ↓
Hypothesis
    ↓
Study design
    ↓
Data
    ↓
Analysis
    ↓
Results
    ↓
Interpretation
    ↓
Conclusion
```

Each section should contribute to this chain.

A useful reading question is:

> **What role does this section play in the overall argument?**

---

# 2. Title

The title provides the first description of the study.

Look for:

- Main topic
- Population
- Variables
- Method
- Intervention
- Relationship being studied

For example:

```text
Neural correlates of semantic processing during naturalistic speech comprehension
```

This suggests:

```text
Topic:
Semantic processing

Measurement:
Neural activity

Context:
Speech comprehension
```

The title may also reveal the study design:

```text
A randomised controlled trial...
A longitudinal study...
A computational model...
A systematic review...
```

## Do not overinterpret the title

Titles are often simplified for readability.

The actual study may be narrower than the title suggests.

---

# 3. Abstract

The abstract is a compressed version of the paper.

It usually contains:

```text
Background
    ↓
Objective
    ↓
Methods
    ↓
Results
    ↓
Conclusion
```

Use it to establish:

- What problem is being addressed
- What was done
- What was found
- Why the authors think it matters

## What the abstract usually cannot tell you

It often does not provide enough detail about:

- Sampling
- Exclusion criteria
- Experimental controls
- Preprocessing
- Statistical assumptions
- Alternative analyses
- Missing data
- Negative findings
- Robustness
- Generalisability

Therefore:

> **The abstract is a map, not the destination.**

---

# 4. Introduction

The Introduction establishes the motivation for the study.

A common structure is:

```text
What we know
      ↓
What we do not know
      ↓
Why the uncertainty matters
      ↓
What this study asks
```

Look for four major components.

## 4.1 Background

What is already known?

The authors introduce:

- Concepts
- Theories
- Previous findings
- Relevant methods

## 4.2 Problem

What remains uncertain?

For example:

```text
Previous studies show X.

However, they disagree about Y.
```

## 4.3 Gap

What is missing?

Examples:

```text
Few studies have examined population X.

Existing methods cannot measure Y reliably.

Previous studies produce conflicting results.

The mechanism underlying the effect remains unclear.
```

## 4.4 Research question and hypothesis

The Introduction should eventually lead to:

```text
Research question
        ↓
Hypothesis
        ↓
Prediction
```

A useful test is:

> Could I explain why this experiment follows logically from the Introduction?

If not, the argument has not yet been fully understood.

---

# 5. Literature Review Within the Introduction

Many research papers contain a mini literature review inside the Introduction.

Its purpose is not necessarily to provide a comprehensive review.

Instead, it usually establishes:

```text
Current knowledge
      ↓
Relevant disagreement / limitation
      ↓
Need for the present study
```

When reading citations, ask:

- Why is this paper being cited?
- Is it evidence?
- Is it historical background?
- Is it supporting a theoretical claim?
- Is it being used to establish a research gap?

Do not assume every citation provides equally strong evidence.

---

# 6. Methods

The Methods section explains how the research question was investigated.

At a high level:

```text
Who / what?
    ↓
What happened?
    ↓
What was measured?
    ↓
How was it processed?
    ↓
How was it analysed?
```

A good Methods section should provide enough information for the study to be understood and, ideally, reproduced.

---

# 7. Participants or Dataset

Identify:

```text
Population
Sample
Sample size
Inclusion criteria
Exclusion criteria
Recruitment
Demographics
```

For datasets, identify:

```text
Dataset source
Number of observations
Number of participants
Variables
Collection procedure
Missing data
Filtering
```

Ask:

> Who or what does this study actually represent?

A study of:

```text
30 university students
```

does not automatically generalise to:

```text
the general population
```

Similarly:

```text
A dataset collected from one hospital
```

may not generalise to:

```text
all patients with the condition.
```

---

# 8. Experimental Design

Identify the basic structure.

Common designs include:

```text
Between-subject
Within-subject
Mixed
Cross-sectional
Longitudinal
Experimental
Observational
Randomised
Case-control
Cohort
```

Then identify:

```text
Independent variable
Dependent variable
Control condition
Experimental condition
Covariates
Potential confounders
```

For example:

```text
Condition
    ↓
Language task
    ↓
Brain measurement
    ↓
Neural response
```

Understanding the design is essential before interpreting the statistics.

---

# 9. Measurements

Determine exactly how abstract concepts were measured.

For example:

```text
Concept:
Language ability

Measurement:
Vocabulary score
```

or:

```text
Concept:
Neural activity

Measurement:
BOLD signal
```

or:

```text
Concept:
Decision-making speed

Measurement:
Reaction time
```

This is called **operationalisation**.

Ask:

> Does the measurement actually capture the concept the authors claim to study?

A study can have sophisticated statistics but weak measurement validity.

---

# 10. Data Collection

Understand how the raw observations were produced.

For example:

```text
Participant
    ↓
Stimulus
    ↓
Task response
    ↓
Measurement
    ↓
Raw data
```

For neuroimaging:

```text
Participant
    ↓
Experimental task
    ↓
MRI / EEG / MEG / OPM-MEG
    ↓
Raw neural signal
```

For behavioural experiments:

```text
Participant
    ↓
Stimulus
    ↓
Response
    ↓
Reaction time / accuracy
```

The data collection procedure determines what can legitimately be inferred later.

---

# 11. Preprocessing

Many studies transform raw data before analysis.

Examples include:

### Neuroimaging

```text
Raw data
    ↓
Motion correction
    ↓
Filtering
    ↓
Artefact removal
    ↓
Registration
    ↓
Spatial transformation
    ↓
Analysis-ready data
```

### EEG / MEG

```text
Raw signal
    ↓
Filtering
    ↓
Bad-channel detection
    ↓
Artefact correction
    ↓
Epoching
    ↓
Baseline correction
    ↓
Analysis
```

### Behavioural data

```text
Raw responses
    ↓
Invalid trial removal
    ↓
Outlier handling
    ↓
Transformation
    ↓
Statistical analysis
```

Ask:

- What data were removed?
- Why?
- Were preprocessing decisions made before seeing the results?
- Could preprocessing affect the outcome?

---

# 12. Statistical Analysis

The analysis section connects data to evidence.

Identify:

```text
Data
  ↓
Statistical model
  ↓
Parameter / effect
  ↓
Uncertainty
  ↓
Inference
```

Look for:

- Statistical tests
- Regression models
- Mixed-effects models
- ANOVA
- Correlation
- Classification
- Bayesian models
- Permutation tests
- Multiple-comparison correction
- Confidence intervals
- Effect sizes

Do not focus only on p-values.

Ask:

> What quantity was estimated?

and:

> How uncertain is the estimate?

---

# 13. Computational Methods

Computational papers may have additional sections.

A useful structure is:

```text
Dataset
    ↓
Representation
    ↓
Model
    ↓
Parameters
    ↓
Training / fitting
    ↓
Validation
    ↓
Evaluation
```

Identify:

### Input

What information enters the model?

### Target

What is the model trying to predict or explain?

### Representation

How is the information represented?

### Model

What mathematical or computational system is used?

### Training

How are parameters estimated?

### Validation

How is generalisation tested?

### Evaluation

What metric determines performance?

### Baseline

What simpler method is being compared against?

---

# 14. Results

The Results section should primarily report what the analysis found.

A common structure is:

```text
Descriptive results
      ↓
Primary analysis
      ↓
Secondary analysis
      ↓
Additional analysis
```

Look for:

- Main effects
- Interactions
- Relationships
- Prediction performance
- Model comparisons
- Null results
- Robustness analyses

Separate:

```text
Result
```

from:

```text
Interpretation
```

The Results might say:

```text
Condition A produced faster responses than condition B.
```

The Discussion might say:

```text
This suggests that condition A requires less cognitive processing.
```

The second statement is an interpretation.

---

# 15. Figures

Figures often provide the clearest representation of the main evidence.

For every important figure identify:

```text
X-axis
Y-axis
Groups
Conditions
Units
Sample
Summary statistic
Uncertainty
Statistical comparison
```

Then ask:

> What claim is this figure being used to support?

Also ask:

> Could the same figure be interpreted another way?

---

# 16. Tables

Tables often contain information that is easy to miss in the prose.

Common examples include:

- Participant demographics
- Descriptive statistics
- Regression coefficients
- Model performance
- Clinical outcomes
- Statistical tests

Do not skip tables simply because the Results text summarises them.

Important information may appear only in the table.

---

# 17. Discussion

The Discussion interprets the findings.

A typical structure is:

```text
Main finding
    ↓
Interpretation
    ↓
Comparison with previous research
    ↓
Theoretical implications
    ↓
Practical implications
    ↓
Limitations
    ↓
Future research
```

The Discussion often contains the strongest claims in the paper.

It is therefore also where you should be most careful.

---

# 18. Limitations

Limitations may appear in:

- A dedicated subsection
- The Discussion
- Supplementary material
- Methods

Classify them.

### Sampling

```text
Small sample
Restricted population
Selection bias
```

### Measurement

```text
Indirect measurement
Low reliability
Limited validity
```

### Design

```text
No control group
No randomisation
Cross-sectional design
```

### Analysis

```text
Low statistical power
Model assumptions
Multiple comparisons
Overfitting
```

### Interpretation

```text
Causal language from correlational evidence
Limited generalisability
Speculative mechanism
```

Do not simply copy the authors' limitations.

Ask:

> What additional limitation becomes apparent when I examine the methods and results?

---

# 19. Conclusion

The Conclusion is the paper's final answer.

It usually answers:

```text
What did we learn?
Why does it matter?
```

Compare the Conclusion with the original research question.

Ask:

> Did the study actually answer the question it set out to answer?

Also check whether the conclusion is:

```text
Consistent with the Results
```

rather than:

```text
Stronger than the Results
```

---

# 20. Supplementary Material

Important methodological information may be moved to supplementary material.

Examples:

- Additional analyses
- Full preprocessing details
- Additional figures
- Robustness checks
- Hyperparameters
- Participant exclusions
- Statistical models
- Sensitivity analyses
- Experimental materials

For papers you are critically evaluating, do not assume the main text contains everything important.

---

# 21. References

The reference list provides the paper's intellectual context.

Use it to identify:

```text
Foundational papers
        ↓
Important competing theories
        ↓
Methods
        ↓
Recent developments
```

References can also reveal what evidence the authors rely on most heavily.

However, citation count does not automatically indicate evidence quality.

---

# 22. Different Paper Types

Not all research papers follow the same structure.

## Original empirical research

Typical:

```text
Abstract
Introduction
Methods
Results
Discussion
Conclusion
References
```

## Systematic review

Often:

```text
Introduction
Search strategy
Eligibility criteria
Study selection
Data extraction
Quality assessment
Synthesis
Discussion
```

## Meta-analysis

Usually adds:

```text
Effect-size calculation
Heterogeneity
Publication bias
Sensitivity analysis
```

## Computational paper

May emphasise:

```text
Dataset
Model
Training
Simulation
Validation
Evaluation
```

## Methods paper

May emphasise:

```text
Problem
Existing methods
Proposed method
Implementation
Validation
Benchmarking
```

## Clinical trial

May include:

```text
Participants
Randomisation
Intervention
Control
Outcome measures
Follow-up
Adverse events
```

The structure should therefore be treated as a guide, not a rigid template.

---

# 23. Follow the Argument Across Sections

A powerful reading technique is to connect the same concept across the paper.

For example:

```text
Introduction:
"Semantic processing may depend on network X."

        ↓

Hypothesis:
"Network X will show stronger activity during semantic processing."

        ↓

Methods:
Measure activity in network X during task Y.

        ↓

Results:
Activity in network X differs between conditions.

        ↓

Discussion:
The authors interpret this as evidence for semantic processing.

        ↓

Critical reading:
Does the design distinguish semantic processing from alternative explanations?
```

This is much more informative than reading each section independently.

---

# 24. Structure-to-Evidence Mapping

Use this mapping while reading:

| Section                | Main question                            |
| ---------------------- | ---------------------------------------- |
| Title                  | What is this about?                      |
| Abstract               | What happened overall?                   |
| Introduction           | Why was the study needed?                |
| Methods                | How was it tested?                       |
| Participants / Dataset | What was studied?                        |
| Measurements           | What was actually measured?              |
| Analysis               | How was evidence generated?              |
| Results                | What did the data show?                  |
| Figures                | What does the evidence look like?        |
| Discussion             | What might the findings mean?            |
| Limitations            | Where could the evidence fail?           |
| Conclusion             | What does the study ultimately claim?    |
| Supplement             | What additional evidence/details exist?  |
| References             | What prior knowledge supports the study? |

---

# 25. The Paper as a Single Argument

Ultimately, compress the entire paper into:

```text
Because:
    [problem / gap]

We asked:
    [research question]

We tested it by:
    [method]

We found:
    [main result]

This suggests:
    [interpretation]

However:
    [important limitation]

Therefore:
    [appropriately calibrated conclusion]
```

If you can reconstruct this argument accurately, you understand the paper's structure.

The purpose of knowing the structure is not to memorise where information appears.

It is to understand **how the paper moves from a question to evidence to a scientific claim**.

```

```
