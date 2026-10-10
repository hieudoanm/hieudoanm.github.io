# Flask Best Practices: Decision Record

Use this record when applying [Flask Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Python web apps with Flask — the lightweight WSGI framework conventions. Use when writing, structuring, or reviewing Flask — covers app structure, blueprints, config, requests, ORM, and deployment.

Flask is **a minimal WSGI micro-framework with a large extension ecosystem** — app = Flask(__name__) + routes; structure grows with blueprints. Practical Flask leans on **an application factory (create_app) + blueprints for modular structure, config objects/environment-driven settings, extensions as declared dependencies, and thin routes with the domain in services** — small core; the factory pattern keeps projects structured as they grow.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. App Factory & Blueprints
- [ ] 2. Configuration
- [ ] 3. Routes & Views
- [ ] 4. Extensions & ORM
- [ ] 5. Resilience & Middleware
- [ ] 6. Testing & Deployment
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
