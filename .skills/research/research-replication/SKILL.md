---
name: research-replication
description: Design, evaluate, and interpret independent replications of scientific findings by defining the target claim, preserving the essential research question, identifying meaningful sources of variation, preregistering hypotheses and analysis decisions, collecting new evidence, and determining whether the original finding generalises.
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

# Core Principle

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

# 1. Replication versus reproduction

The distinction must be explicit.

## Reproduction

Uses the original evidence or data.

```text
Original data
     ↓
Original/equivalent analysis
     ↓
Can the reported result be obtained?
```

Question:

> Can we obtain the original result again from the original evidence?

---

## Replication

Uses new evidence.

```text
Original finding
     ↓
New participants/data/observations
     ↓
Same or closely related scientific test
     ↓
Does the finding hold again?
```

Question:

> Does the original finding survive a new empirical test?

---

## Simple rule

```text
Same evidence
    → Reproduction

New evidence
    → Replication
```

---

# 2. Why replication matters

A single scientific finding may be affected by:

- Sampling variation
- Measurement noise
- Researcher degrees of freedom
- Statistical uncertainty
- Publication bias
- Selective reporting
- Context-specific effects
- Unusual samples
- Experimental artefacts
- Dataset-specific effects

Replication provides evidence about whether the finding is robust.

Conceptually:

```text
One study
    ↓
Evidence of a finding

Multiple independent tests
    ↓
Evidence about robustness
```

Replication does not guarantee truth.

It increases the evidence available for evaluating a claim.

---

# 3. Start with the scientific claim

Do not begin by copying the original methods section.

First identify the claim.

Extract:

```text
Original research question:
Original hypothesis:
Population:
Phenomenon/intervention:
Comparison:
Outcome:
Context:
Essential method:
Main result:
Interpretation:
```

Then formulate the target claim in one sentence.

Example:

> Working-memory training improves performance on untrained measures of attentional control in healthy adults.

This is the replication target.

---

# 4. Identify the replication target

Not every statement in a paper needs to be replicated.

A paper may contain:

```text
Primary hypothesis
Secondary hypothesis
Exploratory analyses
Subgroup analyses
Mechanistic interpretation
Post-hoc analyses
Supplementary analyses
```

The replication should identify which claim is being tested.

Prefer:

```text
Primary claim
```

over trying to reproduce every result in the original paper.

---

# 5. Define the target effect

Specify exactly what result is being replicated.

For example:

```text
Effect:
Training > Active control

Outcome:
Untrained attention score

Expected direction:
Positive

Effect measure:
Standardised mean difference

Original estimate:
d = 0.35

Original uncertainty:
95% CI = [0.10, 0.60]
```

Do not reduce the target to:

> "Get the same p-value."

The scientific target is the **effect and its interpretation**, not a particular significance threshold.

---

# 6. Identify essential components

Separate the original study into:

```text
Essential components
        vs
Flexible components
```

## Essential components

Features that define the scientific test.

Examples:

- Population
- Intervention
- Critical comparison
- Primary outcome
- Timing
- Key experimental manipulation
- Critical inclusion criteria

## Flexible components

Features that can change without destroying the scientific question.

Examples:

- Exact software version
- Minor interface differences
- Recruitment location
- Non-critical preprocessing details
- Formatting
- Administrative procedures

This distinction is critical when designing a replication.

---

# 7. Choose the replication type

Replication designs vary.

Common types include:

```text
Direct replication
Conceptual replication
Close replication
Extended replication
Multi-site replication
Cross-population replication
Cross-context replication
Registered replication
```

The appropriate design depends on the scientific question.

---

# 8. Direct replication

A direct replication attempts to reproduce the essential experimental conditions as closely as practical while collecting new evidence.

```text
Original design
     ↓
New participants/data
     ↓
Same core test
```

Goal:

> Test whether the original result appears again under closely matched conditions.

Useful when:

- The original effect is important
- Methodological fidelity is feasible
- The original paradigm is well documented
- The goal is robustness

---

# 9. Conceptual replication

A conceptual replication tests the same underlying hypothesis using a meaningfully different operationalisation.

Example:

Original:

```text
Task A
    ↓
Measures inhibitory control
```

Replication:

```text
Task B
    ↓
Measures the same theoretical construct
```

The scientific question is preserved while implementation changes.

Goal:

> Determine whether the underlying theoretical relationship survives a different operationalisation.

---

# 10. Close replication

A close replication preserves the central elements of the original design while allowing practical modifications.

Examples:

- Different laboratory
- Different participant pool
- Updated software
- Equivalent stimulus materials
- Improved measurement equipment

The key requirement is that modifications should not change the central scientific test.

---

# 11. Extended replication

An extended replication tests the original claim while adding a scientifically motivated condition.

Example:

```text
Original:
Healthy adults

Replication:
Healthy adults
+
Older adults
```

Or:

```text
Original:
Conventional MEG

Replication:
Conventional MEG
+
OPM-MEG
```

The extension should answer an additional scientific question.

Do not confuse:

```text
Replication
+
Scientific extension
```

with:

```text
Completely different study
```

---

# 12. Multi-site replication

A multi-site replication tests whether a finding survives variation between research environments.

Possible variation:

```text
Laboratory
Scanner
Equipment
Experimenter
Population
Recruitment
Geography
```

This is particularly valuable for:

- Clinical research
- Neuroimaging
- Machine learning
- Large behavioural effects
- Biomarker research

---

# 13. Cross-population replication

A finding may be replicated in a meaningfully different population.

Examples:

```text
Adults → Children
Healthy → Clinical
Young → Older
One language → Another language
One cultural group → Another
```

This can test both replication and generalisation.

Be explicit about whether the goal is:

```text
Same population replication
```

or:

```text
Generalisation to a new population
```

---

# 14. Cross-context replication

A finding may be tested under a different context.

Examples:

```text
Laboratory → Real-world environment

One narrative → Different narrative

One task → Different task

One session → Different session
```

The core claim should remain identifiable.

---

# 15. Define the replication question

A replication question should be narrower than the original paper's entire research agenda.

Weak:

> Can we replicate this paper?

Better:

> Does working-memory training improve untrained attentional-control performance relative to an active control condition?

Better still:

> Does adaptive working-memory training produce a positive improvement in untrained attentional-control performance relative to an active control in healthy adults?

The question should specify:

```text
Population
Intervention/exposure
Comparison
Outcome
Expected relationship
```

---

# 16. Preserve the scientific meaning

Replication requires preserving the **meaning** of the original test.

Suppose the original question is:

> Does semantic information influence neural activity during speech comprehension?

A replication should not silently change it into:

> Can we classify speech categories from neural activity?

Both involve speech and neural data, but they test different claims.

Therefore:

```text
Same topic
    ≠
Same scientific question
```

---

# 17. Determine what must remain constant

Before collecting data, create a replication specification.

Example:

```text
Population:
Healthy adults aged 18–35

Primary manipulation:
Working-memory training

Control:
Active control

Primary outcome:
Untrained attentional-control score

Primary hypothesis:
Training > control

Primary analysis:
Independent-samples comparison

Effect measure:
Hedges g

Direction:
Positive
```

This defines the replication target before seeing the new data.

---

# 18. Determine what may vary

Document planned differences.

Example:

```text
Original:
University laboratory

Replication:
Independent university laboratory

Original:
Software version X

Replication:
Software version Y

Original:
Sample N = 80

Replication:
Sample N = 120
```

For every difference ask:

> Could this change the scientific interpretation?

If yes, it must be explicitly justified.

---

# 19. Pre-registration

Replication studies should strongly consider preregistration.

Preregister:

```text
Research question
Hypothesis
Primary outcome
Primary analysis
Exclusion criteria
Sample size
Stopping rule
Statistical model
Effect measure
Secondary analyses
Exploratory analyses
```

The goal is to distinguish:

```text
Planned analysis
```

from:

```text
Analysis chosen after seeing the data
```

---

# 20. Avoid changing the hypothesis after seeing data

A replication should not become:

```text
Expected:
Positive effect

Observed:
No effect

Post-hoc:
Maybe the effect only exists in subgroup X
```

without clearly identifying the subgroup analysis as exploratory.

Use:

```text
Confirmatory analysis
```

for preregistered tests.

Use:

```text
Exploratory analysis
```

for analyses motivated after inspecting the data.

---

# 21. Sample-size planning

Replication studies should plan sample size before data collection.

Possible approaches include:

- Power analysis
- Precision-based planning
- Minimum detectable effect
- Bayesian design
- Sequential designs with predefined stopping rules

Avoid blindly using the original sample size.

The original study may have:

- Been underpowered
- Used a large effect estimate by chance
- Used an inefficient design

A replication should be designed for the evidence required by the question.

---

# 22. Do not automatically power for the original effect

Suppose:

```text
Original effect:
d = 0.80
```

A replication powered only for:

```text
d = 0.80
```

may be inappropriate if the original estimate was inflated.

Consider:

```text
Original effect
        ↓
Plausible effect range
        ↓
Smallest scientifically meaningful effect
        ↓
Sample-size target
```

The relevant target may be smaller than the original estimate.

---

# 23. Collect new evidence independently

The replication should use genuinely new evidence.

Examples:

```text
New participants
New recording session
New patient cohort
New dataset
New experimental observations
```

Do not accidentally reuse original participants when the goal is independent replication.

---

# 24. Independence matters

A nominally new study may not be independent if it:

- Reuses the original participants
- Reuses the same observations
- Uses overlapping datasets
- Reuses derived labels from the original study
- Tunes the analysis directly against the original test set

Document data provenance.

---

# 25. Follow the preregistered analysis

After data collection:

```text
Raw data
    ↓
Quality control
    ↓
Preprocessing
    ↓
Preregistered analysis
    ↓
Primary result
```

Avoid repeatedly modifying the primary analysis until the desired conclusion appears.

If deviations are necessary:

```text
Original plan
    ↓
Deviation
    ↓
Reason
    ↓
Impact
```

Report them transparently.

---

# 26. Compare effects, not just significance

Suppose:

```text
Original:
d = 0.40
p = .01

Replication:
d = 0.28
p = .08
```

It would be incorrect to conclude:

> Original significant, replication failed.

The replication estimate is positive and may be compatible with the original effect.

The difference could reflect:

- Sample size
- Sampling variation
- Measurement noise
- Smaller true effect

Therefore compare:

```text
Effect size
Confidence interval
Direction
Precision
```

not only:

```text
p < .05
```

---

# 27. Exact replication is not expected

Even if the underlying effect is real, estimates will vary.

Conceptually:

```text
True effect
    ↓
Original estimate
    ↓
Replication estimate
```

Both estimates contain sampling error.

Therefore:

```text
Original ≠ Replication
```

does not automatically mean:

```text
Finding false
```

---

# 28. Direction matters

A simple first check is:

```text
Original:
Positive

Replication:
Positive
```

This is more consistent with replication than:

```text
Original:
Positive

Replication:
Negative
```

But direction alone is insufficient.

Magnitude and uncertainty also matter.

---

# 29. Compare confidence intervals

Suppose:

```text
Original:
d = 0.40
95% CI [0.15, 0.65]

Replication:
d = 0.31
95% CI [0.02, 0.60]
```

These estimates are broadly compatible.

The replication does not need to reproduce exactly:

```text
d = 0.40
```

---

# 30. Replication success is not binary

Avoid reducing results to:

```text
Replicated
```

or:

```text
Failed
```

A more informative interpretation can distinguish:

```text
Strongly consistent
Broadly consistent
Partially consistent
Inconclusive
Inconsistent
Contradictory
```

---

# 31. Strongly consistent

Evidence may be strongly consistent when:

- Effect direction matches
- Effect magnitude is compatible
- Confidence interval overlaps the original plausible effect range
- Primary hypothesis is supported
- No major methodological differences explain the result

Interpretation:

> The new evidence provides strong support for the robustness of the original finding.

---

# 32. Broadly consistent

The replication may produce a smaller or less precise effect while remaining compatible with the original.

Example:

```text
Original:
d = 0.50

Replication:
d = 0.30
```

If uncertainty is substantial, this may still be consistent.

Interpretation:

> The replication provides broadly consistent evidence, although the estimated effect may be smaller than originally reported.

---

# 33. Partially consistent

Some components replicate while others do not.

Example:

```text
Primary behavioural effect
    ↓
Replicated

Neural mediation effect
    ↓
Not replicated
```

Do not label the entire paper:

> Replicated

or:

> Failed.

Identify which claim was supported.

---

# 34. Inconclusive

An inconclusive replication may occur when:

- Sample size is too small
- Confidence interval is very wide
- Data quality is poor
- Primary outcome is unreliable
- Design deviations are substantial

Inconclusive does not mean:

> No effect exists.

It means:

> The replication did not provide sufficiently precise evidence to determine whether the claim holds.

---

# 35. Inconsistent

Evidence is inconsistent when the replication estimate conflicts substantially with the original finding.

Example:

```text
Original:
Positive effect

Replication:
Near-zero effect
```

If the replication is sufficiently precise to exclude effects of the size originally reported, this becomes important evidence against the original estimate.

---

# 36. Contradictory

A replication may be contradictory when:

```text
Original:
Positive effect

Replication:
Reliable negative effect
```

This suggests more than simple sampling variation.

Possible explanations include:

- Context dependence
- Population differences
- Experimental differences
- Statistical artefacts
- Original false positive
- New false positive
- Moderation
- Measurement differences

The next step is investigation, not immediate dismissal.

---

# 37. Examine effect-size compatibility

Useful comparisons include:

```text
Original effect
Replication effect
Difference between effects
Confidence intervals
Prediction intervals where appropriate
```

For quantitative replication projects, consider formal methods for comparing effects.

Do not rely solely on whether each study individually crosses a significance threshold.

---

# 38. Bayesian interpretation

A Bayesian replication can ask:

> How much does the new evidence change our belief in the original claim?

For example:

```text
Prior evidence
      ↓
Original finding
      ↓
New replication data
      ↓
Updated evidence
```

Useful quantities may include:

- Bayes factors
- Posterior distributions
- Credible intervals
- Posterior probability of meaningful effects

Bayesian methods are particularly useful when distinguishing:

```text
Evidence for an effect
```

from:

```text
Evidence for no meaningful effect
```

---

# 39. Equivalence and smallest meaningful effect

A non-significant result does not automatically establish no effect.

If the scientific question is whether the effect is smaller than a meaningful threshold, consider:

```text
Smallest effect of interest
        ↓
Equivalence testing
```

Example:

```text
Meaningful effect:
|d| ≥ 0.20

Replication estimate:
d = 0.03
95% CI = [-0.08, 0.14]
```

This may provide evidence that any remaining effect is smaller than the predefined meaningful threshold.

---

# 40. Replication in neuroscience

Neuroscience replication requires special attention to:

- Participant variability
- Scanner differences
- Acquisition protocols
- Preprocessing pipelines
- ROI definitions
- Multiple comparisons
- Motion
- Signal-to-noise ratio
- Analysis flexibility
- Spatial normalisation
- Temporal filtering

A successful behavioural replication does not necessarily imply successful neural replication.

Separate claims should be evaluated separately.

---

# 41. Replication of neuroimaging findings

Suppose an original study reports:

> Increased activity in region X during semantic processing.

A replication should define:

```text
Region X
Contrast
Analysis space
Statistical threshold
Correction method
Primary outcome
```

Avoid changing the ROI after seeing the replication data.

If the original region does not replicate but a neighbouring region does, report that difference rather than silently redefining the target.

---

# 42. Replication of neural decoding

For neural decoding, specify:

```text
Input:
Neural signal

Target:
Stimulus / semantic category / speech feature

Training:
Participants / trials

Testing:
Independent data

Metric:
Accuracy / AUC / correlation / R²

Generalisation:
Within-subject / cross-subject / cross-session
```

A model that works within participants but fails across participants may still support the original within-participant claim.

It does not support the stronger claim:

> The representation generalises across participants.

---

# 43. Replication in psychology

Psychology replications should pay attention to:

- Sample characteristics
- Manipulation fidelity
- Demand characteristics
- Measurement reliability
- Control conditions
- Effect-size uncertainty
- Context
- Cultural differences
- Researcher degrees of freedom

A replication should distinguish:

```text
Failure to reproduce the exact procedure
```

from:

```text
Failure of the psychological hypothesis
```

---

# 44. Replication in clinical neuroscience

Clinical replication requires careful attention to:

- Patient heterogeneity
- Diagnostic criteria
- Disease stage
- Treatment exposure
- Clinical outcome definitions
- Missing data
- Attrition
- Site effects
- Scanner effects
- External validation

A finding replicated in one clinical population may not automatically generalise to another.

---

# 45. Replication in machine learning

Machine-learning replication should distinguish:

```text
Code reproduction
```

from:

```text
Empirical replication
```

Running the original code on the original dataset is not a replication.

A genuine ML replication may involve:

```text
Original claim
      ↓
New dataset
      ↓
Equivalent task
      ↓
Independent evaluation
```

Important issues include:

- Dataset leakage
- Train/test contamination
- Hyperparameter tuning
- Benchmark reuse
- Distribution shift
- External validation
- Random seeds
- Model stochasticity
- Preprocessing
- Feature engineering

---

# 46. Replication versus benchmark comparison

Suppose an original ML paper reports:

```text
Model A:
Accuracy = 92%
```

A new paper reports:

```text
Model B:
Accuracy = 94%
```

This is not necessarily a replication.

It may simply be a model comparison.

Replication requires testing the original scientific claim.

For example:

> Does the original model achieve similar performance on an independent dataset?

That is closer to a replication.

---

# 47. Common failure modes

## Failure 1: Replicating the wrong claim

Copying the paper's methods without identifying its primary scientific claim.

### Fix

Write the target claim in one sentence.

---

## Failure 2: Reusing original data

This is reproduction, not independent replication.

### Fix

Collect or identify genuinely new evidence.

---

## Failure 3: Treating p-value matching as replication

A different p-value does not automatically mean a different scientific conclusion.

### Fix

Compare effect sizes and uncertainty.

---

## Failure 4: Treating non-significance as no effect

A low-powered study can produce a non-significant result even when an effect exists.

### Fix

Evaluate precision and, where appropriate, equivalence.

---

## Failure 5: Changing the primary analysis after seeing data

This increases researcher degrees of freedom.

### Fix

Preregister the primary analysis.

---

## Failure 6: Overfitting the replication to the original result

Trying many analyses until one reproduces the original finding.

### Fix

Separate confirmatory and exploratory analyses.

---

## Failure 7: Changing too many methodological features

A substantially different experiment may no longer test the same claim.

### Fix

Identify essential components before designing the replication.

---

## Failure 8: Treating every difference as failure

Replication estimates naturally vary.

### Fix

Evaluate whether differences are compatible with sampling uncertainty.

---

## Failure 9: Ignoring contextual differences

A true effect may depend on:

- Population
- Context
- Task
- Time
- Measurement

### Fix

Investigate moderators rather than assuming one study must be wrong.

---

## Failure 10: Claiming generalisation from one replication

One successful replication does not establish universal generalisation.

### Fix

Treat replication as additional evidence.

---

# 48. Replication workflow

Use the following workflow:

```text
1. Identify original study
        ↓
2. Extract primary scientific claim
        ↓
3. Define replication target
        ↓
4. Identify essential components
        ↓
5. Identify flexible components
        ↓
6. Choose replication type
        ↓
7. Define population and evidence
        ↓
8. Define primary outcome
        ↓
9. Define effect measure
        ↓
10. Determine sample size
        ↓
11. Pre-register design
        ↓
12. Collect new evidence
        ↓
13. Perform quality control
        ↓
14. Execute primary analysis
        ↓
15. Report deviations
        ↓
16. Compare effect estimates
        ↓
17. Evaluate uncertainty
        ↓
18. Assess consistency
        ↓
19. Investigate discrepancies
        ↓
20. Separate confirmatory/exploratory findings
        ↓
21. Interpret replication
        ↓
22. Update evidence about the original claim
```

---

# 49. Replication report structure

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

# 50. Replication evidence table

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

# 51. Interpretation framework

After analysis, ask:

### Question 1

Did the effect point in the same direction?

### Question 2

Is the effect magnitude compatible?

### Question 3

Is the replication sufficiently precise?

### Question 4

Was the replication method sufficiently faithful?

### Question 5

Were there meaningful population/context differences?

### Question 6

Could methodological differences explain the discrepancy?

### Question 7

Does the new evidence change confidence in the original claim?

---

# 52. Updating confidence

A useful conceptual framework is:

```text
Original evidence
      ↓
Initial confidence
      ↓
Replication result
      ↓
Updated confidence
```

Possible outcomes:

```text
Confidence increases
Confidence remains similar
Confidence decreases
Confidence becomes uncertain
```

The purpose of replication is not to produce a binary verdict.

It is to improve the evidence base.

---

# 53. Replication and research gaps

Replication itself can reveal a new research gap.

For example:

```text
Original:
Positive effect

Replication:
Smaller effect

Question:
Why is the effect smaller?
```

This may reveal:

```text
Population gap
Context gap
Measurement gap
Methodological gap
Theoretical gap
```

Therefore:

```text
Replication
    ↓
New evidence
    ↓
Unexpected discrepancy
    ↓
New research question
```

Replication is not necessarily the endpoint of the research programme.

---

# 54. Relationship with other skills

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
New evidence
        ↓
Updated literature
```

### `paper-reading`

Understand the original study.

### `literature-review`

Understand the broader evidence.

### `research-gap`

Determine what remains unresolved.

### `research-reproduction`

Determine whether the original result can be obtained from the original evidence.

### `research-replication`

Determine whether the finding holds using new evidence.

---

# 55. Quality checklist

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

# 56. Final mental model

```text
ORIGINAL FINDING
       ↓
WHAT EXACTLY IS THE CLAIM?
       ↓
WHAT PART IS ESSENTIAL?
       ↓
WHAT SHOULD REMAIN THE SAME?
       ↓
WHAT CAN CHANGE?
       ↓
NEW EVIDENCE
       ↓
PRE-SPECIFIED TEST
       ↓
EFFECT + UNCERTAINTY
       ↓
COMPARE WITH ORIGINAL
       ↓
CONSISTENT?
       ↓
IF NOT:
WHY?
       ↓
UPDATED CONFIDENCE
       ↓
NEW SCIENTIFIC KNOWLEDGE
```

The central principle is:

> **A good replication does not ask whether the new study produced the same p-value. It asks whether new evidence supports, weakens, qualifies, or contradicts the original scientific claim.**
