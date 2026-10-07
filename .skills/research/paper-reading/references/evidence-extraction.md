# Evidence Extraction

A practical framework for extracting the important evidence from a research paper into structured, reusable notes.

## Purpose

Reading a paper produces understanding.

Evidence extraction turns that understanding into a structured representation that can be:

- Reviewed later
- Compared with other papers
- Used in a literature review
- Used to support a research proposal
- Used to identify research gaps
- Used when writing a dissertation
- Used to prepare for meetings or presentations

The goal is not to copy the paper.

The goal is to capture the information needed to understand and evaluate its claims.

---

# 1. Core Principle

> **Extract evidence, not just conclusions.**

Weak note:

```text
The study shows that language is processed by network X.
```

Better note:

```text
Participants completed a language comprehension task while neural activity was measured using fMRI. Activity in network X was higher during the semantic condition than the control condition. The authors interpret this as evidence that network X contributes to semantic processing.
```

The second note preserves:

```text
Population
↓
Task
↓
Measurement
↓
Comparison
↓
Result
↓
Interpretation
```

That structure is much more useful later.

---

# 2. What to Extract

A useful evidence record contains:

```text
Citation
Research problem
Research question
Hypothesis
Population
Sample
Study design
Experimental task
Variables
Measurements
Preprocessing
Analysis
Main results
Statistical evidence
Figures / tables
Interpretation
Limitations
Contribution
Open questions
Relevance
```

Not every field is necessary for every paper.

The extraction depth should match your purpose.

---

# 3. Minimal Extraction

When reading a paper quickly, capture:

```text
1. Research question
2. Method
3. Main result
4. Main limitation
5. Contribution
```

Example:

```text
Question:
Can neural activity predict semantic content?

Method:
MEG during naturalistic speech comprehension; machine-learning decoder.

Result:
Neural patterns contained information predictive of semantic content.

Limitation:
Performance was evaluated within a relatively limited participant sample.

Contribution:
Provides evidence that distributed neural activity contains decodable semantic information.
```

This is enough for initial screening.

---

# 4. Standard Extraction

For serious research use, expand the record.

## Citation

Record:

```text
Authors
Year
Title
Journal / conference
DOI
URL
```

Where possible, preserve a persistent identifier such as:

```text
DOI
PMID
arXiv ID
Dataset ID
```

Citation metadata should later be handled by a dedicated citation-management workflow.

---

# 5. Research Problem

Write the problem in your own words.

Ask:

> What scientific uncertainty motivated this study?

Example:

```text
Existing studies can identify brain regions involved in speech processing, but it remains unclear whether distributed neural activity contains enough information to decode the semantic content of naturalistic speech.
```

Avoid copying a long paragraph from the Introduction.

---

# 6. Research Question

Extract the central question as one sentence.

Prefer:

```text
Can X predict / explain / affect Y under condition Z?
```

Examples:

```text
Does semantic complexity influence reaction time?

Can neural activity predict the semantic content of speech?

Does intervention X improve language recovery after stroke?
```

If there are multiple research questions, separate:

```text
Primary question
Secondary questions
Exploratory questions
```

---

# 7. Hypothesis

Record the predicted relationship.

Example:

```text
Hypothesis:
Greater semantic complexity will increase processing time.

Prediction:
Participants will show longer reaction times for high-complexity sentences.
```

Distinguish predictions made before the analysis from interpretations developed after seeing the data.

---

# 8. Population and Sample

Record:

```text
Target population
Sample size
Participant characteristics
Age
Sex / gender where relevant
Inclusion criteria
Exclusion criteria
Recruitment
Clinical status
```

For datasets:

```text
Dataset name
Source
Number of participants
Number of observations
Data collection context
```

Ask:

> What population can the evidence reasonably generalise to?

---

# 9. Study Design

Record the design explicitly.

Examples:

```text
Randomised controlled trial
Within-subject experiment
Between-subject experiment
Mixed design
Longitudinal cohort
Cross-sectional study
Case-control study
Observational study
Computational modelling
Secondary data analysis
```

Also record:

```text
Independent variables
Dependent variables
Controls
Covariates
Potential confounders
```

---

# 10. Experimental Task

For behavioural and neuroscience studies, describe what participants actually did.

Example:

```text
Participants listened to spoken sentences and answered comprehension questions.
```

For a reaction-time experiment:

```text
Participants viewed visual stimuli and pressed a key corresponding to the target category.
```

For neuroimaging:

```text
Participants performed a language comprehension task while undergoing fMRI.
```

The task description should be detailed enough to understand what generated the data.

---

# 11. Measurements

Record how each important construct was operationalised.

Example:

```text
Construct:
Language ability

Measure:
Standardised language score
```

or:

```text
Construct:
Neural activity

Measure:
BOLD signal
```

or:

```text
Construct:
Decision speed

Measure:
Reaction time in milliseconds
```

For multiple measures, use a mapping:

```text
Construct → Measurement
```

This helps identify measurement limitations.

---

# 12. Data Processing

Record important preprocessing steps.

For example:

```text
Raw data
    ↓
Quality control
    ↓
Artefact removal
    ↓
Filtering
    ↓
Normalisation
    ↓
Feature extraction
```

Do not record every implementation detail unless it matters.

Prioritise decisions that could influence the conclusions.

Examples:

- Participant exclusion
- Trial exclusion
- Missing-data handling
- Outlier removal
- Signal filtering
- Spatial smoothing
- Normalisation
- Feature selection
- Dimensionality reduction

---

# 13. Analysis

Describe how the data were transformed into evidence.

A useful representation is:

```text
Input data
    ↓
Preprocessing
    ↓
Statistical / computational model
    ↓
Estimated effect / prediction
    ↓
Uncertainty / evaluation
```

Record:

```text
Primary analysis
Secondary analysis
Exploratory analysis
```

For statistical models, record the model type.

Examples:

```text
Linear regression
Logistic regression
Mixed-effects model
ANOVA
Permutation test
Bayesian model
Correlation
```

For machine learning:

```text
Model
Features
Training
Validation
Test set
Baseline
Evaluation metric
```

---

# 14. Main Results

Extract the results that directly answer the research question.

Avoid recording every result.

Prioritise:

```text
Primary outcome
Primary comparison
Main effect
Important interaction
Main prediction
Important null result
```

Write results in evidence-focused language.

Weak:

```text
The experiment worked.
```

Better:

```text
Reaction times were lower in condition A than condition B.
```

Better still:

```text
Condition A produced lower reaction times than condition B, with the estimated difference and uncertainty reported in the primary analysis.
```

Include the actual numerical result when it is important.

---

# 15. Statistical Evidence

Where relevant, record:

```text
Effect size
Confidence interval
p-value
Sample size
Statistical test
Model estimate
Standard error
Variance
Multiple-comparison correction
```

Do not record p-values without context.

For example:

```text
Weak:
p = .03

Better:
Condition A was associated with a 42 ms reduction in reaction time
(95% CI: X–Y; statistical test: Z).
```

The exact fields depend on the analysis.

---

# 16. Null Results

Do not extract only positive findings.

Record important null results.

For example:

```text
The intervention did not produce a statistically detectable improvement in the primary clinical outcome.
```

Null results can be scientifically important because they:

- Constrain theories
- Challenge predictions
- Prevent exaggerated conclusions
- Inform future study design
- Reveal boundary conditions

---

# 17. Figures and Tables

For each important figure or table, record:

```text
Figure / table number
What it shows
Key comparison
Main finding
Relevant statistics
Why it matters
```

Example:

```text
Figure 2:
Shows decoding accuracy across time.

Key finding:
Accuracy rises above chance during speech presentation.

Importance:
Supports the claim that neural activity contains information about speech content.
```

Do not merely write:

```text
Figure 2 = important.
```

Record what makes it important.

---

# 18. Interpretation

Separate the authors' interpretation from the direct result.

Use:

```text
Result:
Neural activity in region X increased during condition A.

Interpretation:
The authors argue that region X contributes to process Y.
```

This distinction is critical.

The interpretation may be reasonable without being directly demonstrated.

---

# 19. Alternative Explanations

When possible, record plausible alternatives.

Example:

```text
Observed:
Higher activity during condition A.

Authors' interpretation:
Condition A increases semantic processing.

Alternative:
Condition A may also differ in task difficulty or attention.
```

This makes the evidence record useful for critical reading.

---

# 20. Limitations

Record limitations in three categories.

### Author-identified

Limitations explicitly acknowledged by the authors.

### Methodological

Problems apparent from the study design or analysis.

### Interpretive

Problems arising from conclusions that may go beyond the evidence.

Example:

```text
Author-identified:
Small sample.

Methodological:
Participants were recruited from a single institution.

Interpretive:
The conclusion may imply broader generalisation than the sample supports.
```

---

# 21. Contribution

Identify what the paper adds.

Possible contribution types:

```text
New empirical finding
New dataset
New method
New computational model
Replication
Theoretical contribution
Clinical application
Benchmark
Measurement technique
Negative result
```

Write the contribution in one or two sentences.

Example:

```text
The study demonstrates that distributed MEG activity contains information that can be used to decode semantic representations during naturalistic speech.
```

---

# 22. Open Questions

End the evidence extraction with:

```text
What does the paper leave unresolved?
```

Examples:

```text
Does the effect generalise to other languages?

Does the result hold in clinical populations?

Is the neural representation causal or merely correlational?

Can the model generalise to unseen speakers?

Does decoding performance depend on lexical or semantic information?
```

These questions can later become inputs to:

```text
literature-review
research-gap
hypothesis-development
```

---

# 23. Relevance to Your Research

When reading for a specific project, add:

```text
Why is this paper relevant to my project?
```

Possible categories:

```text
Background
Method
Dataset
Theory
Analysis
Model
Comparison
Evidence
Potential limitation
Research gap
```

Example:

```text
Relevance:
Useful for understanding how MEG data can be combined with computational models to decode speech-related representations.
```

This prevents collecting papers that are interesting but ultimately irrelevant.

---

# 24. Evidence Hierarchy

Not all extracted statements have the same evidential status.

Use a hierarchy such as:

```text
Direct measurement
      ↓
Statistical result
      ↓
Author interpretation
      ↓
Theoretical implication
      ↓
Speculation
```

For example:

```text
Direct:
Reaction time increased.

Statistical:
The increase was estimated at 75 ms.

Interpretation:
The authors argue that the manipulation increased processing difficulty.

Theory:
The finding may support a particular model of cognition.

Speculation:
The mechanism may also operate in clinical populations.
```

Do not collapse these into one statement.

---

# 25. Evidence Matrix

When reading multiple papers, use a consistent extraction format.

| Field             | Paper A | Paper B | Paper C |
| ----------------- | ------- | ------- | ------- |
| Research question |         |         |         |
| Population        |         |         |         |
| Sample            |         |         |         |
| Design            |         |         |         |
| Measurement       |         |         |         |
| Analysis          |         |         |         |
| Main result       |         |         |         |
| Effect size       |         |         |         |
| Limitations       |         |         |         |
| Contribution      |         |         |         |
| Open question     |         |         |         |

Consistency is more valuable than excessive detail.

A structured matrix makes comparison much easier later.

---

# 26. Recommended Paper Note Template

A practical note can use:

```markdown
# Paper

## Citation

## Research Problem

## Research Question

## Hypothesis

## Population / Dataset

## Study Design

## Experimental Task

## Measurements

## Preprocessing

## Analysis

## Main Results

## Statistical Evidence

## Figures / Tables

## Interpretation

## Alternative Explanations

## Limitations

## Contribution

## Open Questions

## Relevance to My Research

## Key Terms

## Follow-up Reading
```

---

# 27. Evidence vs Notes

Not everything in your notes is evidence.

Distinguish:

```text
Evidence
```

from:

```text
Understanding
```

and:

```text
Your interpretation
```

For example:

```text
[EVIDENCE]
Participants showed faster responses in condition A.

[AUTHOR INTERPRETATION]
The authors suggest this reflects reduced cognitive demand.

[MY NOTE]
The manipulation may also have changed stimulus familiarity.
```

This separation becomes extremely valuable when writing later.

---

# 28. Avoid Over-Extraction

Do not create a transcript of the paper.

Avoid recording:

- Every sentence
- Every citation
- Every statistical test
- Every minor result
- Every methodological detail

unless they are relevant to your purpose.

The test is:

> **Would this information help me understand, evaluate, compare, or use this paper later?**

If not, it probably does not need to be extracted.

---

# 29. Final Evidence Record

A strong extraction should allow you to reconstruct the paper without reopening it immediately.

At minimum, you should know:

```text
Question
    ↓
Design
    ↓
Data
    ↓
Measurement
    ↓
Analysis
    ↓
Result
    ↓
Interpretation
    ↓
Limitation
    ↓
Contribution
    ↓
Open question
```

The purpose of evidence extraction is therefore not to create longer notes.

It is to create **more useful notes**.

> **Extract enough evidence to preserve the scientific reasoning of the paper, while keeping the distinction between what was measured, what was found, and what was inferred.**

```

```
