# Meta-Analysis Workflow

A practical guide to conducting a meta-analysis from research question through final interpretation.

The central principle is:

> **A meta-analysis is a sequence of decisions. Each decision can affect the final estimate, so the workflow should be planned, documented, and justified before interpreting the pooled result.**

---

# 1. Start With a Precise Research Question

Begin with a question that can be answered quantitatively.

A useful structure is:

```text
Population
Intervention / Exposure
Comparator
Outcome
Study design
```

For example:

> Does cognitive training improve working-memory performance in healthy adults compared with an active or passive control condition?

Translate the question into:

```text
Population:
Healthy adults

Intervention:
Cognitive training

Comparator:
Control condition

Outcome:
Working-memory performance

Effect:
Difference between intervention and control
```

A vague question creates a vague synthesis.

---

# 2. Define the Target Effect

Before collecting studies, determine what effect you actually want to estimate.

Examples:

```text
Average treatment effect
Association between two variables
Diagnostic accuracy
Risk ratio
Change over time
Prediction performance
```

For example:

```text
Question:
Does treatment improve language ability?

Target effect:
Difference in post-treatment language performance
between treatment and control groups.
```

This decision determines which effect sizes are appropriate later.

---

# 3. Define Eligibility Criteria

Specify which studies are eligible.

Typical criteria include:

```text
Population
Intervention / exposure
Comparator
Outcome
Study design
Publication period
Language
Follow-up period
Minimum sample size
```

Example:

```text
Include:
Randomised controlled trials
Adults with aphasia
Speech-language therapy
Language outcome
Post-treatment assessment

Exclude:
Case reports
Children
No control group
No relevant language outcome
```

The criteria should be determined before selecting studies based on their results.

---

# 4. Develop the Search Strategy

A comprehensive search may include:

```text
PubMed
PsycINFO
Web of Science
Scopus
Cochrane Library
Google Scholar
Trial registries
Reference lists
Citation networks
```

Construct concept blocks.

For example:

```text
("aphasia" OR "language impairment")
AND
("speech therapy" OR "language therapy" OR rehabilitation)
AND
(stroke OR cerebrovascular)
```

Search terms should reflect synonyms and alternative terminology.

---

# 5. Document the Search

Record:

```text
Database
Search date
Search string
Filters
Number of results
```

This supports reproducibility.

A good meta-analysis should allow another researcher to understand:

> How did you find the evidence?

---

# 6. Remove Duplicates

The same paper may appear in multiple databases.

Conceptually:

```text
PubMed ─────┐
Scopus ─────┤
PsycINFO ───┼──→ Combined records
Web Science ┤
             ↓
        Deduplication
             ↓
        Unique records
```

Do not count duplicate records as independent evidence.

---

# 7. Title and Abstract Screening

Screen studies against the eligibility criteria.

At this stage ask:

```text
Does the study appear relevant?
```

Do not make complicated judgements unnecessarily early.

Potential exclusions:

```text
Wrong population
Wrong intervention
Wrong outcome
Wrong study design
Clearly irrelevant
```

---

# 8. Full-Text Screening

Retrieve potentially eligible papers and apply the criteria more strictly.

Record exclusion reasons.

For example:

```text
Wrong population
No appropriate comparator
Outcome unavailable
Duplicate cohort
Insufficient quantitative information
```

A transparent screening process is part of the evidence base of the meta-analysis.

---

# 9. Identify Independent Studies

A critical step is determining whether publications represent independent samples.

For example:

```text
Paper A
Paper B
Paper C
```

may all use:

```text
Same clinical trial
```

If treated as three independent studies:

```text
Same participants
      ↓
Counted three times
      ↓
Overweighted evidence
```

Look for:

- Sample size
- Recruitment dates
- Study sites
- Authors
- Trial identifiers
- Dataset names
- Participant descriptions

---

# 10. Create a Study-Level Record

For each independent study, record:

```text
Study ID
Citation
Population
Sample size
Design
Intervention
Comparator
Outcome
Measurement
Time point
Effect estimate
Variance
Risk of bias
```

If several papers arise from one study, link them to the same study ID.

---

# 11. Build the Extraction Table

A practical extraction table might contain:

| Field        | Example             |
| ------------ | ------------------- |
| Study        | Smith 2025          |
| N            | 84                  |
| Design       | RCT                 |
| Population   | Adults with aphasia |
| Intervention | Speech therapy      |
| Comparator   | Usual care          |
| Outcome      | Naming score        |
| Time         | 3 months            |
| Effect       | SMD                 |
| Estimate     | 0.42                |
| SE           | 0.11                |
| Risk of bias | Some concerns       |

Keep raw information separate from calculated quantities.

---

# 12. Extract Results Carefully

Do not immediately enter only the final effect.

Record enough information to reconstruct the effect.

For continuous outcomes:

```text
Group means
Standard deviations
Sample sizes
```

For binary outcomes:

```text
Events
Non-events
Sample sizes
```

For correlations:

```text
Correlation
Sample size
```

For regression:

```text
Coefficient
Standard error
Sample size
```

The exact requirements depend on the chosen effect size.

---

# 13. Define Outcome Rules

Studies may report multiple outcomes.

For example:

```text
Naming
Comprehension
Fluency
Reading
Writing
```

If the question concerns:

```text
Overall language ability
```

you need a predefined rule for selecting or combining outcomes.

Possible approaches:

```text
Choose primary outcome
Choose most clinically relevant measure
Aggregate related outcomes
Use multivariate methods
```

Do not select the outcome that gives the largest effect after examining results.

---

# 14. Define Time-Point Rules

Studies may report:

```text
Immediately after treatment
1 month
3 months
6 months
12 months
```

Decide which time point answers the research question.

For example:

```text
Primary:
Post-treatment

Secondary:
Long-term follow-up
```

Avoid treating every time point as an independent study unless the analysis explicitly accounts for dependence.

---

# 15. Harmonise Effect Direction

Suppose:

```text
Higher score = better performance
```

Then:

```text
Positive effect = improvement
```

But another study may use:

```text
Higher score = greater impairment
```

The direction must be reversed when necessary.

Before synthesis, create an explicit convention:

```text
Positive
=
better outcome for intervention
```

Then verify every study.

---

# 16. Choose the Effect Size

Common choices include:

```text
Mean Difference
Standardised Mean Difference
Risk Ratio
Odds Ratio
Hazard Ratio
Correlation
Fisher's z
Regression coefficient
```

The choice depends on the outcome and study design.

If all studies use the same measurement scale:

```text
Mean Difference
```

may be appropriate.

If studies use different scales measuring the same construct:

```text
Standardised Mean Difference
```

may be more appropriate.

---

# 17. Transform Effects When Necessary

Different studies may report:

```text
t statistic
F statistic
p-value
Correlation
Odds ratio
Regression coefficient
```

Sometimes these can be transformed into a common effect size.

For example:

```text
Reported statistic
      ↓
Mathematical transformation
      ↓
Common effect size
```

Document transformations carefully.

Do not invent missing information.

---

# 18. Calculate Standard Errors

Meta-analysis needs both:

```text
Effect estimate
```

and:

```text
Uncertainty
```

For example:

```text
Effect = 0.35
SE = 0.10
```

The standard error contributes to study weighting.

If a paper reports a confidence interval, it may be possible to derive an approximate standard error.

Document the derivation.

---

# 19. Assess Risk of Bias

Before pooling results, assess study quality.

Possible domains:

```text
Randomisation
Allocation concealment
Blinding
Missing outcome data
Measurement
Selective reporting
Confounding
```

The relevant domains depend on study design.

For observational studies, consider:

```text
Selection bias
Confounding
Exposure measurement
Outcome measurement
Missing data
```

---

# 20. Decide Whether Pooling Is Appropriate

Before calculating the pooled effect, ask:

> **Are these studies sufficiently comparable to combine?**

Consider:

```text
Population
Intervention
Comparator
Outcome
Measurement
Design
Follow-up
Context
```

The question is not:

> "Are the studies identical?"

They rarely are.

The question is:

> **Do they estimate effects that are scientifically meaningful to summarise together?**

---

# 21. Choose the Meta-Analytic Model

The model should reflect the scientific assumptions.

### Fixed-effect

Assumes:

```text
One common underlying effect
```

### Random-effects

Assumes:

```text
Underlying effects vary across studies
```

A random-effects model is not simply a "more conservative" version of fixed-effect analysis.

It answers a somewhat different question.

---

# 22. Estimate the Pooled Effect

Conceptually:

```text
Study 1 → Effect + uncertainty
Study 2 → Effect + uncertainty
Study 3 → Effect + uncertainty
Study 4 → Effect + uncertainty
          ↓
     Statistical model
          ↓
     Pooled estimate
```

Report:

```text
Pooled effect
Confidence interval
Model
Number of studies
Number of participants
```

---

# 23. Interpret the Forest Plot

A forest plot usually contains:

```text
Study name
Effect estimate
Confidence interval
Weight
```

Interpret:

```text
Direction
Magnitude
Precision
Consistency
Pooled estimate
```

Ask:

> Do individual studies generally point in the same direction?

and:

> Does the pooled effect depend heavily on a small number of studies?

---

# 24. Assess Heterogeneity

Study results may differ because:

```text
Sampling error
+
Real differences between studies
```

Common statistics include:

```text
Q
I²
τ²
τ
```

Interpret them alongside:

```text
Forest plot
Study characteristics
Confidence intervals
```

Do not treat one numerical threshold as a universal decision rule.

---

# 25. Investigate Sources of Heterogeneity

If effects differ, investigate plausible explanations.

For example:

```text
Treatment intensity
Age
Baseline severity
Follow-up
Measurement instrument
Study quality
```

Possible approaches:

```text
Subgroup analysis
Meta-regression
Sensitivity analysis
```

Moderator analyses should generally be based on plausible hypotheses rather than unrestricted searching.

---

# 26. Publication Bias

Investigate whether the available literature may systematically differ from the evidence that exists but remains unpublished.

Possible evidence:

```text
Funnel plot
Small-study effect
Search for unpublished studies
Trial registries
Grey literature
```

Interpret these analyses cautiously.

---

# 27. Sensitivity Analysis

Test whether the main conclusion depends on particular decisions.

Examples:

```text
All studies
      ↓
Remove high-risk studies
      ↓
Remove influential study
      ↓
Alternative model
      ↓
Alternative outcome rule
```

Compare the resulting estimates.

---

# 28. Leave-One-Out Analysis

A simple influence analysis is:

```text
All studies → pooled estimate

Remove Study 1 → estimate

Remove Study 2 → estimate

Remove Study 3 → estimate

...
```

If removing one study dramatically changes the conclusion, report this.

---

# 29. Risk-of-Bias Sensitivity Analysis

Suppose:

```text
All studies:
SMD = 0.40

Low-risk studies only:
SMD = 0.18
```

This changes the interpretation.

The apparent overall effect may be partly driven by studies with greater methodological concerns.

Risk of bias should therefore influence the final conclusion.

---

# 30. Certainty of Evidence

After statistical synthesis, ask:

```text
How much confidence should we place in the result?
```

Consider:

```text
Risk of bias
Inconsistency
Imprecision
Indirectness
Publication bias
```

A statistically precise estimate can still provide weak evidence if the underlying studies are systematically biased.

---

# 31. Interpret Clinical or Scientific Meaning

Return to the original research question.

Suppose:

```text
SMD = 0.30
95% CI = [0.18, 0.42]
```

Ask:

```text
Is 0.30 meaningful?

For whom?

Compared with what?

Measured using which outcomes?

For how long?

Would it change practice?

```

Avoid interpreting effect sizes without returning to the construct they represent.

---

# 32. Write the Conclusion

A calibrated conclusion should contain:

```text
Average effect
+
Uncertainty
+
Consistency
+
Evidence quality
+
Important limitations
```

For example:

> Across the included studies, the intervention was associated with a small-to-moderate improvement in the target outcome. Effects varied between studies, and uncertainty remains regarding generalisability because most evidence came from single-centre samples.

This is stronger scientifically than:

> The intervention works.

---

# 33. Final Workflow

Use this compact workflow when conducting a meta-analysis:

```text
QUESTION
  ↓
ELIGIBILITY
  ↓
SEARCH
  ↓
SCREEN
  ↓
IDENTIFY INDEPENDENT STUDIES
  ↓
EXTRACT DATA
  ↓
ASSESS RISK OF BIAS
  ↓
DEFINE EFFECT SIZE
  ↓
HARMONISE EFFECTS
  ↓
CHECK COMPARABILITY
  ↓
SELECT MODEL
  ↓
POOL EFFECTS
  ↓
ASSESS HETEROGENEITY
  ↓
INVESTIGATE MODERATORS
  ↓
ASSESS BIAS
  ↓
SENSITIVITY ANALYSIS
  ↓
ASSESS CERTAINTY
  ↓
INTERPRET
  ↓
REPORT
```

---

# 34. Final Checklist

Before finalising a meta-analysis:

```text
□ Is the question precise?
□ Were eligibility criteria predefined?
□ Is the search reproducible?
□ Were duplicates removed?
□ Were independent datasets identified?
□ Were extraction rules predefined?
□ Were outcome rules predefined?
□ Were time-point rules predefined?
□ Is effect direction consistent?
□ Are effect sizes appropriate?
□ Are transformations documented?
□ Are standard errors available?
□ Was risk of bias assessed?
□ Is pooling scientifically justified?
□ Is the statistical model justified?
□ Is the pooled effect reported with uncertainty?
□ Is heterogeneity examined?
□ Are moderators theoretically motivated?
□ Is publication bias considered?
□ Are influential studies identified?
□ Were sensitivity analyses performed?
□ Is clinical/scientific importance discussed?
□ Is evidence certainty calibrated?
□ Does the conclusion match the evidence?
```

The goal is not merely to calculate:

```text
"the average effect."
```

The goal is to understand:

```text
What is the average effect?
How precise is it?
How much do studies differ?
Why might they differ?
Could bias explain it?
Does it survive reasonable alternatives?
How meaningful is it?
How certain should we be?
```
