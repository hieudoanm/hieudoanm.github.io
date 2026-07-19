# RustRover: Decision Record

Use this record when applying [RustRover](../SKILL.md) to a concrete project decision.

## Context

Best practices for working in RustRover — Cargo as the project model, rustup toolchain selection, borrow-checker-aware inspections, the debugger and profiling, and JetBrains shared conventions. Use when setting up, debugging, or refactoring a Rust project in RustRover.

RustRover is JetBrains' Rust IDE, built on the same platform as Rider and CLion: a real debugger, a memory and CPU profiler, refactorings backed by a semantic index, and the Cargo-aware project model JetBrains IDEs are good at. Its distinguishing feature against a rust-analyzer-only setup is **a debugger and profiler that require no separate toolchain setup**. Practical RustRover work is about **letting Cargo and rust-toolchain.toml own the build, and using the IDE's index for the refactorings it is better at than text tools**. Language rules live in rust.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Editions & Toolchain
- [ ] 2. Cargo Project Model
- [ ] 3. Refactoring & Inspections
- [ ] 4. Debugging
- [ ] 5. Profiling
- [ ] 6. Cargo Features & Dependencies
- [ ] 7. JetBrains Shared Conventions
- [ ] General Rules of Thumb

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
