# Synaptic Best Practices: Decision Record

Use this record when applying [Synaptic Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building neural networks in JS with Synaptic — the network-architecture conventions for browser/Node. Use when writing, structuring, or reviewing Synaptic — covers networks, architect objects, training, serialization, and performance.

Synaptic is a **JavaScript neural network library** — new Architect.Perceptron, Network, layers and trainers with a small VM-style API. Practical Synaptic leans on **declarative architect objects for the network shape, trainer.XOR-style or custom network.activate + trainer.train for learning, explicit toJSON/fromJSON serialization for persistence, and input/output normalization discipline** — the network is a function you train; data into [0,1]/normalized in, predictions out.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Network Construction
- [ ] 2. Activation & Prediction
- [ ] 3. Training
- [ ] 4. Serialization
- [ ] 5. Performance
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
