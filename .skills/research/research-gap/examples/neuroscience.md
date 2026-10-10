# Research Gap Example: Neuroscience

## Purpose

This example demonstrates how to move from an initial neuroscience topic to a validated research gap and research question.

The example is intentionally simplified. It demonstrates the reasoning process rather than representing a complete systematic review.

---

## Look for unresolved questions
Assume a first literature scan confirms that semantic decoding has been demonstrated during naturalistic language processing. The topic is still too broad, so the next step is to identify what remains uncertain:

> What remains uncertain even though semantic decoding has been demonstrated?

Potential questions include:

- Does semantic decoding generalise across participants?
- Does it generalise across narratives?
- Does it generalise across languages?
- Which brain regions contribute?
- How stable are representations over time?
- Do different neuroimaging modalities capture the same representation?
- Does successful decoding reflect semantic information or correlated contextual features?

These become candidate gaps.

---

## Candidate gap: mechanistic interpretation
Another candidate:

> Successful semantic decoding does not necessarily establish how semantic representations are generated.

This raises a different question:

```text
Prediction
    ≠
Mechanistic explanation
```

A model can successfully predict semantic information without identifying the neural mechanism responsible for it.

This could therefore represent a mechanistic gap.

---

## Compare candidate gaps
| Candidate                        | Evidence | Importance | Novelty | Feasibility |
| -------------------------------- | -------- | ---------- | ------- | ----------- |
| Semantic decoding                | Low      | High       | Low     | High        |
| Cross-participant generalisation | High     | High       | High    | Medium      |
| Cross-narrative generalisation   | Medium   | High       | High    | Medium      |
| Mechanistic interpretation       | Medium   | High       | High    | Low/Medium  |

The first candidate is rejected because the literature already addresses it.

The remaining candidates require further investigation.

---

## Formulate the research gap
A defensible gap statement might be:

> Existing neuroimaging studies demonstrate that semantic information can be decoded from distributed neural activity during naturalistic language processing. Recent work also provides evidence for cross-participant generalisation. However, it remains unclear how robustly these semantic representations generalise across different narrative contexts and independent datasets. This uncertainty limits conclusions about whether decoded representations reflect stable semantic structure or context-specific neural patterns.

The structure is:

```text
Established finding
        +
Recent progress
        +
Remaining uncertainty
        +
Scientific consequence
```

---

## Convert the gap into a research question
A suitable question could be:

> To what extent do neural representations of speech meaning generalise across independently sampled participants and narrative contexts?

This directly targets the unresolved problem.

---

## Possible study design
A conceptual design might be:

```text
Naturalistic speech stimuli
          ↓
Neuroimaging recordings
          ↓
Preprocessing
          ↓
Feature extraction
          ↓
Semantic representation model
          ↓
Train on:
Participant A / Narrative 1
          ↓
Test on:
Participant B / Narrative 2
          ↓
Measure generalisation
```

The exact design would depend on the available dataset and scientific question.

---

## Important methodological distinction
Suppose the model achieves:

```text
High within-participant accuracy
```

but:

```text
Low cross-participant accuracy
```

This does not necessarily mean semantic representations do not exist.

Possible explanations include:

- Individual anatomical differences
- Different signal-to-noise ratios
- Alignment problems
- Different preprocessing
- Model mismatch
- Context dependence
- Different neural coding strategies

Therefore:

```text
Poor generalisation
        ≠
No semantic representation
```

This distinction is important when interpreting results.

---

## Alternative gap: methodological neuroscience
Suppose several studies use conventional MEG or fMRI, while newer OPM-MEG systems offer different measurement capabilities.

A weak gap would be:

> OPM-MEG has not been used enough.

A stronger gap would be:

> It remains unclear whether the improved sensor flexibility and spatial sampling of OPM-MEG provide measurable advantages for decoding specific language-related neural representations under realistic experimental constraints.

Potential question:

> Does OPM-MEG improve the spatially resolved decoding of language-related neural representations compared with conventional MEG under matched experimental conditions?

The method is justified by a scientific question rather than novelty alone.

---
