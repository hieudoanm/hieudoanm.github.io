# Psychology Example

## Purpose

This example demonstrates how to conduct and interpret a meta-analysis in psychology.

The example is hypothetical. The numerical results are illustrative rather than results from a real evidence synthesis.

The goal is to show how psychological constructs, intervention differences, measurement choices, heterogeneity, risk of bias, and practical significance interact in a meta-analysis.

---

# Example Question

Suppose the research question is:

> **Does mindfulness-based intervention reduce anxiety symptoms in adults?**

A more structured version might be:

> Among adults, compared with an inactive or active control condition, do mindfulness-based interventions reduce self-reported anxiety symptoms at post-intervention?

This question defines:

- **Population:** adults
- **Intervention:** mindfulness-based interventions
- **Comparator:** inactive or active control
- **Outcome:** anxiety symptoms
- **Time point:** post-intervention

The question should be defined before looking at the results whenever possible.

---

# 1. Define Eligibility Criteria

Suppose the review includes:

### Include

- Adults aged 18 years or older
- Randomised controlled trials
- Mindfulness-based intervention
- At least one control group
- Validated measure of anxiety
- Sufficient information to calculate an effect size
- Published in English

### Exclude

- Studies involving children or adolescents
- Observational studies
- Case studies
- Studies without a comparison group
- Interventions that do not contain a meaningful mindfulness component
- Studies reporting only unrelated outcomes

The inclusion criteria should match the research question rather than being adjusted after seeing which studies produce favourable results.

---

# 2. Search for Studies

A search might include combinations of:

```text
mindfulness
AND
anxiety
AND
randomized OR randomised OR controlled trial
```

Additional searches could include specific intervention names such as:

```text
mindfulness-based stress reduction
MBSR
mindfulness-based cognitive therapy
MBCT
```

Potential databases might include:

- PsycINFO
- PubMed
- Web of Science
- Scopus
- Cochrane Library

Reference lists and relevant reviews can also be searched for additional studies.

The search strategy should be documented so that another researcher can understand how the evidence base was constructed.

---

# 3. Screen the Studies

Suppose the search identifies:

```text
2,450 records
      ↓
1,820 after duplicate removal
      ↓
210 full texts assessed
      ↓
42 studies eligible
```

The reasons for full-text exclusion should be recorded.

For example:

| Reason                    | Number |
| ------------------------- | -----: |
| Wrong population          |     21 |
| Wrong intervention        |     34 |
| No appropriate comparator |     28 |
| Wrong study design        |     42 |
| No usable anxiety outcome |     31 |
| Insufficient data         |     12 |
| Other                     |     10 |

The exact numbers are illustrative.

The important principle is:

> Screening decisions should be based on predefined eligibility criteria, not on whether a study appears to support the expected conclusion.

---

# 4. Check for Independent Evidence

Psychology research sometimes contains multiple publications from the same study.

For example:

```text
Study A
├── Main trial paper
├── Follow-up paper
└── Secondary analysis
```

These papers should not automatically be treated as three independent studies.

Otherwise, the same participants could effectively receive multiple votes in the meta-analysis.

A study-level record should therefore track:

- Authors
- Sample
- Recruitment period
- Intervention
- Control
- Trial registration
- Dataset
- Publications
- Follow-up periods

The unit of analysis should correspond to the independent evidence rather than simply the number of papers.

---

# 5. Define the Outcome

Anxiety can be measured using many instruments.

For example:

- State-Trait Anxiety Inventory
- Beck Anxiety Inventory
- Hospital Anxiety and Depression Scale
- Generalised Anxiety Disorder scales
- Other validated anxiety questionnaires

These instruments may use different:

- Number of items
- Response scales
- Score ranges
- Direction conventions

For example:

```text
Higher score
     ↓
More anxiety
```

But another transformed measure might have:

```text
Higher score
     ↓
Less anxiety
```

The direction must therefore be standardised before pooling.

---

# 6. Choose the Effect Size

Suppose different studies use different anxiety questionnaires.

A raw mean difference may therefore not be directly comparable.

A suitable approach may be the:

> **Standardised Mean Difference (SMD)**

A study-level effect might be expressed as Hedges' g.

Conceptually:

```text
Intervention anxiety
        ↓
     compared with
        ↓
Control anxiety
        ↓
Standardise the difference
        ↓
Hedges' g
```

A negative effect could represent lower anxiety in the mindfulness group.

For example:

```text
g = -0.40
```

might indicate a moderate reduction in anxiety.

The sign convention should be explicitly defined.

---

# 7. Extract the Data

A simplified extraction table might look like:

| Study   | n intervention | n control | Outcome |     g |   SE | Risk of bias  |
| ------- | -------------: | --------: | ------- | ----: | ---: | ------------- |
| Study 1 |             40 |        42 | BAI     | -0.32 | 0.22 | Low           |
| Study 2 |             65 |        64 | STAI    | -0.51 | 0.18 | Some concerns |
| Study 3 |             30 |        31 | HADS-A  | -0.12 | 0.25 | High          |
| Study 4 |             80 |        78 | STAI    | -0.44 | 0.16 | Low           |
| ...     |            ... |       ... | ...     |   ... |  ... | ...           |

In a real meta-analysis, extraction would also include:

- Participant characteristics
- Mean and SD
- Measurement time
- Intervention duration
- Control condition
- Adherence
- Attrition
- Analysis population
- Risk-of-bias judgements

---

# 8. Be Careful With Multiple Outcomes

A study may report:

```text
State anxiety
Trait anxiety
General anxiety
Depression
Stress
Quality of life
```

It would be problematic to simply include every anxiety-related result as if every estimate were independent.

For example:

```text
Study 1
├── Anxiety outcome A
├── Anxiety outcome B
└── Anxiety outcome C
```

These outcomes may be correlated because they were measured in the same participants.

Possible strategies include:

- Predefine one primary outcome
- Select one measure according to predefined rules
- Aggregate related measures
- Use a multivariate or multilevel meta-analysis
- Model dependent effects appropriately

The choice should be justified before interpreting the pooled effect.

---

# 9. Pool the Effects

Suppose 42 studies are included.

A random-effects meta-analysis produces:

```text
Hedges' g = -0.34
95% CI = [-0.42, -0.26]
```

A simple interpretation is:

> Across the included studies, mindfulness-based interventions were associated with lower anxiety symptoms than the comparison conditions.

The confidence interval does not cross zero, suggesting that the pooled estimate is statistically distinguishable from no difference under the model used.

But this is not enough to conclude that mindfulness is broadly effective.

We still need to ask:

```text
How different are the studies?
Could bias explain the effect?
What kinds of controls were used?
Is the effect practically meaningful?
Does the result generalise?
```

---

# 10. Examine Heterogeneity

Suppose:

```text
I² = 62%
τ² = 0.08
```

This suggests meaningful between-study variation.

The studies may not all be estimating exactly the same practical effect.

Possible explanations include:

- Intervention duration
- Intervention intensity
- Instructor experience
- Participant baseline anxiety
- Clinical vs non-clinical samples
- Measurement instrument
- Control condition
- Adherence
- Follow-up duration

The correct response is not simply:

> "I² is high, therefore the meta-analysis is invalid."

Instead:

> **What characteristics might explain why the effects differ?**

---

# 11. Investigate Control Conditions

The meaning of the effect may depend strongly on the comparator.

Consider:

```text
Mindfulness
     vs
Waitlist
```

versus:

```text
Mindfulness
     vs
Active psychological intervention
```

A waitlist comparison asks approximately:

> Does receiving the intervention produce better outcomes than receiving no intervention during the study period?

An active-control comparison asks a stronger question:

> Does mindfulness produce better outcomes than another credible intervention or activity?

These are not necessarily equivalent scientific questions.

Therefore, control condition can be an important moderator.

---

# 12. Subgroup Analysis

Suppose studies are divided into:

| Control condition            | Studies | Hedges' g |
| ---------------------------- | ------: | --------: |
| Waitlist / no treatment      |      18 |     -0.51 |
| Attention control            |      10 |     -0.30 |
| Active psychological control |      14 |     -0.17 |

This could suggest that the apparent effect is larger against inactive controls.

However, subgroup differences should be tested rather than inferred merely because the point estimates differ.

For example:

```text
g_waitlist ≠ g_active
```

does not automatically mean:

```text
The intervention truly works differently
```

because the difference could also arise from sampling variation or differences between the types of studies included in each subgroup.

---

# 13. Investigate Intervention Duration

Suppose the interventions vary from:

```text
2 weeks
      ↓
8 weeks
      ↓
16 weeks
```

A moderator analysis could investigate whether intervention duration is associated with effect size.

For example:

```text
Longer intervention
        ↓
Potentially larger reduction in anxiety
```

This could be investigated using meta-regression.

However, meta-regression is observational at the study level.

If longer interventions tend to be delivered to participants with different baseline characteristics, the apparent duration effect may reflect those differences.

Therefore:

> A study-level moderator association should not automatically be interpreted as a causal individual-level effect.

---

# 14. Consider Psychological Construct Validity

Psychological constructs are often latent rather than directly observable.

For example:

```text
Anxiety
   ↓
Latent psychological construct
   ↓
Questionnaire responses
   ↓
Observed score
```

Therefore, differences between studies may partly reflect measurement.

Two questionnaires can both be described as measuring anxiety while emphasising somewhat different aspects.

This creates an important question:

> Are the studies measuring sufficiently similar constructs to justify pooling?

A statistically convenient common label is not necessarily evidence of construct equivalence.

---

# 15. Assess Risk of Bias

Suppose the studies have the following risk-of-bias profile:

```text
Low risk          16 studies
Some concerns     18 studies
High risk          8 studies
```

Potential concerns might include:

- Lack of allocation concealment
- High attrition
- Missing outcome data
- Selective reporting
- Unclear preregistration
- Outcome measurement concerns
- Inadequate analysis decisions

Psychological interventions also have a particular challenge:

> Participants and intervention providers often cannot be fully blinded to the intervention.

Therefore, lack of participant blinding does not necessarily mean the same thing as lack of blinding in a drug trial.

The likely consequences of the bias should be considered rather than simply counting the number of risk-of-bias items.

---

# 16. Publication Bias and Small-Study Effects

Suppose smaller studies tend to report larger effects.

A funnel plot might show:

```text
Large studies
     ↓
More precise
     ↓
Effects cluster around the pooled estimate

Small studies
     ↓
Less precise
     ↓
Effects spread more widely
```

If small studies are disproportionately positive, several explanations are possible:

- Publication bias
- Selective reporting
- Small-study effects
- Methodological differences
- Genuine heterogeneity

Therefore:

> Funnel-plot asymmetry is not synonymous with publication bias.

Statistical tests for asymmetry should be interpreted alongside the study characteristics and evidence base.

---

# 17. Sensitivity Analysis

Suppose the main analysis gives:

```text
g = -0.34
95% CI [-0.42, -0.26]
```

Now perform several sensitivity analyses.

### Remove high-risk studies

```text
g = -0.29
95% CI [-0.37, -0.21]
```

### Remove one influential study

```text
g = -0.31
95% CI [-0.39, -0.23]
```

### Use only active-control studies

```text
g = -0.18
95% CI [-0.27, -0.09]
```

The effect remains negative, but its magnitude changes.

This is important.

The conclusion:

> "Mindfulness has some evidence of reducing anxiety."

may be reasonably robust.

But the stronger claim:

> "Mindfulness produces a large reduction in anxiety."

would be less defensible.

---

# 18. Statistical Significance vs Practical Importance

Suppose:

```text
g = -0.34
```

A statistically detectable effect is not automatically a practically important effect.

The researcher should ask:

- How large is the change in real-world terms?
- Is it noticeable to patients?
- Does it exceed a clinically meaningful threshold?
- Does it justify the intervention's cost and time?
- Is it better than existing treatments?
- Are there meaningful harms or burdens?

For psychological interventions, practical interpretation may require translating standardised effects back into familiar measurement scales where possible.

---

# 19. Prediction Interval

Suppose the pooled estimate is:

```text
g = -0.34
95% CI = [-0.42, -0.26]
```

but the prediction interval is:

```text
[-0.71, 0.03]
```

This tells us something important.

The average effect is negative, but a future comparable study could plausibly observe an effect close to zero or even slightly positive under the assumed model.

Therefore:

> The average effect and the likely effect in a new study are not the same question.

This is especially important when heterogeneity is substantial.

---

# 20. Interpret the Overall Evidence

Suppose the final evidence looks like:

```text
Pooled effect
g = -0.34

95% CI
[-0.42, -0.26]

I²
62%

Prediction interval
[-0.71, 0.03]

Risk of bias
Mostly low-to-some-concerns

Sensitivity analyses
Direction generally stable

Control-condition analysis
Smaller effects with active controls
```

A calibrated conclusion might be:

> The evidence suggests that mindfulness-based interventions are associated with a small-to-moderate reduction in anxiety symptoms in adults. However, the magnitude of the effect varies across studies and appears smaller when mindfulness is compared with active controls rather than inactive controls. The findings therefore support a potential beneficial effect but provide weaker evidence that mindfulness produces effects substantially greater than those of other credible interventions.

This is more informative than simply saying:

> "Mindfulness works."

---

# 21. What the Meta-Analysis Does Not Establish

Even a statistically strong meta-analysis does not automatically establish that:

- Mindfulness works for every person
- The intervention is superior to every alternative
- The effect is clinically important
- The intervention works through a particular psychological mechanism
- Longer intervention causes larger effects
- The result applies to children
- The result applies to clinical populations
- Self-reported anxiety perfectly measures anxiety
- Publication bias is absent

A meta-analysis synthesises evidence; it does not remove the limitations of the underlying studies.

---

# 22. Psychology-Specific Issues

Psychology meta-analyses often require additional attention to:

### Construct validity

Are studies measuring the same psychological construct?

### Measurement heterogeneity

Are different questionnaires sufficiently comparable?

### Self-report

Could expectancy, demand characteristics, or reporting style influence outcomes?

### Intervention fidelity

Was the intervention actually delivered in a comparable way?

### Active controls

Does the comparison control for attention, expectancy, social interaction, or treatment engagement?

### Therapist effects

Could outcomes depend on who delivered the intervention?

### Participant characteristics

Do effects differ by:

- Age
- Baseline severity
- Clinical status
- Previous treatment
- Cultural context

### Multiple outcomes

Are researchers selectively reporting the most favourable psychological outcomes?

---

# 23. A Compact Analysis Workflow

For this example:

```text
Research question
        ↓
Eligibility criteria
        ↓
Search psychology literature
        ↓
Screen studies
        ↓
Identify independent datasets
        ↓
Extract intervention + outcome data
        ↓
Standardise outcome direction
        ↓
Calculate Hedges' g
        ↓
Assess risk of bias
        ↓
Fit random-effects model
        ↓
Estimate pooled effect
        ↓
Assess heterogeneity
        ↓
Investigate control condition
        ↓
Investigate intervention characteristics
        ↓
Assess publication bias
        ↓
Run sensitivity analyses
        ↓
Consider prediction interval
        ↓
Interpret practical importance
        ↓
Calibrated conclusion
```

---

# 24. Example Results Table

A final summary might look like:

| Analysis                      |        Effect | Interpretation                        |
| ----------------------------- | ------------: | ------------------------------------- |
| Overall                       |     g = -0.34 | Small-to-moderate reduction           |
| Waitlist controls             |     g = -0.51 | Larger effect                         |
| Active controls               |     g = -0.18 | Smaller effect                        |
| High-risk studies removed     |     g = -0.29 | Direction remains                     |
| One influential study removed |     g = -0.31 | Similar result                        |
| Heterogeneity                 |      I² = 62% | Meaningful variation                  |
| Prediction interval           | [-0.71, 0.03] | Future effects may vary substantially |

The table should be accompanied by interpretation rather than treated as self-explanatory.

---

# 25. Final Mental Model

For psychology meta-analysis, think:

```text
WHAT PSYCHOLOGICAL CONSTRUCT
ARE WE MEASURING?
        ↓
ARE THE MEASURES COMPARABLE?
        ↓
WHAT IS THE EFFECT SIZE?
        ↓
WHAT IS THE AVERAGE EFFECT?
        ↓
HOW MUCH DO STUDIES DIFFER?
        ↓
DO CONTROL CONDITIONS MATTER?
        ↓
COULD MEASUREMENT OR DESIGN
DIFFERENCES EXPLAIN THE EFFECT?
        ↓
COULD BIAS EXPLAIN THE RESULT?
        ↓
DOES THE RESULT SURVIVE
SENSITIVITY ANALYSIS?
        ↓
IS THE EFFECT PRACTICALLY IMPORTANT?
        ↓
HOW WELL DOES IT GENERALISE?
        ↓
WHAT CAN WE CONFIDENTLY CONCLUDE?
```

The key lesson is:

> **In psychology, a pooled effect is only meaningful when the underlying psychological constructs, measurements, interventions, and comparison conditions are sufficiently comparable.**

A good psychology meta-analysis therefore asks not only:

> **"What is the average effect?"**

but also:

> **"What exactly is being measured, compared, and generalised?"**
