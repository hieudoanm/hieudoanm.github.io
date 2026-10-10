# Hugging Face Best Practices: Workflow Checklist

A practical run sheet for applying [Hugging Face Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Inference with Pipelines: **pipeline as the ergonomic inference API:**
- [ ] 1. Inference with Pipelines: **Explicit model/tokenizer names pinned (checkpoint = data); device set, not guessed.**
- [ ] 2. Tokenizer/Model Discipline: **Always AutoTokenizer + AutoModelFor<Task> from the SAME checkpoint — mismatched tokenizers silently corrupt the run:**
- [ ] 2. Tokenizer/Model Discipline: **padding="max_length"|True, truncation=True, return_tensors="pt" at encode; never raw strings into a model.**
- [ ] 3. Datasets & Training: **datasets library for versioned, cached data (load_dataset) rather than ad-hoc CSVs:**
- [ ] 3. Datasets & Training: **map batched; remove_columns after tokenization; push/deliver checkpoints to the hub (or local cache — hub is Default Off for private use).**
- [ ] 4. Model Deployment: **save_pretrained/from_pretrained round trip — tokenizer + model saved together.**
- [ ] 4. Model Deployment: **Export via ONNX/TFLite when the deployment target demands it; verify parity on a golden set.**
- [ ] 5. Reproducibility: **Pin versions (transformers==x.y.z, torch==x); pinned checkpoints; seeds set once.**
- [ ] 5. Reproducibility: **Golden datasets for evaluation; metrics computed on the same splits reported.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
