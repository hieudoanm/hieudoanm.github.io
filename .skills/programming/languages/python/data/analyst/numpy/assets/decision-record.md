# NumPy Best Practices: Decision Record

Use this record when applying [NumPy Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for numerical computing with NumPy — the array library conventions for Python. Use when writing, structuring, or reviewing NumPy — covers ndarray creation, broadcasting, vectorization, masks, dtypes, and performance.

NumPy is **the array computing core of the Python data stack** — homogeneous ndarrays with vectorized ops and broadcasting. Practical NumPy leans on **explicit array constructs (np.array/np.zeros/np.arange), vectorization over loops (batch semantics), broadcasting semantics understood (shape checks before ops), and immutable shape/dtype hygiene** — "an array is a vector of numbers, plus a contract about dtype and shape". Performance wins arrive from whole-array ops, not from fighting the library.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Creating Arrays
- [ ] 2. Broadcasting & Shapes
- [ ] 3. Vectorization
- [ ] 4. Masks & Indexing
- [ ] 5. Memory & Performance
- [ ] 6. Integration & Testing
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
