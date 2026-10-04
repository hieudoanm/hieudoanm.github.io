# Reading Strategy

A practical strategy for reading research papers efficiently without sacrificing understanding or critical thinking.

## Purpose

The goal of reading a research paper is not to remember every sentence.

The goal is to construct a reliable mental model of:

```text
Why was this study done?
        ↓
What question was asked?
        ↓
How was it tested?
        ↓
What evidence was obtained?
        ↓
What does the evidence support?
        ↓
What remains uncertain?
```

A good reading strategy therefore prioritises **structure, evidence, and reasoning** over exhaustive reading from beginning to end.

---

# 1. Start With the Question

Before reading the details, identify the central research question.

Look for statements such as:

- "We investigated whether..."
- "We tested the hypothesis that..."
- "The aim of this study was..."
- "We asked whether..."
- "We examined..."
- "This study addresses..."

Rewrite the question in your own words.

For example:

```text
Paper:
Can neural activity predict the semantic content of imagined speech?

Your note:
Can brain activity be used to decode what a person is imagining saying?
```

If you cannot state the question simply, continue reading the introduction until you can.

---

# 2. Use the Abstract as a Map

The abstract provides orientation, not complete understanding.

Extract:

```text
Problem
Question
Method
Main result
Conclusion
```

Do not assume that understanding the abstract means understanding the paper.

The abstract usually omits important details such as:

- Sample characteristics
- Exclusion criteria
- Experimental controls
- Preprocessing
- Statistical assumptions
- Alternative analyses
- Negative results
- Model limitations
- Generalisability

Use the abstract to decide **what to pay attention to**, not as a substitute for reading.

---

# 3. Preview the Paper

Before reading line-by-line, scan the paper.

Look at:

- Title
- Abstract
- Section headings
- Figures
- Tables
- Figure captions
- Conclusion
- Supplementary material
- Key references

This gives you a structural map.

A useful sequence is:

```text
Title
  ↓
Abstract
  ↓
Figures
  ↓
Tables
  ↓
Conclusion
  ↓
Introduction
  ↓
Methods
  ↓
Results
```

This can be more efficient than immediately starting at page one.

---

# 4. Read the Introduction for the Argument

Do not treat the introduction as background information to memorise.

Look for the argument:

```text
Established knowledge
        ↓
Problem
        ↓
Limitation in existing knowledge
        ↓
Research gap
        ↓
Research question
        ↓
Hypothesis
```

Ask:

- What is already known?
- What is uncertain?
- What previous studies motivate this work?
- What limitation are the authors addressing?
- Why is the question important?
- What do the authors predict?

## Watch for the Research Gap

Authors may describe the gap explicitly:

> "However, little is known about..."

But the gap may also be implied.

Look for:

- Missing populations
- Missing measurements
- Conflicting findings
- Poor previous methods
- Unresolved theoretical debates
- Limited generalisation
- Lack of longitudinal evidence
- Lack of causal evidence

Do not automatically accept the authors' description of the gap.

Check whether the cited literature actually supports it.

---

# 5. Identify the Hypothesis

Separate different types of statements.

### Research question

```text
Does X affect Y?
```

### Hypothesis

```text
X will increase Y.
```

### Prediction

```text
Participants exposed to X will show higher Y scores.
```

### Exploratory analysis

```text
We also examined whether Z was related to Y.
```

These are not interchangeable.

Pay particular attention to analyses that were:

- Pre-registered
- Confirmatory
- Exploratory
- Post-hoc

A result discovered after examining the data should generally be interpreted differently from a prediction made before collecting the data.

---

# 6. Read Methods With a Specific Question

Do not read the Methods section as a list of technical details.

Read it while asking:

> **Could this design actually answer the research question?**

Build a mental model:

```text
Participants
      ↓
Experimental manipulation
      ↓
Measurement
      ↓
Data processing
      ↓
Statistical analysis
      ↓
Outcome
```

For each stage, ask what could go wrong.

---

# 7. Identify the Study Design

Determine the basic design before interpreting results.

Common designs include:

- Cross-sectional
- Longitudinal
- Experimental
- Observational
- Randomised controlled trial
- Case-control
- Cohort
- Within-subject
- Between-subject
- Mixed design
- Computational modelling
- Simulation
- Secondary data analysis

Design determines what kinds of conclusions are possible.

For example:

```text
Correlation
    ≠
Causation
```

and:

```text
Cross-sectional association
    ≠
Longitudinal change
```

and:

```text
Prediction
    ≠
Mechanistic explanation
```

---

# 8. Identify Variables

Write down:

```text
Independent variable
Dependent variable
Control variables
Potential confounders
```

For observational research, also identify:

```text
Predictor
Outcome
Covariates
Potential confounders
```

For computational research:

```text
Input
Target
Features
Model
Prediction
Evaluation metric
```

This often makes a complicated paper much easier to understand.

---

# 9. Understand the Data Before the Model

For empirical studies, understand the data-generating process before focusing on the statistical model.

Ask:

- Who generated the data?
- How many observations are there?
- How many participants?
- What does one observation represent?
- Are observations independent?
- Are measurements repeated?
- What variables were recorded?
- What was excluded?
- How much data were missing?

For neuroimaging:

```text
Participant
    ↓
Task / stimulus
    ↓
Neural measurement
    ↓
Preprocessing
    ↓
Derived signal
    ↓
Statistical analysis
```

For machine learning:

```text
Dataset
    ↓
Preprocessing
    ↓
Train / validation / test
    ↓
Model
    ↓
Prediction
    ↓
Evaluation
```

---

# 10. Read Figures Before Accepting Results

Figures are often the fastest route to understanding the paper.

For each important figure, ask:

### What?

What variable is being shown?

### Who?

Which participants, groups, or observations are included?

### Comparison?

What is being compared?

### Scale?

What are the axes and units?

### Uncertainty?

What do error bars, confidence intervals, or distributions represent?

### Statistics?

What test supports the reported difference or relationship?

### Interpretation?

What does the figure actually establish?

### Limits?

What does it not establish?

A useful rule:

> **Read the figure first. Read the authors' interpretation second.**

---

# 11. Read Results as Evidence

The Results section should answer:

> What happened in the data?

Avoid immediately asking:

> What does this mean?

That belongs primarily to the Discussion.

Separate:

```text
Observation
    ↓
Statistical result
    ↓
Interpretation
```

For example:

```text
Observation:
Condition A produced faster reaction times than condition B.

Statistical result:
The difference was estimated as X ms with a confidence interval of Y–Z.

Interpretation:
The authors argue that condition A requires less processing time.
```

The first two are evidence.

The third is interpretation.

---

# 12. Read the Discussion Backwards

The Discussion often contains several layers of claims.

Separate:

```text
What we found
        ↓
What we think it means
        ↓
How it relates to previous research
        ↓
Why it matters
        ↓
What should happen next
```

When reading the Discussion, repeatedly ask:

> Is this statement directly demonstrated by the current study?

If not, determine whether it is:

- An interpretation
- A theoretical proposal
- A comparison with previous research
- A speculation
- A future direction

This prevents accidental acceptance of speculative claims as established findings.

---

# 13. Track the Evidence Chain

For every major conclusion, trace backwards.

```text
Conclusion
    ↑
Interpretation
    ↑
Statistical result
    ↑
Analysis
    ↑
Measurement
    ↑
Experimental design
```

If the chain breaks at any point, confidence in the conclusion should decrease.

For example:

```text
Claim:
Brain region X causes language comprehension.

Evidence:
Higher activity in X during a language task.

Problem:
The experiment may only demonstrate an association.
```

The evidence may support:

```text
Region X is associated with the task.
```

but not necessarily:

```text
Region X causes language comprehension.
```

---

# 14. Use the Four-Pass Method

A practical workflow is:

## Pass 1 — Orientation

Goal:

> Understand what the paper is about.

Read:

- Title
- Abstract
- Figures
- Tables
- Headings
- Conclusion

Output:

```text
One-paragraph overview
```

---

## Pass 2 — Argument

Goal:

> Understand the logic of the study.

Identify:

```text
Problem
Question
Hypothesis
Design
Data
Analysis
Results
Conclusion
```

Output:

```text
Argument map
```

---

## Pass 3 — Evidence

Goal:

> Determine how the conclusion was produced.

Inspect:

- Participants
- Measurements
- Controls
- Preprocessing
- Analysis
- Statistics
- Figures
- Tables
- Supplement

Output:

```text
Evidence notes
```

---

## Pass 4 — Critical Reading

Goal:

> Determine how convincing the paper is.

Ask:

- What assumptions are required?
- What alternative explanations exist?
- What limitations matter?
- What conclusions are too strong?
- What populations or conditions are missing?
- What remains unresolved?

Output:

```text
Critical assessment
+
Open questions
```

---

# 15. Use Active Notes

Do not simply highlight text.

Highlighting answers:

> "What looked important?"

Active notes answer:

> "What did I understand?"

Prefer notes such as:

```text
The study compares X and Y using a within-subject design.

The key dependent variable is reaction time.

The authors predict that X will produce faster responses.

The main result supports the prediction.

However, the design cannot determine whether X causes the observed effect.
```

This produces understanding rather than a collection of highlighted sentences.

---

# 16. Mark Uncertainty

When reading, explicitly mark uncertainty.

Useful labels:

```text
[FACT]
Directly reported by the paper.

[RESULT]
Directly supported by an analysis.

[INTERPRETATION]
Authors' explanation of a result.

[ASSUMPTION]
Required for the analysis or interpretation.

[UNCLEAR]
Insufficient information.

[CONCERN]
Potential methodological problem.

[QUESTION]
Something requiring further investigation.
```

These labels make later literature synthesis much easier.

---

# 17. Do Not Get Stuck on Every Detail

Research papers can contain unfamiliar terminology, equations, methods, and statistical techniques.

Do not interrupt the entire reading process every time you encounter something unfamiliar.

Use a two-stage strategy.

### First pass

Mark the concept:

```text
[?] unfamiliar model
[?] unfamiliar statistical test
[?] unfamiliar brain region
```

Continue reading.

### Second pass

Return to the important concepts.

Prioritise concepts that affect your understanding of:

- The research question
- The method
- The analysis
- The main result
- The conclusion

Not every technical detail deserves equal effort.

---

# 18. Decide When You Have Read Enough

You do not necessarily need to understand every equation to understand a paper.

You have probably read enough when you can explain:

```text
1. What question was asked?
2. Why was it asked?
3. What was measured?
4. How was it analysed?
5. What was found?
6. What does the evidence support?
7. What does it not support?
8. What is the main contribution?
9. What are the important limitations?
10. What question should be investigated next?
```

If you cannot answer these questions, continue reading.

---

# 19. Adapt the Strategy to the Paper

Different papers require different reading emphasis.

## Experimental neuroscience

Prioritise:

```text
Participants
↓
Task
↓
Neural measurement
↓
Preprocessing
↓
Statistical analysis
↓
Brain-behaviour interpretation
```

## Neuroimaging

Pay particular attention to:

- Acquisition
- Preprocessing
- Spatial resolution
- Temporal resolution
- Registration
- Quality control
- Statistical model
- Multiple comparisons
- Region-of-interest definitions
- Whole-brain analyses
- Spatial dependence

## Computational neuroscience

Prioritise:

- Computational assumptions
- Model architecture
- Parameters
- Biological interpretation
- Fitting procedure
- Model comparison
- Identifiability
- Simulation
- Validation
- Generalisation

## Machine learning

Prioritise:

- Dataset
- Data splits
- Leakage
- Features
- Architecture
- Baselines
- Training
- Hyperparameters
- Evaluation metrics
- Generalisation
- Ablation studies

## Psychology

Prioritise:

- Operationalisation
- Experimental manipulation
- Measurement validity
- Controls
- Sample characteristics
- Statistical power
- Replication
- Alternative explanations

## Clinical neuroscience

Prioritise:

- Patient population
- Diagnostic criteria
- Clinical outcome measures
- Baseline characteristics
- Treatment/control groups
- Confounding variables
- Effect sizes
- Clinical significance
- Follow-up
- Generalisability to patients

---

# 20. A Compact Reading Checklist

Use this when time is limited.

```text
□ What is the research question?
□ Why does it matter?
□ What is the hypothesis?
□ What study design was used?
□ Who or what was studied?
□ What was measured?
□ What was the main analysis?
□ What were the main results?
□ What do the figures show?
□ What do the results actually support?
□ What are the authors interpreting?
□ What are the main limitations?
□ What is the contribution?
□ What remains unknown?
```

---

# 21. Final Mental Model

A strong paper reader continuously moves between three levels:

```text
LEVEL 1 — WHAT?
What did the researchers do?

        ↓

LEVEL 2 — HOW?
How did the evidence support the result?

        ↓

LEVEL 3 — HOW SURE?
How convincing is the evidence and interpretation?
```

The goal is not merely to know what a paper says.

The goal is to understand:

```text
Claim
  ↓
Evidence
  ↓
Reasoning
  ↓
Confidence
  ↓
Contribution
  ↓
Remaining uncertainty
```

That is the foundation for critical appraisal and literature synthesis.

```

```
