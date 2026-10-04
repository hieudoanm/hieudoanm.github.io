````markdown
# Clinical Neuroscience Example

## Purpose

This example demonstrates how to conduct and interpret a meta-analysis in clinical neuroscience.

The example is hypothetical. The numerical results are illustrative rather than results from a real evidence synthesis.

The example focuses on an important clinical-neuroscience question:

> **Does rehabilitation improve language outcomes after stroke?**

This example combines issues from:

- Clinical trials
- Neuropsychological measurement
- Language outcomes
- Heterogeneous patient populations
- Functional recovery
- Intervention intensity
- Risk of bias
- Clinical significance

The central lesson is that a clinically meaningful meta-analysis must distinguish between:

```text
Statistical evidence
        ↓
Clinical importance
        ↓
Patient-level relevance
        ↓
Generalisability
```

---

# 1. Define the Research Question

A structured question might be:

> Among adults with post-stroke aphasia, do language rehabilitation interventions improve language outcomes compared with usual care, no treatment, or alternative rehabilitation?

Using a PICO framework:

| Component    | Definition                                              |
| ------------ | ------------------------------------------------------- |
| Population   | Adults with post-stroke aphasia                         |
| Intervention | Language rehabilitation                                 |
| Comparator   | Usual care, no treatment, or alternative rehabilitation |
| Outcome      | Language performance                                    |
| Time         | Post-intervention and follow-up                         |

A more specific question could be:

> What is the effect of speech and language therapy on functional language outcomes after stroke?

The exact outcome definition matters because "language recovery" can refer to very different things.

---

# 2. Define Eligibility Criteria

Suppose the review includes:

### Include

- Adults with confirmed stroke
- Aphasia diagnosed using a recognised assessment
- Randomised or controlled clinical trials
- Speech and language rehabilitation intervention
- Comparator group
- Quantitative language outcome
- Sufficient data to calculate an effect size

### Exclude

- Paediatric stroke
- Traumatic brain injury
- Neurodegenerative aphasia
- Studies without a comparator
- Studies with insufficient outcome information
- Interventions unrelated to language rehabilitation

Additional criteria might specify:

- Stroke type
- Time since stroke
- First-ever vs recurrent stroke
- Severity of aphasia
- Acute vs chronic stage

These criteria can substantially change the resulting evidence base.

---

# 3. Why Population Definition Matters

Stroke is not a single homogeneous condition.

Patients can differ in:

- Lesion location
- Lesion size
- Stroke type
- Time since stroke
- Aphasia subtype
- Baseline severity
- Age
- Cognitive impairment
- Motor impairment
- Comorbidities

For example:

```text
Patient A
Acute stroke
Small left-hemisphere lesion
Mild aphasia

Patient B
Chronic stroke
Large left-hemisphere lesion
Severe aphasia
```

These patients may both satisfy a broad definition of:

> "Post-stroke aphasia"

but they may have very different expected trajectories and responses to rehabilitation.

Therefore, population heterogeneity is a central issue.

---

# 4. Search for Studies

A search strategy might include:

```text
stroke
AND
aphasia
AND
language rehabilitation
```

along with related terms:

```text
speech therapy
speech-language therapy
language therapy
aphasia rehabilitation
communication therapy
```

Relevant databases could include:

- PubMed
- PsycINFO
- Web of Science
- Scopus
- Cochrane Library

Clinical trial registries and reference lists may provide additional studies.

The search strategy should be documented before screening is completed.

---

# 5. Screen the Evidence

Suppose the search produces:

```text
3,100 records
      ↓
2,200 after duplicates
      ↓
275 full texts
      ↓
38 eligible studies
```

Reasons for exclusion might include:

| Reason                       | Number |
| ---------------------------- | -----: |
| Wrong population             |     55 |
| Wrong intervention           |     61 |
| No appropriate comparator    |     37 |
| Wrong study design           |     31 |
| No relevant language outcome |     28 |
| Insufficient data            |     18 |
| Duplicate cohort             |      7 |

The numbers are illustrative.

The important point is that screening should be reproducible.

---

# 6. Identify Independent Patient Cohorts

Clinical neuroscience presents a particularly important problem:

> The same patients may appear in multiple publications.

For example:

```text
Trial A
├── Main outcome paper
├── Neuroimaging paper
├── Long-term follow-up
└── Secondary language analysis
```

These papers should not automatically be treated as independent samples.

If the same 40 patients appear in three publications and all three are entered independently, the meta-analysis may effectively count those patients multiple times.

This can produce:

- Excessive precision
- Incorrect weighting
- Artificially narrow confidence intervals

The evidence structure should therefore track the underlying cohort or trial.

---

# 7. Define the Language Outcome

"Language ability" can include:

- Naming
- Auditory comprehension
- Reading
- Repetition
- Spontaneous speech
- Sentence production
- Discourse
- Functional communication
- Quality of life

These are related but not identical constructs.

For example:

```text
Naming ability
      ≠
Functional communication
```

An intervention might improve naming substantially without producing an equally large improvement in everyday communication.

Therefore, outcome domains should be defined before pooling.

---

# 8. Primary and Secondary Outcomes

Suppose the review defines:

### Primary outcome

Functional communication.

### Secondary outcomes

- Naming
- Comprehension
- Repetition
- Reading
- Writing
- Discourse
- Communication-related quality of life

This distinction prevents researchers from selecting whichever outcome happens to produce the strongest result.

---

# 9. Choosing the Effect Size

Suppose different studies use different language assessments.

For example:

```text
Western Aphasia Battery
Boston Naming Test
Aphasia Battery of Chinese
Comprehensive Aphasia Test
Functional Communication Profile
```

If the instruments use different scales, the meta-analysis might use:

> **Standardised Mean Difference**

For small samples, Hedges' g can reduce small-sample bias.

For example:

```text
g = 0.38
95% CI [0.20, 0.56]
```

could represent a small-to-moderate improvement.

The direction should be defined consistently:

```text
Positive g
    ↓
Better language outcome
    ↓
Intervention favoured
```

---

# 10. Clinical Meaning of the Effect

A standardised effect size is useful for comparing studies, but it can be difficult to interpret clinically.

Suppose:

```text
g = 0.38
```

This does not directly tell a clinician:

> "The patient will improve by X points."

Clinical interpretation may require:

- Minimal clinically important difference
- Reliable change
- Functional outcome thresholds
- Patient-reported benefit
- Real-world communication ability

Therefore:

> Statistical effect size and clinically meaningful improvement are related but not identical.

---

# 11. Extract Study Data

A simplified extraction table might look like:

| Study   |   n | Stroke stage | Outcome                  |    g |   SE | Risk of bias  |
| ------- | --: | ------------ | ------------------------ | ---: | ---: | ------------- |
| Study 1 |  42 | Chronic      | Naming                   | 0.31 | 0.21 | Low           |
| Study 2 |  58 | Chronic      | Functional communication | 0.44 | 0.18 | Some concerns |
| Study 3 |  31 | Acute        | Language composite       | 0.12 | 0.25 | High          |
| Study 4 |  76 | Subacute     | Naming                   | 0.51 | 0.16 | Low           |
| ...     | ... | ...          | ...                      |  ... |  ... | ...           |

Additional variables should include:

- Age
- Sex
- Stroke type
- Lesion information
- Time post-stroke
- Baseline severity
- Aphasia classification
- Intervention duration
- Session frequency
- Total treatment hours
- Comparator type
- Attrition
- Follow-up duration

---

# 12. Intervention Heterogeneity

"Speech and language therapy" can describe very different interventions.

For example:

```text
Naming therapy
      ↓
Constraint-induced language therapy
      ↓
Conversational therapy
      ↓
Computer-assisted therapy
      ↓
Group therapy
      ↓
Intensive language therapy
```

These interventions may operate through different mechanisms.

Pooling them can be useful if they address a sufficiently common clinical question.

But researchers should avoid treating them as interchangeable without justification.

---

# 13. Treatment Dose

Treatment intensity may vary substantially.

For example:

| Study | Sessions/week | Duration | Total hours |
| ----- | ------------: | -------: | ----------: |
| A     |             2 |  4 weeks |           8 |
| B     |             3 |  8 weeks |          24 |
| C     |             5 |  6 weeks |          30 |
| D     |            10 |  2 weeks |          20 |

Two interventions can therefore both be described as:

> "6-week therapy"

while providing very different treatment doses.

Potential moderators include:

- Total treatment hours
- Sessions per week
- Session duration
- Treatment period
- Therapist contact
- Home practice

---

# 14. Random-Effects Meta-Analysis

Suppose 38 studies are pooled.

The overall result is:

```text
Hedges' g = 0.36
95% CI [0.25, 0.47]
```

The basic interpretation is:

> Language rehabilitation is associated with better language outcomes than the comparison conditions on average.

But the pooled effect should not be interpreted in isolation.

We still need to examine:

```text
Heterogeneity
Risk of bias
Clinical significance
Outcome domain
Stroke stage
Treatment dose
Control condition
```

---

# 15. Examine Heterogeneity

Suppose:

```text
I² = 71%
τ² = 0.10
```

This indicates substantial variation between studies.

Possible sources include:

- Stroke stage
- Baseline severity
- Treatment dose
- Intervention type
- Outcome domain
- Comparator
- Age
- Measurement instrument

The question becomes:

> Why are the effects different?

rather than:

> How can we make the heterogeneity disappear?

---

# 16. Stroke Stage as a Moderator

Suppose the studies are grouped by time since stroke:

| Stage    | Studies | Hedges' g |
| -------- | ------: | --------: |
| Acute    |       8 |      0.22 |
| Subacute |      14 |      0.41 |
| Chronic  |      16 |      0.35 |

These differences may suggest that treatment effects vary across recovery stages.

However, subgroup differences are not automatically causal.

For example, acute and chronic studies may also differ in:

- Baseline severity
- Treatment intensity
- Spontaneous recovery
- Participant selection
- Outcome measurement

Therefore:

> A moderator association should not automatically be interpreted as evidence that stroke stage causes the difference in treatment response.

---

# 17. Spontaneous Recovery

Clinical neuroscience introduces a particularly important issue.

After stroke:

```text
Stroke
  ↓
Natural recovery
  ↓
Functional changes over time
```

Therefore, improvement in the treatment group does not necessarily mean that the intervention caused the entire improvement.

The appropriate comparison is generally:

```text
Change in intervention group
          vs
Change in control group
```

rather than simply:

```text
Post-treatment score
```

The control condition helps estimate how much improvement might have occurred without the intervention.

---

# 18. Comparator Type

Consider three types of control:

```text
No treatment
Usual care
Alternative rehabilitation
```

These comparisons answer different questions.

### No treatment

> Is the intervention better than receiving no additional treatment?

### Usual care

> Is the intervention better than what patients would normally receive?

### Alternative rehabilitation

> Is the intervention better than another credible treatment?

A large effect against no treatment may therefore not imply a large advantage over an established therapy.

---

# 19. Follow-Up Effects

Suppose the post-treatment effect is:

```text
g = 0.36
```

but at three-month follow-up:

```text
g = 0.19
```

This raises an important question:

> Does the intervention produce durable improvement?

An intervention may produce:

```text
Immediate improvement
        ↓
Partial maintenance
        ↓
Reduced effect at follow-up
```

Therefore, time point should be specified before extraction.

Post-treatment and long-term follow-up effects should not automatically be treated as interchangeable.

---

# 20. Risk of Bias

Suppose the review finds:

```text
Low risk          14 studies
Some concerns     17 studies
High risk          7 studies
```

Potential concerns include:

- Inadequate randomisation
- Allocation problems
- High attrition
- Missing outcome data
- Selective reporting
- Lack of preregistration
- Inadequate analysis
- Outcome measurement problems

Blinding is particularly difficult in behavioural rehabilitation.

Patients and therapists often know whether treatment is being delivered.

Therefore, risk of bias should consider which types of blinding are realistically possible and which outcomes are most vulnerable to expectancy effects.

---

# 21. Sensitivity Analysis

Suppose the primary analysis gives:

```text
g = 0.36
95% CI [0.25, 0.47]
```

Now remove studies judged to have high risk of bias:

```text
g = 0.31
95% CI [0.20, 0.42]
```

Remove the most influential study:

```text
g = 0.34
95% CI [0.23, 0.45]
```

Use only studies with active comparators:

```text
g = 0.22
95% CI [0.10, 0.34]
```

The overall direction remains positive.

However, the effect becomes smaller under the more demanding comparison.

This would support a cautious conclusion that rehabilitation appears beneficial, while avoiding the stronger claim that it is dramatically superior to all alternative care.

---

# 22. Publication Bias

Suppose small studies tend to report large positive effects.

Potential explanations include:

- Publication bias
- Selective outcome reporting
- Small-study effects
- Differences in intervention intensity
- Differences in patient selection

A funnel plot can help investigate asymmetry, but asymmetry is not proof of publication bias.

The review should consider:

```text
Search completeness
+
Unpublished studies
+
Trial registries
+
Small-study effects
+
Selective reporting
```

rather than relying on a single statistical test.

---

# 23. Patient-Level Generalisability

Suppose the included trials mostly involve:

```text
Adults
Mild-to-moderate aphasia
High treatment adherence
Specialist rehabilitation centres
```

The resulting evidence may not generalise equally well to:

```text
Severe aphasia
Multiple comorbidities
Limited access to therapy
Very old patients
Different healthcare systems
Low treatment adherence
```

Therefore:

> Evidence from a controlled clinical trial population is not automatically evidence for every patient who meets the diagnostic definition.

Generalisability should be considered explicitly.

---

# 24. Neuroimaging Outcomes

Clinical neuroscience studies may also report:

- fMRI
- PET
- EEG
- MEG
- Structural MRI
- Functional connectivity

Suppose an intervention improves both language performance and functional connectivity.

It would be tempting to conclude:

> "The brain change explains the behavioural improvement."

But correlation does not establish mediation.

A proper mediation question might be:

```text
Intervention
     ↓
Neural change
     ↓
Language improvement
```

Testing this mechanism requires an appropriate mediation design and analysis.

A meta-analysis of behavioural outcomes alone cannot establish the neural mechanism.

---

# 25. Multiple Outcome Domains

Suppose an intervention improves:

```text
Naming       g = 0.52
Comprehension g = 0.21
Discourse    g = 0.08
Quality of life g = 0.15
```

It would be misleading to summarise this as:

> "The intervention improves language."

A more precise interpretation might be:

> The evidence appears stronger for some impairment-level language outcomes than for broader functional communication outcomes.

This distinction can be clinically important.

---

# 26. Prediction Interval

Suppose:

```text
Pooled effect:
g = 0.36

95% CI:
[0.25, 0.47]

Prediction interval:
[-0.08, 0.80]
```

The pooled average is clearly positive, but the prediction interval is much wider.

This suggests that a future study under similar conditions could plausibly produce an effect close to zero.

The result therefore supports an average beneficial effect while also indicating substantial uncertainty about the magnitude in a new setting.

---

# 27. Clinical Interpretation

Suppose the final evidence is:

```text
Pooled effect
g = 0.36

95% CI
[0.25, 0.47]

I²
71%

Prediction interval
[-0.08, 0.80]

Sensitivity analyses
Direction generally stable

Active-control analysis
Smaller effect
```

A calibrated conclusion might be:

> Language rehabilitation is associated with improved language outcomes after stroke, with a small-to-moderate average effect across the available trials. However, effects vary substantially between studies and are smaller when compared with active rehabilitation rather than minimal or no treatment. The evidence therefore supports rehabilitation as beneficial on average, while the magnitude of benefit for an individual patient is likely to depend on factors such as stroke stage, baseline impairment, treatment dose, intervention type, and outcome domain.

This is much stronger scientifically than:

> "Speech therapy works for stroke patients."

---

# 28. What the Meta-Analysis Cannot Tell a Clinician

A pooled effect does not directly answer:

- Which treatment is best for a particular patient?
- How many therapy sessions does one patient need?
- Which therapy is optimal for a specific aphasia subtype?
- Whether a patient will personally improve
- Whether neural changes caused the behavioural improvement
- Whether the treatment is cost-effective
- Whether an intervention is feasible in every healthcare setting

These questions require additional evidence.

A meta-analysis provides population-level synthesis, not a personalised treatment prescription.

---

# 29. Clinical Significance vs Statistical Significance

Consider:

```text
Statistically significant:
g = 0.36
```

The next question is:

> Is the change meaningful to the patient?

For example, a patient may care more about:

```text
Can I have a conversation?
Can I communicate with my family?
Can I return to work?
Can I make a phone call?
Can I understand everyday speech?
```

than about a change in a standardised test score.

Therefore, clinical neuroscience should consider:

```text
Impairment
     ↓
Activity
     ↓
Participation
     ↓
Quality of life
```

An intervention can improve an impairment-level measure without producing the same magnitude of improvement in everyday participation.

---

# 30. A Compact Analysis Workflow

For this example:

```text
Clinical question
        ↓
Define PICO
        ↓
Define aphasia population
        ↓
Search clinical literature
        ↓
Screen studies
        ↓
Identify independent cohorts
        ↓
Extract language outcomes
        ↓
Define outcome domains
        ↓
Calculate comparable effect sizes
        ↓
Assess risk of bias
        ↓
Pool effects
        ↓
Assess heterogeneity
        ↓
Investigate stroke stage
        ↓
Investigate treatment dose
        ↓
Investigate comparator
        ↓
Assess publication bias
        ↓
Run sensitivity analyses
        ↓
Assess prediction interval
        ↓
Evaluate clinical significance
        ↓
Assess generalisability
        ↓
Draw calibrated clinical conclusion
```

---

# 31. Clinical Neuroscience Checklist

Before trusting a clinical neuroscience meta-analysis, ask:

### Population

- Are the patients clinically comparable?
- Is disease severity reported?
- Is time since diagnosis or injury reported?
- Are important comorbidities considered?

### Intervention

- Are interventions genuinely comparable?
- Is treatment dose reported?
- Is treatment fidelity assessed?

### Outcome

- What exactly is being measured?
- Are impairment and functional outcomes separated?
- Are validated clinical measures used?
- Is the outcome clinically meaningful?

### Comparator

- Is the control no treatment, usual care, or active treatment?
- Does the comparator control for attention and expectancy?

### Evidence

- Are multiple publications from the same cohort handled correctly?
- Is risk of bias assessed?
- Is heterogeneity substantial?
- Are sensitivity analyses reported?

### Interpretation

- Is the effect clinically meaningful?
- Does it generalise to real patients?
- Is the prediction interval informative?
- Are mechanistic claims supported by appropriate evidence?

---

# 32. Final Mental Model

For clinical neuroscience meta-analysis:

```text
WHO ARE THE PATIENTS?
        ↓
WHAT EXACTLY WAS THE INTERVENTION?
        ↓
WHAT WAS THE COMPARATOR?
        ↓
WHAT CLINICAL OUTCOME WAS MEASURED?
        ↓
WHAT IS THE AVERAGE EFFECT?
        ↓
HOW MUCH DO PATIENTS AND STUDIES DIFFER?
        ↓
COULD NATURAL RECOVERY EXPLAIN PART OF THE CHANGE?
        ↓
COULD BIAS EXPLAIN THE RESULT?
        ↓
DOES THE EFFECT SURVIVE SENSITIVITY ANALYSIS?
        ↓
IS IT CLINICALLY MEANINGFUL?
        ↓
DOES IT GENERALISE TO REAL PATIENTS?
        ↓
WHAT CAN WE CONFIDENTLY RECOMMEND?
```

The key lesson is:

> **In clinical neuroscience, a statistically significant pooled effect is only the beginning of interpretation. The real question is whether the evidence represents a meaningful, robust, and generalisable improvement for patients.**
````
