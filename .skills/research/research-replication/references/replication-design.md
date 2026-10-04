# Replication Design

## Purpose

Replication design translates an existing scientific finding into a new empirical study.

The central design problem is:

> **How can we test the original scientific claim using new evidence while preserving its essential meaning?**

A strong replication design balances:

```text
Fidelity to the original claim
        +
Independence of the new evidence
        +
Sufficient statistical precision
        +
Transparent methodological decisions
```

---

# 1. Start with the claim, not the procedure

Do not begin by copying the original Methods section.

First identify:

```text
Scientific claim
      ↓
Research question
      ↓
Hypothesis
      ↓
Target effect
      ↓
Experimental design
```

Example:

Original claim:

> Adaptive working-memory training improves untrained attentional control.

Replication target:

```text
Population:
Healthy adults

Intervention:
Adaptive working-memory training

Comparison:
Active control

Outcome:
Untrained attentional-control performance

Expected direction:
Training > control
```

Only after defining this should the replication procedure be designed.

---

# 2. Define the replication target

Write the target claim in one sentence.

Good:

> Adaptive working-memory training improves untrained attentional-control performance relative to an active control in healthy adults.

Weak:

> Replicate Smith et al. (2024).

The second statement does not specify what is actually being tested.

---

# 3. Identify the primary result

A paper can contain many findings.

Identify:

```text
Primary hypothesis
Primary outcome
Primary comparison
Primary analysis
Primary effect
```

For example:

```text
Primary outcome:
Attention score

Comparison:
Training vs active control

Effect:
Mean difference

Expected direction:
Positive
```

Secondary and exploratory results should be treated separately.

---

# 4. Build a replication specification

Create a compact specification before designing the study.

Example:

| Component          | Specification                    |
| ------------------ | -------------------------------- |
| Population         | Healthy adults 18–35             |
| Intervention       | Adaptive working-memory training |
| Control            | Active control                   |
| Duration           | 4 weeks                          |
| Primary outcome    | Untrained attention score        |
| Primary contrast   | Training − control               |
| Effect measure     | Hedges g                         |
| Expected direction | Positive                         |
| Primary analysis   | ANCOVA                           |
| Alpha              | 0.05                             |

This becomes the design reference.

---

# 5. Identify essential components

Classify every major component.

```text
ESSENTIAL
```

means changing it could change the scientific question.

```text
FLEXIBLE
```

means changing it should not substantially alter the scientific test.

Example:

| Component        | Classification    |
| ---------------- | ----------------- |
| Population       | Essential         |
| Intervention     | Essential         |
| Control          | Essential         |
| Primary outcome  | Essential         |
| Core task        | Essential         |
| Software version | Usually flexible  |
| Computer model   | Usually flexible  |
| Laboratory       | Context-dependent |
| Interface colour | Flexible          |

Do not assume that all implementation details are irrelevant.

---

# 6. Identify meaningful deviations

Every replication will differ from the original in some way.

Create a deviation table.

| Dimension  | Original | Replication | Expected impact      |
| ---------- | -------- | ----------- | -------------------- |
| Site       | Lab A    | Lab B       | Low                  |
| Sample     | N=80     | N=150       | Low                  |
| Software   | v1       | v2          | Low                  |
| Population | Students | Students    | Low                  |
| Scanner    | 3T A     | 3T B        | Potentially moderate |

The goal is not to eliminate every difference.

The goal is to make differences visible and interpretable.

---

# 7. Choose replication fidelity

Ask:

> How closely should the new study match the original?

Possible goals:

```text
High fidelity
    ↓
Direct/close replication

Moderate fidelity
    ↓
Extended replication

Lower procedural fidelity
    ↓
Conceptual replication
```

The appropriate level depends on the uncertainty being tested.

---

# 8. Preserve the causal structure

If the original study tests:

```text
Intervention
      ↓
Outcome
```

the replication should preserve the relevant causal structure.

For example:

```text
Training
    ↓
Attention
```

should not become:

```text
Training
    ↓
Correlation with attention
```

if the original claim was causal.

---

# 9. Preserve the comparison

The comparison condition can be critical.

Original:

```text
Training
vs
Active control
```

Replacing the control with:

```text
No-treatment control
```

can change the interpretation.

Why?

Because:

```text
Training vs no treatment
```

tests a different contrast from:

```text
Training vs active control
```

Control conditions must therefore be treated as part of the scientific design.

---

# 10. Preserve the outcome

If the original claim concerns:

```text
Untrained attention
```

do not replace the primary outcome with:

```text
Performance on the training task
```

unless the scientific question is intentionally changed.

The primary outcome defines what the replication is actually testing.

---

# 11. Measurement validity

A replication can fail because of measurement problems rather than because the underlying effect is absent.

Consider:

```text
Construct
   ↓
Measurement
   ↓
Observed score
```

If the new measurement has poor reliability:

```text
True effect
   ↓
Noisy measurement
   ↓
Small observed effect
```

Therefore check:

- Reliability
- Validity
- Sensitivity
- Ceiling effects
- Floor effects
- Measurement range

---

# 12. Sample definition

Specify:

```text
Population
Age range
Inclusion criteria
Exclusion criteria
Recruitment source
Clinical status
Relevant demographic variables
```

Use the original criteria where they are scientifically important.

If criteria change, document why.

---

# 13. Sampling strategy

Consider whether the replication sample should match the original sampling strategy.

Examples:

```text
Convenience sample
Probability sample
Clinical cohort
Community sample
Student sample
Online sample
```

Changing the sampling strategy can affect:

- External validity
- Participant characteristics
- Effect size
- Selection bias

---

# 14. Sample size

Sample size should be justified independently.

Possible goals include:

```text
Power
Precision
Smallest meaningful effect
Prediction interval
Expected heterogeneity
```

Avoid blindly using:

```text
Nreplication = Noriginal
```

---

# 15. Effect-size planning

Suppose:

```text
Original:
d = 0.60
```

Do not automatically assume:

```text
Expected replication:
d = 0.60
```

Consider:

```text
Original estimate
       ↓
Potential inflation
       ↓
Plausible effect range
       ↓
Smallest scientifically meaningful effect
```

Sample-size planning should reflect the scientific objective.

---

# 16. Smallest effect of interest

Define the smallest effect that would matter scientifically.

Example:

```text
Smallest meaningful improvement:
d = 0.20
```

Then distinguish:

```text
Effect > 0.20
```

from:

```text
Effect near zero
```

This can be more informative than relying exclusively on statistical significance.

---

# 17. Randomisation

For experimental replications, define randomisation clearly.

Possible approaches:

- Random participant assignment
- Block randomisation
- Stratified randomisation
- Cluster randomisation

The randomisation procedure should be specified before data collection.

---

# 18. Blinding

Where feasible, specify:

```text
Participant blinding
Experimenter blinding
Outcome-assessor blinding
Analyst blinding
```

Not every study can blind every party.

The important point is to identify potential sources of bias.

---

# 19. Counterbalancing

For within-subject designs, preserve relevant counterbalancing.

Example:

```text
Condition A → B

versus

Condition B → A
```

Order effects can otherwise create apparent replication differences.

---

# 20. Control conditions

Control conditions should preserve the original inferential comparison.

Possible controls:

```text
No treatment
Waitlist
Placebo
Sham
Active control
Matched task
Baseline
```

Ask:

> What alternative explanation did the original control condition rule out?

That explanation should remain addressed in the replication.

---

# 21. Context and setting

Document:

```text
Laboratory
Room
Equipment
Experimenter
Time of day
Task environment
Participant instructions
```

Some findings are context-sensitive.

Do not assume context is irrelevant simply because it was not the focus of the original paper.

---

# 22. Timing

Timing can be scientifically important.

Specify:

```text
Intervention duration
Follow-up interval
Session duration
Stimulus timing
Delay periods
Measurement timing
```

For example:

```text
Immediate post-test
```

is different from:

```text
Six-month follow-up
```

A replication should preserve the relevant time scale.

---

# 23. Neuroimaging replication design

For neuroimaging, specify:

```text
Scanner
Field strength
Sequence
Spatial resolution
Temporal resolution
Number of runs
Task timing
Preprocessing
Motion criteria
Registration
Statistical model
Correction method
ROI definition
```

Do not change the analysis pipeline casually.

---

# 24. fMRI replication

Important variables include:

- TR
- TE
- Voxel size
- Number of volumes
- Slice acquisition
- Motion correction
- Spatial smoothing
- Normalisation
- First-level model
- Contrast definition
- Group-level model

If parameters differ, document the expected consequence.

---

# 25. EEG/MEG replication

Important variables include:

```text
Sensor system
Sampling rate
Reference
Filtering
Epoching
Artifact removal
Bad-channel handling
Source reconstruction
Time windows
Frequency bands
Statistical correction
```

For MEG/OPM-MEG, additionally consider:

- Sensor placement
- Head position
- Environmental interference
- Sensor calibration
- Motion tracking
- Forward model
- Source localisation assumptions

---

# 26. Behavioural replication

For reaction-time or accuracy studies, specify:

```text
Task
Stimulus presentation
Response device
Practice trials
Trial count
Timing
Accuracy criteria
RT exclusion rules
Participant exclusions
Primary statistical model
```

Small implementation differences can affect reaction-time distributions.

---

# 27. Clinical replication

For clinical neuroscience:

```text
Diagnosis
Disease stage
Severity
Treatment history
Medication
Recruitment setting
Outcome measure
Follow-up
Missing-data handling
```

Clinical heterogeneity should be explicitly documented.

---

# 28. Machine-learning replication

For ML studies, define:

```text
Dataset
Prediction target
Features
Preprocessing
Model
Hyperparameters
Training procedure
Validation procedure
Test set
Evaluation metric
Baseline
```

Most importantly:

```text
Training data
      ↓
Validation data
      ↓
Independent test data
```

must remain conceptually separated.

---

# 29. Prevent data leakage

Leakage can create apparently successful replication.

Examples:

```text
Test participant appears in training
```

or:

```text
Feature preprocessing uses the entire dataset
```

or:

```text
Hyperparameters tuned using test performance
```

or:

```text
Repeated samples from the same participant
```

are split across training and test sets without accounting for participant identity.

Use independent evaluation.

---

# 30. Analysis-plan design

Before analysing data, specify:

```text
Primary outcome
Primary predictor/comparison
Statistical model
Covariates
Exclusions
Missing-data strategy
Multiple-comparison strategy
Effect measure
Confidence interval
```

This reduces analytical flexibility.

---

# 31. Covariates

Do not automatically copy every covariate from the original study.

Ask:

```text
Why was the covariate included?
```

Potential reasons:

- Confounding
- Precision
- Design imbalance
- Theoretical importance

A covariate should have a defensible rationale.

---

# 32. Missing data

Specify the strategy before analysis.

Possible approaches:

- Complete-case analysis
- Multiple imputation
- Mixed-effects modelling
- Maximum likelihood
- Sensitivity analysis

Do not silently remove participants after inspecting outcomes.

---

# 33. Exclusion criteria

Define:

```text
Participant exclusions
Trial exclusions
Signal-quality exclusions
Outlier handling
Missing-data exclusions
```

Where possible, specify thresholds before seeing the results.

---

# 34. Outliers

Do not remove observations simply because they weaken the replication.

Define:

```text
What counts as an outlier?
Why?
What happens to it?
```

Use sensitivity analysis when appropriate.

---

# 35. Multiple comparisons

If multiple outcomes or analyses are tested, define:

```text
Primary outcome
Secondary outcomes
Correction strategy
Exploratory analyses
```

Avoid presenting whichever result is most favourable as the primary result after the fact.

---

# 36. Preregistration

A useful preregistration structure is:

```text
1. Research question
2. Hypothesis
3. Population
4. Sample size
5. Inclusion criteria
6. Exclusion criteria
7. Experimental design
8. Primary outcome
9. Primary analysis
10. Effect measure
11. Secondary analyses
12. Exploratory analyses
13. Stopping rule
14. Deviations policy
```

---

# 37. Deviations from the original

Not every deviation invalidates replication.

Classify deviations as:

```text
Minor
Moderate
Major
```

### Minor

Likely little effect on interpretation.

Example:

```text
Software version
```

### Moderate

Could affect results.

Example:

```text
Different response device
```

### Major

Changes the scientific test.

Example:

```text
Different primary outcome
```

---

# 38. Deviations from the preregistration

Also distinguish:

```text
Difference from original paper
```

from:

```text
Difference from preregistered replication plan
```

These are separate forms of deviation.

Report both.

---

# 39. Data-quality checks

Before the primary analysis:

```text
Raw data
    ↓
Integrity check
    ↓
Missingness
    ↓
Quality control
    ↓
Preprocessing
    ↓
Final analysis dataset
```

Quality control decisions should be documented.

---

# 40. Primary analysis first

Run the primary analysis before extensive exploratory analysis.

Conceptually:

```text
Preregistered primary analysis
        ↓
Primary result
        ↓
Exploratory analyses
```

This protects the interpretability of the replication.

---

# 41. Compare with the original

Comparison should include:

```text
Effect direction
Effect magnitude
Confidence interval
Sample size
Measurement
Population
Context
Method
```

Example:

|           |  Original | Replication |
| --------- | --------: | ----------: |
| N         |        80 |         150 |
| Effect    |   d = .45 |     d = .31 |
| 95% CI    | [.12,.78] |   [.08,.54] |
| Direction |  Positive |    Positive |

The replication estimate is smaller but may remain compatible.

---

# 42. Assess statistical compatibility

Ask:

> Are the observed differences larger than would reasonably be expected from sampling variation?

Do not answer this solely by comparing:

```text
p < .05
```

versus:

```text
p > .05
```

Use effect estimates and uncertainty.

---

# 43. Assess practical significance

A statistically detectable effect may be scientifically trivial.

Ask:

```text
Is the effect large enough to matter?
```

This is particularly important in:

- Clinical neuroscience
- Education
- Cognitive training
- Prediction
- Intervention research

---

# 44. Assess methodological fidelity

If the replication differs substantially from the original, ask:

> Is the discrepancy evidence against the original claim, or evidence that the new study tested something different?

This distinction is essential.

---

# 45. Investigate moderators

A replication discrepancy can reveal a moderator.

Possible moderators:

```text
Age
Clinical status
Task
Language
Culture
Scanner
Laboratory
Training duration
Measurement
Context
```

A failed overall replication may conceal:

```text
Effect exists only under condition X.
```

This should be treated as a hypothesis unless supported by appropriate evidence.

---

# 46. Sequential replication programmes

Replication does not have to be one study.

A research programme may progress:

```text
Original study
      ↓
Direct replication
      ↓
Independent-site replication
      ↓
Cross-population replication
      ↓
Cross-context replication
      ↓
Meta-analysis
```

Each stage answers a different question.

---

# 47. Example: language neuroscience

Suppose the original study finds:

> Semantic representations can be decoded from MEG activity during naturalistic speech.

A replication design might be:

```text
Population:
New healthy adults

Stimuli:
New narrative

Method:
MEG

Target:
Semantic representation

Primary metric:
Cross-validated decoding performance

Generalisation:
Within-participant
```

A later extension could test:

```text
Cross-participant decoding
```

and another:

```text
Cross-narrative generalisation
```

These should not be conflated.

---

# 48. Example: OPM-MEG

Suppose an original finding was obtained using conventional MEG.

A replication using OPM-MEG should ask:

```text
Is this:
Direct replication?
```

or:

```text
Cross-method replication?
```

If sensor technology changes substantially, the study may be better described as:

> A cross-method replication testing whether the original neural effect can be observed using OPM-MEG.

The scientific claim remains central.

---

# 49. Example: clinical language recovery

Original claim:

> A multimodal model predicts post-stroke language outcome.

Replication design:

```text
New patient cohort
        ↓
Same prediction target
        ↓
Equivalent feature definition
        ↓
Predefined model/evaluation
        ↓
External test
```

Important outcomes:

```text
AUC
Calibration
Prediction error
Confidence intervals
External validation performance
```

Do not judge replication solely by whether the original AUC was achieved exactly.

---

# 50. Design decision tree

Use this sequence:

```text
Is the evidence new?
        │
        ├── No
        │    ↓
        │  Reproduction
        │
        └── Yes
             ↓
       Is the scientific claim the same?
             │
             ├── No
             │    ↓
             │  New study
             │
             └── Yes
                  ↓
          Are core methods closely matched?
                  │
                  ├── Yes
                  │    ↓
                  │  Direct / Close replication
                  │
                  └── No
                       ↓
              Is the theoretical claim preserved?
                       │
                       ├── Yes
                       │    ↓
                       │  Conceptual replication
                       │
                       └── No
                            ↓
                          New study
```

Then separately classify whether the replication also tests:

```text
Population generalisation
Context generalisation
Method generalisation
Site generalisation
Dataset generalisation
```

---

# 51. Replication design checklist

Before collecting data:

```text
[ ] Original claim identified
[ ] Primary effect identified
[ ] Replication question written
[ ] Replication type selected
[ ] Essential components identified
[ ] Flexible components identified
[ ] Population defined
[ ] Sampling strategy defined
[ ] Sample size justified
[ ] Primary outcome defined
[ ] Primary analysis defined
[ ] Effect measure defined
[ ] Smallest meaningful effect considered
[ ] Control condition preserved
[ ] Measurement validity assessed
[ ] Exclusion criteria defined
[ ] Missing-data strategy defined
[ ] Multiple-comparison strategy defined
[ ] Data leakage risks addressed
[ ] Preregistration considered
[ ] Deviations documented
```

---

# Final principle

Replication design is not about copying every detail of the original study.

It is about preserving the **scientific test** while obtaining genuinely new evidence.

```text
ORIGINAL CLAIM
      ↓
ESSENTIAL COMPONENTS
      ↓
REPLICATION QUESTION
      ↓
NEW EVIDENCE
      ↓
PRE-SPECIFIED DESIGN
      ↓
PRIMARY ANALYSIS
      ↓
EFFECT + UNCERTAINTY
      ↓
COMPARISON WITH ORIGINAL
      ↓
UPDATED EVIDENCE
```

> **Design the replication around the uncertainty you want to resolve, and preserve whatever is necessary to make the resulting evidence scientifically interpretable.**
