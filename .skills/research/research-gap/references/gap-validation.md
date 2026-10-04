# Gap Validation

## Purpose

Gap validation determines whether a proposed research gap is genuinely present, still unresolved, scientifically important, and feasible to investigate.

Finding a plausible gap is easy.

**Demonstrating that the gap survives scrutiny is the difficult part.**

The core principle is:

> Treat every proposed gap as a hypothesis that must be tested against the literature.

---

# 1. Candidate gap as a hypothesis

Do not begin with:

> "I have found a research gap."

Begin with:

> "The literature may contain an unresolved problem involving X."

Represent the candidate as:

```text
Candidate gap
     ↓
Evidence supporting it
     ↓
Evidence that could contradict it
     ↓
Recent literature
     ↓
Importance
     ↓
Feasibility
     ↓
Validated / weakened / rejected
```

This prevents confirmation bias.

---

# 2. What must be validated?

A defensible gap should pass several tests.

```text
Existence
   +
Persistence
   +
Importance
   +
Specificity
   +
Feasibility
   +
Novelty
   ↓
Defensible research gap
```

These dimensions answer different questions.

| Dimension   | Question                                                 |
| ----------- | -------------------------------------------------------- |
| Existence   | Does the gap actually occur in the literature?           |
| Persistence | Has recent research already addressed it?                |
| Importance  | Does resolving it matter?                                |
| Specificity | Can the gap be stated precisely?                         |
| Feasibility | Can it realistically be investigated?                    |
| Novelty     | Would the proposed work add something not already known? |

---

# 3. Existence validation

First determine whether the problem actually exists.

Suppose the candidate gap is:

> "Few studies have examined whether semantic representations generalise across participants."

Search for:

- Generalisation
- Cross-participant decoding
- Cross-subject decoding
- Independent participant validation
- Out-of-sample prediction
- External validation
- Cross-dataset validation

The original wording may not appear in the literature.

Search the underlying concept, not just the exact phrase.

---

# 4. Search using multiple formulations

A single query is insufficient for validating an important gap.

Create several search dimensions.

For example:

```text
Core concept
"semantic decoding"

Replication
"semantic decoding" replication

Generalisation
"semantic decoding" generalization
"semantic decoding" cross-subject

Validation
"semantic decoding" validation
"semantic decoding" independent dataset

Method
"semantic decoding" MEG
"semantic decoding" fMRI

Population
"semantic decoding" participants
"semantic decoding" individual differences
```

Use synonyms and alternative terminology.

---

# 5. Search for evidence against the gap

This is one of the most important validation steps.

Suppose the proposed gap is:

> "No independent validation exists."

Do not search only for:

```text
independent validation semantic decoding
```

Also search:

```text
semantic decoding external validation
semantic decoding cross-dataset
semantic decoding replication
semantic decoding generalisation
semantic decoding independent participants
```

The goal is to discover studies that might invalidate the gap.

---

# 6. Persistence validation

A gap may have been real historically but no longer exist.

For every candidate gap ask:

> Has this problem been addressed since the earlier literature was published?

Use:

- Recent papers
- Recent reviews
- Citation chains
- Preprints when relevant
- Conference proceedings when relevant
- New datasets
- Updated methodological work

Think of a gap as time-dependent.

```text
2021
Gap exists
   ↓
2022
Gap remains
   ↓
2023
New evidence
   ↓
2024
Partial solution
   ↓
2025
Gap narrowed
   ↓
2026
New unresolved question
```

The original gap may need to be reformulated.

---

# 7. Partial closure

Research gaps are rarely simply:

```text
OPEN → CLOSED
```

More often:

```text
Large gap
    ↓
Partial evidence
    ↓
Narrower gap
    ↓
New uncertainty
```

For example:

### Original gap

> Neural representations of speech meaning have not been decoded.

### New evidence

Several studies demonstrate successful semantic decoding.

### Revised gap

> The representations can be decoded, but their stability across participants and contexts remains uncertain.

Do not continue claiming the original gap once evidence has closed it.

---

# 8. Evidence hierarchy

Not all evidence should be treated equally.

For a specific empirical claim, consider:

```text
Independent primary studies
        ↓
Multiple related primary studies
        ↓
Systematic review / meta-analysis
        ↓
Narrative review
        ↓
Single paper
        ↓
Author opinion / future-work statement
```

This is not a universal hierarchy of scientific quality.

It is a practical hierarchy for evaluating claims about the state of evidence.

For example:

> "Only one study has investigated X."

requires stronger searching than:

> "One paper suggests X may be important."

---

# 9. Independent evidence

Count independent evidence carefully.

Ten papers do not necessarily mean ten independent studies.

Check whether papers share:

- Participants
- Dataset
- Experimental session
- Research group
- Cohort
- Public benchmark
- Preprocessing pipeline

For example:

```text
Paper A ─┐
Paper B ─┼→ Same dataset
Paper C ─┘
```

This should not automatically be interpreted as three independent confirmations.

---

# 10. Contradiction validation

When the candidate gap involves disagreement, verify that the disagreement is real.

Create a comparison table:

| Study | Population | Task   | Measure   | Analysis | Result   |
| ----- | ---------- | ------ | --------- | -------- | -------- |
| A     | Adults     | Task 1 | Measure A | Model A  | Positive |
| B     | Adults     | Task 2 | Measure A | Model B  | Null     |
| C     | Children   | Task 1 | Measure B | Model A  | Positive |

Then ask:

> Are these studies actually testing the same proposition?

Apparent contradictions may disappear once methodological differences are considered.

A genuine contradiction should survive reasonable comparison.

---

# 11. Methodological validation

A methodological gap requires more than:

> "Method X has not been used."

Ask:

1. What limitation exists in current methods?
2. Does the limitation affect an important conclusion?
3. Could the proposed method address the limitation?
4. Has another method already solved the problem?
5. Is the new method actually appropriate?

Example:

Weak:

> No one has used transformers for this task.

Stronger:

> Existing models have limited capacity to represent long-range contextual dependencies relevant to the target phenomenon, and this limitation has not been evaluated against models designed to capture such dependencies.

The second statement identifies a scientific problem.

---

# 12. Population validation

For a population gap, ask:

### Coverage

Who has already been studied?

### Importance

Why does the missing population matter?

### Generalisability

Can existing findings reasonably be transferred to that population?

### Feasibility

Can the population realistically be recruited or accessed?

For example:

> Few studies have examined children.

is weak.

A stronger argument is:

> Existing evidence is predominantly derived from adults, while developmental changes in the relevant cognitive or neural system may alter the mechanism being studied. Therefore, adult findings cannot be assumed to generalise to children without direct developmental evidence.

---

# 13. Data-gap validation

Ask whether the missing data actually prevent scientific progress.

Potential data gaps include:

- Missing longitudinal observations
- Missing multimodal measurements
- Missing clinical outcomes
- Insufficient sample size
- Lack of independent validation datasets
- Poorly annotated data
- Missing demographic information
- Missing behavioural measures

The critical question is:

> What scientific conclusion cannot currently be made because these data are missing?

If the answer is unclear, the data gap may not be important.

---

# 14. Replication-gap validation

A replication gap exists when an important finding has insufficient independent verification.

Check:

```text
Original finding
      ↓
Independent sample?
      ↓
Independent laboratory?
      ↓
Independent dataset?
      ↓
Comparable analysis?
      ↓
Successful replication?
```

Be precise about terminology.

### Reproduction

Same evidence, same or equivalent analysis.

### Replication

New evidence testing the same claim.

A paper using the original dataset with a new analysis may be useful, but it does not necessarily constitute an independent replication.

---

# 15. Generalisation validation

A finding can be established under one condition but uncertain outside it.

Check generalisation across:

- Participants
- Sites
- Datasets
- Tasks
- Stimuli
- Languages
- Devices
- Laboratories
- Time points
- Clinical settings

For machine learning, distinguish:

```text
Training performance
        ↓
Internal validation
        ↓
Cross-validation
        ↓
External validation
        ↓
Real-world deployment
```

Evidence at one level does not automatically establish performance at the next.

---

# 16. Theoretical validation

For a theoretical gap, identify:

```text
Theory A
Theory B
     ↓
Different predictions
     ↓
Existing evidence
     ↓
Can existing evidence distinguish them?
```

If the answer is no, the unresolved theoretical prediction may represent a genuine gap.

If existing evidence already strongly favours one theory, the original gap may no longer be valid.

---

# 17. Importance validation

A gap can be real but unimportant.

Ask:

### Scientific importance

Would resolving the gap improve understanding?

### Theoretical importance

Would it distinguish between meaningful explanations?

### Methodological importance

Would it improve how an important phenomenon is measured or analysed?

### Clinical importance

Could it affect diagnosis, treatment, prognosis, or rehabilitation?

### Practical importance

Could it affect education, technology, policy, or real-world decision-making?

### Foundational importance

Would the answer affect assumptions used by many subsequent studies?

---

# 18. Feasibility validation

A research gap is not useful if it cannot realistically be investigated.

Evaluate:

### Data

- Are suitable datasets available?
- Can new data be collected?

### Participants

- Can the target population be recruited?

### Equipment

- Is required instrumentation available?

### Methods

- Are the necessary methods established?

### Skills

- Can the researcher execute the analysis?

### Time

- Can the study be completed within the project period?

### Computational resources

- Is the analysis computationally practical?

### Ethics

- Can the proposed study receive appropriate ethical approval?

---

# 19. Distinguish gap importance from project feasibility

These are different.

```text
Scientific importance
        ≠
Project feasibility
```

A scientifically important question may require:

- Thousands of participants
- Longitudinal follow-up
- Expensive equipment
- Multi-site collaboration

It can still be a genuine gap.

However, it may not be the right gap for a particular MSc dissertation.

When advising a specific researcher, distinguish:

> **Important gap**

from:

> **Important and feasible project**

---

# 20. Search recent literature aggressively

The newer the field, the more important this step becomes.

A practical validation strategy:

```text
Foundational studies
        ↓
Major reviews
        ↓
Recent reviews
        ↓
Recent primary studies
        ↓
Newest relevant papers
        ↓
Citation chaining
```

For rapidly evolving areas such as:

- AI
- Machine learning
- Neuroimaging
- Brain-computer interfaces
- LLMs

recent evidence may substantially change the state of the field.

---

# 21. Citation chaining

For an important candidate gap:

### Backward chaining

Inspect references cited by key papers.

Purpose:

- Find foundational studies
- Find earlier evidence
- Understand how the problem developed

### Forward chaining

Find papers that cite key studies.

Purpose:

- Find newer evidence
- Detect whether the gap has been addressed
- Identify methodological developments

```text
Foundational paper
       ↓
Backward citations

Foundational paper
       ↓
Forward citations
       ↓
Recent evidence
```

---

# 22. Gap closure matrix

For complex projects, maintain a gap-validation matrix.

| Candidate gap | Original evidence | Recent evidence      | Gap status | Confidence |
| ------------- | ----------------- | -------------------- | ---------- | ---------- |
| A             | Strong            | No direct solution   | Open       | High       |
| B             | Moderate          | Partially addressed  | Narrowed   | Medium     |
| C             | Strong            | Fully addressed      | Closed     | High       |
| D             | Weak              | Conflicting evidence | Unclear    | Low        |

Possible statuses:

- Open
- Narrowed
- Partially addressed
- Closed
- Unclear

This prevents outdated gaps from surviving into the final research proposal.

---

# 23. Use negative evidence

When validating a gap, actively search for studies that contradict the proposed claim.

For example:

Candidate:

> "There is no independent validation."

Search:

```text
independent validation
external validation
replication
cross-dataset
cross-site
multi-centre
out-of-sample
generalisation
```

If evidence is found, do not hide it.

Update the candidate gap.

Scientific gap analysis should be falsifiable.

---

# 24. Assess confidence

Use qualitative confidence.

### High confidence

The gap:

- Is supported by multiple sources
- Survives recent literature checking
- Has a clear scientific rationale
- Is specific
- Has no obvious evidence closing it

### Moderate confidence

The gap:

- Has meaningful support
- But evidence is limited or inconsistent
- Or recent literature is still developing

### Low confidence

The gap:

- Depends on one or two sources
- Has not been comprehensively searched
- Is primarily inferred
- May already have been addressed

Do not present low-confidence gaps as established facts.

---

# 25. Validation report

When validating a candidate gap, produce:

## Candidate gap

State the proposed gap precisely.

## Evidence supporting the gap

List the main findings and sources.

## Evidence challenging the gap

Identify studies that weaken, narrow, or contradict it.

## Recent literature

Describe whether newer work has addressed the problem.

## Current status

Use:

- Open
- Narrowed
- Partially addressed
- Closed
- Unclear

## Importance

Explain why resolving the remaining uncertainty matters.

## Feasibility

Assess whether it can realistically be investigated.

## Confidence

Use:

- High
- Moderate
- Low

## Revised gap

If the original gap is too broad or partially closed, reformulate it.

---

# 26. Example

Suppose the initial candidate is:

> "Semantic information cannot be reliably decoded from MEG."

Search the literature.

You discover multiple studies showing successful semantic decoding.

The original gap is therefore:

```text
CLOSED
```

But the literature also reveals:

```text
Successful decoding
        ↓
Mostly individual datasets
        ↓
Limited cross-participant validation
        ↓
Limited cross-context validation
```

A better candidate becomes:

> Although semantic information can be decoded from MEG data, the extent to which these representations generalise across independently sampled participants and narrative contexts remains uncertain.

The gap has therefore moved from:

```text
Can semantic information be decoded?
```

to:

```text
How stable and generalisable are decoded semantic representations?
```

This is a much stronger research problem.

---

# 27. Validation checklist

Before declaring a gap validated:

- [ ] The candidate gap has been stated precisely.
- [ ] The literature supporting it has been identified.
- [ ] Alternative terminology has been searched.
- [ ] Recent literature has been checked.
- [ ] Reviews have been used to locate relevant primary studies.
- [ ] Forward citation searching has been considered.
- [ ] Backward citation searching has been considered.
- [ ] Evidence against the gap has been actively searched.
- [ ] Shared datasets and participants have been considered.
- [ ] Contradictory findings have been investigated.
- [ ] Methodological explanations have been considered.
- [ ] The gap has not already been closed.
- [ ] Partial closure has been considered.
- [ ] Scientific importance has been established.
- [ ] Feasibility has been assessed.
- [ ] Confidence has been stated.

---

# Final principle

A research gap should survive an attempt to destroy it.

```text
Propose gap
     ↓
Search for evidence
     ↓
Search for contradictory evidence
     ↓
Search recent literature
     ↓
Check independent studies
     ↓
Check whether gap was partially addressed
     ↓
Assess importance
     ↓
Assess feasibility
     ↓
Revise
     ↓
Validate
```

The strongest research gaps are not the ones that are easiest to find.

They are the ones that **remain after serious attempts to show that they no longer exist**.
