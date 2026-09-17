# Renovate: Decision Record

Use this record when applying [Renovate](../SKILL.md) to a concrete project decision.

## Context

Best practices for Renovate — configuration, grouping, lockfile maintenance, automerge policy, and the separation between update cadence and release risk. Use when setting up, or reviewing, dependency update automation.

Renovate is a dependency-update bot that opens pull requests across every ecosystem, and its real value is not the updates themselves — plenty of bots do that — but **the policy you encode about which updates group together, which merge automatically, and when a major is acceptable**. A Renovate config is a statement of your team's risk posture. Practical Renovate work is about **separating low-risk from high-risk updates so the safe ones stop costing attention, keeping the bot's own config reviewable, and never letting an automerge hide a breaking change**. Security scanning is complementary; see snyk.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. The Core Distinction: Update Types
- [ ] 2. Grouping: The Main Lever
- [ ] 3. Automerge: The Dangerous Setting
- [ ] 4. Configuration Hygiene
- [ ] 5. Lockfiles & Range Strategy
- [ ] 6. Operating the Bot
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
