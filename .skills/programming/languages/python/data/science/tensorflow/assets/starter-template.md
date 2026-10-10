# TensorFlow Best Practices: Starter Template

A reusable starting point derived from the **2. Model Construction** section of [TensorFlow Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
inputs = tf.keras.Input(shape=(128,))
x = tf.keras.layers.Dense(64, activation="relu")(inputs)
x = tf.keras.layers.Dropout(0.2)(x)
outputs = tf.keras.layers.Dense(10, activation="softmax")(x)
model = tf.keras.Model(inputs, outputs)
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
