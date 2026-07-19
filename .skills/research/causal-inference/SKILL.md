---
name: "causal-inference"
description: "Frame and evaluate causal questions by defining estimands, drawing causal models, assessing identification assumptions, and planning robust analyses."
tags:
  - "research"
  - "causal-inference"
  - "methods"
when_to_use: "Use when a research question asks what would happen under an intervention or exposure, or when evaluating whether observational evidence supports a causal claim."
prerequisites:
  - "A clearly defined population, exposure or intervention, comparator, outcome, and time frame."
  - "Subject-matter knowledge and access to statistical expertise appropriate to the design."
related_skills:
  - "../study-design-protocol/SKILL.md"
  - "../quantitative-analysis-plan/SKILL.md"
  - "../research-replication/SKILL.md"
avoid_when:
  - "When only describing an association without causal interpretation; use quantitative-analysis-plan."
  - "When causal identification assumptions cannot be defended, do not force a causal estimate; report the limits or use a descriptive estimand."
status: "active"
---

# Causal Inference

## Purpose

Clarify what causal effect is being asked about, what evidence could identify it, and what assumptions connect observed data to the target. A causal diagram or statistical model alone does not establish causality.

## Workflow

1. State the causal question, target population, intervention or exposure, comparator, outcome, and time horizon.
2. Define the estimand and specify how post-treatment events are handled.
3. Draw a causal diagram based on substantive knowledge; distinguish measured and unmeasured variables.
4. Select a design and identification strategy before choosing an estimator.
5. State assumptions, diagnostics, overlap/positivity, and threats to identification.
6. Specify estimation, uncertainty, missingness, and sensitivity analyses.
7. Interpret the estimate only for the population and intervention represented by the design.

See [identification strategies](references/identification-strategies.md) before treating regression adjustment as a causal method.

## Core cautions

- Association, prediction, temporal order, and causation are different claims.
- Adjusting for every available variable can introduce bias; distinguish confounders, mediators, colliders, and instruments using the causal structure.
- “Controlling for” variables does not remove unmeasured confounding by itself.
- Report the target contrast and assumptions, not just the model coefficient.
- Use negative controls, alternative specifications, or quantitative bias analysis only when they test a stated threat.

## Observational and experimental evidence

Randomization can support exchangeability for assignment under proper implementation, but attrition, nonadherence, interference, measurement, and generalizability still matter. Observational designs require explicit identification assumptions and design choices; complex estimators do not make weak assumptions credible.

## Reporting

Describe the causal question, design, target population, estimand, identification assumptions, analytic strategy, diagnostics, and sensitivity analyses. Distinguish the causal interpretation from the observed data and avoid overstating external validity.

## Completion checks

- The estimand and target population are explicit.
- A design-based identification argument is stated and critically assessed.
- Confounders and other causal roles are reasoned, not selected by significance.
- Key assumptions and sensitivity analyses are documented.
- Conclusions do not exceed what the design identifies.

## Further detail

- [Causal questions and estimands](references/causal-questions-and-estimands.md)
- [Identification strategies](references/identification-strategies.md)
- [Causal diagrams](references/causal-diagrams.md)
- [Sensitivity and diagnostics](references/sensitivity-and-diagnostics.md)
