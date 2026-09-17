# Clikt Best Practices: Decision Record

Use this record when applying [Clikt Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building command-line interfaces in Kotlin with Clikt. Use when writing, structuring, validating, or testing a Clikt CLI — covers Gradle setup, command hierarchies, options/flags/arguments, typed conversion, validation and exit codes, mutually exclusive and grouped options, prompting, testable command construction, help output, and testing, with suggested values.

Clikt turns a command-line interface into a tree of Kotlin classes: each command is a CliktCommand subclass that declares its own parameters and does its work in run(). Best practice here is **one class per command, parameters as delegated properties, parsing separated from side effects, and errors as typed values** — so the same command object can be constructed in a test with a fake side-effect sink and asserted without touching the filesystem or the network.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Kotlin and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Gradle Setup
- [ ] 2. Command Hierarchies
- [ ] 3. Options, Flags & Arguments
- [ ] 4. Validation & Error Handling
- [ ] 5. Mutually Exclusive & Grouped Options
- [ ] 6. Prompting
- [ ] 7. Testable Command Construction
- [ ] 8. Help Formatting

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
