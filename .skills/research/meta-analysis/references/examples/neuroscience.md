# Example: Neuroscience Meta-Analysis

A worked example showing how to apply the meta-analysis skill to a neuroscience research question.

This example is hypothetical. The numerical values are illustrative rather than results from a real published meta-analysis.

---

# 1. Research Question

Suppose researchers want to investigate:

> Does cognitive training improve working-memory performance in healthy adults?

A quantitative synthesis could ask:

```text
Population:
Healthy adults

Intervention:
Working-memory or cognitive training

Comparator:
Active or passive control

Outcome:
Working-memory performance

Target effect:
Difference between training and control groups
```

The question is specific enough to support quantitative synthesis.

---

# 2. Why a Meta-Analysis Is Useful

Individual neuroscience studies often produce different results.

For example:

```text
Study A → small improvement
Study B → moderate improvement
Study C → no improvement
Study D → large improvement
```

A meta-analysis can estimate:

```text
Average effect
+
Uncertainty
+
Between-study variation
```

But it should also investigate why the results differ.

---

# 3. Define Eligibility Criteria

Suppose the review includes:

```text
Include:
- Human participants
- Healthy adults
- Cognitive or working-memory training
- Pre/post or post-treatment comparison
- Quantitative working-memory outcome
- Controlled studies

Exclude:
- Clinical populations
- Animal studies
- Case reports
- No control condition
- No relevant cognitive outcome
- Insufficient quantitative information
```

These criteria should ideally be defined before screening.

---

# 4. Search Strategy

Possible databases:

```text
PubMed
PsycINFO
Web of Science
Scopus
```

Example concept blocks:

```text
("working memory" OR "cognitive training")
AND
(training OR intervention)
AND
(adult* OR healthy)
AND
(control OR randomized OR trial)
```

Additional sources might include:

```text
Reference lists
Citation tracking
Preprints
Conference proceedings
```

---

# 5. Screening

Suppose the search produces:

```text
1,240 records
```

After duplicate removal:

```text
910 unique records
```

After title/abstract screening:

```text
85 potentially relevant studies
```

After full-text screening:

```text
27 eligible publications
```

But publication count is not necessarily study count.

---

# 6. Identify Independent Samples

Suppose the 27 publications correspond to:

```text
23 independent datasets
```

Four publications are follow-up or secondary analyses of existing datasets.

The meta-analysis should avoid counting those participants multiple times.

Create:

```text
Dataset ID
```

for each independent sample.

---

# 7. Extract Study Characteristics

For each study, extract:

```text
Study ID
Sample size
Mean age
Age range
Training type
Training duration
Control condition
Outcome measure
Assessment time
Effect estimate
Standard error
Risk of bias
```

Example:

| Study |   N | Training           | Duration | Outcome | Effect |
| ----- | --: | ------------------ | -------: | ------- | -----: |
| A     |  80 | WM training        |  6 weeks | Task A  |   0.20 |
| B     | 120 | Cognitive training |  8 weeks | Task B  |   0.45 |
| C     |  60 | WM training        |  4 weeks | Task C  |   0.05 |
| D     | 200 | Mixed training     | 10 weeks | Task D  |   0.35 |

---

# 8. Define the Outcome Construct

This is especially important in neuroscience.

"Working memory" can refer to many different tasks:

```text
N-back
Digit span
Operation span
Spatial span
Delayed match-to-sample
```

These tasks are related but not identical.

Before pooling them, ask:

> Are these sufficiently valid indicators of the same target construct?

A statistical transformation cannot solve a conceptual mismatch.

---

# 9. Choose the Effect Size

Suppose the studies use different working-memory tests.

For example:

```text
Study A → N-back accuracy
Study B → Digit span
Study C → Operation span
Study D → Spatial memory score
```

A Standardised Mean Difference may be appropriate if these measures are considered sufficiently comparable indicators of working-memory performance.

A common choice is:

```text
Hedges' g
```

---

# 10. Align Effect Direction

Suppose:

```text
Positive = better working-memory performance
```

Then:

```text
Higher score
→ positive effect

Lower error rate
→ also needs to be represented as positive improvement
```

For error-based outcomes, the direction may need to be reversed.

For example:

```text
Training reduces errors:

Raw difference:
-5 errors

Meta-analytic direction:
+5 improvement
```

The exact transformation depends on the chosen effect-size convention.

---

# 11. Example Study Effects

Suppose the extracted effects are:

```text
Study A → g = 0.20
Study B → g = 0.45
Study C → g = 0.05
Study D → g = 0.35
Study E → g = 0.60
Study F → g = -0.10
```

There is clearly some variation.

The meta-analysis should not simply average these numbers.

Each estimate has different precision.

---

# 12. Weight the Studies

Suppose:

```text
Study A:
g = 0.20
SE = 0.15

Study B:
g = 0.45
SE = 0.08
```

Study B is more precise.

Conceptually:

```text
Smaller variance
      ↓
Greater weight
```

The pooled estimate therefore reflects both:

```text
Effect magnitude
+
Precision
```

---

# 13. Statistical Model

Suppose the researchers expect training effects to vary according to:

```text
Training type
Participant characteristics
Outcome measure
Training duration
```

A random-effects model may therefore be scientifically appropriate.

The assumption is approximately:

```text
Study-specific true effects
          ↓
vary around a mean effect
```

---

# 14. Hypothetical Pooled Result

Suppose the analysis produces:

```text
Hedges' g = 0.31
95% CI = [0.20, 0.42]
```

A basic interpretation would be:

> Across the included studies, cognitive training was associated with a small-to-moderate improvement in working-memory performance.

But this is not the end of the analysis.

---

# 15. Examine Heterogeneity

Suppose:

```text
I² = 68%
τ² = 0.07
```

This suggests meaningful between-study variation.

The next question is:

> Why do the effects differ?

Potential explanations include:

```text
Training type
Training duration
Age
Outcome task
Control condition
Study quality
```

---

# 16. Inspect the Forest Plot

Imagine the forest plot shows:

```text
Study A       ●────
Study B          ●────
Study C     ●────
Study D             ●────
Study E                ●────
Study F  ─────●
                         |
                       pooled
```

Study F may deserve investigation because its estimate is in the opposite direction.

But it should not automatically be removed.

---

# 17. Investigate the Outlier

Suppose Study F used:

```text
Passive control
Very short training
Different working-memory task
```

while most other studies used:

```text
Active control
Longer training
Standardised working-memory tasks
```

This suggests a possible source of heterogeneity.

The study may still be eligible.

Instead of deleting it:

```text
Keep in primary analysis
+
Investigate in sensitivity analysis
```

---

# 18. Moderator: Training Duration

Suppose studies can be grouped into:

```text
Short:
< 6 weeks

Long:
≥ 6 weeks
```

Results:

```text
Short training:
g = 0.12

Long training:
g = 0.42
```

This suggests a possible duration effect.

However:

> A difference between subgroup estimates must be formally evaluated before concluding that training duration explains the heterogeneity.

---

# 19. Meta-Regression

A meta-regression could model:

```text
Effect size
    ~
Training duration
```

Suppose the estimated coefficient is positive.

This could suggest:

> Studies using longer interventions tend to report larger effects.

But this is a study-level association.

It does not prove:

> Increasing an individual's training duration will necessarily increase their benefit.

---

# 20. Outcome-Type Moderator

Suppose the studies are grouped by task:

```text
N-back
Digit span
Complex span
Spatial working memory
```

Effects might differ.

For example:

```text
N-back:
g = 0.45

Digit span:
g = 0.18

Complex span:
g = 0.30
```

Possible explanations include:

```text
Task difficulty
Construct differences
Near vs far transfer
Measurement reliability
```

---

# 21. Near Transfer vs Far Transfer

A particularly important neuroscience question is whether training improves:

```text
The trained task
```

or:

```text
A broader cognitive ability
```

For example:

```text
Training:
N-back

Outcome:
N-back
```

is relatively close to the trained task.

Whereas:

```text
Training:
N-back

Outcome:
Reasoning ability
```

is farther away.

A meta-analysis should define transfer categories carefully.

---

# 22. Control Condition as a Moderator

The comparison group matters.

Possible controls:

```text
Passive control
Active control
Placebo-like control
Alternative intervention
```

A passive control may estimate:

```text
Training + expectation + engagement
```

against:

```text
No intervention
```

An active control may better control for:

```text
Contact
Expectations
Task engagement
Experimenter interaction
```

Therefore control type may contribute to heterogeneity.

---

# 23. Neuroimaging Outcomes

Suppose a secondary question asks whether cognitive training changes brain activity.

Possible outcomes:

```text
fMRI activation
Functional connectivity
EEG power
ERP amplitude
MEG response
Structural MRI
```

These are not automatically interchangeable.

A meta-analysis should usually define separate outcome families unless a scientifically defensible common effect representation exists.

---

# 24. Functional Neuroimaging Example

Suppose studies examine:

```text
Training → prefrontal activation
```

Some report:

```text
Increased activation
```

Others:

```text
Decreased activation
```

This does not necessarily mean they disagree.

Possible explanations include:

```text
Task difficulty
Baseline performance
Neural efficiency
Compensatory recruitment
Different task contrasts
Different preprocessing
```

The construct represented by the effect must therefore be defined carefully.

---

# 25. Neuroimaging Meta-Analysis Is Not Just "Pool the Coordinates"

Coordinate-based neuroimaging meta-analysis may work with:

```text
Activation peaks
```

rather than conventional effect sizes.

Different methods include approaches such as:

```text
ALE
Activation likelihood methods
Multilevel coordinate approaches
Image-based meta-analysis
```

The appropriate method depends on the available data and research question.

This example focuses primarily on conventional effect-size meta-analysis.

---

# 26. Publication Bias

Suppose the literature contains:

```text
Large positive effects
        ↓
Mostly small studies

Null results
        ↓
Mostly absent
```

A funnel plot may show asymmetry.

Possible explanations include:

```text
Publication bias
Small-study effects
Heterogeneity
```

Therefore the result should not automatically be labelled publication bias.

---

# 27. Sensitivity Analysis

Suppose the primary result is:

```text
g = 0.31
95% CI = [0.20, 0.42]
```

Now exclude high-risk studies:

```text
g = 0.22
95% CI = [0.10, 0.34]
```

The effect remains positive but is smaller.

Interpretation:

> The evidence supports a positive effect, but studies with greater methodological concerns may contribute to an overestimate of its magnitude.

---

# 28. Leave-One-Out Analysis

Suppose removing Study E produces:

```text
Original:
g = 0.31

Without Study E:
g = 0.25
```

Removing Study C produces:

```text
g = 0.32
```

Removing Study F produces:

```text
g = 0.35
```

Study E appears more influential.

But influence does not automatically mean bias.

Investigate:

```text
Sample size
Precision
Population
Method
Outcome
```

---

# 29. Prediction Interval

Suppose:

```text
Pooled effect:
g = 0.31

95% CI:
[0.20, 0.42]

95% prediction interval:
[-0.05, 0.67]
```

This tells an important story.

The average effect is clearly positive.

But because effects vary between studies, a future comparable study could plausibly have a small negative true effect.

Therefore:

```text
Average effect → positive
Future-study effect → less certain
```

---

# 30. Risk of Bias

Suppose the evidence consists of:

```text
8 low-risk studies
10 some-concern studies
5 high-risk studies
```

If high-risk studies tend to show larger effects, the pooled estimate may be inflated.

A strong meta-analysis reports:

```text
Overall estimate
+
Risk-of-bias distribution
+
Sensitivity to risk of bias
```

---

# 31. What the Meta-Analysis Can Conclude

Suppose the final evidence looks like:

```text
Pooled effect:
g = 0.31

Confidence interval:
positive

I²:
68%

Prediction interval:
includes values near zero

High-risk studies:
larger effects

Publication bias:
uncertain
```

A calibrated conclusion might be:

> Across the available studies, cognitive training is associated with a small-to-moderate improvement in working-memory performance. However, effects vary substantially across studies, and estimates are somewhat smaller when higher-risk studies are excluded. The evidence therefore supports a positive average effect while leaving uncertainty about the magnitude and generalisability of the effect.

---

# 32. What It Should Not Conclude

The analysis does **not** establish:

```text
Cognitive training permanently improves intelligence.
```

It also does not establish:

```text
Every person benefits.
```

Nor:

```text
Longer training causes larger individual benefits.
```

Nor:

```text
The observed neural changes explain the behavioural improvement.
```

These claims go beyond the evidence represented by the meta-analysis.

---

# 33. Example Evidence Table

| Domain           | Finding                         | Interpretation                     |
| ---------------- | ------------------------------- | ---------------------------------- |
| Average effect   | g = 0.31                        | Positive average effect            |
| Precision        | CI excludes 0                   | Relatively precise pooled estimate |
| Heterogeneity    | I² = 68%                        | Meaningful variation               |
| Prediction       | Includes near-zero values       | Future effects uncertain           |
| Risk of bias     | Higher-risk studies larger      | Possible inflation                 |
| Moderator        | Duration associated with effect | Hypothesis-generating              |
| Publication bias | Uncertain                       | Cannot rule out reporting bias     |

---

# 34. Neuroscience-Specific Critical Questions

Before trusting the result, ask:

```text
□ Are the cognitive constructs comparable?
□ Are tasks measuring the same construct?
□ Are training and transfer outcomes distinguished?
□ Are active and passive controls separated?
□ Are populations comparable?
□ Are behavioural and neural outcomes analysed separately?
□ Are imaging modalities being mixed appropriately?
□ Are preprocessing differences important?
□ Are multiple contrasts creating dependence?
□ Are small neuroimaging samples driving effects?
□ Are coordinate-based and image-based analyses distinguished?
□ Is reverse inference being avoided?
□ Are moderators biologically plausible?
□ Is the prediction interval informative?
```

---

# 35. Complete Worked Workflow

The entire analysis can be represented as:

```text
Research question
      ↓
Eligibility criteria
      ↓
Search literature
      ↓
Screen studies
      ↓
Identify independent datasets
      ↓
Extract outcomes
      ↓
Define working-memory construct
      ↓
Standardise effect direction
      ↓
Calculate Hedges' g
      ↓
Assess risk of bias
      ↓
Random-effects synthesis
      ↓
Pooled effect
      ↓
Heterogeneity
      ↓
Moderator analysis
      ↓
Publication-bias assessment
      ↓
Sensitivity analysis
      ↓
Prediction interval
      ↓
Scientific interpretation
```

---

# 36. Final Mental Model

For a neuroscience meta-analysis, think:

```text
WHAT IS THE AVERAGE EFFECT?
          ↓
HOW PRECISE IS IT?
          ↓
HOW MUCH DO STUDIES DIFFER?
          ↓
WHY MIGHT THEY DIFFER?
          ↓
COULD BIAS EXPLAIN THE EFFECT?
          ↓
DOES THE RESULT SURVIVE SENSITIVITY ANALYSIS?
          ↓
WHAT DOES IT MEAN NEUROSCIENTIFICALLY?
          ↓
HOW GENERALISABLE IS IT?
```

The goal is not simply:

```text
"Does neuroscience show an effect?"
```

The better question is:

> **What does the quantitative evidence suggest about the average effect, how much does it vary across studies, what explains that variation, and how confidently can we generalise the finding?**
