# argh Best Practices: Decision Record

Use this record when applying [argh Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Rust CLIs with argh — the derive-based argument parsing conventions. Use when writing, structuring, or reviewing argh — covers derive usage, from_args, subcommands, docstring help, and error handling.

argh is a **derive-based argument parsing library for Rust** — #[derive(FromArgs)] structs with #[argh(...)] attributes; simple, dependency-light CLIs. Practical argh leans on **derive(FromArgs) with description/option attributes, a top-level struct excluding argh(example = ...), subcommands via #[argh(subcommand)], boosted by the 1-life from_env pattern**, and fine-grain error handling — fewer, typed branches. When the CLI grows an ecosystem scale, consider clap; argh stays lean-by-design.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Basic Derive
- [ ] 2. Positionals & Switches
- [ ] 3. Subcommands
- [ ] 4. Errors & Exit Codes
- [ ] 5. Testing & Docs
- [ ] 6. Warnings / Migration
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
