# Hugging Face Best Practices: Decision Record

Use this record when applying [Hugging Face Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using Hugging Face libraries (transformers, datasets, evaluate, tokenizers, pipelines). Use when loading, fine-tuning, or deploying transformer models with Hugging Face — covers pipelines, tokenizer/model pairing, dataset handling, fine-tuning, and local caching.

Hugging Face provides the **transformers/tokenizers/datasets/evaluate ecosystem** — pretrained models, paired tokenizers, Pipelines, and caching. Practical Hugging Face leans on **pipeline(...) for inference-first work, AutoModelForX/AutoTokenizer paired by checkpoint name, datasets for versioned data, adversarial dimension: always pass explicit tokenizer, model, device, and pad/truncate correctly** — the trio tokenizer+model+preprocessing must stay aligned.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Inference with Pipelines
- [ ] 2. Tokenizer/Model Discipline
- [ ] 3. Datasets & Training
- [ ] 4. Model Deployment
- [ ] 5. Reproducibility
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
