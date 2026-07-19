# TensorFlow Best Practices: Workflow Checklist

A practical run sheet for applying [TensorFlow Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Data Pipelines (tf.data): **tf.data.Dataset over Python generators — feeding, shuffling, batching, prefetch:**
- [ ] 1. Data Pipelines (tf.data): **map for preprocessing (deterministic functions) inside the pipeline.**
- [ ] 2. Model Construction: **Prefer keras.Sequential for straight stacks; Functional for splits/multi-input/output:**
- [ ] 2. Model Construction: **Input/dropout/BN explicit; **BatchNormalization** or dropout matching task scales.**
- [ ] 3. Compile & Train: **compile explicit: optimizer, loss, metrics matched to problem (sparse_categorical_crossentropy for int labels; mae/mse for regression):**
- [ ] 3. Compile & Train: **Callbacks over manual loops: EarlyStopping, ModelCheckpoint (best weights), ReduceLROnPlateau, TensorBoard.**
- [ ] 4. Checkpoints & Recovery: **ModelCheckpoint(filepath, save_best_only=True, monitor="val_loss") — recovery + artifact:**
- [ ] 4. Checkpoints & Recovery: **tf.train.Checkpoint/.keras saving with save_freq; never rely on model.save mid-training crashes.**
- [ ] 5. Evaluation & Serving: **Evaluate on the untouched test set with the same metric names — model.evaluate(ds_test).**
- [ ] 5. Evaluation & Serving: **convert/SavedModel (model.export) for production; TFLite/TPU serving parity checks for edge.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
