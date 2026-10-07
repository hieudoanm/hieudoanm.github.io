# Research Replication

## Purpose

The `research-replication` skill helps an agent determine whether an existing scientific finding holds when tested again using **new evidence**.

The core question is:

> **Does the finding hold again?**

Replication is useful when evaluating the robustness, reliability, generalisability, and boundary conditions of scientific claims.

It applies across:

- Neuroscience
- Psychology
- Clinical neuroscience
- Cognitive science
- Behavioural science
- Machine learning
- Computational neuroscience
- Biomedical research

---

# When to use this skill

Use `research-replication` when:

- Testing an important published finding with new participants
- Testing an effect in a new dataset
- Conducting a registered replication
- Repeating an experiment at an independent laboratory
- Testing a finding in a different population
- Testing whether an effect generalises across contexts
- Evaluating robustness of a computational result
- Validating a machine-learning result on independent data
- Investigating whether a neural effect replicates
- Determining whether a published effect survives methodological variation

Typical questions include:

> Does this psychological effect replicate?

> Does this neural signature appear in a new sample?

> Does this model generalise to an independent dataset?

> Does the original finding hold in a different population?

> Does the reported effect survive an independent laboratory implementation?

---

# When not to use this skill

Do not use this as the primary skill when the task is actually:

### Understanding one paper

Use:

```text
paper-reading
```

### Synthesising a body of literature

Use:

```text
literature-review
```

### Identifying an unresolved scientific problem

Use:

```text
research-gap
```

### Rerunning the original analysis on the original data

Use:

```text
research-reproduction
```

### Quantitatively combining many studies

Use:

```text
meta-analysis
```

Replication may be part of these workflows, but it should not replace them.

---

# Replication versus reproduction

This distinction is fundamental.

|               | Reproduction                 | Replication                  |
| ------------- | ---------------------------- | ---------------------------- |
| Evidence      | Original                     | New                          |
| Participants  | Usually original             | New                          |
| Dataset       | Original                     | New                          |
| Main question | Can we obtain the result?    | Does the finding hold again? |
| Primary goal  | Reproducibility              | Robustness/generalisation    |
| Example       | Rerun original fMRI analysis | Collect a new fMRI cohort    |

Simple rule:

```text
Same evidence
    ↓
Reproduction

New evidence
    ↓
Replication
```

---

# Why replication matters

Scientific findings are estimates rather than perfect observations.

A reported result can be influenced by:

- Sampling variation
- Measurement noise
- Small samples
- Researcher degrees of freedom
- Analysis choices
- Publication bias
- Selective reporting
- Population characteristics
- Experimental context
- Dataset-specific properties

Replication provides another opportunity to test the claim.

Conceptually:

```text
Study 1
   ↓
Evidence

Study 2
   ↓
More evidence

Study 3
   ↓
More evidence

Multiple studies
   ↓
Better understanding of robustness
```

A replication does not automatically establish truth.

It adds evidence.

---

# Core workflow

The standard replication workflow is:

```text
Original study
      ↓
Identify scientific claim
      ↓
Define replication target
      ↓
Identify essential components
      ↓
Choose replication type
      ↓
Design new study
      ↓
Define primary outcome
      ↓
Define analysis
      ↓
Plan sample size
      ↓
Preregister where appropriate
      ↓
Collect new evidence
      ↓
Perform quality control
      ↓
Run primary analysis
      ↓
Compare with original
      ↓
Evaluate uncertainty
      ↓
Investigate discrepancies
      ↓
Update confidence in original claim
```

---

# 1. Identify the original claim

Do not begin by blindly copying the original methods.

First determine:

```text
What did the researchers actually claim?
```

Extract:

- Research question
- Hypothesis
- Population
- Manipulation/intervention
- Comparison
- Primary outcome
- Context
- Primary analysis
- Main result
- Interpretation

Then write the target claim in one sentence.

Example:

> Adaptive working-memory training improves untrained attentional-control performance relative to an active control.

That sentence becomes the replication target.

---

# 2. Define the replication target

A paper can contain many findings.

For example:

```text
Primary effect
Secondary effect
Subgroup effect
Neural effect
Behavioural effect
Mediation analysis
Exploratory analysis
```

Do not automatically attempt to replicate every result.

Prefer a clearly defined primary target.

Example:

```text
Primary claim:
Training improves untrained attention.

Primary outcome:
Attention score.

Primary comparison:
Training vs active control.

Expected direction:
Positive.
```

---

# 3. Identify essential components

Separate the original design into:

```text
Essential
```

and:

```text
Flexible
```

### Essential

These define the scientific test.

Examples:

- Population
- Critical manipulation
- Control condition
- Primary outcome
- Timing
- Key inclusion criteria

### Flexible

These may vary without necessarily changing the scientific question.

Examples:

- Laboratory
- Software version
- Minor interface details
- Recruitment location
- Non-critical implementation details

This distinction prevents two opposite errors:

```text
Changing so much that the study no longer tests the same claim
```

and:

```text
Treating every tiny implementation difference as a failed replication
```

---

# 4. Choose the replication type

Important replication types include:

| Type             | Main purpose                                                      |
| ---------------- | ----------------------------------------------------------------- |
| Direct           | Test the same claim under closely matched conditions              |
| Close            | Preserve core design while allowing practical changes             |
| Conceptual       | Test the same theoretical claim with different operationalisation |
| Extended         | Replicate while adding a scientifically motivated condition       |
| Multi-site       | Test robustness across laboratories/sites                         |
| Cross-population | Test whether finding holds in another population                  |
| Cross-context    | Test whether finding survives contextual variation                |

See:

```text
references/replication-types.md
```

for detailed definitions.

---

# 5. Define what counts as replication

Do not define success as:

> The p-value is below .05 again.

Instead define the evidence required to support the claim.

Consider:

```text
Effect direction
Effect magnitude
Confidence interval
Statistical uncertainty
Smallest meaningful effect
Methodological fidelity
Population/context differences
```

A replication result may be:

```text
Strongly consistent
Broadly consistent
Partially consistent
Inconclusive
Inconsistent
Contradictory
```

This is more informative than a binary:

```text
Replicated / Failed
```

---

# 6. Sample-size planning

Do not automatically copy the original sample size.

The original study may have been:

- Underpowered
- Overpowered
- Based on an inflated effect estimate
- Optimised for a different design

Consider:

```text
Original effect
      ↓
Plausible effect range
      ↓
Smallest meaningful effect
      ↓
Required precision
      ↓
Sample size
```

Possible approaches include:

- Power analysis
- Precision-based planning
- Minimum detectable effect
- Bayesian design
- Predefined sequential designs

---

# 7. Preregistration

Replication studies benefit strongly from preregistration.

Where appropriate, preregister:

```text
Research question
Hypothesis
Primary outcome
Sample size
Exclusion criteria
Stopping rule
Primary analysis
Effect measure
Secondary analyses
Exploratory analyses
```

The purpose is to distinguish:

```text
Confirmatory analysis
```

from:

```text
Analysis selected after observing the data
```

---

# 8. Collect genuinely new evidence

Replication requires new evidence.

Examples:

```text
New participants
New clinical cohort
New recording session
New experimental observations
New independent dataset
```

Check for:

- Participant overlap
- Dataset overlap
- Shared observations
- Reused derived labels
- Train/test contamination

A new analysis of the same dataset is generally **reproduction**, not independent replication.

---

# 9. Execute the primary analysis

A good replication separates:

```text
Confirmatory analysis
```

from:

```text
Exploratory analysis
```

The primary analysis should follow the predefined plan.

If changes are necessary:

```text
Original plan
      ↓
Deviation
      ↓
Reason
      ↓
Impact
```

Report the deviation transparently.

---

# 10. Compare effect estimates

Suppose:

```text
Original:
d = 0.40
95% CI [0.15, 0.65]

Replication:
d = 0.31
95% CI [0.02, 0.60]
```

The estimates are not identical.

That is expected.

The important question is whether they are compatible with a common underlying effect.

Do not ask only:

```text
Was the original significant?
Was the replication significant?
```

Ask:

```text
How large was the effect?
How uncertain is the estimate?
Are the estimates compatible?
```

---

# 11. Non-significant does not mean no effect

Suppose:

```text
Original:
d = 0.40
p < .05

Replication:
d = 0.20
p = .12
```

The replication does not automatically demonstrate that the effect is absent.

The sample may be too small or the estimate too uncertain.

Evaluate:

```text
Effect size
Confidence interval
Statistical power
Smallest meaningful effect
```

Where appropriate, use equivalence testing or Bayesian methods to evaluate evidence for a negligible effect.

---

# 12. Investigate discrepancies

If the replication differs from the original, ask:

```text
Was the population different?
Was the measurement different?
Was the sample size adequate?
Was the manipulation successful?
Was the original estimate unusually large?
Was the context different?
Was the analysis equivalent?
Was there dataset shift?
Could the effect be moderated?
```

Do not immediately conclude:

```text
Original study was wrong.
```

or:

```text
Replication failed.
```

First investigate plausible explanations.

---

# 13. Replication and generalisation

Replication and generalisation overlap but are not identical.

Example:

```text
Original:
University students in Birmingham

Replication:
Different university students in Birmingham
```

This primarily tests replication.

But:

```text
Original:
University students

New study:
Older adults
```

also tests generalisation.

Similarly:

```text
Original:
One laboratory

New study:
Ten laboratories
```

tests robustness across research environments.

Be explicit about the goal.

---

# Domain-specific considerations

## Neuroscience

Important factors include:

- Scanner
- Acquisition parameters
- Preprocessing
- Motion
- Signal-to-noise ratio
- ROI definitions
- Statistical thresholds
- Multiple comparisons
- Spatial normalisation
- Temporal filtering
- Participant variability

For neuroimaging replication, define the target contrast and analysis space in advance.

---

## Psychology

Important factors include:

- Sample characteristics
- Manipulation fidelity
- Measurement reliability
- Control conditions
- Demand characteristics
- Context
- Culture
- Effect-size uncertainty

Distinguish failure of the exact procedure from failure of the underlying psychological hypothesis.

---

## Clinical neuroscience

Important factors include:

- Clinical population
- Diagnostic criteria
- Disease stage
- Treatment exposure
- Outcome definition
- Missing data
- Attrition
- Site effects
- Scanner effects
- Patient heterogeneity

External replication is particularly important for predictive clinical models.

---

## Machine learning

A model achieving the same result on the original dataset is not necessarily a replication.

A stronger empirical replication uses:

```text
Original claim
      ↓
Independent dataset
      ↓
Equivalent prediction task
      ↓
Independent evaluation
```

Check carefully for:

- Data leakage
- Preprocessing leakage
- Train/test contamination
- Hyperparameter tuning
- Dataset shift
- Scanner/site effects
- Demographic shift
- External validation
- Randomness
- Model selection

---

# Common mistakes

## 1. Calling reproduction a replication

```text
Same dataset
+
New analysis
=
Usually reproduction
```

## 2. Matching p-values

A replication does not need to reproduce the original p-value.

## 3. Treating non-significance as evidence of no effect

Precision matters.

## 4. Ignoring effect size

Always examine magnitude and uncertainty.

## 5. Changing the analysis until the result works

This increases researcher degrees of freedom.

## 6. Changing too much

If the scientific test changes substantially, it may no longer be a replication.

## 7. Changing too little

A replication that is effectively the same evidence may not provide independent support.

## 8. Ignoring context

Effects can depend on:

- Population
- Task
- Time
- Setting
- Measurement

## 9. Treating replication as binary

Replication evidence exists on a continuum.

## 10. Overgeneralising

One successful replication does not prove universal generalisability.

---

# Replication quality checklist

Before considering a replication complete:

```text
[ ] Original scientific claim is explicit
[ ] Primary replication target is defined
[ ] New evidence is genuinely independent
[ ] Essential components are identified
[ ] Flexible components are documented
[ ] Replication type is specified
[ ] Population is defined
[ ] Primary outcome is predefined
[ ] Effect measure is predefined
[ ] Sample size is justified
[ ] Preregistration was considered
[ ] Confirmatory analysis is separated from exploration
[ ] Deviations are reported
[ ] Effect size is reported
[ ] Uncertainty is reported
[ ] Results are not judged only by p-values
[ ] Methodological differences are evaluated
[ ] Contextual differences are evaluated
[ ] Alternative explanations are considered
[ ] Generalisation claims are appropriately limited
```

---

# Relationship to the research workflow

The broader workflow is:

```text
paper-pdf-to-markdown
        ↓
paper-reading
        ↓
literature-review
        ↓
research-gap
        ↓
Research Question
        ↓
research-reproduction
        ↓
research-replication
        ↓
New Evidence
        ↓
Updated Literature
```

Each skill answers a different question:

| Skill                   | Question                                         |
| ----------------------- | ------------------------------------------------ |
| `paper-reading`         | What does this paper actually say?               |
| `literature-review`     | What does the field collectively know?           |
| `research-gap`          | What important uncertainty remains?              |
| `research-reproduction` | Can we obtain the original result again?         |
| `research-replication`  | Does the finding hold using new evidence?        |
| `meta-analysis`         | What is the quantitative pattern across studies? |

---

# Useful questions for an agent

When performing a replication analysis, ask:

### Claim

> What exact scientific claim is being tested?

### Evidence

> Is the evidence genuinely new?

### Design

> Which components of the original study are essential?

### Fidelity

> Which methodological differences could affect the conclusion?

### Statistics

> What effect size should be compared?

### Uncertainty

> How precise is the replication estimate?

### Interpretation

> Is the new evidence consistent with the original claim?

### Discrepancy

> If results differ, what plausible explanations exist?

### Generalisation

> Does the replication test robustness, generalisation, or both?

### Transparency

> Which decisions were preregistered and which were exploratory?

---

# Recommended output format

When an agent evaluates or designs a replication, use:

```text
## Original Claim

[One-sentence scientific claim]

## Replication Question

[Precise question]

## Replication Type

[Direct / Close / Conceptual / Extended / Multi-site / etc.]

## Original Evidence

[Participants, dataset, design]

## New Evidence

[New participants, dataset, or observations]

## Essential Components

[Components that must be preserved]

## Planned Differences

[Meaningful differences and justification]

## Primary Outcome

[Outcome]

## Primary Analysis

[Analysis]

## Effect Measure

[Effect size]

## Replication Result

[Estimate + uncertainty]

## Comparison with Original

[Compatible / partially compatible / inconsistent / etc.]

## Deviations

[Deviations from preregistered or original design]

## Interpretation

[What the new evidence means]

## Remaining Uncertainty

[What cannot yet be concluded]

## Implication for Original Claim

[Updated confidence]
```

---

# Final principle

A strong replication does not attempt to make the new study look identical to the original at all costs.

It preserves the **scientific meaning of the original test**, uses genuinely new evidence, makes methodological differences explicit, analyses the new data transparently, and evaluates whether the new evidence supports, weakens, qualifies, or contradicts the original claim.

> **Replication is not about getting the same result. It is about learning whether the original finding survives a new empirical test.**
