# Snyk: Decision Record

Use this record when applying [Snyk](../SKILL.md) to a concrete project decision.

## Context

Best practices for Snyk — Code, IaC, and container scanning, the difference between a finding and a reachable one, severity policy, and fix workflow ownership. Use when setting up, triaging, or acting on dependency vulnerabilities.

Snyk is a security scanner across four surfaces — application code, dependencies, infrastructure as code, and container images — and its weakness is the same as every scanner's: **it reports what matches a signature, not what is exploitable in your code**. A critical finding in a dev-only dependency that never ships and is never imported is a false positive in everything but the letter of the rule. Practical Snyk work is about **triage by reachability and exposure, not by severity number, and fixing the cause rather than the finding**. Routine update automation is a different job; see renovate.md.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. What Each Scanner Actually Sees
- [ ] 2. Triage: Reachability First
- [ ] 3. Fixing
- [ ] 4. Infrastructure as Code
- [ ] 5. CI Integration
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
