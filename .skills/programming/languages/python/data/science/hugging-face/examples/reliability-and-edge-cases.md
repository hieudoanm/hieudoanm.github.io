# Hugging Face Best Practices: 3. Datasets & Training

## Source guidance

This example applies the **3. Datasets & Training** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`datasets` library for versioned, cached data (`load_dataset`) rather than ad-hoc CSVs:**
- **`map` batched; `remove_columns` after tokenization; push/deliver checkpoints to the hub (or local cache — hub is Default Off for private use).**
- **Fine-tuning: `Trainer` (HF) with `TrainingArguments` explicit (`gradient_accumulation_steps`, `eval_strategy`, `save_strategy`, `bf16`); `per_device_train_batch_size`.**
- **Evaluation with `evaluate` metrics matched to the task (accuracy/f1/perplexity/rouge).**

## Example

```python
from datasets import load_dataset
ds = load_dataset("imdb")
tokenized = ds.map(lambda ex: tok(ex["text"], truncation=True, padding="max_length"), batched=True)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for hugging-face-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
