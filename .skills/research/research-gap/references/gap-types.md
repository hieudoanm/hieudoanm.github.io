# Research Gap Types

## Purpose

This reference defines the major types of research gaps that an agent should consider when analysing a literature set.

A research gap is not simply something that has not been studied.

A useful gap identifies an **important unresolved uncertainty, limitation, disagreement, missing evidence, or untested generalisation** in the existing body of knowledge.

---

## Reporting Gap
### Definition

A reporting gap exists when important methodological or analytical information is not sufficiently reported to evaluate or reproduce the research.

#### Example

A study reports:

> Classification accuracy = 89%

but does not clearly report:

- Test-set construction
- Cross-validation strategy
- Class distribution
- Feature selection
- Confidence intervals
- Hyperparameter tuning
- Data leakage controls

The research may exist, but the evidence cannot be adequately evaluated.

#### Key question

> Has the study reported enough information to judge the strength of its evidence?

---

## Evidence-Hierarchy Gap
### Definition

An evidence-hierarchy gap exists when an important conclusion is supported primarily by weaker forms of evidence while stronger forms of evidence remain limited.

#### Example

```text
Observational studies
████████████████

Randomised studies
████

Long-term independent studies
██
```

This does not mean observational evidence is useless.

It means the strength of the conclusion may be limited by the available evidence.

#### Key question

> What stronger evidence is needed to increase confidence in the conclusion?

---

## Gap type does not determine research method
A gap type describes the **problem**, not automatically the solution.

For example:

```text
Replication gap
```

could be addressed with:

- New experiment
- New dataset
- New laboratory
- Multi-site study

A:

```text
Methodological gap
```

could be addressed with:

- Better experiment
- Better measurement
- Better statistical analysis
- Better computational model

Do not automatically map:

```text
Gap type → One study design
```

---

## Gap versus limitation
A limitation belongs to an existing study.

A research gap belongs to the broader state of knowledge.

#### Study limitation

> Our sample contained only 30 participants.

#### Potential research gap

> The field lacks sufficient evidence about whether the finding generalises across larger and independent samples.

The limitation becomes a research gap only when it creates an important unresolved problem in the literature.

---

## Gap classification checklist
For each candidate gap, record:

```text
Gap:
Primary type:
Secondary type(s):

Established evidence:

Unresolved uncertainty:

Evidence supporting the gap:

Evidence against the gap:

Recent evidence:

Why the gap matters:

Who/what is missing:

Methodological reason:

Potential research question:

Confidence:
```

---

## Final principle
The purpose of classification is not to produce a label.

The purpose is to clarify **what exactly remains unresolved**.

A strong analysis should therefore move from:

```text
Topic
    ↓
Candidate gap
    ↓
Gap type
    ↓
Evidence
    ↓
Validation
    ↓
Importance
    ↓
Research question
```

The central question remains:

> **What important uncertainty exists in the current evidence, what type of gap does it represent, and what evidence would be sufficient to close it?**
