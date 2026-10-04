---
name: hugging-face-best-practices
description: Best practices for using Hugging Face libraries (transformers, datasets, evaluate, tokenizers, pipelines). Use when loading, fine-tuning, or deploying transformer models with Hugging Face — covers pipelines, tokenizer/model pairing, dataset handling, fine-tuning, and local caching.
---

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

## 2. Tokenizer/Model Discipline

- **Always `AutoTokenizer` + `AutoModelFor<Task>` from the SAME checkpoint — mismatched tokenizers silently corrupt the run:**

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
tok = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")
```

- **`padding="max_length"|True`, `truncation=True`, `return_tensors="pt"` at encode; never raw strings into a model.**
- **Checkpoint strings pinned (revision/provenance); `trust_remote_code` only after review.**
- **Batch via `tokenizer(... batch)` + no-op collator or DataCollator alignment.**

---

## 3. Datasets & Training

- **`datasets` library for versioned, cached data (`load_dataset`) rather than ad-hoc CSVs:**

```python
from datasets import load_dataset
ds = load_dataset("imdb")
tokenized = ds.map(lambda ex: tok(ex["text"], truncation=True, padding="max_length"), batched=True)
```

- **`map` batched; `remove_columns` after tokenization; push/deliver checkpoints to the hub (or local cache — hub is Default Off for private use).**
- **Fine-tuning: `Trainer` (HF) with `TrainingArguments` explicit (`gradient_accumulation_steps`, `eval_strategy`, `save_strategy`, `bf16`); `per_device_train_batch_size`.**
- **Evaluation with `evaluate` metrics matched to the task (accuracy/f1/perplexity/rouge).**

---

## 4. Model Deployment

- **`save_pretrained`/`from_pretrained` round trip — tokenizer + model saved together.**
- **Export via ONNX/TFLite when the deployment target demands it; verify parity on a golden set.**
- **Local cache honors `HF_HOME`/`TRANSFORMERS_CACHE` (offline flags for reproducibility: `HF_DATASETS_OFFLINE=1`).**
- **Gated models: token/login via env, never secrets in code.**

---

## 5. Reproducibility

- **Pin versions (`transformers==x.y.z`, `torch==x`); pinned checkpoints; seeds set once.**
- **Golden datasets for evaluation; metrics computed on the same splits reported.**
- **`accelerate`/`flash_attention` variants only with documented parity checks.**

---

## General Rules of Thumb

- **Pair tokenizer + model from the same checkpoint; pinned.**
- **`pipeline` for inference; explicit device + task.**
- **Tokenize correctly (padding/truncation/return_tensors); batched easing.**
- **`datasets`/`evaluate` for data and metrics; `Trainer` for fine-tunes.**
- **Cache/hub/environment pinned; secrets via env, never in code.**

---

## Quick-Start Checklist

- [ ] `pipeline` (or Auto* pair) with pinned checkpoint; device explicit
- [ ] Tokenizer + model SAME checkpoint; correct pad/truncate/return_tensors
- [ ] `datasets` with batched `map`; columns cleaned after tokenization
- [ ] `Trainer` + `TrainingArguments` explicit; metrics matched to task
- [ ] `save_pretrained` both halves; export parity verified
- [ ] Versions/checkpoints/hub flags pinned; no secrets in code