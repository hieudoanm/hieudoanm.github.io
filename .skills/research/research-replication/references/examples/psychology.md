# Psychology Replication Example

## Purpose

This example demonstrates how to design and evaluate a replication in psychology.

The example uses a hypothetical study investigating whether a brief working-memory training intervention improves cognitive performance.

The purpose is to illustrate the reasoning process rather than reproduce a specific published study.

---

# 1. Research question

Suppose an original study asks:

> Does working-memory training improve performance on tasks that were not directly trained?

The original researchers report that participants receiving working-memory training perform better on an untrained working-memory task than a control group.

The replication should begin with the scientific claim:

```text
Working-memory training produces a measurable
improvement on an independent cognitive outcome.
```

Not:

```text
Run the same experiment and obtain p < .05.
```

---

# 2. Original scientific claim

Suppose the original study reports:

```text
Participants:
80 adults

Training:
4 weeks of working-memory exercises

Control:
Active control condition

Primary outcome:
Untrained working-memory task

Result:
Training group > control group

Effect:
Hedges g = 0.35
```

The important claim is:

> Working-memory training causes a small-to-moderate improvement in performance on an independent working-memory measure.

---

# 3. Identify the target effect

Before collecting new data, define:

```text
Population:
Healthy adults

Intervention:
Working-memory training

Comparator:
Active control

Primary outcome:
Untrained working-memory performance

Target effect:
Training > control
```

This prevents the replication from drifting toward a different outcome after data are observed.

---

# 4. Direct replication

A close replication might preserve:

```text
Original:
Working-memory training
+
Active control
+
Untrained working-memory test

Replication:
Working-memory training
+
Active control
+
Untrained working-memory test
```

The participants should be new.

---

# 5. What should remain constant?

### Essential

```text
Training construct
Control structure
Primary outcome
Timing
Comparison
```

### Potentially flexible

```text
Recruitment site
Participant demographics within scope
Equivalent stimulus items
Software implementation
Minor procedural details
```

The flexibility should not change the psychological construct being tested.

---

# 6. Construct validity

A major issue in psychology is:

> What psychological construct does the task actually measure?

For example:

```text
"Working-memory task"
```

could involve:

```text
Working memory
Attention
Processing speed
Strategy
Motivation
Task familiarity
```

A replication should examine whether the measurement still represents the original construct.

---

# 7. Training-task overlap

Suppose participants train on:

```text
Digit updating
```

and are tested on:

```text
Spatial updating
```

This is useful because the test is not identical to the training task.

If the test is:

```text
Digit updating
```

the result may primarily demonstrate:

```text
Task-specific practice
```

rather than:

```text
Working-memory improvement
```

---

# 8. Near transfer versus far transfer

Replication interpretation should distinguish:

### Near transfer

```text
Training:
Working memory

Test:
Different working-memory task
```

### Far transfer

```text
Training:
Working memory

Test:
Reasoning
Reading
Academic achievement
Everyday cognition
```

A replication of near transfer does not establish far transfer.

---

# 9. Control condition

The control group is critical.

Possible controls include:

```text
Passive control
Active control
Alternative cognitive training
Placebo-like activity
Waitlist
```

For training research, an active control is often especially informative because both groups receive:

```text
Computer use
Experimenter contact
Task engagement
Expectations
Time commitment
```

---

# 10. Expectancy effects

Participants may believe:

```text
"I am receiving cognitive training."
```

This can influence:

- Motivation
- Effort
- Self-report
- Task engagement
- Performance

Therefore, a replication should consider whether participants and researchers can infer group assignment.

---

# 11. Blinding

Perfect blinding may be difficult in behavioural training studies.

Nevertheless, consider:

```text
Participant blinding
Researcher blinding
Outcome assessor blinding
Automated outcome collection
```

The more objective the outcome measurement, the less opportunity there is for observer bias.

---

# 12. Participant recruitment

The replication should define:

```text
Age range
Language
Education
Inclusion criteria
Exclusion criteria
Recruitment source
Compensation
```

Do not silently change the population.

For example:

```text
Original:
University students

Replication:
Older adults
```

is a cross-population extension, not a simple direct replication.

---

# 13. Sampling method

Ask:

```text
Who participated in the original study?
Who participates in the replication?
```

Convenience samples may differ systematically from the broader population.

Potential differences include:

```text
Education
Motivation
Socioeconomic background
Digital familiarity
Baseline cognitive ability
```

These may moderate training effects.

---

# 14. Sample-size planning

Suppose the original reported:

```text
g = 0.35
```

Do not automatically power the replication to reproduce exactly:

```text
g = 0.35
```

Instead define:

```text
Smallest effect of interest
```

For example:

```text
SESOI = g = 0.20
```

Then determine the sample size needed to distinguish:

```text
Meaningful effect
```

from:

```text
Negligible effect
```

---

# 15. Original effects may be overestimated

The original estimate may be larger than the underlying population effect because of:

- Sampling variability
- Small sample size
- Publication bias
- Researcher degrees of freedom
- Selective reporting

Therefore, replication planning should not assume:

```text
Original effect = true effect
```

---

# 16. Preregistration

Specify before data collection:

```text
Primary hypothesis
Primary outcome
Primary statistical model
Sample size
Exclusion criteria
Training duration
Control condition
Stopping rule
Missing-data handling
Secondary outcomes
```

This makes the replication easier to evaluate.

---

# 17. Primary outcome

Suppose the replication collects:

```text
10 cognitive measures
```

but the original claim concerns:

```text
Working-memory performance
```

Do not allow the primary outcome to become whichever measure shows the largest effect.

Predefine:

```text
Primary outcome
```

and clearly separate:

```text
Secondary
Exploratory
```

analyses.

---

# 18. Baseline assessment

Measure performance before intervention:

```text
Pre-test
    ↓
Training
    ↓
Post-test
```

This allows the analysis to account for baseline differences.

Possible approaches include:

- Change scores
- ANCOVA
- Regression
- Mixed-effects models

The method should be prespecified and scientifically justified.

---

# 19. Regression toward the mean

Suppose participants are selected because they have:

```text
Very low baseline performance.
```

Their scores may improve partly because extreme measurements tend to move closer to the population mean on retesting.

A replication should consider this possibility.

This is another reason a suitable control group is important.

---

# 20. Attrition

Training studies often lose participants.

Track:

```text
Recruitment
↓
Randomised
↓
Started training
↓
Completed training
↓
Completed post-test
↓
Included in analysis
```

Do not report only the final sample.

---

# 21. Differential attrition

Suppose:

```text
Training group:
10% dropout

Control:
35% dropout
```

This can bias the comparison.

Ask:

```text
Who dropped out?
Why?
Was dropout related to treatment?
```

---

# 22. Intervention fidelity

Verify that participants actually completed the intervention.

Useful measures include:

```text
Training sessions completed
Time spent training
Trials completed
Performance during training
Adherence
```

A participant who completes 90% of training and one who completes 10% should not necessarily be treated as equivalent for exploratory analyses.

---

# 23. Manipulation check

If the intervention is expected to change a specific process, consider measuring it.

For example:

```text
Training
    ↓
Working-memory task performance
```

If the training task itself shows no improvement, interpret transfer results cautiously.

However, manipulation checks should be conceptually justified rather than added automatically.

---

# 24. Statistical model

Suppose the primary outcome is:

```text
Post-test working-memory score
```

A simple model might be:

```text
Post-test
    ~
Group
+
Baseline
```

The key coefficient is:

```text
Group effect
```

This estimates the difference between training and control while accounting for baseline performance.

---

# 25. Repeated measurements

If participants complete multiple tasks or time points, a mixed-effects model may be appropriate.

Conceptually:

```text
Outcome
=
Group
+
Time
+
Group × Time
+
Participant random effect
```

The interaction:

```text
Group × Time
```

can test whether performance changes differently between groups.

---

# 26. Avoid analysis drift

Suppose the preregistration specifies:

```text
ANCOVA
```

but the observed data look better under:

```text
Change-score analysis
```

Do not silently switch.

Instead:

```text
Primary:
Preregistered analysis

Secondary:
Alternative analysis
```

Explain the reason for any deviation.

---

# 27. Effect-size comparison

Suppose:

```text
Original:
g = 0.35
95% CI [0.10, 0.60]

Replication:
g = 0.22
95% CI [0.05, 0.39]
```

The replication effect is smaller but points in the same direction.

If the estimates are statistically compatible, this may be:

```text
Broadly consistent
```

rather than a failed replication.

---

# 28. Null replication

Suppose:

```text
Replication:
g = 0.03
95% CI [-0.12, 0.18]
```

If:

```text
SESOI = 0.20
```

the evidence is consistent with the possibility that any effect is too small to be practically meaningful.

An equivalence analysis could provide stronger evidence if appropriately designed.

---

# 29. Non-significant does not mean no effect

Suppose:

```text
g = 0.18
p = .08
95% CI [-0.02, 0.38]
```

This does not establish:

```text
No effect.
```

The confidence interval still includes meaningful positive effects.

A better conclusion is:

> The replication does not provide sufficiently precise evidence to establish a meaningful training effect.

---

# 30. Strong evidence against the original claim

Suppose:

```text
Replication:
g = 0.02
95% CI [-0.04, 0.08]
```

and:

```text
SESOI = 0.20
```

If an equivalence test supports the conclusion that the effect is smaller than the SESOI, the replication provides stronger evidence that the original claimed effect may not be practically important.

---

# 31. Practical significance

Suppose:

```text
g = 0.10
```

Even if statistically significant in a very large sample, ask:

```text
Does this change real-world cognition?
Is the improvement noticeable?
Is it worth four weeks of training?
Does it transfer outside the laboratory?
```

Statistical significance and practical importance are different questions.

---

# 32. Generalisation beyond the laboratory

A replication may find:

```text
Improved laboratory working-memory score
```

but not:

```text
Improved academic performance
```

This does not necessarily contradict the first result.

It suggests:

```text
Near transfer
```

may exist without:

```text
Far transfer.
```

---

# 33. Expectation as a moderator

Suppose participants who strongly believe in cognitive training improve more.

A replication might test:

```text
Training effect
×
Expectancy
```

This could reveal that the original effect depends partly on participant expectations.

Such an analysis should be distinguished from the primary replication test.

---

# 34. Individual differences

Training effects may vary by:

```text
Baseline ability
Age
Education
Motivation
Sleep
Training adherence
Personality
```

A replication can investigate whether the original effect generalises across these characteristics.

However, moderation analyses should usually be treated as secondary unless strongly justified and adequately powered.

---

# 35. Site replication

Suppose the original study was conducted at:

```text
University A
```

and the replication at:

```text
University B
```

This adds evidence about:

```text
Site generalisation
```

Potential differences include:

```text
Participant pool
Experimenter
Environment
Recruitment
Equipment
Instructions
```

If the effect survives, confidence in robustness increases.

---

# 36. Multi-site replication

A stronger design might use:

```text
Site A
Site B
Site C
Site D
```

with a common protocol.

This can separate:

```text
Study-specific effects
```

from:

```text
More general effects
```

Site can be modelled as a source of variation.

---

# 37. Psychology-specific measurement issues

Behavioural measures can be influenced by:

```text
Practice effects
Speed-accuracy trade-offs
Ceiling effects
Floor effects
Task familiarity
Motivation
Fatigue
Instruction interpretation
```

A replication should check these before interpreting differences.

---

# 38. Practice effects

Suppose participants complete the same test:

```text
Pre-test
Post-test
```

Performance may improve simply because participants have seen the task before.

Possible solutions include:

```text
Parallel forms
Counterbalancing
Matched alternate versions
Statistical adjustment
```

The choice should be specified in advance.

---

# 39. Speed-accuracy trade-off

Suppose reaction time improves:

```text
500 ms → 400 ms
```

but accuracy decreases:

```text
95% → 80%
```

The participant may simply be responding faster at the cost of accuracy.

Therefore:

```text
Reaction time
+
Accuracy
```

should be considered together when appropriate.

---

# 40. Reaction-time replication

For reaction-time studies, inspect:

```text
Median RT
Distribution
Outliers
Errors
Accuracy
Speed-accuracy trade-off
Trial exclusions
```

Reaction-time data are often skewed.

A replication should not automatically use a statistical model inappropriate for the distribution.

---

# 41. Psychology example: Stroop effect

Suppose an original study reports:

```text
Congruent:
600 ms

Incongruent:
650 ms

Stroop effect:
50 ms
```

Replication:

```text
Congruent:
590 ms

Incongruent:
642 ms

Stroop effect:
52 ms
```

This is strongly consistent with the original finding.

The absolute reaction times changed, but the target effect remained similar.

---

# 42. Psychology example: memory intervention

Original:

```text
Training effect:
g = 0.40
```

Replication:

```text
g = 0.18
```

Possible interpretations include:

```text
Smaller true effect
Original effect inflation
Population difference
Training implementation
Measurement difference
Context dependence
```

Do not choose one explanation without evidence.

---

# 43. A replication can improve the original design

Suppose the original study had:

```text
N = 30
Passive control
One outcome
No preregistration
```

The replication may use:

```text
N = 200
Active control
Prespecified primary outcome
Preregistration
Better measurement
```

This is not a flaw.

A replication can preserve the scientific question while improving methodological quality.

---

# 44. Replication versus conceptual extension

Suppose the original study asks:

> Does working-memory training improve working memory?

A new study asks:

> Does working-memory training improve reasoning?

This is not the same target.

It is a:

```text
Far-transfer extension
```

The result should not be labelled as a direct replication of the original working-memory effect.

---

# 45. Replication result matrix

A useful summary is:

| Dimension       | Original    | Replication | Assessment |
| --------------- | ----------- | ----------- | ---------- |
| Population      | Adults      | Adults      | Similar    |
| Intervention    | WM training | WM training | Same       |
| Control         | Active      | Active      | Same       |
| Duration        | 4 weeks     | 4 weeks     | Same       |
| Primary outcome | WM task     | WM task     | Same       |
| Sample          | N=80        | N=200       | Larger     |
| Effect          | g=.35       | g=.22       | Smaller    |
| Direction       | Positive    | Positive    | Consistent |
| Precision       | Moderate    | Higher      | Improved   |

---

# 46. Overall interpretation

A reasonable conclusion might be:

> The replication found a positive effect of working-memory training on the prespecified untrained working-memory outcome. The estimated effect was smaller than in the original study but remained compatible with a small beneficial effect. Given the independent sample, active control condition, and improved precision, the findings provide broadly consistent evidence for a modest near-transfer effect, while providing no direct evidence for far transfer to unrelated cognitive abilities.

This is stronger than:

> The study successfully replicated the original result.

The first statement tells the reader what actually survived replication.

---

# 47. What if the replication fails?

Suppose:

```text
Original:
g = 0.35

Replication:
g = 0.01
95% CI [-0.08, 0.10]
```

Possible explanations include:

```text
Original false positive
Original effect overestimated
Replication population differs
Training implementation differs
Measurement differs
Original publication bias
Effect is context-dependent
```

The correct next step is investigation, not immediate certainty.

---

# 48. Follow-up experiments

A discrepancy can generate new research questions.

For example:

```text
Does training benefit only low-baseline participants?

Does expectancy moderate the effect?

Does transfer depend on training intensity?

Does the effect disappear with an active control?

Does the effect generalise outside the laboratory?
```

Replication can therefore lead directly into research-gap identification.

---

# 49. Recommended replication workflow

```text
Original claim
      ↓
Define psychological construct
      ↓
Define target effect
      ↓
Identify essential design components
      ↓
Choose replication type
      ↓
Define SESOI
      ↓
Power the study
      ↓
Preregister
      ↓
Collect independent data
      ↓
Validate intervention
      ↓
Run primary analysis
      ↓
Estimate effect + uncertainty
      ↓
Compare with original
      ↓
Investigate discrepancies
      ↓
Assess generalisability
      ↓
Update confidence
```

---

# 50. Psychology replication checklist

```text
[ ] Psychological construct is clearly defined
[ ] Original claim is clearly identified
[ ] Primary outcome is prespecified
[ ] Control condition is appropriate
[ ] Participants are independent
[ ] Population is clearly defined
[ ] Sample size is justified
[ ] SESOI is defined
[ ] Intervention fidelity is measured
[ ] Attrition is reported
[ ] Differential attrition is assessed
[ ] Practice effects are considered
[ ] Measurement reliability is adequate
[ ] Primary analysis is preregistered
[ ] Deviations are reported
[ ] Effect size is reported
[ ] Confidence interval is reported
[ ] Non-significance is not treated as proof of no effect
[ ] Practical significance is considered
[ ] Near and far transfer are distinguished
[ ] Exploratory analyses are labelled
[ ] Generalisation claims are appropriately limited
```

---

# Final principle

Psychology replication is fundamentally about determining whether a psychological finding survives a new test under clearly defined conditions.

The reasoning is:

```text
ORIGINAL PSYCHOLOGICAL CLAIM
            ↓
WHAT CONSTRUCT IS BEING TESTED?
            ↓
WHAT IS THE TARGET EFFECT?
            ↓
WHAT MUST REMAIN CONSTANT?
            ↓
WHAT CAN CHANGE?
            ↓
NEW INDEPENDENT SAMPLE
            ↓
PRESPECIFIED ANALYSIS
            ↓
EFFECT + UNCERTAINTY
            ↓
COMPARE WITH ORIGINAL
            ↓
CHECK PRACTICAL SIGNIFICANCE
            ↓
ASSESS GENERALISABILITY
            ↓
UPDATE CONFIDENCE
```

> **A good psychology replication tests the same psychological claim while making clear which parts of the original finding are robust, which are uncertain, and which depend on specific conditions.**
