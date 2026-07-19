# Overview

Focused reference for **tensorflow-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
