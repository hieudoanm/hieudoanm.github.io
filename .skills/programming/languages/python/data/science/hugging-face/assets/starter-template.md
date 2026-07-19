# Hugging Face Best Practices: Starter Template

A reusable starting point derived from the **1. Inference with Pipelines** section of [Hugging Face Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```python
from transformers import pipeline
nlp = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased", device=0)
result = nlp(["amazing film", "terrible film"])
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
