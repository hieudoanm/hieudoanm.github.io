# TensorFlow Best Practices: 2. Model Construction

## Source guidance

This example applies the **2. Model Construction** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Prefer `keras.Sequential` for straight stacks; `Functional` for splits/multi-input/output:**
- **Input/dropout/BN explicit; `**BatchNormalization**` or dropout matching task scales.**
- **Name layers/`outputs` — serialization/export readability.**
- **Subclassing (`tf.keras.Model`) only for custom forward logic; it bypasses Keras introspection.**

## Example

```python
inputs = tf.keras.Input(shape=(128,))
x = tf.keras.layers.Dense(64, activation="relu")(inputs)
x = tf.keras.layers.Dropout(0.2)(x)
outputs = tf.keras.layers.Dense(10, activation="softmax")(x)
model = tf.keras.Model(inputs, outputs)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for tensorflow-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
