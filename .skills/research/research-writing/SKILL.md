# Research Writing

## Purpose

Write clear, rigorous, evidence-based scientific research documents.

This skill is intended for research articles, reports, theses, research proposals, and scientific summaries, particularly in psychology, neuroscience, cognitive science, and computational neuroscience.

The primary goal is to communicate scientific reasoning accurately while ensuring that claims do not become stronger than the evidence supporting them.

---

## Core Principle

Scientific writing should establish a clear chain:

Research question → Evidence → Analysis → Result → Interpretation → Conclusion

Every major claim should be traceable to appropriate evidence.

Do not allow:

- speculation to become fact
- correlation to become causation
- statistical significance to become practical significance
- interpretation to become observation
- an association to become a mechanism
- a prediction to become an explanation

---

## 1. Understand the Research Before Writing

Before drafting prose, identify the core components of the research:

- Research question
- Research objective
- Hypotheses
- Existing knowledge
- Research gap
- Study design
- Variables
- Participants or dataset
- Analysis methods
- Main results
- Limitations
- Conclusions

Create a compact research model:

```text
Question:
What are we trying to find out?

Gap:
What is currently unknown?

Hypothesis:
What do we predict?

Method:
How will we test it?

Result:
What did we observe?

Interpretation:
What does the result mean?

Conclusion:
What can we reasonably claim?
```

Do not begin detailed prose until these elements are sufficiently understood.

---

## 2. Use the IMRaD Structure

Most empirical research articles follow a structure similar to:

1. Title
2. Abstract
3. Introduction
4. Methods
5. Results
6. Discussion
7. Conclusion
8. References

The central structure is **IMRaD**:

- **Introduction** — Why?
- **Methods** — How?
- **Results** — What?
- **Discussion** — So what?

The exact structure varies between journals and research fields.

### Introduction

The Introduction should establish:

1. The broad research area
2. What is already known
3. What remains unknown
4. Why the knowledge gap matters
5. The research question
6. The hypothesis or objectives
7. Sometimes an overview of the study

A useful progression is:

```text
Broad context
    ↓
Relevant literature
    ↓
Specific problem
    ↓
Knowledge gap
    ↓
Research question
    ↓
Hypothesis / objectives
```

Avoid introducing background information that does not contribute to the research question.

### Methods

The Methods should provide enough information for another researcher to understand and, where appropriate, reproduce the study.

Typical subsections include:

- Participants
- Materials
- Experimental design
- Procedure
- Data acquisition
- Preprocessing
- Statistical analysis
- Computational analysis

For computational or neuroimaging research, explicitly describe relevant details such as:

- Dataset
- Inclusion and exclusion criteria
- Data preprocessing
- Feature construction
- Models
- Model parameters
- Hyperparameters where relevant
- Statistical tests
- Multiple-comparison correction where relevant
- Software and versions where relevant

Do not hide important methodological decisions.

### Results

The Results section reports what was found.

A useful structure is:

```text
Analysis
    ↓
Statistical result
    ↓
Effect / estimate
    ↓
Uncertainty
    ↓
Figure / table reference
```

Prefer quantitative reporting where appropriate.

Weak:

> Participants performed much better in condition A.

Better:

> Accuracy was higher in condition A than condition B, with a mean difference of X percentage points (95% CI [...], p = ...).

A statistical value should be presented in sufficient context to understand what comparison or analysis produced it.

Do not claim that a non-significant result proves the absence of an effect.

### Discussion

The Discussion interprets the findings.

A useful structure is:

1. Summarise the main findings
2. Relate the findings to the research question
3. Compare the findings with previous research
4. Explain possible mechanisms
5. Discuss theoretical implications
6. Discuss methodological limitations
7. Suggest future research
8. State the overall conclusion

Keep observations separate from interpretations.

For example:

```text
Observation:
The model decoded condition X above chance.

Interpretation:
This suggests that the neural signal contains information
related to X.

Stronger claim:
The brain represents X.
```

The stronger claim requires substantially more evidence than the initial observation.

### Conclusion

When a separate conclusion is included, it should provide a concise statement of the main contribution and answer the research question.

The conclusion should not introduce major claims that were not established in the preceding sections.

### References

References document the sources used to support the research.

Use references to:

- Establish existing knowledge
- Support theoretical claims
- Justify methodological choices
- Identify previous findings
- Provide context for interpretation

References should not be added merely because a source is related to the topic.

---

## 3. Build Arguments From Evidence

A scientific argument should generally follow:

```text
Claim
    ↓
Evidence
    ↓
Reasoning
    ↓
Conclusion
```

Distinguish between different types of statements.

### Evidence from previous literature

Support the statement with appropriate citations.

### Evidence from the current study

Support the statement using the study's own results.

### Interpretation

Clearly distinguish interpretation from direct observation.

### Speculation

Use appropriately cautious language when proposing explanations that have not been directly established.

Useful expressions include:

- may
- might
- could
- suggests
- is consistent with
- raises the possibility
- may indicate

Cautious language should reflect genuine uncertainty rather than being added mechanically.

---

## 4. Match Claim Strength to Evidence

Scientific claims have different levels of strength.

A useful conceptual hierarchy is:

```text
Observed
    ↓
Associated with
    ↓
Consistent with
    ↓
Suggests
    ↓
Supports
    ↓
Demonstrates
    ↓
Causes
```

Moving upward requires stronger evidence.

For example:

- A correlation does not establish causation.
- Above-chance decoding does not automatically demonstrate a cognitive mechanism.
- A significant difference does not automatically imply practical importance.
- An observed brain activation does not automatically establish that a cognitive process is located exclusively in that region.
- Failure to detect an effect does not automatically prove that the effect does not exist.

Always choose language appropriate to the study design and evidence.

---

## 5. Write Paragraphs Around One Main Idea

A strong scientific paragraph generally contains:

```text
Topic sentence
    ↓
Evidence
    ↓
Explanation
    ↓
Connection to the argument
```

Each paragraph should have one primary purpose.

Ask:

> Why does this paragraph exist?

If removing the paragraph does not weaken the argument, reconsider whether it is necessary.

Use transitions to make relationships between ideas explicit.

Examples:

- However
- Therefore
- In contrast
- Similarly
- Consequently
- Taken together
- In addition
- More importantly

Do not use transitions merely for decoration. The transition should reflect the logical relationship between statements.

---

## 6. Use Citations Correctly

Citations should support specific claims.

Prefer **primary sources** when discussing:

- Original discoveries
- Experimental findings
- Specific methods
- Datasets
- Computational models
- Original theoretical proposals

Use **review articles** when discussing:

- Broad background
- Field-level consensus
- Historical development
- Major theoretical frameworks

Use the source that best supports the exact claim being made.

Do not cite a paper merely because it is related to the topic.

Before using a citation, verify:

1. The source actually makes or supports the relevant claim.
2. The interpretation is faithful to the source.
3. The source is appropriate for the type of claim.
4. The source is sufficiently authoritative and relevant.

Avoid citation laundering: do not cite a secondary source as though it were the original evidence.

---

## 7. Separate Reporting From Interpretation

The distinction between Results and Discussion is important.

### Results

Describe what was observed.

> Accuracy was significantly higher in condition A than condition B.

### Discussion

Interpret what the result might mean.

> This finding suggests that the manipulation increased the amount of task-relevant information available to participants.

Do not turn an interpretation into an observed fact.

This distinction is especially important in neuroscience, where experimental results can support multiple interpretations.

---

## 8. Write Clearly and Precisely

Prefer:

- Shorter sentences
- Precise terminology
- Explicit logical relationships
- Concrete descriptions
- Active voice where appropriate
- Consistent terminology

Avoid:

- Unnecessary jargon
- Empty introductory phrases
- Excessive nominalisation
- Repetition
- Vague statements
- Excessive hedging
- Overclaiming

Weak:

> It is important to note that it can potentially be seen that the results may possibly indicate...

Better:

> These results suggest...

Scientific writing should be precise without becoming unnecessarily complicated.

---

## 9. Use Scientific Terminology Precisely

Do not treat related concepts as interchangeable.

Examples:

- correlation ≠ causation
- prediction ≠ explanation
- decoding ≠ understanding
- association ≠ mechanism
- statistical significance ≠ practical significance
- absence of evidence ≠ evidence of absence
- reliability ≠ validity
- precision ≠ accuracy
- model fit ≠ predictive performance

When a term has a technical definition, use it consistently and preserve its meaning.

---

## 10. Figures and Tables

Figures and tables should communicate evidence clearly.

Every figure should:

- Have a descriptive caption
- Be referenced in the text
- Use appropriate visual encoding
- Show uncertainty where appropriate
- Be interpretable without excessive searching
- Avoid misleading presentation

The text should explain the important finding rather than merely pointing to the figure.

Weak:

> Figure 2 shows the results.

Better:

> Accuracy increased with stimulus duration, with the largest difference occurring between 100 and 300 ms (Figure 2).

Do not duplicate every numerical value from a table in the main text. Highlight the patterns that matter to the argument.

---

## 11. Write the Abstract

A typical empirical research abstract contains:

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

The abstract should be understandable independently of the main paper.

Ensure that:

- The research question is clear.
- The methods are described briefly.
- The main results are reported.
- The conclusion follows from the results.
- No unsupported claims are introduced.

Do not introduce a claim in the abstract that is not supported by the main manuscript.

---

## 12. Write the Title

A good research title should be:

- Specific
- Informative
- Concise
- Searchable
- Faithful to the actual study

Avoid unnecessary phrases such as:

> A Study of...

Prefer:

> Decoding Semantic Information from Human MEG Signals

The title should not imply a stronger conclusion than the study supports.

---

## 13. Revision Workflow

Do not attempt to perfect every sentence during the first draft.

Use multiple revision passes.

### Pass 1 — Scientific structure

Check:

- Is the research question clear?
- Is the research gap clear?
- Is the argument logical?
- Do the methods address the research question?
- Do the results address the research question?
- Does the conclusion follow from the results?

### Pass 2 — Evidence

Check:

- Does every major claim have appropriate support?
- Are citations appropriate?
- Do citations actually support the claims?
- Are claims stronger than the available evidence?
- Are causal claims justified?

### Pass 3 — Clarity

Check:

- Can each paragraph be understood?
- Does each paragraph have one main idea?
- Are technical terms defined where necessary?
- Are sentences unnecessarily complicated?
- Are logical relationships explicit?

### Pass 4 — Precision

Check:

- Statistical terminology
- Methodological terminology
- Quantitative reporting
- Causal language
- Interpretation of uncertainty
- Limitations

### Pass 5 — Language and consistency

Check:

- Grammar
- Spelling
- Formatting
- Terminology
- Abbreviations
- Figure and table references
- Reference formatting
- Consistency between sections

---

## 14. Research-Writing Workflow

When asked to write a research article or research report, follow this workflow:

```text
1. Understand the research
        ↓
2. Identify the research question
        ↓
3. Identify the research gap
        ↓
4. Identify the evidence
        ↓
5. Identify the analysis
        ↓
6. Build the argument
        ↓
7. Create the section outline
        ↓
8. Draft each section
        ↓
9. Add and verify citations
        ↓
10. Check claim strength
        ↓
11. Check scientific accuracy
        ↓
12. Edit for clarity
        ↓
13. Perform final consistency check
```

Do not optimize prose before establishing scientific correctness.

---

## 15. Quality Checklist

Before finalising a manuscript, verify the following.

### Scientific reasoning

- [ ] The research question is explicit.
- [ ] The research gap is clear.
- [ ] The hypotheses are testable where applicable.
- [ ] The methods address the research question.
- [ ] The results address the research question.
- [ ] The conclusions follow from the results.
- [ ] Important limitations are acknowledged.
- [ ] Alternative interpretations are considered where relevant.

### Evidence

- [ ] Major claims are supported.
- [ ] Citations actually support the claims they accompany.
- [ ] Primary sources are used where appropriate.
- [ ] Results are reported quantitatively where appropriate.
- [ ] Causal claims are justified by the study design.
- [ ] Statistical significance is not treated as practical significance.
- [ ] Uncertainty is reported where appropriate.

### Structure

- [ ] The Introduction follows a logical progression.
- [ ] The research gap leads naturally to the research question.
- [ ] The Methods are sufficiently detailed.
- [ ] The Results are distinct from interpretation.
- [ ] The Discussion interprets rather than merely repeats the Results.
- [ ] Figures and tables are referenced appropriately.
- [ ] The Conclusion answers the research question.

### Writing

- [ ] Each paragraph has one main idea.
- [ ] Terminology is consistent.
- [ ] Sentences are clear and precise.
- [ ] Technical language is necessary and appropriate.
- [ ] Unnecessary repetition has been removed.
- [ ] Claim strength matches evidence.
- [ ] Logical relationships between ideas are explicit.
- [ ] Grammar and spelling are correct.
