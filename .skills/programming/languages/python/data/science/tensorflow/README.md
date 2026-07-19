# TensorFlow Best Practices

TensorFlow builds and trains **graphs of operations** — and Keras is the ergonomic front end (Sequential/Functional/Subclassing), with tf.data for input pipelines and SavedModel for serving. Practical TensorFlow leans on **tf.data.Dataset pipelines (batching/shuffling/prefetch), the Keras API with Model.compile/fit + callbacks, deterministic seeds, and checkpoints** — "datasets and callbacks are the discipline; the network...

## When to use

Use when writing, structuring, or reviewing TensorFlow/Keras.

## Core topics

- 1. Data Pipelines (tf.data)
- 2. Model Construction
- 3. Compile & Train
- 4. Checkpoints & Recovery
- 5. Evaluation & Serving

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [TensorFlow Best Practices: Basic Usage](./examples/basic-usage.md)
- [TensorFlow Best Practices: 4. Checkpoints & Recovery](./examples/reliability-and-edge-cases.md)
- [TensorFlow Best Practices: 2. Model Construction](./examples/setup-and-configuration.md)
- [TensorFlow Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [TensorFlow Best Practices: Decision Record](./assets/decision-record.md)
- [TensorFlow Best Practices: Starter Template](./assets/starter-template.md)
- [TensorFlow Best Practices: Validation Plan](./assets/validation-plan.md)
- [TensorFlow Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
