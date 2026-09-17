# From Research Gap to Research Question

## Purpose

A research gap becomes useful when it can be translated into a precise, answerable research question.

The goal is not to invent an interesting question first and then search for a gap to justify it.

The preferred direction is:

```text
Literature
    ↓
Established evidence
    ↓
Unresolved problem
    ↓
Validated research gap
    ↓
Research question
    ↓
Hypothesis / objective
    ↓
Study design
```

A good research question should directly address an important part of the validated gap.

---

## Match the question to the gap
Use this mapping:

| Gap                | Useful question type                    |
| ------------------ | --------------------------------------- |
| Knowledge gap      | Descriptive / mechanistic               |
| Evidence gap       | Descriptive / comparative               |
| Methodological gap | Methodological                          |
| Population gap     | Comparative / generalisation            |
| Data gap           | Descriptive / predictive                |
| Theoretical gap    | Theoretical / mechanistic               |
| Replication gap    | Replication / generalisation            |
| Integration gap    | Mechanistic / predictive                |
| Application gap    | Predictive / comparative / intervention |

This is a guide, not a rigid rule.

---

## Avoid overly narrow questions
A question can also become too specific.

Example:

> Does a particular preprocessing parameter of 17 ms versus 18 ms improve a specific classifier on one dataset?

This may be technically testable but scientifically unimportant unless the parameter has a meaningful methodological rationale.

Ask:

> What scientific uncertainty does this comparison resolve?

---

## Replication questions
For a replication gap:

```text
Original finding
      ↓
New evidence
      ↓
Same scientific claim?
```

A replication question might be:

> Does the previously reported association between X and Y reproduce in an independent sample?

Avoid changing too many elements of the original study unless the goal is explicitly an extension.

---

## Research questions for reproduction
Reproduction is different.

A reproduction question might be:

> Can the published analysis pipeline reproduce the reported effect using the authors' original dataset?

The objective is not to collect new evidence.

It is to determine whether the published result can be computationally reproduced.

---

## From question to hypothesis
Not every research question requires a directional hypothesis.

#### Exploratory question

> What neural representations are associated with semantic processing?

A hypothesis may be inappropriate if there is insufficient prior evidence.

#### Confirmatory question

> Does semantic decoding generalise across participants?

Possible hypothesis:

> A semantic decoding model trained on one participant will predict semantic representations in unseen participants above chance.

The hypothesis should be derived from prior evidence.

---

## Evaluate question quality
Score each candidate question qualitatively.

| Criterion     | Question                              |
| ------------- | ------------------------------------- |
| Relevance     | Does it address the validated gap?    |
| Specificity   | Is it sufficiently focused?           |
| Answerability | Can evidence answer it?               |
| Importance    | Would the answer matter?              |
| Novelty       | Does it add something new?            |
| Feasibility   | Can the study actually be done?       |
| Clarity       | Can another researcher understand it? |
| Alignment     | Does the method match the question?   |

A good question should perform well across most dimensions.

---

## Final validation checklist
Before accepting a research question:

- [ ] It follows from a validated research gap.
- [ ] It addresses an unresolved problem.
- [ ] It is specific enough to investigate.
- [ ] The population is defined where necessary.
- [ ] The phenomenon or intervention is defined.
- [ ] The comparison is defined where necessary.
- [ ] The outcome is measurable.
- [ ] The question is answerable with available evidence.
- [ ] The question is scientifically important.
- [ ] The proposed method can actually answer the question.
- [ ] Causal language is justified by the design.
- [ ] Prediction is not confused with explanation.
- [ ] The question is not unnecessarily broad.
- [ ] The question is not unnecessarily narrow.
- [ ] There is a clear primary question.
- [ ] Secondary and exploratory questions are separated.
- [ ] A hypothesis is only specified when justified by prior evidence.

---

## Final principle
The best research question is not the most complicated one.

It is the smallest question that can produce meaningful evidence about the most important unresolved part of the research gap.

```text
Research gap
      ↓
Central uncertainty
      ↓
Focused question
      ↓
Appropriate method
      ↓
Informative evidence
```
