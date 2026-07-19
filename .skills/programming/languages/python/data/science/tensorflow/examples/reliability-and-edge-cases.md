# TensorFlow Best Practices: 4. Checkpoints & Recovery

## Source guidance

This example applies the **4. Checkpoints & Recovery** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`ModelCheckpoint(filepath, save_best_only=True, monitor="val_loss")` — recovery + artifact:**
- **`tf.train.Checkpoint`/`.keras` saving with `save_freq`; never rely on `model.save` mid-training crashes.**
- **Training resume from the last checkpoint; results logged for comparison.**

## Example

A team applying **4. Checkpoints & Recovery** to a TensorFlow Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies ****`ModelCheckpoint(filepath, save_best_only=True, monitor="val_loss")` — recovery + artifact:****, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for tensorflow-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
