# Neuroscience Replication Example

## Purpose

This example demonstrates how to design and evaluate a replication in neuroscience.

The example focuses on a hypothetical study investigating whether neural activity contains information about speech meaning.

The goal is not to reproduce a specific published paper. Instead, it illustrates how the `research-replication` skill can be applied to a realistic neuroscience problem.

---

# 1. Research question

Suppose an original study asks:

> Can patterns of human brain activity be used to decode the semantic content of spoken language?

The original study reports that neural activity contains information that distinguishes different semantic categories.

The replication should begin with the scientific claim:

```text
Speech meaning is represented in measurable patterns
of neural activity.
```

Not:

```text
Run the same analysis again.
```

---

# 2. Original scientific claim

Suppose the original study reports:

```text
Participants:
30 healthy adults

Modality:
MEG

Task:
Listen to spoken sentences

Analysis:
Neural decoding

Outcome:
Classification accuracy

Result:
Accuracy = 72%
Chance = 50%
```

The scientific claim is approximately:

> Neural activity measured with MEG contains information that allows semantic content of spoken language to be decoded above chance.

---

# 3. Identify the target effect

The target should be defined before designing the replication.

For example:

```text
Primary outcome:
Semantic decoding accuracy

Null:
Accuracy = chance

Alternative:
Accuracy > chance
```

A stronger replication specification might additionally define:

```text
Expected effect:
Above-chance semantic decoding

Primary time window:
[specified in advance]

Primary brain representation:
[specified in advance]

Primary decoding approach:
[specified in advance]
```

---

# 4. Direct replication design

A high-fidelity replication might use:

```text
Original:
MEG
30 participants
Spoken sentences
Semantic categories
Classification
Accuracy

Replication:
MEG
New participants
Spoken sentences
Same semantic categories
Same classification target
Accuracy
```

The important point is:

```text
NEW PARTICIPANTS
+
SAME SCIENTIFIC QUESTION
```

---

# 5. What should remain constant?

Preserve the elements necessary to test the same claim.

### Essential

```text
Speech stimulus class
Semantic manipulation
Neural modality
Primary outcome
Scientific comparison
```

### Potentially flexible

```text
MEG system
Laboratory
Participant demographics
Exact stimulus items
Software implementation
Low-level preprocessing details
```

Flexibility is acceptable only when it does not change the scientific question.

---

# 6. Replication specification

Create a structured specification before data collection.

| Component         | Original        | Replication             |
| ----------------- | --------------- | ----------------------- |
| Participants      | 30              | 60                      |
| Modality          | MEG             | MEG                     |
| Task              | Listening       | Listening               |
| Stimuli           | Sentences       | New sentences           |
| Semantic contrast | Category A vs B | Category A vs B         |
| Primary outcome   | Accuracy        | Accuracy                |
| Primary analysis  | Classifier      | Prespecified classifier |
| Site              | Lab A           | Lab B                   |

This would be a close/direct-style replication with some controlled differences.

---

# 7. Why increase sample size?

Suppose:

```text
Original N = 30
Replication N = 60
```

A larger replication can provide:

- More precise effect estimates
- Better detection of meaningful effects
- Better assessment of participant variability
- Greater confidence in the result

But:

```text
larger N
```

does not compensate for:

```text
poor measurement
```

or:

```text
wrong scientific target
```

---

# 8. Define the smallest meaningful effect

Suppose the replication defines:

```text
Chance accuracy = 50%

SESOI = 55%
```

Then:

```text
50%–55%
```

may be considered too small to support a practically meaningful decoding claim.

This is useful because:

```text
Above chance
```

is not necessarily equivalent to:

```text
Scientifically meaningful decoding.
```

---

# 9. Preregistration

Before collecting data, specify:

```text
Primary hypothesis
Primary outcome
Primary analysis
Participant inclusion criteria
Exclusion criteria
Sample size
Stopping rule
Preprocessing
Time windows
Multiple-comparison procedure
Secondary analyses
```

This reduces the opportunity to select the most favourable analysis after observing the data.

---

# 10. Participant recruitment

The replication should recruit participants independently.

Check:

```text
No overlap with original sample
Same broad population
Appropriate inclusion criteria
Appropriate exclusion criteria
```

For example:

```text
Original:
English-speaking adults

Replication:
English-speaking adults
```

If the replication instead uses:

```text
Children learning English
```

the study becomes a population generalisation rather than a close replication.

---

# 11. Language considerations

Speech neuroscience is particularly sensitive to language.

Important variables include:

```text
Native language
Language proficiency
Age of acquisition
Dialect
Vocabulary
Literacy
Education
Hearing ability
```

A change in language population can change the neural representation being measured.

Therefore document these variables carefully.

---

# 12. Stimulus replication

There are several options.

### Same stimuli

```text
Original sentences
        ↓
Replication
```

This provides high stimulus fidelity.

But it may introduce:

- Familiarity
- Memorisation
- Repeated exposure effects

### New matched stimuli

```text
Original:
Sentence set A

Replication:
Sentence set B
```

This tests whether the finding generalises beyond the exact stimuli.

The trade-off should be explicit.

---

# 13. Naturalistic speech

For naturalistic speech experiments, the stimulus can contain multiple levels:

```text
Acoustic features
      ↓
Phonology
      ↓
Words
      ↓
Syntax
      ↓
Semantics
      ↓
Narrative context
```

A replication should determine which level the original claim concerns.

Otherwise:

```text
semantic decoding
```

may accidentally become:

```text
acoustic decoding
```

---

# 14. Control for low-level information

Suppose semantic categories differ systematically in:

```text
Word length
Speech rate
Acoustic envelope
Phoneme distribution
Prosody
```

A classifier may exploit these differences instead of semantic information.

Therefore the replication should preserve or improve controls for low-level features.

---

# 15. MEG acquisition

Document:

```text
Sampling rate
Sensor configuration
Number of channels
Head-position tracking
Reference
Filtering
Epoching
Artifact handling
```

If the system differs between studies, determine whether the difference could affect the target effect.

---

# 16. MEG preprocessing

Potential steps include:

```text
Raw MEG
   ↓
Bad-channel detection
   ↓
Artifact correction
   ↓
Filtering
   ↓
Epoching
   ↓
Trial rejection
   ↓
Source reconstruction
   ↓
Decoding
```

The replication should distinguish:

```text
Prespecified preprocessing
```

from:

```text
Exploratory preprocessing
```

---

# 17. OPM-MEG extension

Suppose the original study used conventional MEG.

A replication might use:

```text
OPM-MEG
```

This is not necessarily a direct replication.

It is better described as:

```text
Cross-method replication
```

because the scientific question is retained while the measurement technology changes.

---

# 18. OPM-MEG considerations

The replication should consider:

```text
Sensor placement
Head movement
Sensor orientation
Field-line sensitivity
Interference
Environmental magnetic noise
Reference sensors
Source localisation
```

Differences in hardware may change measured signal characteristics.

Therefore a lower decoding score does not automatically imply that the original scientific claim failed.

---

# 19. Time-resolved decoding

Suppose the original analysis produces:

```text
Time → decoding accuracy
```

The replication should define the primary temporal analysis in advance.

For example:

```text
0–800 ms after speech onset
```

rather than selecting the most significant time window after seeing the data.

---

# 20. Multiple comparisons

Time-resolved neuroimaging can involve many statistical comparisons.

For example:

```text
200 time points
×
multiple sensors
×
multiple conditions
```

The replication should specify an appropriate correction strategy.

Possible approaches include:

- Cluster-based permutation tests
- Predefined regions/time windows
- False discovery rate
- Other prespecified correction procedures

The method should match the hypothesis.

---

# 21. Cross-validation

If decoding uses machine learning, cross-validation must be carefully designed.

For example:

```text
Training participants
        ↓
Model
        ↓
Held-out participants
        ↓
Evaluation
```

Avoid:

```text
Same participant
    ↓
Training
    ↓
Testing
```

when the scientific claim concerns generalisation across people.

---

# 22. Participant-level independence

A particularly important issue in neural decoding is:

> What exactly is the unit of generalisation?

Possible targets:

```text
Within-trial
Within-session
Within-participant
Across-participants
Across-stimuli
Across-sessions
```

These are different scientific claims.

---

# 23. Cross-participant generalisation

Suppose the original study claims:

> Semantic representations are shared across individuals.

Then the replication must evaluate:

```text
Train:
Participants 1–N-1

Test:
Held-out participant
```

If instead the model is trained and tested within the same participant, it cannot establish cross-person generalisation.

---

# 24. Cross-stimulus generalisation

Similarly:

```text
Train:
Stimuli set A

Test:
Stimuli set B
```

is stronger evidence for a representation that generalises beyond memorised stimulus-specific patterns.

This is particularly important for language decoding.

---

# 25. Representational similarity analysis

Suppose the original study used RSA.

The replication should distinguish:

```text
Stimulus similarity
```

from:

```text
Neural representational similarity
```

A replication might compare:

```text
Model RDM
     ↕
Neural RDM
```

using a prespecified similarity measure.

---

# 26. Encoding versus decoding

Do not treat these as interchangeable.

### Encoding

```text
Stimulus features
      ↓
Predict neural activity
```

### Decoding

```text
Neural activity
      ↓
Predict stimulus/task information
```

A replication should preserve the original scientific direction of inference.

---

# 27. Source localisation

If the original claim concerns a brain region, validate:

```text
Sensor-level result
```

versus:

```text
Source-level result
```

Source localisation depends on assumptions about:

- Head model
- Forward model
- Inverse method
- Sensor geometry
- Noise covariance

Different assumptions may produce different localisation results.

---

# 28. Functional interpretation

Suppose the original study finds:

```text
Left temporal cortex
```

associated with semantic decoding.

A replication should not automatically conclude:

> This proves that the left temporal cortex stores semantic representations.

The result may instead indicate:

```text
Activity patterns in the region contain information
associated with the semantic manipulation.
```

Replication should preserve appropriate inferential strength.

---

# 29. Primary result

Suppose the replication reports:

```text
Original:
Accuracy = 72%
95% CI [68%, 76%]

Replication:
Accuracy = 69%
95% CI [66%, 72%]
```

The direction is the same.

The magnitude is somewhat lower.

The uncertainty intervals are relatively compatible.

This would generally support:

```text
Broad consistency
```

rather than requiring exact numerical agreement.

---

# 30. Null result

Suppose instead:

```text
Replication:
Accuracy = 51%
95% CI [48%, 54%]
```

If the SESOI is:

```text
55%
```

the result provides evidence against a practically meaningful decoding effect.

This is stronger than simply saying:

```text
p > .05
```

---

# 31. Contradictory result

Suppose:

```text
Original:
Semantic decoding > chance

Replication:
Semantic decoding reliably below
the predicted pattern
```

Investigate:

```text
Stimulus differences
Participant differences
Measurement differences
Preprocessing
Analysis
Task engagement
Language proficiency
Model mismatch
```

Only after these checks should the replication be interpreted as evidence against the original claim.

---

# 32. Generalisation replication

A useful extension might ask:

> Does the semantic decoding effect generalise across languages?

For example:

```text
Original:
English speakers

Replication:
Vietnamese speakers
```

This is not a direct replication.

It is a:

```text
Cross-population
+
Cross-language
generalisation
```

The resulting evidence addresses a broader theoretical question.

---

# 33. Clinical neuroscience extension

The same research program could extend to:

```text
Healthy adults
        ↓
People with aphasia
```

The question might become:

> Does the neural representation associated with speech meaning differ after stroke-related language impairment?

This is an extension of the original finding, not a direct replication.

---

# 34. Replication result table

A useful final table is:

| Dimension  | Original         | Replication           | Assessment |
| ---------- | ---------------- | --------------------- | ---------- |
| Population | Adults           | Adults                | Similar    |
| Language   | English          | English               | Same       |
| Modality   | MEG              | MEG                   | Same       |
| Task       | Speech listening | Speech listening      | Same       |
| Stimuli    | Sentences        | Matched sentences     | Similar    |
| Analysis   | Decoding         | Prespecified decoding | Similar    |
| Outcome    | Accuracy         | Accuracy              | Same       |
| Effect     | 72%              | 69%                   | Compatible |
| Precision  | Moderate         | Higher                | Improved   |

---

# 35. Overall interpretation

A strong interpretation might be:

> The replication produced above-chance semantic decoding with an effect magnitude broadly comparable to the original study. Although the replication estimate was somewhat smaller, the results were compatible within their uncertainty. Given the high methodological fidelity and independent participant sample, the findings increase confidence that the original semantic decoding effect is robust under similar experimental conditions.

Notice what this does **not** say:

```text
The original study was proven true.
```

It says:

```text
Confidence increased.
```

---

# 36. When replication partially succeeds

Suppose:

```text
Semantic decoding:
Replicated

Cross-participant generalisation:
Not replicated
```

The appropriate conclusion is:

```text
The existence of semantic information
in neural activity is supported.

The stronger claim that the representation
generalises across individuals remains uncertain.
```

This is scientifically more informative than:

```text
Replication succeeded.
```

---

# 37. What the replication can reveal

A neuroscience replication can identify:

```text
Robust neural effect
        ↓
Boundary conditions
        ↓
Population differences
        ↓
Method sensitivity
        ↓
Representation specificity
        ↓
Generalisation limits
```

Therefore replication is also a tool for theory development.

---

# 38. Example replication report

A concise report could use:

```text
## Research Question

Can semantic information in spoken language
be decoded from human MEG activity?

## Original Claim

Neural activity contains information that
distinguishes semantic content above chance.

## Replication Type

Close replication with independent participants.

## Design

New participants, matched speech stimuli,
MEG acquisition, prespecified decoding analysis.

## Primary Outcome

Semantic decoding accuracy.

## Result

Original: 72%
Replication: 69%

## Interpretation

Broadly consistent.

## Confidence

Increased, assuming adequate measurement,
independence, and methodological fidelity.

## Remaining Uncertainty

Whether the representation generalises across
languages, populations, tasks, and recording methods.
```

---

# 39. Lessons for neuroscience replication

The most important lessons are:

```text
1. Replicate the scientific claim, not just the code.

2. Define the target effect before seeing new data.

3. Preserve the neural comparison and outcome.

4. Distinguish direct replication from generalisation.

5. Treat measurement differences as scientifically relevant.

6. Control low-level neural and stimulus confounds.

7. Evaluate participant and stimulus independence.

8. Use appropriate cross-validation for decoding.

9. Report effect sizes and uncertainty.

10. Do not equate p > .05 with evidence of no effect.

11. Investigate discrepancies systematically.

12. Treat replication as evidence updating.
```

---

# Final principle

For neuroscience, replication is especially challenging because the measured signal depends on:

```text
Brain
+
Participant
+
Task
+
Stimulus
+
Measurement technology
+
Preprocessing
+
Analysis
```

Therefore:

> **A successful neuroscience replication is not one that reproduces every numerical value. It is one that provides an appropriately faithful and sufficiently precise new test of the original neural claim.**
