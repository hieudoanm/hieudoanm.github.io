# Implementation notes

Focused reference for **hugging-face-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
