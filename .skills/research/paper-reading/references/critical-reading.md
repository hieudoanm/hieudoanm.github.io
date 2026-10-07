# Critical Reading

A practical framework for questioning the assumptions, evidence, analysis, interpretation, and conclusions of an individual research paper.

## Purpose

Critical reading does not mean finding faults with a paper.

It means asking:

> **How strongly does the evidence support the claims being made?**

A strong critical reader can simultaneously recognise that:

```text
A paper can be valuable
        AND
A paper can have important limitations.
```

The goal is calibrated scientific judgment.

---

# 1. The Core Question

For every major claim, ask:

```text
What is the claim?
        ↓
What evidence supports it?
        ↓
How was that evidence produced?
        ↓
What assumptions are required?
        ↓
What alternative explanations exist?
        ↓
How confident should I be?
```

This is the foundation of critical reading.

---

# 2. Claim–Evidence–Inference

Separate three things.

## Claim

What the authors say.

```text
Semantic information is represented by brain region X.
```

## Evidence

What the study actually observed.

```text
Activity in region X differed between semantic and control conditions.
```

## Inference

What the authors infer from the evidence.

```text
Region X contributes to semantic processing.
```

These are not equivalent.

A critical reader asks whether the inference follows from the evidence.

---

# 3. Evidence Chain

Trace important conclusions backwards:

```text
Conclusion
    ↑
Interpretation
    ↑
Statistical result
    ↑
Analysis
    ↑
Measurement
    ↑
Study design
    ↑
Research question
```

A weakness anywhere in this chain can affect confidence in the final conclusion.

For example:

```text
Conclusion:
Treatment improves language recovery.

Evidence:
Treatment group improved more than control.

Question:
Were groups randomised?

Question:
Was baseline severity equivalent?

Question:
Could spontaneous recovery explain part of the improvement?
```

The purpose is to identify which links are well supported.

---

# 4. Research Question

First determine whether the study actually tests the question it claims to address.

Ask:

- Is the question clearly defined?
- Is it testable?
- Are the variables operationalised?
- Does the design allow the question to be answered?
- Is the question broader than the experiment?

For example:

```text
Question:
Does X cause Y?

Design:
Observational correlation.

Problem:
The design may establish association but not causation.
```

---

# 5. Hypothesis

Evaluate whether the hypothesis is:

- Clearly stated
- Testable
- Specific
- Falsifiable
- Consistent with the theory
- Matched to the analysis

Also distinguish:

```text
Pre-specified hypothesis
```

from:

```text
Post-hoc explanation
```

A convincing explanation discovered after looking at the data may be useful for generating hypotheses, but should not automatically be treated as confirmatory evidence.

---

# 6. Sampling

Ask:

```text
Who was studied?
Who was not studied?
How were participants recruited?
Why might they differ from the target population?
```

Important issues include:

- Small samples
- Convenience sampling
- Selection bias
- Volunteer bias
- Attrition
- Demographic imbalance
- Clinical heterogeneity
- Single-site recruitment

## Generalisability

Distinguish:

```text
Sample
    ↓
Study population
    ↓
Target population
```

Evidence from one population does not automatically generalise to another.

For example:

```text
University students
    ≠
All adults
```

and:

```text
Patients from one specialist clinic
    ≠
All patients with the condition
```

---

# 7. Sample Size

A larger sample is not automatically better, but sample size affects uncertainty and statistical power.

Ask:

- Was sample size justified?
- Was a power analysis performed?
- How many participants were excluded?
- How many observations were actually analysed?
- Was the analysis powered for the primary outcome?
- Are repeated observations being mistaken for independent participants?

Be particularly careful with:

```text
Large number of observations
```

when the true number of independent experimental units is small.

---

# 8. Experimental Design

Ask whether the design isolates the variable of interest.

Look for:

- Control conditions
- Randomisation
- Counterbalancing
- Blinding
- Within-subject controls
- Between-subject controls
- Manipulation checks
- Baseline measurements

A useful question is:

> **What else changed between the conditions?**

If multiple factors changed simultaneously, the causal interpretation becomes weaker.

---

# 9. Confounding

A confound is a variable that can provide an alternative explanation for the observed relationship.

For example:

```text
Observed:

Language condition
        ↓
Higher brain activity
```

Possible confound:

```text
Language condition
        ↓
Greater task difficulty
        ↓
Higher attention
        ↓
Higher brain activity
```

The observed neural difference may therefore not uniquely reflect language processing.

Always ask:

> **What else could have caused this result?**

---

# 10. Measurement Validity

A study may measure something precisely without measuring the intended construct.

Distinguish:

```text
Measurement reliability
```

from:

```text
Measurement validity
```

### Reliability

Would the measurement be similar under repeated measurement?

### Validity

Does the measurement actually represent the construct?

For example:

```text
Reaction time
```

may reflect:

- Processing speed
- Attention
- Motor speed
- Decision threshold
- Strategy

Therefore:

```text
Reaction time
    ≠
Pure measure of cognition
```

Interpret the measure in context.

---

# 11. Construct Validity

Ask:

> Does the operational definition capture the theoretical concept?

Examples:

```text
"Intelligence"
    ↓
One short cognitive test
```

or:

```text
"Language ability"
    ↓
One vocabulary task
```

or:

```text
"Semantic processing"
    ↓
One behavioural contrast
```

A narrow measure may provide useful evidence without capturing the entire construct.

---

# 12. Causality

Be cautious with causal language.

Common warning patterns:

```text
X is associated with Y
```

being interpreted as:

```text
X causes Y
```

or:

```text
X predicts Y
```

being interpreted as:

```text
X explains Y
```

A useful hierarchy is:

```text
Association
    ↓
Prediction
    ↓
Temporal relationship
    ↓
Experimental manipulation
    ↓
Causal inference
```

The exact strength depends on study design and assumptions.

---

# 13. Statistical Analysis

Ask whether the statistical model matches the data.

Consider:

- Variable distributions
- Independence
- Repeated measurements
- Nested data
- Missing data
- Outliers
- Model assumptions
- Multiple comparisons
- Statistical power
- Model specification

For repeated-measures neuroscience or psychology data, for example:

```text
Trials
  ↓
Nested within participants
```

Treating every trial as an independent participant can produce misleadingly precise estimates.

---

# 14. Multiple Comparisons

Be cautious when researchers test many hypotheses.

For example:

```text
100 brain regions
×
10 conditions
×
5 outcomes
```

can produce a large number of statistical comparisons.

Even if every test uses:

```text
α = .05
```

some apparently significant results may occur by chance.

Look for:

- Correction procedures
- Pre-specified primary outcomes
- Family-wise error control
- False discovery rate
- Permutation methods
- Independent validation

The more analyses performed, the more important multiplicity becomes.

---

# 15. P-Hacking and Researcher Degrees of Freedom

Researchers may have many analytical choices.

For example:

```text
Which participants to exclude?
Which trials to remove?
Which preprocessing method?
Which outcome?
Which time window?
Which brain region?
Which statistical model?
Which covariates?
```

If these decisions are made after inspecting results, false-positive risk can increase.

Look for evidence of:

- Pre-registration
- Registered reports
- Analysis plans
- Transparent exclusions
- Robustness analyses
- Replication
- Open data/code

Do not assume flexibility means misconduct.

The key question is:

> **How transparently were analytical decisions made?**

---

# 16. Effect Size vs Statistical Significance

Do not equate:

```text
Statistically significant
```

with:

```text
Scientifically important
```

Consider:

```text
Effect size
+
Uncertainty
+
Sample size
+
Scientific relevance
```

For example:

```text
p < .001
```

does not tell you whether an effect is:

```text
Tiny
Moderate
Large
```

or whether it matters scientifically.

---

# 17. Confidence Intervals

Confidence intervals provide information about uncertainty.

Instead of focusing only on:

```text
p = .03
```

look for:

```text
Estimated effect
95% confidence interval
```

Ask:

- How large could the effect plausibly be?
- Does the interval include practically important values?
- Is the estimate precise?
- Is the direction of the effect stable?

A wide interval may indicate substantial uncertainty even when the result is statistically significant.

---

# 18. Null Results

A non-significant result does not automatically mean:

```text
There is no effect.
```

Possible explanations include:

- No meaningful effect
- Insufficient power
- Noisy measurement
- Poor manipulation
- High variability
- Inappropriate analysis
- Effect smaller than detectable threshold

Ask:

> What conclusions can actually be drawn from the uncertainty?

---

# 19. Model Assumptions

For computational and statistical models, identify assumptions explicitly.

Examples:

```text
Linear regression
    ↓
Assumptions about relationships and errors

Bayesian model
    ↓
Prior assumptions

Drift-diffusion model
    ↓
Assumptions about evidence accumulation

Neural network
    ↓
Assumptions about representation and optimisation
```

A model is not simply a neutral calculator.

Its assumptions shape the interpretation.

---

# 20. Model Comparison

When a paper claims that one model is better, ask:

- Better according to what metric?
- Compared with which baseline?
- Is the comparison fair?
- Are model complexities different?
- Was the comparison performed on held-out data?
- Does better prediction imply a better explanation?

For example:

```text
Model A accuracy = 91%
Model B accuracy = 89%
```

does not automatically establish:

```text
Model A is a better theory.
```

Prediction and explanation are different goals.

---

# 21. Machine Learning: Generalisation

For computational papers, one of the most important questions is:

> **Does the model work beyond the data it was trained on?**

Check:

```text
Training set
Validation set
Test set
```

Look for:

- Data leakage
- Participant overlap
- Subject leakage
- Temporal leakage
- Hyperparameter tuning on the test set
- Cross-validation
- External validation

A model that performs well on familiar data may not generalise.

---

# 22. Neuroimaging: Spatial Inference

For neuroimaging papers, ask:

- How were regions defined?
- Was the region defined independently of the result?
- Was the analysis whole-brain or ROI-based?
- How were multiple comparisons handled?
- What spatial resolution was available?
- What does the measured signal actually represent?

Be cautious about statements such as:

```text
Region X was activated
```

being interpreted as:

```text
Region X performs cognitive function Y.
```

Brain activity is rarely one-to-one with a single cognitive process.

---

# 23. Neuroimaging: Reverse Inference

Reverse inference occurs when researchers observe activity associated with a brain region and infer a specific mental process from that activity.

For example:

```text
Region X is active.

Region X has been associated with process Y.

Therefore:
The participant is performing process Y.
```

This reasoning can be weak because a region may participate in many processes.

Ask:

> Is the observed neural activity specific enough to support the claimed cognitive interpretation?

---

# 24. Computational Neuroscience

For computational neuroscience, examine three layers separately:

```text
Mathematical model
        ↓
Computational interpretation
        ↓
Biological interpretation
```

A model can fit behaviour well without necessarily providing a biologically realistic mechanism.

Ask:

- Which parameters correspond to biological processes?
- Are parameters identifiable?
- Could multiple parameter combinations produce the same behaviour?
- Does the model outperform simpler alternatives?
- Are simulations consistent with empirical observations?

---

# 25. Clinical Research

Clinical studies require additional caution.

Ask:

```text
Who are the patients?
How was the condition diagnosed?
How severe is it?
What treatment did they receive?
What was the control condition?
What outcome was measured?
When was it measured?
Is the effect clinically meaningful?
```

Distinguish:

```text
Statistical improvement
```

from:

```text
Clinically meaningful improvement
```

A small statistically significant change may not meaningfully improve a patient's daily functioning.

---

# 26. Author Limitations vs Your Limitations

Record two categories.

### Authors say:

```text
Small sample.
```

### You notice:

```text
Participants were recruited from a specialised clinic,
which may limit generalisability.
```

Both are useful.

Do not assume the limitations section is exhaustive.

---

# 27. Alternative Explanations

For every important result, generate at least one plausible alternative explanation when possible.

Template:

```text
Observed:
X changed when Y changed.

Authors' explanation:
Y caused X.

Alternative:
Z may have changed alongside Y and could explain X.
```

Then ask:

> Did the study measure or control Z?

If not, causal confidence should decrease.

---

# 28. Robustness

A strong finding should ideally survive reasonable analytical changes.

Look for:

- Sensitivity analyses
- Alternative preprocessing
- Alternative statistical models
- Different exclusion criteria
- Different parameter settings
- Cross-validation
- Independent replication
- External datasets

A useful question is:

> **Would the conclusion change if a reasonable analytical choice changed?**

---

# 29. Reproducibility

Look for:

```text
Open data
Open code
Analysis scripts
Pre-registration
Detailed methods
Public materials
Independent replication
```

Reproducibility does not determine whether a finding is true.

However, transparency makes findings easier to inspect, reproduce, and challenge.

---

# 30. Generalisability

Ask how far the findings can reasonably be extended.

Consider:

```text
Participants
        ↓
Population
        ↓
Task
        ↓
Real-world behaviour
        ↓
Clinical application
```

Each step may require additional evidence.

For example:

```text
Laboratory task
    ≠
Everyday language use
```

and:

```text
Healthy participants
    ≠
Stroke patients
```

and:

```text
One language
    ≠
All languages
```

---

# 31. Common Reasoning Errors

Watch for:

### Correlation → causation

```text
X correlates with Y
→ X causes Y
```

### Prediction → explanation

```text
X predicts Y
→ X explains Y
```

### Significance → importance

```text
p < .05
→ important finding
```

### Brain region → function

```text
Region X active
→ region X performs function Y
```

### Group difference → mechanism

```text
Group A differs from Group B
→ mechanism causing difference is known
```

### Model performance → theory

```text
Model predicts well
→ model is the correct explanation
```

### Lack of significance → absence

```text
p > .05
→ no effect exists
```

These shortcuts should trigger closer examination.

---

# 32. Confidence Calibration

Avoid binary judgments such as:

```text
True
False
```

Prefer calibrated language:

```text
Strong evidence
Moderate evidence
Suggestive evidence
Limited evidence
Uncertain
Unsupported
```

Example:

```text
Strong:
The experiment directly manipulated X and measured Y.

Suggestive:
The observed association is consistent with the proposed mechanism.

Weak:
The study provides limited evidence for a causal relationship.
```

The strength of your language should match the strength of the evidence.

---

# 33. A Critical Reading Checklist

Before finishing, ask:

```text
□ Is the research question clear?
□ Is the hypothesis testable?
□ Does the design answer the question?
□ Is the sample appropriate?
□ Is the sample size adequate?
□ Are the measurements valid?
□ Are important confounds controlled?
□ Is the analysis appropriate?
□ Are repeated observations handled correctly?
□ Are multiple comparisons addressed?
□ Are effect sizes reported?
□ Is uncertainty reported?
□ Are null results considered?
□ Are alternative explanations plausible?
□ Are conclusions stronger than the evidence?
□ Is the finding generalisable?
□ Are computational models appropriately validated?
□ Is the work reproducible?
□ What remains uncertain?
```

---

# 34. Final Critical Reading Framework

For each major claim, complete:

```text
CLAIM
What are the authors saying?

        ↓

EVIDENCE
What did they actually observe?

        ↓

METHOD
How was the evidence generated?

        ↓

ASSUMPTIONS
What must be true for the interpretation to hold?

        ↓

ALTERNATIVES
What else could explain the result?

        ↓

LIMITATIONS
What weakens the inference?

        ↓

CONFIDENCE
How strongly should I believe the claim?

        ↓

CONTRIBUTION
What does the paper nevertheless add?
```

The goal of critical reading is not to conclude that a paper is "good" or "bad."

It is to determine:

> **Which claims are strongly supported, which are plausible interpretations, which remain uncertain, and why.**

```

```
