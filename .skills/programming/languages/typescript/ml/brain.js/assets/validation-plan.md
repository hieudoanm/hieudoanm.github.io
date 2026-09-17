# Brain.js Best Practices: Validation Plan

Use this plan to verify work guided by [Brain.js Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Determinism: same seeds where supported; compare error curves in tests.**
- [ ] **Golden tests: serialize → load → equal outputs on fixed inputs.**
- [ ] **Overfitting: hidden-layer count + validation, not raw accuracy on training.**
- [ ] **Options deliberate: iterations, errorThresh, learningRate, log:**
- [ ] **Watch error curve — stop when it flattens (use errorThresh + iteration cap).**
- [ ] **Small learning rates with more iterations beat spikes; seeded reproducibility documented.**
- [ ] **The trained net is a JSON object:**
- [ ] **Save the JSON as a deploy artifact; fromJSON loads without retraining.**
- [ ] **Input schema + normalization transform travels with the model (versioned).**
- [ ] **Brain.js fits small fixed-topology nets — not ResNet-scale.**

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
