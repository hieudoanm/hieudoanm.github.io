# Hugging Face Best Practices: 4. Model Deployment

## Scenario

A project is working on **4. model deployment** for Hugging Face Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **`save_pretrained`/`from_pretrained` round trip — tokenizer + model saved together.**
- **Export via ONNX/TFLite when the deployment target demands it; verify parity on a golden set.**
- **Local cache honors `HF_HOME`/`TRANSFORMERS_CACHE` (offline flags for reproducibility: `HF_DATASETS_OFFLINE=1`).**
- **Gated models: token/login via env, never secrets in code.**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Model Deployment** section of [SKILL.md](../SKILL.md).
