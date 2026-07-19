# SpiderMonkey Best Practices: Overview

## Scenario

A project is working on **overview** for SpiderMonkey Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

SpiderMonkey (SM) is **Mozilla's JS engine (Firefox, and the FirefoxOS / embedded contexts)** — with a pipeline of interpreter → baseline JIT → Ion (tiered optimization) plus a bytecode-to-native compiler. Practical SM-aware code follows the same shape-discipline but with SM's specifics: **stable hidden classes (current "group"/shape), consistent call-site types for Ion, generated structures to avoid `getter`/`setter` surprise deopts, and profiles from `--ion-monitoring`/gecko profiler before tuning.**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
