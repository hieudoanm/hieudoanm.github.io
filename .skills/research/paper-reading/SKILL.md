---
name: "paper-reading"
description: "Systematically read and analyze individual research papers by identifying their questions, methods, evidence, results, limitations, and scientific contribution."
tags:
  - "research"
  - "paper"
  - "reading"
when_to_use: "Use when conducting or communicating work related to paper reading, especially when a structured research workflow is needed."
prerequisites:
  - "A defined research topic or question."
  - "Access to relevant sources or project materials."
related_skills:
  - "../research-reproduction/SKILL.md"
  - "../paper-pdf-to-markdown/SKILL.md"
  - "../research-gap/SKILL.md"
avoid_when:
  - "When the task is not focused on this research activity; use the skill for the actual research stage instead."
status: "active"
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

## Research Question
Extract the central research question in one sentence.

Weak:

> This paper studies language and the brain.

Better:

> Does neural activity during naturalistic speech encode semantic
> information over time?

If the paper does not state a clear question explicitly, reconstruct it
from the introduction, hypotheses, and experimental design.

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

## Final Question
After reading the paper, you should be able to answer:

> What question did the researchers ask, how did they test it, what did
> they actually find, how convincing is the evidence, what does the paper
> contribute, and what remains unknown?

## Further detail

- [Critical Reading](references/critical-reading.md)
- [Evidence Extraction](references/evidence-extraction.md)
- [Paper Structure](references/paper-structure.md)
- [Reading Strategy](references/reading-strategy.md)
