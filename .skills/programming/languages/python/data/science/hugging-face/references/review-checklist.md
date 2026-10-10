# Review checklist

Focused reference for **hugging-face-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
