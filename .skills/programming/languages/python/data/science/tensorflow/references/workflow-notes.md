# Workflow notes

Focused reference for **tensorflow-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Model Construction

- **Prefer `keras.Sequential` for straight stacks; `Functional` for splits/multi-input/output:**

```python
inputs = tf.keras.Input(shape=(128,))
x = tf.keras.layers.Dense(64, activation="relu")(inputs)
x = tf.keras.layers.Dropout(0.2)(x)
outputs = tf.keras.layers.Dense(10, activation="softmax")(x)
model = tf.keras.Model(inputs, outputs)
```

- **Input/dropout/BN explicit; `**BatchNormalization**` or dropout matching task scales.**
- **Name layers/`outputs` — serialization/export readability.**
- **Subclassing (`tf.keras.Model`) only for custom forward logic; it bypasses Keras introspection.**

---

## 3. Compile & Train

- **`compile` explicit: optimizer, loss, metrics matched to problem (`sparse_categorical_crossentropy` for int labels; `mae`/`mse` for regression):**

```python
model.compile(optimizer=tf.keras.optimizers.Adam(1e-3),
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])
model.fit(ds_train, epochs=20, validation_data=ds_val, callbacks=[early_stop, ckpt])
```
