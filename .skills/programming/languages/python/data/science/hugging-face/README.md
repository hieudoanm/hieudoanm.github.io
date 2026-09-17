# Hugging Face Best Practices

Hugging Face provides the **transformers/tokenizers/datasets/evaluate ecosystem** — pretrained models, paired tokenizers, Pipelines, and caching. Practical Hugging Face leans on **pipeline(...) for inference-first work, AutoModelForX/AutoTokenizer paired by checkpoint name, datasets for versioned data, adversarial dimension: always pass explicit tokenizer, model, device, and pad/truncate correctly** — the trio...

## When to use

Use when loading, fine-tuning, or deploying transformer models with Hugging Face.

## Core topics

- 1. Inference with Pipelines
- 2. Tokenizer/Model Discipline
- 3. Datasets & Training
- 4. Model Deployment
- 5. Reproducibility

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [Hugging Face Best Practices: Basic Usage](./examples/basic-usage.md)
- [Hugging Face Best Practices: 3. Datasets & Training](./examples/reliability-and-edge-cases.md)
- [Hugging Face Best Practices: 2. Tokenizer/Model Discipline](./examples/setup-and-configuration.md)
- [Hugging Face Best Practices: 4. Model Deployment](./examples/testing-and-validation.md)

## Assets

- [Hugging Face Best Practices: Decision Record](./assets/decision-record.md)
- [Hugging Face Best Practices: Starter Template](./assets/starter-template.md)
- [Hugging Face Best Practices: Validation Plan](./assets/validation-plan.md)
- [Hugging Face Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
