# Implementation notes

Focused reference for **tensorflow-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
