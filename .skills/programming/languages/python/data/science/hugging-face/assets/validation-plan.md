# Hugging Face Best Practices: Validation Plan

Use this plan to verify work guided by [Hugging Face Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **save_pretrained/from_pretrained round trip — tokenizer + model saved together.**
- [ ] **Export via ONNX/TFLite when the deployment target demands it; verify parity on a golden set.**
- [ ] **Local cache honors HF_HOME/TRANSFORMERS_CACHE (offline flags for reproducibility: HF_DATASETS_OFFLINE=1).**
- [ ] **Gated models: token/login via env, never secrets in code.**

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
