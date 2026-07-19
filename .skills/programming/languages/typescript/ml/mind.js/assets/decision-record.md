# Mind.js Best Practices: Decision Record

Use this record when applying [Mind.js Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building neural networks in JS with Mind.js — the lightweight volatile NN conventions for browser/Node. Use when writing, structuring, or reviewing Mind.js — covers net construction, training, activation, serialization, and pitfalls.

Mind.js is a **minimal neural network library for the browser/Node** — new Mind() with layers configured via new Mind().learn(...)/predict(...) and **JSON networks (new Mind().upload(...))**. Practical Mind.js leans on **explicit constructor-time configuration (hidden layers, activation) via the Mind object, normalized input vectors, and the upload/save JSON path for persistence** — it's a small learning-tool API; the discipline is the data contract + verification, not framework lore.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Mind Instances
- [ ] 2. Training Data
- [ ] 3. Prediction & Interpretation
- [ ] 4. Serialization
- [ ] 5. Performance & Limits
- [ ] 6. Testing & Pitfalls
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
