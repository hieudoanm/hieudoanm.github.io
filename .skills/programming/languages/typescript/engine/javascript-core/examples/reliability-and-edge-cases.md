# JavaScriptCore Best Practices: Overview

## Scenario

A project is working on **overview** for JavaScriptCore Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

JavaScriptCore (JSC) is **Apple's JS engine (WebKit, Safari, iOS/macOS JavaScript apps)** — with its own pipeline: parser → baseline JIT → DFG → FTL. Practical JSC-aware code shares V8-ish principles but with engine-specific levers: **stable shapes & monomorphic call sites still win; `--useJIT`/diagnostics via Safari's Performance tooling, not recipe-guessing** — steer code toward the fast paths JSC exposes, and read JSC's optimized IR only when profiling says so.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
