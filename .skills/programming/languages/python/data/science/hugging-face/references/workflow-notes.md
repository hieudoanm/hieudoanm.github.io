# Workflow notes

Focused reference for **hugging-face-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
