# Argparse Best Practices: Decision Record

Use this record when applying [Argparse Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing Python CLIs with argparse — the stdlib command-line parser conventions. Use when writing, structuring, or reviewing argparse-based tools — covers parser layout, arguments, subcommands, validation, help text, typing, and testing.

argparse is Python's standard-library CLI parser — **ArgumentParser, add_argument declarations, and a Namespace of parsed values**. Practical argparse leans on **prog-and-description self-documenting help, dest-aware names, type-callables for parsing, and add_subparsers for command trees**. Parse once at the main boundary; keep the parsing layer thin and the domain logic parseable by tests.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Parser Layout
- [ ] 2. Arguments & Types
- [ ] 3. Subcommands
- [ ] 4. Help & UX
- [ ] 5. Testing
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

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
