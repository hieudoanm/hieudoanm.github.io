---
name: "research-reproduction"
description: "Reproduce published scientific research by reconstructing the original data, methods, computational workflow, analyses, and results, then systematically evaluating whether the reported findings can be obtained again."
tags:
  - "research"
  - "reproduction"
when_to_use: "Use to reconstruct and rerun a published computational or empirical analysis using its original data, code, methods, and documented computational conditions."
prerequisites:
  - "The target paper and sufficient access to its original data, code, protocols, or detailed methods."
  - "A suitable software/runtime environment and a record of versions, dependencies, and deviations."
  - "Permission and safeguards appropriate to the data and any restricted materials."
related_skills:
  - "../paper-reading/SKILL.md"
  - "../research-replication/SKILL.md"
  - "../meta-analysis/SKILL.md"
avoid_when:
  - "When the question is whether the finding holds with new participants or newly collected evidence; use research-replication."
  - "When original inputs or procedures are unavailable; document the gap and classify any modified analysis accurately instead of claiming exact reproduction."
status: "active"
---

# Research Reproduction

## Purpose

Use this skill to reproduce a published research result as faithfully as possible using the original study's data, methods, code, analysis procedures, and computational conditions.

The goal is not to create a new study.

The goal is to answer:

> **Can the reported result be obtained again from the original evidence and analytical procedure?**

Terminology around reproducibility and replication varies between disciplines. In this skill, **reproduction** means re-running or reconstructing the original analysis using the original data and equivalent computational procedures. This corresponds to the computational reproducibility distinction used by the National Academies.

---

## Core Principle
> **Reproduce the analysis before judging the result.**

Do not begin by asking whether the published conclusion is correct.

First reconstruct:

```text
ORIGINAL PAPER
      ↓
Research Question
      ↓
Data
      ↓
Preprocessing
      ↓
Analysis
      ↓
Statistical Model
      ↓
Results
      ↓
Reported Conclusion
```

Then attempt:

```text
ORIGINAL DATA
      ↓
SAME / EQUIVALENT PROCESSING
      ↓
SAME / EQUIVALENT ANALYSIS
      ↓
REPRODUCED RESULTS
      ↓
COMPARE WITH ORIGINAL
```

---

## Reproduction vs Replication
The distinction is fundamental.

```text
REPRODUCTION
Original data
+
Original or equivalent computational procedure
→
Can we obtain the original result again?

REPLICATION
New data
+
Same or closely related scientific question
→
Does the finding hold again?
```

The National Academies distinguishes computational reproducibility from replicability by whether the analysis uses the same input data or newly collected data.

A reproduction therefore does **not** normally involve collecting new participants.

---

## Reproduction Workflow
### Step 1 — Identify the Target Study

Record:

- title
- authors
- publication year
- DOI
- version
- repository
- supplementary materials
- associated datasets
- code repository
- preregistration
- analysis scripts

Create a study record:

```text
Study:
Authors:
Year:
DOI:
Dataset:
Code:
Supplementary material:
Preregistration:
Target result:
```

---

## Run the Original Workflow
First attempt to execute the authors' workflow with minimal modification.

Do not immediately rewrite the analysis in another language.

For example:

```text
Original MATLAB
→ Run MATLAB

Original Python
→ Run Python

Original R
→ Run R
```

Only reconstruct or translate the analysis when the original workflow cannot be executed.

---

## Further detail

- [Reproduction Analysis](references/reproduction-analysis.md)
- [Reproduction Design](references/reproduction-design.md)
- [Reproduction Types](references/reproduction-types.md)
- [Reproduction Validation](references/reproduction-validation.md)
