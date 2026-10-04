# Meta-Analysis

A practical skill for quantitatively synthesising evidence across multiple research studies.

## Purpose

Use `meta-analysis` when the goal is to determine:

- What the combined evidence suggests
- How large an effect is on average
- How consistent results are across studies
- Why study results may differ
- Whether publication or reporting bias may affect the estimate
- How robust the conclusion is
- How certain the overall evidence should be

The central question is:

> **What does the combined quantitative evidence tell us about an effect, how variable is that evidence, and how much confidence should we place in the estimate?**

---

# What This Skill Does

This skill supports the process:

```text
Research question
      ↓
Eligibility criteria
      ↓
Study identification
      ↓
Study screening
      ↓
Data extraction
      ↓
Risk-of-bias assessment
      ↓
Effect-size extraction
      ↓
Effect-size harmonisation
      ↓
Statistical synthesis
      ↓
Pooled effect
      ↓
Heterogeneity
      ↓
Moderator analysis
      ↓
Publication bias
      ↓
Sensitivity analysis
      ↓
Evidence certainty
      ↓
Interpretation
```

The skill is designed to help with both:

```text
Conducting a meta-analysis
```

and:

```text
Reading / critically evaluating a published meta-analysis
```

---

# When to Use This Skill

Use it when:

- Combining quantitative results from multiple studies
- Planning a meta-analysis
- Reading a systematic review with quantitative synthesis
- Interpreting pooled effect sizes
- Comparing effect estimates across studies
- Investigating heterogeneity
- Evaluating publication bias
- Evaluating robustness of a pooled result
- Assessing whether a meta-analysis supports a research claim

Examples:

```text
What is the average effect of cognitive training
on working memory?

Do studies consistently show a relationship between
sleep and cognitive performance?

Does speech-language therapy improve aphasia outcomes
after stroke?

What is the pooled accuracy of an EEG-based
machine-learning classifier?
```

---

# When Not to Use This Skill

Do not automatically perform a meta-analysis simply because several papers exist.

A quantitative synthesis may be inappropriate when:

- Studies measure fundamentally different constructs
- Outcomes cannot be meaningfully compared
- Study populations are incompatible
- Interventions are fundamentally different
- Effect sizes cannot be obtained or estimated appropriately
- There are too few studies for the intended analysis
- The studies are not sufficiently independent
- The research question is primarily conceptual rather than quantitative

In such cases, consider:

```text
Narrative synthesis
```

or:

```text
Systematic review without quantitative pooling
```

instead.

---

# Meta-Analysis vs Related Skills

## Paper Reading

```text
paper-reading
      ↓
Understand ONE paper
```

It asks:

> What did this study do, find, and conclude?

---

## Literature Review

```text
literature-review
      ↓
Understand MANY papers
      ↓
Synthesize concepts and evidence
```

It asks:

> What does the literature collectively suggest?

---

## Meta-Analysis

```text
meta-analysis
      ↓
Quantitatively combine MANY studies
      ↓
Estimate pooled effects
```

It asks:

> What is the estimated effect across the available quantitative evidence?

---

## Critical Appraisal

```text
critical-appraisal
      ↓
Evaluate methodological quality
```

It asks:

> How trustworthy is the evidence?

These skills complement each other.

```text
Paper reading
      ↓
Critical appraisal
      ↓
Literature synthesis
      ↓
Meta-analysis
```

---

# The Most Important Distinction

Do not confuse:

```text
Average effect
```

with:

```text
Consistent effect
```

For example:

```text
Study 1 → +0.80
Study 2 → +0.70
Study 3 → +0.60
Study 4 → -0.10
Study 5 → -0.30
```

The pooled effect could still be positive.

But the studies disagree substantially.

Therefore:

```text
Pooled effect
+
Heterogeneity
```

must be interpreted together.

---

# Effect Sizes

Meta-analysis requires results that can be represented in a comparable quantitative form.

Common effect sizes include:

```text
Mean Difference
Standardised Mean Difference
Correlation
Odds Ratio
Risk Ratio
Hazard Ratio
Regression Coefficient
```

The correct effect size depends on:

- Research design
- Outcome type
- Measurement scale
- Study question
- Available statistics

Do not choose an effect size only because it is convenient.

---

# Study Weighting

Studies generally contribute according to the amount of information they provide.

Conceptually:

```text
More precise estimate
        ↓
Greater weight

Less precise estimate
        ↓
Smaller weight
```

But remember:

> Statistical precision is not the same thing as methodological quality.

A large biased study can still provide a highly precise but misleading estimate.

---

# Fixed-Effect and Random-Effects Models

Two important modelling perspectives are:

```text
Fixed-effect
```

and:

```text
Random-effects
```

The distinction concerns what we assume about the underlying effects across studies.

### Fixed-effect

```text
One common underlying effect
```

### Random-effects

```text
A distribution of underlying effects
```

The correct choice depends on the scientific question and assumptions.

Do not choose a model mechanically.

---

# Heterogeneity

Heterogeneity asks:

> How much do the results differ across studies?

Potential sources include:

```text
Population
Intervention
Outcome
Measurement
Age
Disease severity
Study design
Follow-up
Treatment intensity
Analysis
```

Common statistical quantities include:

```text
Q
I²
τ²
τ
```

However, no single heterogeneity statistic should be interpreted in isolation.

---

# Publication Bias

The observed literature may not contain every study that was conducted.

For example:

```text
Strong positive result
      ↓
More likely to be published

Null result
      ↓
Less likely to be published
```

This can distort the pooled estimate.

Possible approaches to investigate this include:

- Funnel plots
- Small-study effect analyses
- Statistical tests for asymmetry
- Searching grey literature
- Trial registries
- Comparing published and unpublished evidence

These approaches are not definitive proof of publication bias.

---

# Sensitivity Analysis

A good meta-analysis asks:

> Would the conclusion change under reasonable alternative assumptions?

Examples:

```text
Remove high-risk-of-bias studies
Remove influential studies
Leave-one-out analysis
Change model
Change effect-size assumptions
Exclude extreme studies
```

A conclusion that remains stable is more robust than one that depends heavily on a particular analytical decision.

---

# Risk of Bias

Meta-analysis does not eliminate bias.

If all included studies share the same methodological problem:

```text
Study 1 ── biased ──┐
Study 2 ── biased ──┤
Study 3 ── biased ──┼──→ biased pooled estimate
Study 4 ── biased ──┤
Study 5 ── biased ──┘
```

More studies do not automatically solve systematic bias.

Always consider:

- Selection bias
- Measurement bias
- Confounding
- Missing data
- Selective reporting
- Analysis choices
- Publication bias

---

# Reading a Published Meta-Analysis

When reading one, do not start with:

> "What is the pooled effect?"

Start with:

```text
1. What is the research question?
2. Which studies were eligible?
3. How were studies found?
4. What was excluded?
5. How were effects extracted?
6. Are effects comparable?
7. What synthesis model was used?
8. How heterogeneous are the studies?
9. Is publication bias plausible?
10. Are results robust?
11. How trustworthy are the included studies?
12. What does the pooled estimate actually mean?
```

Then interpret the forest plot and other analyses.

---

# Forest Plot

A forest plot usually represents:

```text
Study 1 ─────●─────
Study 2 ───●───────
Study 3 ───────●───
Study 4 ──●────────
Study 5 ─────●─────
             │
             │
        No-effect line
```

Each study typically shows:

```text
Point estimate
+
Confidence interval
```

The pooled estimate is commonly shown separately.

Look for:

- Direction of effects
- Precision
- Study weights
- Overlap of confidence intervals
- Differences between studies
- Pooled estimate
- Heterogeneity

---

# Practical Interpretation

Suppose:

```text
Pooled SMD = 0.32
95% CI = [0.20, 0.44]
```

A reasonable interpretation might be:

> The included studies suggest a positive average effect of approximately 0.32 standard deviations, with the estimated effect lying within the reported confidence interval under the model used.

Do not automatically translate this into:

> The treatment works for everyone.

Instead ask:

```text
How heterogeneous were the effects?

Were the studies at low risk of bias?

Was the outcome clinically meaningful?

Was there evidence of publication bias?

Was the result robust to sensitivity analyses?

Does the evidence generalise to the target population?
```

---

# A Good Meta-Analysis Note

When reading a meta-analysis, record:

```text
## Question

What is being synthesised?

## Eligibility

Which studies qualify?

## Search

How were studies identified?

## Included Evidence

How many studies and participants?

## Effect Size

What quantity is being pooled?

## Model

How were effects combined?

## Pooled Effect

What is the estimate?

## Uncertainty

What is the confidence interval?

## Heterogeneity

How different are the studies?

## Bias

Could the estimate be systematically distorted?

## Sensitivity

Does the conclusion remain stable?

## Risk of Bias

How trustworthy are the underlying studies?

## Interpretation

What does the evidence support?

## Limitations

What remains uncertain?
```

---

# Domain Adaptation

The basic framework remains the same across disciplines.

## Neuroscience

Pay particular attention to:

- Neuroimaging modality
- Brain regions
- Analysis pipelines
- Spatial definitions
- Multiple comparisons
- Reverse inference
- Sample characteristics

## Psychology

Pay particular attention to:

- Construct validity
- Measurement reliability
- Task differences
- Participant populations
- Effect-size definitions
- Publication bias
- Replication

## Clinical Neuroscience

Pay particular attention to:

- Clinical outcomes
- Patient heterogeneity
- Treatment exposure
- Follow-up
- Attrition
- Risk of bias
- Clinical significance
- External validity

## Machine Learning

Pay particular attention to:

- Evaluation metrics
- Dataset dependence
- Model comparisons
- Validation procedures
- Data leakage
- Generalisation
- Benchmark differences
- Publication and reporting bias

---

# Quality Criteria

A strong meta-analysis should make it possible to understand:

```text
What was asked?
        ↓
What evidence was included?
        ↓
How were effects represented?
        ↓
How were effects combined?
        ↓
How variable were they?
        ↓
Could bias explain the result?
        ↓
Does the conclusion survive sensitivity analysis?
        ↓
How certain is the evidence?
```

A weak meta-analysis may provide an impressive pooled number while leaving these questions unclear.

---

# Core Principle

The final interpretation should combine:

```text
Pooled effect
      +
Confidence interval
      +
Heterogeneity
      +
Risk of bias
      +
Publication bias
      +
Sensitivity analysis
      +
Clinical / scientific importance
      ↓
Overall conclusion
```

Never interpret the pooled effect alone.

---

# Final Mental Model

Think of meta-analysis as:

```text
MANY STUDIES
     ↓
MAKE RESULTS COMPARABLE
     ↓
QUANTIFY EACH EFFECT
     ↓
WEIGHT THE EVIDENCE
     ↓
POOL THE EFFECTS
     ↓
ASK HOW MUCH THEY DIFFER
     ↓
ASK WHY THEY DIFFER
     ↓
CHECK FOR BIAS
     ↓
TEST ROBUSTNESS
     ↓
CALIBRATE CONFIDENCE
     ↓
INTERPRET SCIENTIFIC / CLINICAL MEANING
```

The goal is not to produce the largest or most significant pooled effect.

The goal is to produce the **most defensible quantitative synthesis of the available evidence**.
