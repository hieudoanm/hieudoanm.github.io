# GitHub Packages Best Practices: Decision Record

Use this record when applying [GitHub Packages Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for hosting and consuming JavaScript packages on GitHub Packages — the GHCR/GPR conventions for npm scope publishing. Use when writing, structuring, or reviewing GitHub Packages — covers auth, scoping, publishing, private packages, and CI workflows.

GitHub Packages (GHR/ GHCR) hosts **private/registry-scoped npm packages alongside your GitHub org** — publishing via GITHUB_TOKEN or a PAT from a workflow, consumed through the scoped registry URL. Practical GitHub Packages leans on **a scoped name (@org/pkg), per-repo workflow_dispatch-style publish with least-privilege tokens, registry auth via npm_config_registry pattern, and version/changelog driven from tags** — the registry mirrors your Git state; automation owns the publish ceremony.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Auth & Registry
- [ ] 2. Package Setup
- [ ] 3. Publishing in CI
- [ ] 4. Consuming Private Packages
- [ ] 5. Versions & Semantics
- [ ] 6. Security & Hygiene
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
