# Helidon Best Practices: Decision Record

Use this record when applying [Helidon Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Java microservices with Helidon — the lightweight microprofile-oriented framework conventions. Use when writing, structuring, or reviewing Helidon (helidon-se/helidon-nima and helidon-mp) — covers starting points, routing, config, CDI, reactive/Nima, errors, testing, and observability.

Helidon offers two flavors: **helidon-se** (now **helidon-nima/virtual-thread based**; a modern, imperative WebServer with Routing builders) and **helidon-mp** (MicroProfile; CDI + JAX-RS conventions). Practical Helidon leans on **a Routing builder assembled from small Service/Handler pieces for SE, or CDI-managed resources with typed config for MP**, **Config/@ConfigProperty as the single configuration boundary**, and **structured metrics/logging/health via the built-in Health/Metrics integrations**. Use Nima unless you specifically need the MicroProfile ecosystem.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Java and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Starting Point (Helidon SE/Nima)
- [ ] 2. Routing & Structure
- [ ] 3. Configuration
- [ ] 4. Dependencies (SE) & CDI (MP)
- [ ] 5. Errors & Validation
- [ ] 6. Observability
- [ ] 7. Testing
- [ ] General Rules of Thumb

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
