# Research Gap Types

## Purpose

This reference defines the major types of research gaps that an agent should consider when analysing a literature set.

A research gap is not simply something that has not been studied.

A useful gap identifies an **important unresolved uncertainty, limitation, disagreement, missing evidence, or untested generalisation** in the existing body of knowledge.

---

# 1. Knowledge Gap

## Definition

A knowledge gap exists when an important phenomenon, relationship, mechanism, or process is insufficiently understood.

The literature may contain observations, but the underlying question remains unresolved.

### Example

> Neural representations of speech can be decoded from brain activity, but it remains unclear how these representations change during language development.

### Typical questions

- What happens?
- Why does it happen?
- How does it work?
- What factors influence it?
- How does it change over time?

### Common domains

- Neuroscience
- Psychology
- Biology
- Clinical science
- Cognitive science

### Warning

Do not call something a knowledge gap merely because there are few papers.

The missing knowledge must be important and genuinely unresolved.

---

# 2. Evidence Gap

## Definition

An evidence gap exists when an important claim lacks sufficient empirical support.

There may be theoretical arguments or preliminary studies, but the evidence is too limited to establish a reliable conclusion.

### Example

> Several studies suggest that OPM-MEG may improve spatial sampling for language-related neural decoding, but independent evidence remains limited.

### Typical causes

- Small sample sizes
- Few independent studies
- Inconsistent results
- Limited replication
- Weak study designs
- Limited populations
- Lack of longitudinal evidence

### Key question

> What important claim cannot currently be supported with sufficient evidence?

---

# 3. Methodological Gap

## Definition

A methodological gap exists when existing methods are insufficient to answer an important research question reliably.

The scientific question may be important, but current approaches may have limitations.

### Example

> Existing studies of neural speech decoding frequently use within-participant validation, limiting conclusions about cross-participant generalisation.

### Possible causes

- Inadequate experimental design
- Weak controls
- Poor measurement
- Limited validation
- Inappropriate statistical methods
- Data leakage
- Lack of external validation
- Insufficient temporal resolution
- Insufficient spatial resolution

### Key question

> What methodological limitation prevents the field from resolving an important question?

---

# 4. Population Gap

## Definition

A population gap exists when evidence is concentrated in one population but the question remains unresolved in another relevant population.

### Example

> Most neural decoding studies of language have been conducted in healthy adults, leaving uncertainty about whether the same representations generalise to children.

### Possible populations

- Children
- Older adults
- Clinical populations
- Different cultural groups
- Different languages
- Different educational backgrounds
- Underrepresented populations
- Different stages of disease

### Key question

> Does the existing conclusion apply to the population that has not yet been adequately studied?

---

# 5. Data Gap

## Definition

A data gap exists when the evidence required to answer an important question is unavailable, insufficient, inaccessible, poorly structured, or incomplete.

### Example

> Longitudinal datasets combining language behaviour with repeated neuroimaging measurements after stroke remain limited.

### Possible forms

```text
Missing data
Insufficient sample size
Missing longitudinal measurements
Missing multimodal measurements
Limited metadata
Unrepresentative datasets
Unavailable raw data
Missing independent validation data
```

### Key question

> What important question cannot currently be answered because the necessary data are missing?

---

# 6. Replication Gap

## Definition

A replication gap exists when an important finding has limited independent confirmation.

A finding may be promising but supported by:

- One study
- One research group
- One dataset
- One laboratory
- One population
- One experimental paradigm

### Example

> A neural signature of semantic processing has been reported in one dataset, but independent replication across participants and laboratories remains limited.

### Important distinction

```text
Replication gap
    ↓
Does the finding hold with new evidence?

Reproduction gap
    ↓
Can the original result be obtained
using the original evidence and analysis?
```

These are different research problems.

---

# 7. Generalisation Gap

## Definition

A generalisation gap exists when a finding works under one set of conditions but it is unclear whether it holds under different conditions.

This is especially important in:

- Machine learning
- Neuroimaging
- Clinical research
- Psychology
- Experimental neuroscience

### Example

> A speech-decoding model performs well within participants, but its ability to generalise across participants and narrative contexts remains uncertain.

### Generalisation dimensions

```text
Participants
Sites
Scanners
Sessions
Tasks
Stimuli
Narratives
Languages
Populations
Time
Clinical settings
```

### Key question

> Does the conclusion survive when the relevant conditions change?

---

# 8. Contradiction Gap

## Definition

A contradiction gap exists when credible studies produce conflicting findings and the reason for the disagreement is unresolved.

### Example

```text
Study A → Training improves attention

Study B → No improvement

Study C → Improvement only under active control
```

The gap is not simply:

> Results are mixed.

The stronger gap is:

> It remains unclear whether differences in control conditions explain the inconsistent findings.

### Possible causes

- Different populations
- Different methods
- Different measurements
- Different interventions
- Different statistical analyses
- Different contexts
- Different sample sizes
- Publication bias

### Key question

> Why do credible studies disagree?

---

# 9. Theoretical Gap

## Definition

A theoretical gap exists when competing explanations, models, or theoretical frameworks have not been adequately distinguished.

### Example

Suppose two theories explain language processing:

```text
Theory A → Distributed semantic representations

Theory B → Context-dependent representations
```

Existing evidence may not clearly discriminate between them.

The gap becomes:

> Current evidence does not determine which theoretical account better explains the observed neural patterns.

### Key question

> Which competing explanation is better supported?

---

# 10. Mechanistic Gap

## Definition

A mechanistic gap exists when an association or phenomenon is established but the underlying mechanism remains uncertain.

### Example

> Changes in neural activity are associated with language recovery after stroke, but the mechanisms linking neural reorganisation to behavioural improvement remain unclear.

Important distinction:

```text
Observation
    ↓
A happens with B

Mechanism
    ↓
A contributes to B through a specific process
```

### Key question

> What process produces the observed effect?

---

# 11. Causal Gap

## Definition

A causal gap exists when an association has been observed but causal direction has not been established.

### Example

> Neural activity correlates with successful rehabilitation, but it remains unclear whether the neural change contributes causally to recovery.

### Important distinction

```text
Correlation
    ≠
Causation
```

Possible reasons:

- Confounding
- Reverse causation
- Selection effects
- Measurement bias

### Key question

> What evidence is required to determine whether one factor causes another?

---

# 12. Measurement Gap

## Definition

A measurement gap exists when an important construct is measured inadequately, inconsistently, or differently across studies.

### Example

Suppose "language recovery" is measured using:

```text
Naming score
Comprehension score
Composite language score
Spontaneous speech
Reading
```

It may be unclear whether studies are actually measuring the same construct.

### Potential problems

- Poor reliability
- Weak construct validity
- Inconsistent operationalisation
- Different scales
- Different thresholds
- Task-specific measures

### Key question

> Are we measuring the phenomenon we think we are measuring?

---

# 13. Measurement-Resolution Gap

## Definition

A measurement-resolution gap exists when available methods cannot adequately resolve the spatial, temporal, behavioural, or computational detail required by the research question.

### Example

A question about millisecond-scale neural dynamics may be difficult to answer using a method with poor temporal resolution.

### Common dimensions

```text
Spatial resolution
Temporal resolution
Spectral resolution
Behavioural resolution
Individual-level resolution
```

### Example

> It remains unclear how rapidly semantic representations evolve because existing measurements cannot adequately resolve their temporal dynamics.

### Key question

> Can the current measurement technology resolve the phenomenon at the required scale?

---

# 14. Temporal Gap

## Definition

A temporal gap exists when evidence is available at one point in time but not across the period necessary to understand change.

### Example

> Many studies assess language recovery immediately after rehabilitation, but fewer evaluate whether improvements persist over subsequent months.

### Common forms

```text
Cross-sectional evidence
        ↓
Longitudinal gap
```

or:

```text
Immediate effect
        ↓
Long-term effect unknown
```

### Key question

> How does the phenomenon change over time?

---

# 15. Longitudinal Gap

## Definition

A longitudinal gap is a specific form of temporal gap where repeated observations are required to understand development, progression, recovery, or change.

### Example

> It remains unclear how neural and behavioural measures jointly evolve during recovery from aphasia.

### Important for

- Development
- Ageing
- Disease progression
- Rehabilitation
- Learning
- Treatment response

### Key question

> What changes, and in what sequence, over time?

---

# 16. Integration Gap

## Definition

An integration gap exists when relevant evidence exists across separate disciplines, datasets, methods, or levels of analysis but has not been effectively combined.

### Example

Suppose there are separate literatures on:

```text
Behavioural language measures
        +
Neuroimaging
        +
Computational modelling
```

but few studies integrate them.

Potential gap:

> It remains unclear whether combining behavioural and neuroimaging measures improves prediction of individual language recovery beyond either modality alone.

### Key question

> What becomes possible when currently separate evidence streams are integrated?

---

# 17. Multimodal Gap

## Definition

A multimodal gap exists when multiple relevant data modalities are available but their relationships have not been sufficiently investigated.

### Example

```text
MEG
MRI
Behaviour
Speech recordings
Genetics
```

may each provide partial information.

A gap could be:

> It remains unclear whether combining structural and functional neuroimaging improves prediction of language recovery beyond either modality alone.

### Key question

> Does integrating complementary modalities reveal information that individual modalities miss?

---

# 18. Translation Gap

## Definition

A translation gap exists when a finding is established in controlled research but has not been adequately translated into a practical, clinical, educational, or real-world setting.

### Example

> A language-decoding method performs well in controlled laboratory experiments, but its robustness under realistic clinical conditions remains uncertain.

### Common transitions

```text
Laboratory
    ↓
Real-world environment

Research
    ↓
Clinical practice

Model
    ↓
Decision support

Basic science
    ↓
Application
```

### Key question

> Does the finding remain useful outside the environment in which it was discovered?

---

# 19. Application Gap

## Definition

An application gap exists when an established method or finding has not been adequately applied to an important problem.

### Example

> Neural decoding methods have been extensively studied for speech perception, but their application to internally generated or imagined speech remains comparatively underdeveloped.

### Important distinction

An application gap should have a scientific or practical justification.

Do not assume:

> "Nobody has applied method X to problem Y"

automatically means:

> "This is an important research gap."

Ask why the application matters.

---

# 20. Replication-by-Extension Gap

## Definition

A replication-by-extension gap occurs when an existing finding needs to be tested under a meaningful new condition.

Examples include:

```text
Same finding
    +
Different population

Same finding
    +
Different task

Same finding
    +
Different modality

Same finding
    +
Different context
```

This is related to replication and generalisation.

### Example

> A semantic-decoding result has been demonstrated using conventional MEG, but whether it generalises to OPM-MEG remains uncertain.

The scientific contribution is not merely repeating the study.

It tests whether the finding survives a meaningful change in conditions.

---

# 21. Computational Gap

## Definition

A computational gap exists when existing computational methods cannot adequately represent, analyse, simulate, or predict the phenomenon of interest.

### Example

> Existing neural models predict behavioural responses but do not adequately account for trial-by-trial variability in reaction times.

### Possible causes

- Model assumptions
- Inadequate representation
- Poor temporal modelling
- Missing individual differences
- Computational constraints
- Inability to capture nonlinear relationships

### Key question

> What computational capability is missing?

---

# 22. Model-Comparison Gap

## Definition

A model-comparison gap exists when competing computational models make different predictions but have not been adequately discriminated using appropriate evidence.

### Example

Suppose:

```text
DDM
    vs
Race model
    vs
Accumulator model
```

all explain observed reaction times.

The gap is:

> Existing evidence does not adequately distinguish which computational mechanism best explains the observed behavioural patterns.

### Key question

> Which model provides the strongest explanation of the evidence?

---

# 23. Reproducibility Gap

## Definition

A reproducibility gap exists when published findings or analyses cannot be reliably reproduced because the required information, data, software, or workflow is unavailable or insufficiently documented.

### Example

> A published neuroimaging analysis reports a significant result, but the preprocessing pipeline and analysis code are unavailable, preventing independent reproduction.

### Possible causes

- Missing code
- Missing data
- Undocumented preprocessing
- Ambiguous parameters
- Software-version differences
- Missing random seeds
- Proprietary tools

### Key question

> Can another researcher reproduce the reported result from the available information and materials?

---

# 24. Reporting Gap

## Definition

A reporting gap exists when important methodological or analytical information is not sufficiently reported to evaluate or reproduce the research.

### Example

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

### Key question

> Has the study reported enough information to judge the strength of its evidence?

---

# 25. Evidence-Hierarchy Gap

## Definition

An evidence-hierarchy gap exists when an important conclusion is supported primarily by weaker forms of evidence while stronger forms of evidence remain limited.

### Example

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

### Key question

> What stronger evidence is needed to increase confidence in the conclusion?

---

# 26. Generalisability-by-Context Gap

## Definition

A finding may generalise across participants but not across contexts.

Examples:

```text
Same participants
Different task

Same task
Different stimulus

Same stimulus
Different narrative

Same language
Different cultural context
```

### Example

> Semantic decoding generalises across participants within one narrative, but it remains unclear whether the representation is stable across different narrative contexts.

This is more specific than a generic generalisation gap.

---

# 27. Generalisability-by-Time Gap

## Definition

A finding may be reproducible immediately but unstable across time.

### Example

> A neural signature can be decoded reliably within one recording session, but its stability across sessions separated by weeks remains uncertain.

Potential question:

> How stable is the neural representation across repeated recording sessions?

This is especially relevant to:

- Biomarkers
- BCI
- Neural decoding
- Longitudinal neuroscience
- Clinical monitoring

---

# 28. Individual-Differences Gap

## Definition

An individual-differences gap exists when average effects are reasonably established but variation between individuals remains poorly understood.

### Example

> Language rehabilitation improves performance on average, but the characteristics predicting which patients benefit most remain unclear.

### Possible moderators

- Age
- Baseline ability
- Genetics
- Cognitive profile
- Brain structure
- Brain function
- Motivation
- Treatment adherence

### Key question

> Why do people respond differently?

---

# 29. Heterogeneity Gap

## Definition

A heterogeneity gap exists when studies show variable effects but the sources of that variation are not understood.

This is related to, but broader than, individual differences.

### Example

```text
Study 1 → Large effect
Study 2 → Small effect
Study 3 → No effect
Study 4 → Large effect
```

Instead of concluding:

> Evidence is inconsistent.

Ask:

> What explains the variation?

Potential moderators:

```text
Population
Intervention
Dose
Measurement
Context
Method
Age
Disease stage
```

---

# 30. Fairness and Equity Gap

## Definition

A fairness or equity gap exists when the performance, benefits, harms, or accessibility of a method differ across relevant populations and these differences are insufficiently understood.

### Example

> A clinical prediction model performs well overall, but its calibration across demographic subgroups has not been adequately evaluated.

### Key question

> Does the finding or system work equitably across the populations affected by it?

This can be especially important in:

- Clinical AI
- Education
- Public health
- Neurotechnology

---

# 31. Gap types can overlap

A single research problem may belong to multiple categories.

For example:

> A speech-decoding model performs well within participants but has not been tested across different participants, recording sessions, or narrative contexts.

This could be:

```text
Generalisation gap
        +
Replication gap
        +
Temporal gap
        +
Methodological gap
```

Do not force every problem into exactly one category.

Instead, identify:

```text
Primary gap
+
Secondary contributing gaps
```

---

# 32. Primary versus secondary gap

Suppose:

> External validation of an MRI prediction model is poor.

The primary gap might be:

```text
Generalisation gap
```

Secondary issues may include:

```text
Data gap
Measurement gap
Methodological gap
Population gap
```

The primary gap should explain the main unresolved scientific problem.

Secondary gaps explain why it remains unresolved.

---

# 33. Gap type does not determine research method

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

# 34. Gap versus limitation

A limitation belongs to an existing study.

A research gap belongs to the broader state of knowledge.

### Study limitation

> Our sample contained only 30 participants.

### Potential research gap

> The field lacks sufficient evidence about whether the finding generalises across larger and independent samples.

The limitation becomes a research gap only when it creates an important unresolved problem in the literature.

---

# 35. Gap versus future work

A paper may say:

> Future studies should investigate whether the effect generalises to older adults.

This is a suggestion.

It is not automatically a validated research gap.

The agent should independently ask:

1. Has another study already tested older adults?
2. Is the population scientifically important?
3. Does the uncertainty remain?
4. Would resolving it change our understanding?
5. Is the question feasible?

Only then should it become a research gap candidate.

---

# 36. Gap versus novelty

Novelty means:

> Something is new.

A research gap means:

> Something important remains unresolved.

These are not equivalent.

For example:

> Applying a familiar algorithm to a new dataset

may be novel but scientifically weak.

Conversely:

> Replicating an important finding in an independent population

may be highly valuable despite using an established method.

Therefore:

```text
Novelty
    ≠
Importance
```

---

# 37. Gap classification workflow

When a candidate gap is identified, classify it using:

```text
1. What is unknown?
       ↓
Knowledge gap

2. What evidence is missing?
       ↓
Evidence gap

3. What method prevents resolution?
       ↓
Methodological gap

4. Who or what is missing?
       ↓
Population / Data gap

5. Has the finding been independently tested?
       ↓
Replication gap

6. Does it work elsewhere?
       ↓
Generalisation gap

7. Why do studies disagree?
       ↓
Contradiction / Heterogeneity gap

8. Which explanation is correct?
       ↓
Theoretical / Mechanistic gap

9. Is the construct measured properly?
       ↓
Measurement gap

10. Does it change over time?
       ↓
Temporal / Longitudinal gap

11. Can evidence streams be combined?
       ↓
Integration / Multimodal gap

12. Does it work in practice?
       ↓
Translation / Application gap

13. Can the result be independently reproduced?
       ↓
Reproducibility gap
```

---

# 38. Gap classification checklist

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

# 39. Choosing the most appropriate gap type

Use the following decision rules.

### If the main problem is:

> We do not understand the phenomenon.

Use:

**Knowledge gap**

### If:

> We have an important claim but insufficient evidence.

Use:

**Evidence gap**

### If:

> Existing methods cannot answer the question reliably.

Use:

**Methodological gap**

### If:

> The evidence does not cover an important population.

Use:

**Population gap**

### If:

> The necessary evidence/data are unavailable.

Use:

**Data gap**

### If:

> A finding has not been independently confirmed.

Use:

**Replication gap**

### If:

> A finding has not been tested under changed conditions.

Use:

**Generalisation gap**

### If:

> Credible studies disagree.

Use:

**Contradiction gap**

### If:

> Competing explanations remain unresolved.

Use:

**Theoretical gap**

### If:

> The underlying process remains unknown.

Use:

**Mechanistic gap**

### If:

> Association exists but causal direction is unclear.

Use:

**Causal gap**

### If:

> The construct is measured inconsistently or inadequately.

Use:

**Measurement gap**

### If:

> Change over time is poorly understood.

Use:

**Temporal / longitudinal gap**

### If:

> Separate evidence streams have not been combined.

Use:

**Integration gap**

### If:

> A laboratory finding has not translated to practice.

Use:

**Translation gap**

### If:

> A result cannot be reliably reproduced.

Use:

**Reproducibility gap**

---

# 40. Final principle

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
