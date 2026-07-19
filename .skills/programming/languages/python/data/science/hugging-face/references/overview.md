# Overview

Focused reference for **hugging-face-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Hugging Face Best Practices

Hugging Face provides the **transformers/tokenizers/datasets/evaluate ecosystem** — pretrained models, paired tokenizers, `Pipeline`s, and caching. Practical Hugging Face leans on **`pipeline(...)` for inference-first work, `AutoModelForX`/`AutoTokenizer` paired by checkpoint name, `datasets` for versioned data, adversarial dimension: always pass explicit `tokenizer`, `model`, `device`, and pad/truncate correctly** — the trio tokenizer+model+preprocessing must stay aligned.

---

## 1. Inference with Pipelines

- **`pipeline` as the ergonomic inference API:**

```python
from transformers import pipeline
nlp = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased", device=0)
result = nlp(["amazing film", "terrible film"])
```

- **Explicit `model`/`tokenizer` names pinned (checkpoint = data); `device` set, not guessed.**
- **Batch inputs; results typed (labels/scores for classifiers, generated text for generators).**
- **`pipeline` task arg validates the task contract (fill-mask, text-generation, ner, etc.).**

---
