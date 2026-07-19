# Gap Identification

## Purpose

This guide describes how to systematically identify candidate research gaps from an existing body of literature.

The central task is not to find a sentence containing the words "research gap."

It is to detect patterns in the evidence that reveal:

- What is established
- What is uncertain
- What is inconsistent
- What is missing
- What existing methods cannot answer
- What important questions remain unresolved

---

## Mental model

Think of the literature as a map.

```text
                    RESEARCH FIELD

       ┌──────────────┬──────────────┐
       ↓              ↓              ↓
   Established     Conflicting    Missing
   findings        findings       evidence
       │              │              │
       └──────────────┼──────────────┘
                      ↓
               Unresolved problem
                      ↓
                Candidate gap
```

A candidate gap emerges where the map contains an important unresolved region.

---

## Build an evidence matrix
Before searching explicitly for gaps, organise the literature.

A useful matrix is:

| Study   | Population | Data | Method         | Question                | Finding  | Limitation         | Relevance |
| ------- | ---------- | ---- | -------------- | ----------------------- | -------- | ------------------ | --------- |
| Study A | Adults     | fMRI | MVPA           | Semantic decoding       | Positive | Small sample       | High      |
| Study B | Adults     | MEG  | Encoding       | Semantic representation | Positive | Different paradigm | High      |
| Study C | Adults     | EEG  | Classification | Speech decoding         | Mixed    | Limited validation | Medium    |

The purpose is not administrative bookkeeping.

The matrix makes patterns visible.

---

## Look for analysis gaps
Modern research often contains multiple reasonable analytical choices.

Check whether findings depend on:

- Preprocessing choices
- Feature selection
- Statistical thresholds
- Model architecture
- Hyperparameters
- Cross-validation strategy
- Multiple-comparison correction
- ROI definition
- Time-window selection

An analysis gap may exist when:

> An important conclusion has not been tested for robustness to reasonable analytical alternatives.

This can be particularly important in neuroimaging and machine learning.

---

## Compare claims with evidence
For important papers, separate:

```text
AUTHOR CLAIM
     ↓
ACTUAL DATA
     ↓
ANALYSIS
     ↓
SUPPORTED CONCLUSION
```

Sometimes a paper's conclusion is broader than its evidence.

This can reveal a gap.

For example:

> A classifier performs well on one dataset.

The paper may discuss broad applicability.

But the evidence may only support:

> Performance on this dataset under this validation procedure.

The generalisation question may therefore remain unresolved.

---

## Use reviews as maps, not final evidence
Systematic reviews and meta-analyses are excellent for:

- Finding major studies
- Learning terminology
- Identifying disagreements
- Understanding historical development
- Finding methodological trends
- Locating known limitations

But verify important claims against primary research.

Use:

```text
Review
   ↓
Identify relevant studies
   ↓
Read primary studies
   ↓
Check recent studies
   ↓
Validate gap
```

---

## Compare candidate gaps
After generating several candidates, create a comparison table.

| Candidate | Evidence | Importance | Novelty | Persistence | Feasibility |
| --------- | -------- | ---------- | ------- | ----------- | ----------- |
| Gap A     | High     | High       | Medium  | High        | High        |
| Gap B     | Medium   | High       | High    | Medium      | Medium      |
| Gap C     | Low      | Medium     | High    | Low         | High        |

Do not automatically choose the most novel candidate.

Prefer the candidate with the strongest overall scientific justification.

---

## Convert the gap into a question
The research question should directly target the unresolved problem.

Weak:

> Can we use deep learning for language neuroscience?

Better:

> How accurately can neural representations of speech meaning be decoded from MEG data?

Stronger:

> To what extent do neural representations of speech meaning identified during naturalistic MEG recording generalise across independently sampled participants and narrative contexts?

The stronger question follows directly from a specific gap.

---
