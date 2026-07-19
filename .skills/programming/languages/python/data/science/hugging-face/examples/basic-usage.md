# Hugging Face Best Practices: Basic Usage

Best practices for using Hugging Face libraries (transformers, datasets, evaluate, tokenizers, pipelines). Use when loading, fine-tuning, or deploying transformer models with Hugging Face — covers pipelines, tokenizer/model pairing, dataset handling, fine-tuning, and local caching.

## Scenario

Use this example as a starting point when applying **hugging-face-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Inference with Pipelines** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
from transformers import pipeline
nlp = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased", device=0)
result = nlp(["amazing film", "terrible film"])
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
