# PyTorch Best Practices: 1. Tensors & Autograd

## Source guidance

This example applies the **1. Tensors & Autograd** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Tensors explicit: `dtype`, `device`, `requires_grad`:**
- **Autograd via `torch.no_grad()` for inference; `requires_grad_(False)` for frozen weights.**
- **Seeds: `torch.manual_seed`, `torch.cuda.manual_seed_all`, numpy seed — deterministic run property.**
- **`Tensor.item()` for scalars out of the graph; noinference via `model.eval()`.**

## Example

```python
import torch
x = torch.tensor([1.0, 2.0], device="cuda", dtype=torch.float32)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for pytorch-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
