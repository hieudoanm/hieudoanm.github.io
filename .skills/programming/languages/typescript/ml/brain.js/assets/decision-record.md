# Brain.js Best Practices: Decision Record

Use this record when applying [Brain.js Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for neural networks in JS with Brain.js — the simple fixed-topology NN conventions for browser/Node. Use when writing, structuring, or reviewing Brain.js — covers net types, training data, options, serialization, and performance.

Brain.js is a **simple neural network library for JS** — new brain.NeuralNetwork()/brain.recurrent.LSTM trained on input/output arrays with JSON serialization built in. Practical Brain.js leans on **input→output array mapping (normalize!), training with tolerance/iterations and observed error, and toJSON/fromJSON for deploying trained nets — plus the pragmatic ceiling: small fixed-topology nets** — it's the HTML5-era simplicity; data normalization and validation are where the craft lives.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Network Types
- [ ] 2. Training Data & Format
- [ ] 3. Training Options & Monitoring
- [ ] 4. Serialization & Deployment
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
