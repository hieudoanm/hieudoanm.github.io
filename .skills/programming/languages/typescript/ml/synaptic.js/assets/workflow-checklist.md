# Synaptic Best Practices: Workflow Checklist

A practical run sheet for applying [Synaptic Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Network Construction: **Architect factories for standard shapes:**
- [ ] 1. Network Construction: **Perceptron/LSTM/Hopfield per task (feedforward, sequences, associative).**
- [ ] 2. Activation & Prediction: **activator on normalized inputs:**
- [ ] 2. Activation & Prediction: **Inputs normalized (scaled to the activation range); outputs interpreted via the same mapping.**
- [ ] 3. Training: **Trainer for supervised learning; data pairs normalized:**
- [ ] 3. Training: **Small rate + iteration cap for stability; watch error convergence (not raw iterations).**
- [ ] 4. Serialization: **Network state is a plain JSON blob — persist it:**
- [ ] 4. Serialization: **Save/restore round-trips for deployment — never rebuild by re-training at runtime.**
- [ ] 5. Performance: **JS engines fine for small nets; batch inference in typed-array loops.**
- [ ] 5. Performance: **For larger/dense workloads, consider WebAssembly/tensor backends (Synaptic is a learning tool — 100s of params, not millions).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
