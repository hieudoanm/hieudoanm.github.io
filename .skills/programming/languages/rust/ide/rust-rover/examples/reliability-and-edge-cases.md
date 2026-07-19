# RustRover: Overview

## Scenario

A project is working on **overview** for RustRover. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

RustRover is JetBrains' Rust IDE, built on the same platform as Rider and CLion: a real debugger, a memory and CPU profiler, refactorings backed by a semantic index, and the Cargo-aware project model JetBrains IDEs are good at. Its distinguishing feature against a `rust-analyzer`-only setup is **a debugger and profiler that require no separate toolchain setup**. Practical RustRover work is about **letting Cargo and `rust-toolchain.toml` own the build, and using the IDE's index for the refactorings it is better at than text tools**. Language rules live in rust.md.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Overview** section of [SKILL.md](../SKILL.md).
