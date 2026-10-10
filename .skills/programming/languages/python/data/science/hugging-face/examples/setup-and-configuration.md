# Hugging Face Best Practices: 2. Tokenizer/Model Discipline

## Source guidance

This example applies the **2. Tokenizer/Model Discipline** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Always `AutoTokenizer` + `AutoModelFor<Task>` from the SAME checkpoint — mismatched tokenizers silently corrupt the run:**
- **`padding="max_length"|True`, `truncation=True`, `return_tensors="pt"` at encode; never raw strings into a model.**
- **Checkpoint strings pinned (revision/provenance); `trust_remote_code` only after review.**
- **Batch via `tokenizer(... batch)` + no-op collator or DataCollator alignment.**

## Example

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
tok = AutoTokenizer.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B-Instruct")
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for hugging-face-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
