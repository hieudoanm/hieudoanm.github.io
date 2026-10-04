---
name: tensorflow-best-practices
description: Best practices for deep learning with TensorFlow and Keras — the model-building and training conventions for Python. Use when writing, structuring, or reviewing TensorFlow/Keras — covers datasets, models, training, callbacks, TFDS/functional APIs, and production serving.
---

# TensorFlow Best Practices

TensorFlow builds and trains **graphs of operations** — and Keras is the ergonomic front end (`Sequential`/`Functional`/`Subclassing`), with `tf.data` for input pipelines and `SavedModel` for serving. Practical TensorFlow leans on **`tf.data.Dataset` pipelines (batching/shuffling/prefetch), the Keras API with `Model.compile`/`fit` + `callbacks`, deterministic seeds, and checkpoints** — "datasets and callbacks are the discipline; the network is the variable".

---

## 1. Data Pipelines (tf.data)

- **`tf.data.Dataset` over Python generators — feeding, shuffling, batching, prefetch:**

```python
dataset = tf.data.Dataset.from_tensor_slices((X, y))
dataset = dataset.shuffle(buffer) \
                 .batch(32) \
                 .prefetch(tf.data.AUTOTUNE)
```

- **`map` for preprocessing (deterministic functions) inside the pipeline.**
- **Shuffle before batch; `prefetch(AUTOTUNE)` mitigates GPU idling.**
- **Validate shapes/dtypes once (`element_spec`) before fit to catch mis-feeds.**

---

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

- **Callbacks over manual loops: `EarlyStopping`, `ModelCheckpoint` (best weights), `ReduceLROnPlateau`, `TensorBoard`.**
- **Seeds: `tf.random.set_seed` + numpy `seed`, AND dataset shuffle seeds — determinism is a build property.**
- **Split data into train/val/test at load; a test set untouched by tuning.**

---

## 4. Checkpoints & Recovery

- **`ModelCheckpoint(filepath, save_best_only=True, monitor="val_loss")` — recovery + artifact:**
- **`tf.train.Checkpoint`/`.keras` saving with `save_freq`; never rely on `model.save` mid-training crashes.**
- **Training resume from the last checkpoint; results logged for comparison.**

---

## 5. Evaluation & Serving

- **Evaluate on the untouched test set with the same metric names — `model.evaluate(ds_test)`.**
- **`convert`/`SavedModel` (`model.export`) for production; TFLite/TPU serving parity checks for edge.**
- **Model-card documentation intentional (data, metrics, limitations) — the artifact is a claim.**
- **Forward models: gradients/variables accessed via `GradientTape` where custom training needed (fine).**

---

## General Rules of Thumb

- **tf.data pipeline: shuffle-batch-prefetch; spec validated.**
- **Keras Sequential/Functional; named outputs; explicit compile.**
- **Callbacks for early-stop/checkpoint/plateau; seeded overall.**
- **Test set sealed; SavedModel exported for serving.**
- **Document the model card; recoverable checkpoints.**

---

## Quick-Start Checklist

- [ ] `tf.data` with shuffle → batch → prefetch; `element_spec` verified
- [ ] Keras build (Sequential/Functional); layers named; loss/metrics explicit
- [ ] `compile` + `fit` with callbacks (EarlyStopping/Checkpoint/Plateau/TensorBoard)
- [ ] Seeds set (TF + numpy + dataset); splits done before training
- [ ] Test-set evaluation on sealed data; checkpointing during training
- [ ] `SavedModel`/export for serving; model card documented