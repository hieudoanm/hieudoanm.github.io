# Effect Sizes

A practical guide to choosing, interpreting, transforming, and combining effect sizes in meta-analysis.

The central principle is:

> **A meta-analysis does not pool raw study results. It pools comparable estimates of an effect, together with their uncertainty.**

---

# 1. What Is an Effect Size?

An effect size is a quantitative description of the relationship or difference that a study found.

For example:

```text
Treatment group mean = 82
Control group mean   = 75

Mean difference = 7 points
```

The effect size tells us:

```text
What happened?
How large was the effect?
In which direction?
How uncertain is the estimate?
```

A meta-analysis converts study findings into a common quantitative language.

---

# 2. Why Effect Sizes Matter

Imagine three studies:

```text
Study A:
+5 points

Study B:
+8 points

Study C:
+0.4 standard deviations
```

These numbers cannot necessarily be pooled directly.

The studies may have:

```text
Different measurement scales
Different sample sizes
Different variability
Different statistical reporting
```

Effect-size methods allow results to be transformed into comparable quantities.

---

# 3. Effect Size Components

A meta-analytic effect generally has two essential components:

```text
Effect estimate
+
Uncertainty
```

For example:

```text
SMD = 0.42
SE  = 0.10
```

or:

```text
OR = 1.50
95% CI = [1.10, 2.05]
```

The effect estimate describes the result.

The uncertainty determines how precisely it has been estimated.

---

# 4. Common Effect-Size Families

Common effect sizes include:

```text
Continuous outcomes:
    Mean Difference
    Standardised Mean Difference

Binary outcomes:
    Risk Ratio
    Odds Ratio
    Risk Difference

Time-to-event outcomes:
    Hazard Ratio

Associations:
    Pearson correlation
    Spearman correlation
    Fisher's z

Prediction / model performance:
    Error metrics
    Correlation
    R²
    AUC
```

The appropriate effect size depends on the scientific question.

---

# 5. Mean Difference

Use the Mean Difference (MD) when studies measure the same outcome using the same scale.

Conceptually:

```text
MD = Mean intervention − Mean control
```

Example:

```text
Treatment:
Mean = 82

Control:
Mean = 75

MD = 7
```

Interpretation:

> The treatment group scored 7 points higher than the control group.

---

# 6. When Mean Difference Is Useful

Suppose every study measures aphasia severity using the same instrument:

```text
Aphasia score: 0–100
```

Then:

```text
Study 1 → +6 points
Study 2 → +4 points
Study 3 → +8 points
```

The original units remain meaningful.

This is often preferable to standardising the effects unnecessarily.

---

# 7. Standardised Mean Difference

Sometimes studies measure the same underlying construct using different scales.

For example:

```text
Study A → Naming Test
Study B → Language Battery
Study C → Word Retrieval Scale
```

All attempt to measure:

```text
Language ability
```

but their raw scores are not directly comparable.

A Standardised Mean Difference (SMD) expresses the difference relative to variability.

Conceptually:

```text
SMD ≈ difference between groups
      -------------------------
        within-study variability
```

---

# 8. Cohen's d

A common standardised mean difference is Cohen's d.

Conceptually:

```text
d =
difference between group means
------------------------------
pooled standard deviation
```

Example:

```text
Treatment mean = 80
Control mean   = 75
SD             = 10

d ≈ 0.50
```

The effect is approximately half a standard deviation.

---

# 9. Hedges' g

Cohen's d can be biased upward in small samples.

Hedges' g applies a small-sample correction.

Conceptually:

```text
Cohen's d
   ↓
Small-sample correction
   ↓
Hedges' g
```

Hedges' g is therefore commonly used in meta-analysis of continuous outcomes.

---

# 10. Interpreting SMD

A rough heuristic sometimes used is:

```text
0.2 → small
0.5 → moderate
0.8 → large
```

These values should **not** be treated as universal scientific thresholds.

A small effect may be highly important if:

```text
The intervention is cheap
The condition is common
The effect is durable
The outcome is clinically important
```

A large statistical effect may be less useful if:

```text
The measurement is unreliable
The population is unusual
The effect does not generalise
```

Always interpret the effect in context.

---

# 11. Risk Ratio

For binary outcomes, one common effect measure is the Risk Ratio (RR).

Suppose:

```text
Treatment:
20 / 100 improved

Control:
10 / 100 improved
```

Then:

```text
Risk treatment = 0.20
Risk control   = 0.10

RR = 0.20 / 0.10
   = 2.0
```

Interpretation:

> The probability of improvement was twice as high in the treatment group.

---

# 12. Odds Ratio

The Odds Ratio (OR) compares odds rather than probabilities.

For an event:

```text
Odds = probability / (1 − probability)
```

Example:

```text
Treatment:
20 improved
80 did not

Odds = 20 / 80 = 0.25
```

If:

```text
Control:
10 improved
90 did not

Odds = 10 / 90 ≈ 0.111
```

Then:

```text
OR ≈ 2.25
```

An OR of 2 does **not** generally mean the probability is twice as high.

---

# 13. Risk Ratio vs Odds Ratio

These measures answer different questions.

```text
Risk Ratio:
How do probabilities compare?

Odds Ratio:
How do odds compare?
```

When events are uncommon, OR and RR may be numerically similar.

When events are common, they can differ substantially.

Therefore:

> Do not interpret an odds ratio as though it were a risk ratio.

---

# 14. Risk Difference

Risk Difference compares absolute probabilities.

Example:

```text
Treatment risk = 0.30
Control risk   = 0.20

Risk difference = 0.10
```

Interpretation:

> There was an absolute 10-percentage-point difference in risk.

This can be particularly useful for communicating practical impact.

---

# 15. Hazard Ratio

Time-to-event studies often report a Hazard Ratio (HR).

Examples:

```text
Time until relapse
Time until recovery
Time until death
Time until hospitalisation
```

A hazard ratio compares event rates over time under the assumptions of the survival model.

For example:

```text
HR = 0.70
```

is commonly interpreted as a lower instantaneous event rate for the treatment group, assuming the relevant model assumptions hold.

It should not automatically be interpreted as:

```text
"30% fewer people experienced the event."
```

---

# 16. Correlation

For association questions, the Pearson correlation coefficient is common:

```text
r ∈ [-1, +1]
```

Interpretation:

```text
r > 0 → positive association
r < 0 → negative association
r ≈ 0 → little linear association
```

For example:

```text
r = 0.45
```

suggests a positive association.

It does not establish causation.

---

# 17. Fisher's z Transformation

Correlations have a sampling distribution that becomes problematic near the boundaries:

```text
r → -1
r → +1
```

A common meta-analytic approach is to transform:

```text
r
↓
Fisher's z
↓
Meta-analysis
↓
Back-transform
↓
r
```

This makes statistical synthesis more convenient.

---

# 18. Effect Direction

Every effect needs a consistent direction.

Suppose:

```text
Positive = better outcome
```

Then all studies should follow:

```text
+ effect → intervention better
- effect → intervention worse
```

But outcome scales can have opposite meanings.

For example:

```text
Higher language score
→ better ability

Higher impairment score
→ worse ability
```

The second measure may need to be reversed before synthesis.

---

# 19. Effect-Size Sign Is Part of the Data

Do not treat a negative sign as merely mathematical.

For example:

```text
SMD = -0.50
```

could mean:

```text
Treatment performs worse
```

or:

```text
The outcome scale is reversed
```

or:

```text
The groups were subtracted in the opposite order
```

Always verify the meaning of the sign.

---

# 20. Standard Error

The standard error (SE) describes uncertainty in an effect estimate.

For example:

```text
Effect = 0.40
SE = 0.10
```

A smaller SE means greater precision.

A larger SE means greater uncertainty.

Meta-analysis uses this uncertainty when weighting studies.

---

# 21. Confidence Intervals

A 95% confidence interval describes uncertainty around the estimated effect.

For example:

```text
SMD = 0.40
95% CI = [0.20, 0.60]
```

The interval does not simply mean:

> "There is a 95% probability that the true effect lies in this interval."

Under the usual frequentist interpretation, the confidence procedure would contain the true parameter in 95% of repeated samples.

For practical reading:

```text
Estimate → likely magnitude
Interval → precision / uncertainty
```

---

# 22. Statistical Significance vs Effect Size

These are different concepts.

A study can find:

```text
Large effect
but
wide confidence interval
```

because the sample is small.

Another study can find:

```text
Small effect
but
very narrow confidence interval
```

because the sample is large.

Therefore:

```text
Statistical significance
≠
Practical importance
```

Always examine:

```text
Magnitude
Precision
Context
```

---

# 23. Study Weight

Meta-analysis gives more influence to more precise studies.

Conceptually:

```text
Precision ↑
    ↓
Weight ↑
```

For a simple inverse-variance framework:

```text
weight ≈ 1 / variance
```

Therefore:

```text
Small variance → large weight
Large variance  → small weight
```

This is one reason the pooled estimate is not simply the arithmetic mean of study effects.

---

# 24. Why Sample Size Alone Does Not Determine Weight

Larger studies often have greater precision.

But precision also depends on:

```text
Outcome variability
Measurement quality
Study design
Missing data
Effect-size calculation
```

Therefore:

> Weight is fundamentally about uncertainty, not simply participant count.

---

# 25. Pooling Effect Sizes

Suppose:

```text
Study A → 0.20
Study B → 0.50
Study C → 0.40
```

with different uncertainties.

The pooled effect is conceptually:

```text
Study effects
     +
Study precision
     ↓
Weighted synthesis
     ↓
Pooled effect
```

The exact weighting depends on the meta-analytic model.

---

# 26. Fixed-Effect Weighting

In a simple fixed-effect framework:

```text
wᵢ = 1 / vᵢ
```

where:

```text
wᵢ = study weight
vᵢ = within-study variance
```

The pooled effect is conceptually:

```text
Σ(wᵢ × effectᵢ)
----------------
      Σwᵢ
```

This assumes that all studies estimate one common underlying effect.

---

# 27. Random-Effects Weighting

A random-effects model incorporates between-study variation.

Conceptually:

```text
Within-study variance
+
Between-study variance
```

The weighting becomes approximately:

```text
wᵢ = 1 / (vᵢ + τ²)
```

where:

```text
τ² = estimated between-study variance
```

When heterogeneity is substantial, study weights can become more similar than under a fixed-effect model.

---

# 28. Converting Reported Statistics

A paper may not report the effect size you need.

It might report:

```text
t
F
p
SE
CI
Means
SDs
Correlation
```

Some can be converted.

Conceptually:

```text
Reported statistic
       ↓
Mathematical transformation
       ↓
Effect size
       ↓
Sampling variance
       ↓
Meta-analysis
```

Every transformation should be documented.

---

# 29. Missing Information

Sometimes the required information is unavailable.

Possible approaches:

```text
Contact authors
Use supplementary material
Search related publications
Derive from reported statistics
Use justified assumptions
Exclude from quantitative synthesis
```

Do not silently invent values.

If assumptions are required:

```text
Document assumption
+
Test sensitivity
```

---

# 30. Multiple Effect Sizes From One Study

One study may report:

```text
5 outcomes
3 time points
2 intervention groups
```

This creates multiple effects.

They may not be statistically independent.

Naively treating them as separate studies can:

```text
Overweight one study
Underestimate uncertainty
Distort the pooled estimate
```

Possible approaches include:

```text
Predefined selection rule
Aggregate outcomes
Aggregate intervention groups
Multilevel meta-analysis
Multivariate meta-analysis
Robust variance estimation
```

The appropriate solution depends on the design.

---

# 31. Multiple Intervention Groups

Suppose one control group is compared with:

```text
Treatment A
Treatment B
Treatment C
```

If all three comparisons are entered independently using the same control participants, those comparisons are correlated.

Possible approaches:

```text
Combine treatment groups
Split the control group
Use a model accounting for dependence
```

The method should be defined before analysis where possible.

---

# 32. Dependent Effect Sizes

Effect sizes may be dependent because they share:

```text
Participants
Control groups
Outcomes
Time points
Datasets
```

Dependency violates the assumption that every effect is independent.

This matters because standard meta-analysis methods may:

```text
Underestimate standard errors
Overweight studies
Produce overly narrow confidence intervals
```

Always check the independence structure.

---

# 33. Construct Validity

Two scales may both claim to measure:

```text
Language ability
```

but may not measure exactly the same construct.

Before standardising them into one SMD, ask:

```text
Do they measure the same underlying construct?
```

Statistical comparability does not automatically imply scientific comparability.

---

# 34. Measurement Direction and Reliability

Measurement quality can affect effect estimates.

Consider:

```text
Reliable measure
      ↓
Less measurement noise
      ↓
More precise estimate
```

Poor reliability can increase noise and potentially attenuate observed associations.

Therefore, measurement properties should be considered when interpreting heterogeneity.

---

# 35. Choosing Between MD and SMD

Use:

```text
Mean Difference
```

when:

```text
Same construct
+
Same scale
+
Same meaningful units
```

Use:

```text
Standardised Mean Difference
```

when:

```text
Same construct
+
Different measurement scales
```

Do not use SMD simply because it is available.

---

# 36. Choosing Between RR and OR

Use the measure that matches the scientific question and reporting conventions.

```text
RR:
Relative probability

OR:
Relative odds
```

If communicating findings to a clinical audience, absolute risks may also be important.

For example:

```text
RR = 2.0

Control risk = 5%
Treatment risk = 10%
```

The relative effect is large, but the absolute difference is only:

```text
5 percentage points
```

---

# 37. Effect Size vs Raw Data

Raw data:

```text
Treatment mean = 84
Control mean = 78
```

Effect size:

```text
MD = 6
```

Standardised effect:

```text
SMD ≈ 0.45
```

Each representation answers a different question.

Raw data preserve original units.

Effect sizes enable comparison across studies.

---

# 38. Practical Interpretation

When interpreting a pooled effect, ask:

```text
1. What does the number measure?
2. What direction is positive?
3. What are the original units?
4. How large is the effect?
5. How precise is it?
6. Is the effect clinically/scientifically meaningful?
7. Are studies measuring the same construct?
8. Could bias explain the estimate?
```

---

# 39. Effect-Size Extraction Checklist

```text
□ What is the outcome?
□ Is it continuous, binary, time-to-event, or correlational?
□ What effect size is appropriate?
□ Are all studies measuring the same construct?
□ Is the measurement scale the same?
□ Is effect direction consistent?
□ Are means/SDs available?
□ Are event counts available?
□ Is the effect already reported?
□ Can the effect be derived?
□ Is the standard error available?
□ Is the confidence interval available?
□ Is a transformation required?
□ Are multiple outcomes reported?
□ Are multiple time points reported?
□ Are effect sizes independent?
□ Are assumptions documented?
□ Are sensitivity analyses needed?
```

---

# 40. Final Mental Model

Think of effect sizes as the common language of a meta-analysis:

```text
RAW STUDY RESULTS
        ↓
   DEFINE EFFECT
        ↓
 STANDARDISE / TRANSFORM
        ↓
 EFFECT + UNCERTAINTY
        ↓
 CHECK DIRECTION
        ↓
 CHECK DEPENDENCE
        ↓
      WEIGHT
        ↓
      POOL
        ↓
 INTERPRET IN CONTEXT
```

The goal is not to find the most convenient numerical representation.

The goal is to create an effect estimate that is:

```text
Comparable
+
Statistically appropriate
+
Scientifically meaningful
+
Transparent
+
Interpretable
```
