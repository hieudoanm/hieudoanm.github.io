# Mind.js Best Practices: Workflow Checklist

A practical run sheet for applying [Mind.js Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Mind Instances: **Create with configuration; predict on vectors:**
- [ ] 1. Mind Instances: **learn (train) + predict (infer) as the whole surface — inputs/outputs numeric arrays.**
- [ ] 2. Training Data: **Inputs normalized (scale to the activation's sweet spot), outputs in the same scale:**
- [ ] 2. Training Data: **Withhold a validation slice — Mind.js gives no built-in split; you own it.**
- [ ] 3. Prediction & Interpretation: **predict outputs in normalized space — decode to the real scale:**
- [ ] 3. Prediction & Interpretation: **Thresholds defined per output node; mult-class via argmax over outputs.**
- [ ] 4. Serialization: **Persistence via save()/upload() — the model JSON is the artifact:**
- [ ] 4. Serialization: **save/upload round-trip instead of retraining at runtime.**
- [ ] 5. Performance & Limits: **Mind.js is a compact/lightweight learner — small parities, not deep nets.**
- [ ] 5. Performance & Limits: **Batch predictions; avoid per-call reconfig; typed-array friendly when possible.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
