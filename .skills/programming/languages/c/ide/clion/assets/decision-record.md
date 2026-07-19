# CLion: Decision Record

Use this record when applying [CLion](../SKILL.md) to a concrete project decision.

## Context

Best practices for working in CLion — CMake project models, compile_commands.json as the source of truth, the bundled LLVM toolchain, debugging and profiling workflows, and JetBrains shared conventions. Use when setting up, debugging, or profiling a C/C++ project in CLion.

CLion is JetBrains' cross-platform C/C++ IDE: a CMake-native build model, a debugger built around LLVM, bundled code insight for the standard library, and a performance profiler in the same window. Its main source of friction is that **its project model is a generated artefact, and CI never reads it**. Practical CLion work is about **treating compile_commands.json as the single source of truth, keeping the IDE out of the build, and using the bundled toolchain consistently so debugging reflects reality**. Language rules live in c.md and cpp.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with C and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Editions & Toolchain
- [ ] 2. CMake Project Model
- [ ] 3. Code Insight
- [ ] 4. Debugging
- [ ] 5. Sanitisers & Profiling
- [ ] 6. Version Control & Team Work
- [ ] 7. Performance & Refactoring
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
