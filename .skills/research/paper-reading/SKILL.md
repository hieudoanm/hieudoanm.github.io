---
name: paper-reading
description: Systematically read and analyze individual research papers by identifying their questions, methods, evidence, results, limitations, and scientific contribution.
---

# Paper Reading

## Purpose

The `paper-reading` skill helps an agent deeply understand and critically
read an individual research paper.

It answers:

> What question did the researchers ask, how did they investigate it,
> what did they find, how strong is the evidence, and what does the paper
> contribute?

The skill is suitable for papers in:

- Neuroscience.
- Psychology.
- Cognitive science.
- Computational neuroscience.
- Neuroimaging.
- Machine learning.
- Biomedical science.
- Related quantitative research fields.

## Core Principle

> Do not read a paper as a sequence of paragraphs.
> Read it as an argument supported by evidence.

A research paper can be represented as:

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

## Core Workflow

```text
1. Identify the research question
            ↓
2. Understand the context
            ↓
3. Identify the hypothesis
            ↓
4. Understand the study design
            ↓
5. Understand the data
            ↓
6. Understand the analysis
            ↓
7. Examine the results
            ↓
8. Evaluate the interpretation
            ↓
9. Identify limitations
            ↓
10. Extract the contribution
            ↓
11. Identify open questions
```

## Read in Passes

Do not assume that every paper should be read linearly from beginning
to end.

### Pass 1 — Orientation

Inspect:

- Title.
- Abstract.
- Figures.
- Tables.
- Section headings.
- Conclusion.

Goal:

> What is this paper about?

### Pass 2 — Argument

Identify:

- Research problem.
- Research question.
- Hypothesis.
- Methods.
- Main results.
- Authors' interpretation.

Goal:

> What argument is the paper making?

### Pass 3 — Evidence

Examine:

- Participants.
- Experimental design.
- Measurements.
- Data processing.
- Statistical analysis.
- Figures.
- Tables.
- Supplementary material.

Goal:

> What evidence supports the argument?

### Pass 4 — Critical Reading

Ask:

- What assumptions are being made?
- What alternative explanations exist?
- What are the major limitations?
- How generalizable are the findings?
- What remains unanswered?

Goal:

> How much confidence should I place in the conclusions?

## Research Question

Extract the central research question in one sentence.

Weak:

> This paper studies language and the brain.

Better:

> Does neural activity during naturalistic speech encode semantic
> information over time?

If the paper does not state a clear question explicitly, reconstruct it
from the introduction, hypotheses, and experimental design.

## Hypothesis

Distinguish between:

- Explicit hypotheses.
- Implicit hypotheses.
- Exploratory analyses.
- Post-hoc interpretations.

Do not describe an exploratory finding as though it were a pre-specified
hypothesis.

## Methods

Understand the method before interpreting the results.

Extract:

- Population.
- Sample size.
- Experimental design.
- Stimuli.
- Tasks.
- Independent variables.
- Dependent variables.
- Measurements.
- Controls.
- Preprocessing.
- Statistical analysis.

For computational studies also extract:

- Dataset.
- Features.
- Model.
- Training procedure.
- Validation strategy.
- Evaluation metric.
- Baseline.
- Hyperparameters.

## Results

Separate:

```text
What the data showed
        ↓
What the authors think it means
```

Do not automatically treat an interpretation as an empirical result.

For example:

> Neural activity correlated with semantic features.

is different from:

> The brain region represents semantic meaning.

The second statement requires additional assumptions.

## Figures

Figures often contain the most important evidence.

For every major figure ask:

1. What question does the figure address?
2. What are the axes?
3. What are the groups or conditions?
4. What is being compared?
5. What statistical evidence is shown?
6. What conclusion does the figure support?
7. What conclusion does it not establish?

## Statistical Evidence

Extract statistics relevant to the main claims.

Consider:

- Effect size.
- Confidence interval.
- Statistical test.
- p-value.
- Sample size.
- Variability.
- Multiple comparisons.
- Model assumptions.

Do not equate:

```text
p < .05
```

with:

```text
The effect is large.
```

Statistical significance and scientific importance are different concepts.

## Limitations

Look for limitations at three levels.

### Author-identified limitations

Limitations explicitly acknowledged by the researchers.

### Methodological limitations

Potential problems involving:

- Sample.
- Experimental design.
- Measurement.
- Controls.
- Data processing.
- Statistical analysis.

### Interpretive limitations

Cases where the conclusion may be stronger than the evidence supports.

## Contribution

Identify what the paper actually contributes.

Possible contributions include:

- New empirical finding.
- New dataset.
- New method.
- New computational model.
- Replication.
- Theoretical refinement.
- New application.
- Negative result.
- New measurement technique.

A useful contribution does not necessarily need to introduce a completely
new theory.

## Evidence Strength

Use calibrated language.

### Strong

> The results provide strong evidence for...

### Moderate

> The results provide evidence consistent with...

### Limited

> The findings provide preliminary evidence for...

### Uncertain

> The evidence is insufficient to determine whether...

Avoid making stronger claims than the study design supports.

## Open Questions

End by identifying questions raised by the paper.

Examples:

- Does the finding replicate?
- Does it generalize to another population?
- Does it hold with another measurement method?
- Is the relationship causal?
- Does the effect occur under more naturalistic conditions?
- Can the computational model explain the mechanism?
- What alternative explanation remains possible?

## Output

A useful paper-reading analysis should produce:

```text
Paper
    ↓
Research question
    ↓
Hypothesis
    ↓
Methods
    ↓
Data
    ↓
Analysis
    ↓
Main findings
    ↓
Evidence strength
    ↓
Limitations
    ↓
Contribution
    ↓
Open questions
```

## Relationship to Other Research Skills

`paper-reading` focuses on understanding one paper.

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
```

The skills have different responsibilities:

| Skill              | Main question                       |
| ------------------ | ----------------------------------- |
| Literature search  | What research exists?               |
| Paper reading      | What does this paper say?           |
| Critical appraisal | How strong is this evidence?        |
| Literature review  | What does the body of evidence say? |
| Research gap       | What remains unknown?               |

## Do Not

Do not:

- Treat the abstract as sufficient.
- Summarize every paragraph equally.
- Ignore the methods.
- Ignore null or negative findings.
- Confuse correlation with causation.
- Treat authors' interpretations as raw results.
- Equate statistical significance with importance.
- Assume a sophisticated model is automatically better.
- Treat prediction as explanation.
- Ignore alternative explanations.
- Copy conclusions without evaluating their supporting evidence.

## Final Question

After reading the paper, you should be able to answer:

> What question did the researchers ask, how did they test it, what did
> they actually find, how convincing is the evidence, what does the paper
> contribute, and what remains unknown?
