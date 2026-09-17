# Review checklist

Focused reference for **tensorflow-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
