# Research Gap Example: Neuroscience

## Purpose

This example demonstrates how to move from an initial neuroscience topic to a validated research gap and research question.

The example is intentionally simplified. It demonstrates the reasoning process rather than representing a complete systematic review.

---

# 1. Initial topic

Suppose the research topic is:

> Neural representations of speech and language.

This is too broad to immediately define a research gap.

It includes:

- Speech perception
- Speech production
- Language comprehension
- Semantics
- Syntax
- Phonology
- Reading
- Writing
- Memory
- Development
- Clinical language disorders
- Multiple neuroimaging methods

The first task is therefore to define a narrower scope.

---

# 2. Define the scope

Suppose we focus on:

```text
Population:
Healthy adults

Phenomenon:
Speech and semantic processing

Measurement:
Non-invasive neuroimaging

Method:
Neural decoding / encoding

Context:
Naturalistic language

Goal:
Understand whether semantic representations
generalise across individuals
```

The research area is now sufficiently specific to investigate.

---

# 3. Initial literature map

Imagine the literature contains studies showing:

```text
Study A
Naturalistic speech
MEG
Semantic information decoded
        ↓
Positive result

Study B
Naturalistic narrative
fMRI
Semantic representations decoded
        ↓
Positive result

Study C
Speech comprehension
EEG
Semantic classification
        ↓
Positive result

Study D
Naturalistic speech
MEG
Cross-participant decoding
        ↓
Limited evidence
```

A first observation might be:

> Semantic information can be decoded from neuroimaging data.

But this is not yet a research gap.

It is an established finding.

---

# 4. Identify what is known

A synthesis might be:

> Multiple studies indicate that distributed neural activity contains information about speech and semantic content during language processing.

Confidence in this conclusion depends on:

- Number of studies
- Independent datasets
- Measurement methods
- Replication
- Statistical robustness
- Similarity of tasks and outcomes

The important point is:

```text
Successful decoding
        ↓
Established finding
```

Do not incorrectly turn this into:

> "Semantic decoding is a research gap."

---

# 5. Look for unresolved questions

Next ask:

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

# 6. Candidate gap A: lack of decoding

Candidate:

> Semantic information has not been reliably decoded from neural activity.

After reviewing the literature, several studies already demonstrate successful decoding.

### Assessment

```text
Status: Closed
```

Reject this gap.

The literature has already addressed the basic question.

---

# 7. Candidate gap B: cross-participant generalisation

Candidate:

> Semantic representations decoded from neuroimaging data may not have been sufficiently validated across independently sampled participants.

This is more promising.

Ask:

- How many studies perform cross-participant validation?
- Do they use independent participants?
- Are the same datasets reused?
- Are models trained and tested across participants?
- Do results generalise consistently?

Suppose the literature shows:

```text
Within-participant decoding
████████████████████

Cross-participant decoding
████
```

This suggests a possible gap.

But it still needs validation.

---

# 8. Candidate gap C: narrative generalisation

Another candidate:

> Semantic representations may depend on the specific narrative context used during training.

Ask:

- Are models trained and tested on the same narrative?
- Are different stories used for testing?
- Is cross-narrative decoding reported?
- Does performance decrease substantially across narratives?

This could reveal a generalisation gap.

---

# 9. Candidate gap D: mechanistic interpretation

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

# 10. Compare candidate gaps

| Candidate                        | Evidence | Importance | Novelty | Feasibility |
| -------------------------------- | -------- | ---------- | ------- | ----------- |
| Semantic decoding                | Low      | High       | Low     | High        |
| Cross-participant generalisation | High     | High       | High    | Medium      |
| Cross-narrative generalisation   | Medium   | High       | High    | Medium      |
| Mechanistic interpretation       | Medium   | High       | High    | Low/Medium  |

The first candidate is rejected because the literature already addresses it.

The remaining candidates require further investigation.

---

# 11. Validate cross-participant gap

Suppose the literature search finds:

- Several studies perform within-participant decoding.
- A smaller number evaluate cross-participant generalisation.
- Some use shared datasets.
- Independent validation is less common.
- Results across independent participants are inconsistent.

The candidate gap becomes stronger.

However, do not conclude:

> "Nobody has tested cross-participant generalisation."

That would require very strong evidence.

Instead:

> Existing studies provide evidence that semantic information can be decoded from neural activity, but independent cross-participant generalisation has been less consistently established.

This is more defensible.

---

# 12. Search for recent evidence

The next step is to search recent literature.

Suppose a recent study reports:

> Strong cross-participant semantic decoding using a large independent dataset.

This changes the gap.

The original candidate:

> Cross-participant generalisation has not been tested.

would be too broad.

Instead ask:

> What remains unresolved after this new evidence?

Perhaps the new study only uses:

- One language
- One narrative genre
- One imaging modality
- One participant population

The gap may therefore become:

> Although cross-participant semantic decoding has recently been demonstrated, its generalisation across different narrative contexts and independent datasets remains uncertain.

This is a narrower and more current gap.

---

# 13. Identify the actual scientific uncertainty

The final problem should not be:

> "We need another semantic decoding study."

Instead:

```text
Semantic decoding demonstrated
            ↓
Cross-participant generalisation demonstrated
            ↓
But:
Generalisation across contexts remains uncertain
            ↓
Important because:
Stable semantic representations should ideally
generalise beyond a single narrative context
```

Now the scientific question is clearer.

---

# 14. Formulate the research gap

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

# 15. Convert the gap into a research question

A suitable question could be:

> To what extent do neural representations of speech meaning generalise across independently sampled participants and narrative contexts?

This directly targets the unresolved problem.

---

# 16. Possible objective

The research objective could be:

> To evaluate the cross-participant and cross-context generalisation of neural representations of speech meaning during naturalistic language processing.

This states what the study will do.

---

# 17. Possible hypothesis

If sufficient prior evidence exists:

> Neural representations of speech meaning will generalise above chance across independently sampled participants and narrative contexts.

If the evidence is insufficient for a directional prediction, an exploratory objective may be more appropriate.

Do not invent a strong hypothesis merely because a research proposal is expected to contain one.

---

# 18. Possible study design

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

# 19. Important methodological distinction

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

# 20. Alternative gap: clinical neuroscience

The same literature-gap process could lead to a different problem.

Suppose evidence suggests:

```text
Language impairment after stroke
        ↓
Variable recovery
        ↓
Many behavioural predictors
        ↓
Many neuroimaging predictors
        ↓
Limited agreement
```

A candidate gap might be:

> It remains unclear which combinations of behavioural and neuroimaging measures provide reliable predictions of individual language recovery after stroke.

This is different from simply saying:

> "More research is needed on aphasia."

The first identifies a specific unresolved scientific problem.

---

# 21. Alternative gap: developmental neuroscience

Suppose most studies investigate adults.

```text
Adults
██████████████████

Children
████

Longitudinal developmental data
██
```

A candidate gap could be:

> Most evidence for neural representations of language comes from adults, leaving uncertainty about how these representations develop and whether adult neural decoding models generalise to children.

Potential research question:

> To what extent do neural representations of language observed in adults generalise to children?

Again, the gap is not merely:

> "Children have not been studied."

The scientific issue is **generalisation and developmental change**.

---

# 22. Alternative gap: methodological neuroscience

Suppose several studies use conventional MEG or fMRI, while newer OPM-MEG systems offer different measurement capabilities.

A weak gap would be:

> OPM-MEG has not been used enough.

A stronger gap would be:

> It remains unclear whether the improved sensor flexibility and spatial sampling of OPM-MEG provide measurable advantages for decoding specific language-related neural representations under realistic experimental constraints.

Potential question:

> Does OPM-MEG improve the spatially resolved decoding of language-related neural representations compared with conventional MEG under matched experimental conditions?

The method is justified by a scientific question rather than novelty alone.

---

# 23. What this example demonstrates

The progression is:

```text
Broad topic
    ↓
Narrow research scope
    ↓
Literature map
    ↓
Established findings
    ↓
Candidate gaps
    ↓
Reject gaps already addressed
    ↓
Validate promising gaps
    ↓
Check recent literature
    ↓
Narrow partially closed gaps
    ↓
Validated research gap
    ↓
Research question
```

---

# 24. Key lessons

### Lesson 1

Do not confuse an established finding with a research gap.

### Lesson 2

A recent paper can partially close an old gap.

### Lesson 3

The best gap may emerge after several iterations of narrowing.

### Lesson 4

Generalisation is often a useful source of gaps in computational neuroscience.

### Lesson 5

Prediction and mechanism are different questions.

### Lesson 6

Method novelty is not automatically scientific novelty.

### Lesson 7

A strong gap explains why the missing evidence matters.

### Lesson 8

The research question should follow naturally from the gap.

---

# Final mental model

For neuroscience research-gap identification:

```text
BRAIN / BEHAVIOUR PHENOMENON
            ↓
       WHAT IS KNOWN?
            ↓
       WHAT IS ROBUST?
            ↓
       WHAT DISAGREES?
            ↓
       WHAT IS MISSING?
            ↓
       WHAT HAS RECENTLY CHANGED?
            ↓
       WHAT STILL DOES NOT GENERALISE?
            ↓
       WHY DOES IT MATTER?
            ↓
       VALIDATED GAP
            ↓
       RESEARCH QUESTION
```

The most useful question is often not:

> "What has never been studied?"

but:

> **"What important conclusion can the current evidence still not justify?"**
