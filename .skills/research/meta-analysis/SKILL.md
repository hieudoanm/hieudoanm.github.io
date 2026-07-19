---
name: "meta-analysis"
description: "Systematically synthesize quantitative evidence across multiple studies by defining eligibility criteria, extracting comparable effect sizes, estimating pooled effects, evaluating heterogeneity and bias, conducting sensitivity analyses, and interpreting the strength and generalisability of the evidence."
tags:
  - "research"
  - "meta"
  - "analysis"
when_to_use: "Use to plan, perform, or critically interpret a quantitative synthesis that pools compatible effect estimates from multiple studies and evaluates heterogeneity, bias, and uncertainty."
prerequisites:
  - "A focused question, explicit eligibility criteria, and a documented search or study set."
  - "At least two studies with outcomes and effect estimates that can be meaningfully harmonized, or data sufficient to derive them."
  - "A justified effect measure and model, with statistical software and expertise appropriate to the analysis."
related_skills:
  - "../research-replication/SKILL.md"
  - "../research-reproduction/SKILL.md"
  - "../literature-review/SKILL.md"
avoid_when:
  - "When studies do not estimate a sufficiently comparable outcome or estimand; use a structured narrative synthesis instead of forcing a pooled estimate."
  - "When only one study is available; use critical appraisal and report the evidence without pooling."
  - "When the goal is to test a finding with new data or repeat original code; use research-replication or research-reproduction."
status: "active"
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

## Core Principle
> **Do not treat every study as equally informative, and do not treat a pooled effect as meaningful without examining heterogeneity, bias, study quality, and the comparability of the underlying evidence.**

A pooled estimate is only as meaningful as the assumptions and evidence supporting it.

---

## Core Workflow
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

## Define the Research Question
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

## Define Eligibility Before Looking at Results
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

## Sensitivity Analysis
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

## Further detail

- [Bias And Sensitivity](references/bias-and-sensitivity.md)
- [Effect Sizes](references/effect-sizes.md)
- [Heterogeneity](references/heterogeneity.md)
- [Meta Analysis Workflow](references/meta-analysis-workflow.md)
