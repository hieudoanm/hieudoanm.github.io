# clap.rs CLI Design Best Practices: Decision Record

Use this record when applying [clap.rs CLI Design Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building well-designed command-line tools with clap (Rust). Use when creating, structuring, or reviewing a clap-based CLI app — covers command structure, arguments, help text, output, and error conventions with suggested values.

clap (Command Line Argument Parser) handles parsing, help generation, and validation. Most of it is declarative via the derive API — good CLI design here is mostly about which conventions you encode into that derive structure, not fighting clap's defaults.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Crates
- [ ] 2. Command Structure
- [ ] 3. Arguments & Flags
- [ ] 4. Help Text
- [ ] 5. Output Conventions
- [ ] 6. Error Handling
- [ ] 7. Progress & Feedback
- [ ] 8. Shell Completion & Docs

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
