# Click Best Practices: Decision Record

Use this record when applying [Click Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for writing Python CLIs with Click — the composable command-line framework conventions. Use when writing, structuring, or reviewing Click tools — covers commands/groups, options/arguments, type handling, context, validation, error handling, and testing.

Click builds CLIs from **decorators** (@click.group, @click.command, @click.option) that wrap functions — the function signature becomes the CLI contract. Practical Click leans on **small command functions with typed options/arguments, @click.group command clusters, @click.option with type= and required/multiple**, and **ctx (context) only for shared/stateful wiring**. Click's grouping and ClickException flow keep the parsing layer thin and the tools testable via CliRunner.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Commands & Groups
- [ ] 2. Options & Arguments
- [ ] 3. Types & Conversion
- [ ] 4. Context & Shared State
- [ ] 5. Output & UX
- [ ] 6. Testing
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
