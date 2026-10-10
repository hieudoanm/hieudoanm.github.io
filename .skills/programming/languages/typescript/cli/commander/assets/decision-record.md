# Commander.js CLI Design Best Practices: Decision Record

Use this record when applying [Commander.js CLI Design Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building well-designed command-line tools with Commander.js (Node/Auth). Use when creating, structuring, or reviewing a Commander CLI app — covers command structure, arguments, options, help, output, errors, and testing with suggested values.

Commander.js is the classic imperative Node.js CLI framework: you describe commands, options, and action handlers programmatically, and it produces consistent help/usage and exit behaviour for free. Good CLI design with Commander is mostly _conventions_ — command trees, stdout/stderr discipline, exit codes, and actionable errors — plus fitting your workflow into program.command(...)/.option(...)/.action(...) instead of fighting the framework.

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
- [ ] 3. Arguments
- [ ] 4. Options (Flags)
- [ ] 5. Help Text
- [ ] 6. Output Conventions
- [ ] 7. Errors & Exit Codes
- [ ] 8. Progress & Feedback

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
