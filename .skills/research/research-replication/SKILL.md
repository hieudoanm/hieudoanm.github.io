---
name: "research-replication"
description: "Design, evaluate, and interpret independent replications of scientific findings by defining the target claim, preserving the essential research question, identifying meaningful sources of variation, preregistering hypotheses and analysis decisions, collecting new evidence, and determining whether the original finding generalises."
tags:
  - "research"
  - "replication"
when_to_use: "Use when conducting or communicating work related to research replication, especially when a structured research workflow is needed."
prerequisites:
  - "A defined research topic or question."
  - "Access to relevant sources or project materials."
related_skills:
  - "../research-reproduction/SKILL.md"
  - "../meta-analysis/SKILL.md"
  - "../paper-reading/SKILL.md"
avoid_when:
  - "When the task is not focused on this research activity; use the skill for the actual research stage instead."
status: "active"
---

# Research Replication

## Purpose

Use this skill when the goal is to determine whether an existing scientific finding holds when tested again using **new evidence**.

Replication is about testing the durability, robustness, and generalisability of an existing finding.

The central question is:

> **Does the finding hold again when we collect new evidence?**

This skill applies to:

- Neuroscience
- Psychology
- Clinical neuroscience
- Machine learning
- Cognitive science
- Behavioural science
- Computational science
- Biomedical research
- Experimental science

---

## Core Principle
> **A replication is not simply repeating a paper. It is a new test of an existing scientific claim.**

A replication should preserve the essential scientific question while using new evidence.

Conceptually:

```text
Original study
      ↓
Scientific claim
      ↓
Identify essential components
      ↓
Design new test
      ↓
Collect new evidence
      ↓
Analyse independently
      ↓
Compare with original finding
      ↓
Assess replication
      ↓
Interpret agreement/disagreement
```

---

## Replication versus reproduction

**Reproduction** reuses the original evidence to determine whether the reported result can be obtained again. **Replication** tests the claim using new evidence.

```text
Same evidence → reproduction
New evidence  → replication
```

Do not call a rerun on the original dataset a replication. See the
[replication types reference](references/replication-types.md) for direct,
close, conceptual, and extended designs.

## Core workflow

1. State the original scientific claim and identify the result that bears on it.
2. Define the target population, outcome, comparison, and effect measure.
3. Decide which design features are essential and which can reasonably vary.
4. Choose the replication type; document deviations and justify sample size.
5. Prespecify the primary outcome, analysis, exclusions, and interpretation criteria.
6. Collect or obtain independent evidence and run the planned analysis.
7. Compare effect estimates and uncertainty, then assess design fidelity and context.
8. Report limitations and update confidence without treating replication as a yes/no verdict.

---

## Replication report structure
A replication report should typically include:

```text
1. Original claim
2. Rationale for replication
3. Replication type
4. Differences from original study
5. Research question
6. Hypothesis
7. Participants/data
8. Materials
9. Procedure
10. Analysis plan
11. Primary result
12. Effect-size comparison
13. Uncertainty
14. Deviations
15. Secondary/exploratory analyses
16. Interpretation
17. Limitations
18. Implications for the original claim
```

---

## Replication evidence table
Maintain an evidence table such as:

| Element          | Original          | Replication       | Same? |
| ---------------- | ----------------- | ----------------- | ----- |
| Population       | Healthy adults    | Healthy adults    | Yes   |
| Sample           | N=80              | N=150             | No    |
| Intervention     | Adaptive training | Adaptive training | Yes   |
| Control          | Active            | Active            | Yes   |
| Primary outcome  | Attention         | Attention         | Yes   |
| Measurement      | Task A            | Task A            | Yes   |
| Laboratory       | Site A            | Site B            | No    |
| Primary analysis | ANCOVA            | ANCOVA            | Yes   |
| Effect measure   | Hedges g          | Hedges g          | Yes   |

This makes deviations explicit.

---

## Quality checklist
Before calling a study a replication, verify:

```text
[ ] The original scientific claim is clearly defined
[ ] The target result is explicitly identified
[ ] New evidence is being collected or used
[ ] Essential components are preserved
[ ] Methodological differences are documented
[ ] The replication type is specified
[ ] Primary outcomes are defined in advance
[ ] Primary analyses are defined in advance
[ ] Sample size is justified
[ ] Preregistration was considered
[ ] Confirmatory and exploratory analyses are separated
[ ] Effect sizes are reported
[ ] Uncertainty is reported
[ ] Results are not judged solely by p-values
[ ] Deviations are transparently reported
[ ] Contextual differences are considered
[ ] Generalisation claims are appropriately limited
```

---

## Further detail

- [Replication Analysis](references/replication-analysis.md)
- [Replication Design](references/replication-design.md)
- [Replication Types](references/replication-types.md)
- [Replication Validation](references/replication-validation.md)
