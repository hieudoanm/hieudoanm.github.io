# Paper Reading

A practical research skill for systematically reading, understanding, extracting, and critically evaluating an individual research paper.

## Purpose

`paper-reading` helps answer:

> **What does this paper actually claim, what evidence supports the claim, and how convincing is that evidence?**

The skill is designed for reading **one paper at a time**.

It focuses on understanding the paper as a scientific argument rather than simply summarising its sections.

## When to Use

Use this skill when you need to:

- Understand a research paper deeply
- Prepare notes for a paper
- Read a paper for a research project
- Understand a paper's methodology
- Interpret figures and tables
- Extract important evidence
- Evaluate whether conclusions are supported
- Identify limitations
- Compare a paper with other research later
- Prepare for a meeting with a researcher
- Decide whether a paper is relevant to your research question

## When Not to Use

Do not use `paper-reading` as the primary skill when the task is:

### Finding papers

Use `literature-search`.

```text
"What papers exist about imagined speech decoding?"
```

### Synthesising many papers

Use `literature-review`.

```text
"What does the literature say about neural decoding of speech?"
```

### Evaluating methodological quality in depth

Use `critical-appraisal`.

```text
"How strong is the evidence across these clinical trials?"
```

### Identifying research opportunities

Use `research-gap`.

```text
"What important questions remain unanswered?"
```

## Core Principle

> **Do not read a paper as a sequence of paragraphs. Read it as an argument supported by evidence.**

A useful mental model is:

```text
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

Every important conclusion in the paper should ultimately connect back to evidence in this chain.

## Four-Pass Reading

A useful paper-reading workflow has four passes.

### Pass 1 — Orientation

Get the overall structure of the paper.

Read:

1. Title
2. Abstract
3. Section headings
4. Figures
5. Tables
6. Conclusion

Ask:

- What is this paper about?
- What problem is it addressing?
- What did the researchers do?
- What did they find?
- Why does it matter?

Do not try to understand every detail yet.

### Pass 2 — Argument

Reconstruct the scientific argument.

Identify:

- Research problem
- Research question
- Hypothesis
- Study design
- Data
- Analysis
- Main results
- Interpretation
- Conclusion

Ask:

> If I had to explain this paper in five sentences, what would I say?

### Pass 3 — Evidence

Now examine whether the conclusions are actually supported.

Inspect:

- Participants
- Sample size
- Experimental design
- Measurements
- Controls
- Preprocessing
- Statistical analysis
- Model specification
- Figures
- Tables
- Supplementary material

For computational papers, also inspect:

- Dataset
- Features
- Model
- Training procedure
- Validation strategy
- Baselines
- Hyperparameters
- Evaluation metrics
- Generalisation

### Pass 4 — Critical Reading

Question the paper.

Ask:

- Are the assumptions reasonable?
- Could another explanation account for the result?
- Are the measurements valid?
- Are there important confounds?
- Does the analysis support the claim?
- Are the conclusions stronger than the evidence?
- How generalisable are the findings?
- What remains unknown?

The goal is not to attack the paper.

The goal is to understand **how much confidence the evidence deserves**.

## Expected Paper Notes

A useful paper-reading output should normally contain:

```text
Paper
├── Citation
├── Research problem
├── Research question
├── Hypothesis
├── Background
├── Study design
├── Participants / dataset
├── Measurements
├── Analysis
├── Main results
├── Figures / tables
├── Interpretation
├── Limitations
├── Contribution
├── Open questions
└── Personal notes
```

Not every paper requires every field.

The level of detail should match the purpose of reading the paper.

## Results vs Interpretation

One of the most important distinctions is:

```text
RESULT
    ↓
What the data showed

INTERPRETATION
    ↓
What the authors think the result means

CONCLUSION
    ↓
What the authors ultimately claim
```

These are not necessarily equivalent.

For example:

```text
Result:
Activity in region X was higher during condition A.

Interpretation:
Region X may contribute to processing feature Y.

Conclusion:
The study provides evidence that region X supports feature Y.
```

The first statement is directly tied to the analysis.

The latter statements involve interpretation.

Keep these levels separate.

## Reading Figures

Figures often contain the most important evidence in a paper.

For every important figure, ask:

1. What is being plotted?
2. What are the axes?
3. What do the groups or conditions represent?
4. What is the dependent variable?
5. What is the comparison?
6. What statistical test was used?
7. What uncertainty is shown?
8. What conclusion does the figure support?
9. What conclusion does it **not** support?

A useful rule:

> **Do not accept a figure's interpretation before understanding what the figure actually shows.**

## Reading Statistical Results

Do not reduce statistical evidence to:

```text
p < .05 → significant → important
```

Instead consider:

- Effect size
- Confidence interval
- Sample size
- Variability
- Statistical test
- Model assumptions
- Multiple comparisons
- Statistical power
- Robustness
- Practical or scientific significance

A statistically significant result can still have a small or poorly generalisable effect.

A non-significant result does not automatically prove that there is no effect.

## Reading Computational Papers

For machine learning and computational neuroscience papers, reconstruct the pipeline:

```text
Data
  ↓
Preprocessing
  ↓
Features / representation
  ↓
Model
  ↓
Training
  ↓
Validation
  ↓
Prediction
  ↓
Evaluation
  ↓
Interpretation
```

Ask:

- What information enters the model?
- What information is unavailable to the model?
- What is the prediction target?
- What is the baseline?
- How is the data split?
- Could information leak between train and test sets?
- Is the evaluation metric appropriate?
- Does the model generalise?
- Is the model interpretable?
- Does prediction demonstrate explanation?

A strong prediction does not automatically establish a causal or mechanistic explanation.

## Paper Reading vs Literature Review

These skills operate at different scales.

```text
paper-reading
    ↓
Understand ONE paper
    ↓
Extract evidence
    ↓
Evaluate claims
    ↓
Generate paper notes
```

versus:

```text
literature-review
    ↓
Compare MANY papers
    ↓
Synthesize evidence
    ↓
Identify consensus
    ↓
Identify disagreement
    ↓
Identify gaps
```

A good literature review depends on good paper reading.

## Relationship to Other Research Skills

The broader workflow is:

```text
literature-search
       ↓
paper-reading
       ↓
critical-appraisal
       ↓
literature-review
       ↓
research-gap
       ↓
hypothesis-development
```

`paper-reading` sits between finding research and synthesising research.

It converts a paper from:

```text
PDF
```

into:

```text
structured understanding
+
evidence
+
critical interpretation
+
research questions
```

## Quality Criteria

A successful paper-reading process should allow you to answer:

### Research question

> What question was the study trying to answer?

### Motivation

> Why was this question worth asking?

### Method

> How did the researchers attempt to answer it?

### Evidence

> What data actually support the answer?

### Result

> What did the analysis show?

### Interpretation

> What do the authors think the result means?

### Confidence

> How convincing is the evidence?

### Contribution

> What does this paper add to existing knowledge?

### Unknowns

> What important questions remain unanswered?

If you cannot answer these questions, you probably have not finished reading the paper.

## Further Reading

The detailed guidance is separated into focused references:

- `references/reading-strategy.md` — how to approach a paper efficiently
- `references/paper-structure.md` — understanding the anatomy of a research paper
- `references/evidence-extraction.md` — extracting structured evidence and notes
- `references/critical-reading.md` — questioning assumptions, evidence, and conclusions

Domain-specific examples are provided for:

- Neuroscience
- Machine learning
- Psychology
- Clinical neuroscience

```

```
