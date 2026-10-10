# oclif CLI Design Best Practices: Decision Record

Use this record when applying [oclif CLI Design Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building well-designed command-line tools with oclif (Node.js plugin-based CLI framework). Use when creating, structuring, or reviewing an oclif CLI app — covers the Command class, args/flags, topics, help, plugins, output, errors, and testing.

oclif (Salesforce's CLI framework) builds CLIs from **classes** with declarative args/flags, a plugin system, and framework-provided help and tab-completion. It shines for large, extensible CLIs where commands ship in plugins and every command is a Command subclass with typed flags/args. Best practice is about colocating those declarations, keeping run() thin, and following oclif's conventions for help, errors, and plugin boundaries.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Setup & Structure
- [ ] 2. The Command Class
- [ ] 3. Args & Flags
- [ ] 4. Topics & Help
- [ ] 5. Output & Feedback
- [ ] 6. Errors & Exit Codes
- [ ] 7. Plugins & Team Boundaries
- [ ] 8. Testing

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
