# Snyk: Overview

## Scenario

A project is working on **overview** for Snyk. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Snyk is a security scanner across four surfaces — application code, dependencies, infrastructure as code, and container images — and its weakness is the same as every scanner's: **it reports what matches a signature, not what is exploitable in your code**. A critical finding in a dev-only dependency that never ships and is never imported is a false positive in everything but the letter of the rule. Practical Snyk work is about **triage by reachability and exposure, not by severity number, and fixing the cause rather than the finding**. Routine update automation is a different job; see renovate.md.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
