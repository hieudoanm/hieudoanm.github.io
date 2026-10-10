# Brain.js Best Practices: Workflow Checklist

A practical run sheet for applying [Brain.js Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Network Types: **Pick per task:**
- [ ] 1. Network Types: **NeuralNetwork default; LSTM for time/text; KNN-style only where the API matches.**
- [ ] 2. Training Data & Format: **Inputs/outputs as arrays of numbers (normalized, not raw booleans only):**
- [ ] 2. Training Data & Format: **Normalization to [0,1]/[-1,1] — decode identically at predict.**
- [ ] 3. Training Options & Monitoring: **Options deliberate: iterations, errorThresh, learningRate, log:**
- [ ] 3. Training Options & Monitoring: **Watch error curve — stop when it flattens (use errorThresh + iteration cap).**
- [ ] 4. Serialization & Deployment: **The trained net is a JSON object:**
- [ ] 4. Serialization & Deployment: **Save the JSON as a deploy artifact; fromJSON loads without retraining.**
- [ ] 5. Performance & Limits: **Brain.js fits small fixed-topology nets — not ResNet-scale.**
- [ ] 5. Performance & Limits: **Batch predictions in typed arrays; avoid per-call object churn.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
