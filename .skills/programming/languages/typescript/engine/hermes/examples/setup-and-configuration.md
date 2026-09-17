# Hermes Best Practices: Overview

## Scenario

A project is working on **overview** for Hermes Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

Hermes is **Meta's JS engine optimized for React Native/Android — precompiled bytecode, low-memory footprint, and fast startup** (no JIT; ahead-of-time bytecode and a compact GC). Practical Hermes-aware code leans on **writing for the interpreter's reality (no JIT warmup hand-waves), keeping the initial module graph small for cold start, careful memory ownership (Engine.release vs image absence), and testing under RN's Hermes flag** — Hermes rewards frugal allocation and small boot graphs, not polymorphic-fast-path tricks.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
