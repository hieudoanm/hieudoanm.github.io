# Yargs CLI Design Best Practices: Decision Record

Use this record when applying [Yargs CLI Design Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building well-designed command-line tools with Yargs (Node.js). Use when creating, structuring, or reviewing a Yargs CLI app — covers command modules, strict parsing, options, validation, help, output, completion, and testing.

Yargs is the configuration-driven Node.js CLI framework: you declare commands, options, and validation rules as data, and it produces help, strict parsing, and completion from those declarations. Because Yargs is declarative, the main risks are letting its permissive defaults through — unflagged args, loose coercion, unvalidated input — so best practice starts with .strict() and the discipline of describing every option's shape up front.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Core Stack
- [ ] 2. Command Structure
- [ ] 3. Strict Parsing (Non-negotiable)
- [ ] 4. Options & Positionals
- [ ] 5. Validation
- [ ] 6. Help & Usage
- [ ] 7. Output Conventions
- [ ] 8. Shell Completion

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
