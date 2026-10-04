---
name: meta-analysis
description: Systematically synthesize quantitative evidence across multiple studies by defining eligibility criteria, extracting comparable effect sizes, estimating pooled effects, evaluating heterogeneity and bias, conducting sensitivity analyses, and interpreting the strength and generalisability of the evidence.
---

# Meta-Analysis

## Purpose

Use this skill to conduct, understand, or critically evaluate a **quantitative synthesis of results from multiple research studies**.

A meta-analysis asks:

> **What does the combined quantitative evidence across studies suggest about an effect, how consistent is that evidence, and how certain should we be?**

It goes beyond asking:

> "What did each paper find?"

Instead, it asks:

```text
Multiple studies
      ↓
Comparable evidence
      ↓
Effect sizes
      ↓
Statistical synthesis
      ↓
Pooled estimate
      ↓
Heterogeneity
      ↓
Bias
      ↓
Sensitivity / robustness
      ↓
Overall interpretation
```

A meta-analysis is therefore not simply:

```text
Study 1 + Study 2 + Study 3
```

It is a structured statistical synthesis of evidence.

---

# Core Principle

> **Do not treat every study as equally informative, and do not treat a pooled effect as meaningful without examining heterogeneity, bias, study quality, and the comparability of the underlying evidence.**

A pooled estimate is only as meaningful as the assumptions and evidence supporting it.

---

# 1. Meta-Analysis vs Literature Review

A literature review asks:

> What does the literature collectively suggest?

A meta-analysis additionally asks:

> Can results from multiple studies be represented quantitatively and statistically combined?

Conceptually:

```text
Literature review
      ↓
Identify studies
      ↓
Compare findings
      ↓
Synthesize evidence
```

Whereas:

```text
Meta-analysis
      ↓
Identify studies
      ↓
Extract comparable effects
      ↓
Standardise effect sizes
      ↓
Weight studies
      ↓
Pool effects
      ↓
Estimate heterogeneity
      ↓
Evaluate bias
      ↓
Test robustness
```

A meta-analysis is therefore often part of a broader systematic review rather than a replacement for one.

---

# 2. Core Workflow

Use the following workflow:

```text
1. Define research question
        ↓
2. Define eligibility criteria
        ↓
3. Develop search strategy
        ↓
4. Identify studies
        ↓
5. Screen studies
        ↓
6. Extract data
        ↓
7. Assess study quality / risk of bias
        ↓
8. Select effect-size measure
        ↓
9. Convert results to comparable effects
        ↓
10. Estimate study-level uncertainty
        ↓
11. Choose synthesis model
        ↓
12. Estimate pooled effect
        ↓
13. Assess heterogeneity
        ↓
14. Investigate moderators
        ↓
15. Assess publication / reporting bias
        ↓
16. Conduct sensitivity analyses
        ↓
17. Interpret clinical / scientific importance
        ↓
18. Evaluate certainty of evidence
        ↓
19. Report limitations
        ↓
20. Draw calibrated conclusions
```

---

# 3. Define the Research Question

Start with a precise question.

A useful structure is:

```text
Population
Intervention / Exposure
Comparator
Outcome
Study design
```

For example:

> Among adults with aphasia after stroke, does speech-language therapy improve language outcomes compared with usual care or no treatment?

This determines which studies belong in the synthesis.

---

# 4. Define Eligibility Before Looking at Results

Eligibility criteria should be specified independently of whether a study reports a desirable result.

Define:

```text
Population
Intervention / exposure
Comparator
Outcome
Study design
Publication period
Language restrictions
Follow-up period
```

Avoid changing eligibility criteria simply because the initial results are inconvenient.

---

# 5. Study Identification

A meta-analysis depends on finding an appropriate set of studies.

The search strategy may include:

```text
Database searching
        +
Reference-list searching
        +
Citation chaining
        +
Preprint searching
        +
Trial registries
        +
Grey literature
```

The objective is not merely to find many studies.

It is to reduce the chance that relevant evidence has been systematically missed.

---

# 6. Screening

Screen studies in stages:

```text
Search results
      ↓
Remove duplicates
      ↓
Title / abstract screening
      ↓
Full-text screening
      ↓
Eligible studies
```

Document exclusion reasons at the full-text stage.

For example:

```text
Wrong population
Wrong intervention
Wrong outcome
Wrong design
Insufficient data
Duplicate dataset
```

---

# 7. Avoid Double-Counting Evidence

Multiple papers may use:

```text
The same participants
```

or:

```text
The same dataset
```

If treated as independent studies, the evidence may be counted more than once.

Check:

- Authors
- Recruitment dates
- Sample sizes
- Institutions
- Datasets
- Clinical trials
- Cohort descriptions

The independent unit is the **study or independent sample**, not necessarily the publication.

---

# 8. Data Extraction

Create a structured evidence table.

At minimum extract:

```text
Citation
Population
Sample size
Study design
Intervention / exposure
Comparator
Outcome
Measurement instrument
Time point
Effect estimate
Effect-size type
Standard error / variance
Risk of bias
Relevant moderators
```

For intervention studies also record:

```text
Treatment duration
Treatment intensity
Control condition
Follow-up
Adherence
```

For observational studies also record:

```text
Exposure definition
Covariates
Adjustment strategy
Study design
Potential confounders
```

---

# 9. Effect Sizes

Studies may report results using different statistics.

For example:

```text
Mean difference
Standardised mean difference
Correlation
Odds ratio
Risk ratio
Hazard ratio
Regression coefficient
```

A meta-analysis often converts these into a common effect-size representation.

The key question is:

> **What quantity represents the scientific effect consistently across studies?**

Do not combine statistics simply because they are numerically available.

---

# 10. Effect-Size Direction

Define the direction before synthesis.

For example:

```text
Positive effect
=
better language outcome after treatment
```

Then ensure every study follows the same convention.

Otherwise:

```text
Study A: positive = improvement

Study B: positive = worsening
```

could cancel each other incorrectly.

Always check:

```text
Outcome direction
Group ordering
Reference category
Coding
Transformation
```

---

# 11. Study Weighting

Meta-analysis generally gives studies different weights.

A study with a more precise estimate contributes more information than a highly uncertain estimate.

Conceptually:

```text
Precise study
      ↓
larger weight

Imprecise study
      ↓
smaller weight
```

Weighting depends on:

```text
Effect estimate
+
Within-study uncertainty
+
Meta-analysis model
```

Do not interpret:

```text
Large sample
```

as automatically meaning:

```text
High-quality study
```

Precision and methodological quality are related but distinct concepts.

---

# 12. Fixed-Effect vs Random-Effects Thinking

A central question is whether studies are assumed to estimate:

```text
One common underlying effect
```

or:

```text
A distribution of related effects
```

### Fixed-effect model

Conceptually:

```text
One true effect
     ↓
Studies estimate that same effect
```

### Random-effects model

Conceptually:

```text
Different studies
      ↓
Different underlying effects
      ↓
Distribution of effects
```

In many scientific applications, especially heterogeneous behavioural and clinical research, random-effects models are often relevant.

However:

> **Do not choose a random-effects model simply because it is the default.**

The model should follow the scientific question and assumptions.

---

# 13. Pooled Effect

After calculating comparable effect sizes, estimate the pooled effect.

Conceptually:

```text
Study 1 ──┐
Study 2 ──┤
Study 3 ──┤──→ Pooled effect
Study 4 ──┤
Study 5 ──┘
```

The pooled estimate answers:

> What is the overall estimated effect across the included evidence?

It does not necessarily describe every individual study or population.

---

# 14. Confidence Interval

Always inspect uncertainty around the pooled effect.

For example:

```text
Pooled effect = 0.32
95% CI = [0.20, 0.44]
```

Interpret both:

```text
Magnitude
```

and:

```text
Precision
```

A narrow interval indicates greater precision than a very wide interval.

---

# 15. Heterogeneity

One of the most important parts of meta-analysis is asking:

> **How consistent are the study results?**

Studies may differ in:

```text
Population
Intervention
Outcome
Measurement
Age
Disease severity
Follow-up
Study design
Analysis
Context
```

Therefore, a pooled effect may hide meaningful differences.

---

# 16. Statistical Heterogeneity

Common measures include:

```text
Q statistic
I²
τ²
τ
```

Conceptually:

```text
Observed variation
        ↓
How much is expected from sampling error?
        ↓
How much may reflect real differences
between studies?
```

Do not interpret I² in isolation.

A high I² does not automatically mean that the meta-analysis is invalid.

A low I² does not automatically mean that studies are scientifically identical.

---

# 17. Explore Heterogeneity

When studies differ, ask why.

Potential moderators include:

```text
Age
Sex
Disease severity
Intervention intensity
Treatment duration
Measurement instrument
Follow-up time
Study quality
Publication year
Clinical setting
```

This leads to:

```text
Moderator analysis
```

or:

```text
Meta-regression
```

But moderator analyses should generally be treated cautiously, especially when based on few studies.

---

# 18. Subgroup Analysis

A subgroup analysis asks whether effects differ between predefined groups.

For example:

```text
Adults
vs
Children
```

or:

```text
Acute stroke
vs
Chronic stroke
```

Prefer theoretically motivated subgroup analyses.

Avoid repeatedly searching for subgroups until something appears significant.

---

# 19. Meta-Regression

Meta-regression examines whether study-level characteristics are associated with differences in effect size.

Conceptually:

```text
Effect size
    ↑
    │       ●
    │    ●
    │  ●
    │ ●
    └────────────→ Treatment intensity
```

Possible moderators:

```text
Age
Treatment duration
Sample characteristics
Publication year
Measurement method
```

Important limitation:

> Study-level relationships do not necessarily describe individual-level relationships.

This is related to the ecological fallacy.

---

# 20. Publication Bias

Ask:

> Are studies with certain results more likely to become visible?

For example:

```text
Strong positive result
      ↓
More likely to be published
```

while:

```text
Null result
      ↓
Less likely to be published
```

If so, the available literature may overestimate the underlying effect.

---

# 21. Small-Study Effects

Smaller studies can sometimes show systematically different effects from larger studies.

Investigate:

```text
Study size
vs
Effect size
```

using appropriate diagnostic methods.

Do not automatically label every asymmetry as publication bias.

Other explanations include:

- True heterogeneity
- Methodological differences
- Measurement differences
- Chance

---

# 22. Funnel Plots

A funnel plot commonly displays:

```text
Effect size
        vs
Precision
```

A roughly symmetrical pattern may be reassuring.

Asymmetry may indicate:

```text
Publication bias
```

but also:

```text
Heterogeneity
Small-study effects
Methodological differences
Chance
```

Therefore:

> Funnel-plot asymmetry is a signal to investigate, not proof of publication bias.

---

# 23. Sensitivity Analysis

Ask:

> **Would the conclusion change if reasonable analytical decisions changed?**

Possible analyses:

```text
Remove high-risk-of-bias studies
Remove influential studies
Change effect-size assumptions
Change model specification
Leave-one-out analysis
Exclude extreme outliers
Compare fixed-effect and random-effects results
```

If the conclusion survives reasonable alternatives, confidence increases.

---

# 24. Influence Analysis

One study may dominate the pooled estimate.

Check:

```text
What happens if Study X is removed?
```

Conceptually:

```text
All studies
    ↓
Pooled effect = 0.40

Remove influential study
    ↓
Pooled effect = 0.25
```

The overall conclusion may therefore depend heavily on one study.

That should be reported.

---

# 25. Risk of Bias

A meta-analysis combines studies, but combining biased studies does not automatically remove bias.

Assess:

```text
Selection
Measurement
Confounding
Missing data
Outcome reporting
Analysis
Selective reporting
```

Then ask:

> Are studies with higher risk of bias systematically producing different effects?

Study quality should be part of interpretation, not merely a checkbox in a supplementary table.

---

# 26. Evidence Certainty

A statistically significant pooled effect is not automatically strong evidence.

Consider:

```text
Risk of bias
      +
Inconsistency
      +
Imprecision
      +
Indirectness
      +
Publication bias
```

The final evidence may be:

```text
Strong
Moderate
Limited
Very uncertain
```

depending on the framework being used.

---

# 27. Clinical or Scientific Importance

Do not stop at:

```text
Pooled effect ≠ 0
```

Ask:

> **Is the effect large enough to matter?**

For clinical research, compare against:

```text
Minimal clinically important difference
```

For neuroscience and psychology, consider:

```text
Practical magnitude
Measurement reliability
Theoretical importance
Replicability
Generalisation
```

Statistical significance is only one component of interpretation.

---

# 28. Avoid Overinterpreting the Pooled Effect

Suppose:

```text
Pooled effect = 0.35
```

Do not automatically conclude:

> "The intervention works for everyone."

A more appropriate interpretation may be:

> Across the included studies, the intervention was associated with a positive average effect, although the magnitude varied between studies.

Then ask:

```text
For whom?
Under what conditions?
Measured how?
Compared with what?
For how long?
```

---

# 29. Correlation-Based Meta-Analysis

Suppose studies report:

```text
r = 0.20
r = 0.35
r = 0.42
r = 0.10
```

These correlations may require an appropriate transformation before synthesis.

For example:

```text
Observed correlation
      ↓
Effect-size transformation
      ↓
Meta-analysis
      ↓
Back-transform for interpretation
```

Do not simply average raw correlations without considering their statistical properties.

---

# 30. Standardised Mean Differences

Suppose studies measure the same construct using different instruments.

For example:

```text
Study A → Language Test A
Study B → Language Test B
Study C → Language Test C
```

A standardised effect may allow comparison.

Conceptually:

```text
Difference between groups
        ÷
Within-study variability
```

This creates an effect expressed in standard deviation units.

But standardisation can make interpretation less intuitive.

Always return to the original clinical or psychological meaning.

---

# 31. Dependent Effects

A study may report multiple outcomes:

```text
Naming
Comprehension
Fluency
Reading
Writing
```

These effect sizes may not be statistically independent.

Treating every effect as independent can give that study excessive weight.

Possible approaches include:

```text
Select one outcome
Aggregate outcomes
Model dependence explicitly
Use multilevel / multivariate methods
```

The correct choice depends on the research question and available information.

---

# 32. Final Evidence Record

A useful meta-analysis evidence record should contain:

```text
## Research Question

What relationship or intervention effect is being
quantitatively synthesised?

## Eligibility

Which studies were included and why?

## Search

How were relevant studies identified?

## Included Studies

How many studies and participants were included?

## Effect Size

What common effect-size measure was used?

## Model

Fixed-effect or random-effects, with justification.

## Pooled Effect

What is the estimated overall effect?

## Uncertainty

What is the confidence interval?

## Heterogeneity

How different are the study effects?

## Moderators

What study characteristics may explain variation?

## Bias

What evidence suggests publication or reporting bias?

## Sensitivity

Does the conclusion survive reasonable analytical changes?

## Risk of Bias

How trustworthy are the underlying studies?

## Interpretation

What does the combined evidence support?

## Limitations

What assumptions or uncertainties remain?

## Open Questions

What cannot yet be determined from the evidence?
```

---

# 33. Meta-Analysis Checklist

Before interpreting a meta-analysis, ask:

```text
□ Is the research question clearly defined?
□ Are eligibility criteria explicit?
□ Was the search strategy appropriate?
□ Could relevant studies have been missed?
□ Were duplicate datasets identified?
□ Were studies screened systematically?
□ Was data extraction structured?
□ Are effect sizes comparable?
□ Is the effect direction consistent?
□ Are dependent effects handled appropriately?
□ Are study weights appropriate?
□ Is the synthesis model justified?
□ What is the pooled effect?
□ What is its confidence interval?
□ How heterogeneous are the studies?
□ Were moderators investigated appropriately?
□ Was publication bias assessed?
□ Were high-risk-of-bias studies examined?
□ Were sensitivity analyses performed?
□ Is one study driving the result?
□ Is the effect clinically or scientifically meaningful?
□ How
```
