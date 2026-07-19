# TensorFlow Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for TensorFlow Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `tf.data` with shuffle → batch → prefetch; `element_spec` verified
- [ ] Keras build (Sequential/Functional); layers named; loss/metrics explicit
- [ ] `compile` + `fit` with callbacks (EarlyStopping/Checkpoint/Plateau/TensorBoard)
- [ ] Seeds set (TF + numpy + dataset); splits done before training
- [ ] Test-set evaluation on sealed data; checkpointing during training
- [ ] `SavedModel`/export for serving; model card documented

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
