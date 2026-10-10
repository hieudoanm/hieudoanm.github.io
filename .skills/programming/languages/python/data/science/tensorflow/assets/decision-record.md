# TensorFlow Best Practices: Decision Record

Use this record when applying [TensorFlow Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for deep learning with TensorFlow and Keras — the model-building and training conventions for Python. Use when writing, structuring, or reviewing TensorFlow/Keras — covers datasets, models, training, callbacks, TFDS/functional APIs, and production serving.

TensorFlow builds and trains **graphs of operations** — and Keras is the ergonomic front end (Sequential/Functional/Subclassing), with tf.data for input pipelines and SavedModel for serving. Practical TensorFlow leans on **tf.data.Dataset pipelines (batching/shuffling/prefetch), the Keras API with Model.compile/fit + callbacks, deterministic seeds, and checkpoints** — "datasets and callbacks are the discipline; the network is the variable".

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Data Pipelines (tf.data)
- [ ] 2. Model Construction
- [ ] 3. Compile & Train
- [ ] 4. Checkpoints & Recovery
- [ ] 5. Evaluation & Serving
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
