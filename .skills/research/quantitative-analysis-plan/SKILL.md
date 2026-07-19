---
name: "quantitative-analysis-plan"
description: "Specify a quantitative analysis before interpreting outcomes by defining estimands, outcomes, models, assumptions, missingness, multiplicity, and sensitivity checks."
tags:
  - "research"
  - "quantitative"
  - "analysis-plan"
when_to_use: "Use to draft, review, or preregister an analysis plan for quantitative research before outcome-driven analysis, or to transparently document a retrospective analysis."
prerequisites:
  - "A focused question, data-generating design, candidate outcomes, and a basic understanding of the data structure."
  - "Access to appropriate statistical expertise for specialized models, causal estimands, or high-stakes decisions."
related_skills:
  - "../study-design-protocol/SKILL.md"
  - "../research-reproduction/SKILL.md"
  - "../meta-analysis/SKILL.md"
avoid_when:
  - "When the primary need is selecting or conducting an empirical study design; use study-design-protocol."
  - "When the analysis pools study-level effects across a review; use meta-analysis."
  - "When analyses are already exploratory, do not retrospectively describe them as prespecified."
status: "active"
---

# Quantitative Analysis Plan

## Purpose

Specify how data will answer a quantitative question before results drive analytic choices. The plan makes outcomes, estimands, models, assumptions, and uncertainty visible; it does not guarantee unbiased results or replace statistical review.

## Workflow

1. Restate the question and data-generating design; identify the unit of inference and analysis.
2. Define the target population, contrast, outcome, follow-up, and estimand.
3. Choose one primary outcome and analysis, with rationale and clinically/scientifically meaningful scale where applicable.
4. Describe data structure, measurement, coding, exclusions, missingness, and transformations.
5. Specify the model, covariates, dependence structure, assumptions, and diagnostics.
6. Plan multiplicity, subgroup, sensitivity, and secondary analyses.
7. Define reporting of effect estimates, uncertainty, and practical interpretation.
8. Record timing, access to outcomes, software, deviations, and exploratory analyses.

## Specify inference, not just software

State what quantity is being estimated and under what assumptions. Covariates should follow design and subject-matter rationale, not automated significance screening. For causal questions, state identification assumptions and distinguish the estimand from the fitted model. Consult the [estimands and outcomes reference](references/estimands-and-outcomes.md).

## Missing data and exclusions

Define valid ranges, data errors, protocol exclusions, and analysis populations before unblinded analysis where possible. Describe expected missingness, diagnostics, primary handling, and sensitivity analyses. Avoid complete-case analysis by default when it can introduce bias or reduce precision.

## Multiplicity and exploration

Identify confirmatory primary tests and family-wise or false-discovery strategy when needed. Treat unplanned subgroup, model, or outcome searches as exploratory and label them. Do not use a nonsignificant result to claim no meaningful effect without an appropriate precision or equivalence framework.

## Reporting

Report estimates with uncertainty and units, model specification, assumptions, missingness, deviations, and sensitivity results. Include negative or inconclusive findings. Explain when the data cannot identify the intended quantity.

## Completion checks

- Primary question, estimand, outcome, population, and time point are explicit.
- Analysis is tied to design and data structure with assumptions stated.
- Missingness, exclusions, multiplicity, and sensitivity plans are defined.
- Confirmatory and exploratory work are distinguishable.
- Reporting emphasizes effect size and uncertainty, not p-values alone.

## Further detail

- [Estimands and outcomes](references/estimands-and-outcomes.md)
- [Model choice and diagnostics](references/model-choice-and-diagnostics.md)
- [Missing data and exclusions](references/missing-data-and-exclusions.md)
- [Multiplicity and sensitivity](references/multiplicity-and-sensitivity.md)
