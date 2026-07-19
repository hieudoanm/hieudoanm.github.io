# CLion

CLion is JetBrains' cross-platform C/C++ IDE: a CMake-native build model, a debugger built around LLVM, bundled code insight for the standard library, and a performance profiler in the same window. Its main source of friction is that **its project model is a generated artefact, and CI never reads it**. Practical CLion work is about **treating compile_commands.json as the single source of truth, keeping the IDE out of the...

## When to use

Use when setting up, debugging, or profiling a C/C++ project in CLion.

## Core topics

- 1. Editions & Toolchain
- 2. CMake Project Model
- 3. Code Insight
- 4. Debugging
- 5. Sanitisers & Profiling
- 6. Version Control & Team Work

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [CLion: Basic Usage](./examples/basic-usage.md)
- [CLion: 7. Performance & Refactoring](./examples/reliability-and-edge-cases.md)
- [CLion: 2. CMake Project Model](./examples/setup-and-configuration.md)
- [CLion: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [CLion: Decision Record](./assets/decision-record.md)
- [CLion: Starter Template](./assets/starter-template.md)
- [CLion: Validation Plan](./assets/validation-plan.md)
- [CLion: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
