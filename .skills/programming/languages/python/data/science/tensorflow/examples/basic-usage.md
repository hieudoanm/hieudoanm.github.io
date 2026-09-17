# TensorFlow Best Practices: Basic Usage

Best practices for deep learning with TensorFlow and Keras — the model-building and training conventions for Python. Use when writing, structuring, or reviewing TensorFlow/Keras — covers datasets, models, training, callbacks, TFDS/functional APIs, and production serving.

## Scenario

Use this example as a starting point when applying **tensorflow-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Data Pipelines (tf.data)** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
dataset = tf.data.Dataset.from_tensor_slices((X, y))
dataset = dataset.shuffle(buffer) \
                 .batch(32) \
                 .prefetch(tf.data.AUTOTUNE)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
