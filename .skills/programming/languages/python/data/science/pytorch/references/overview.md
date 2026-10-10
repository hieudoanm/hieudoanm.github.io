# Overview

Focused reference for **pytorch-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# PyTorch Best Practices

PyTorch is the **Python-first deep learning framework — tensors with autograd, `nn.Module`-based modeling, module-defined forward passes and explicit training loops.** Practical PyTorch leans on **`nn.Module` composition with `forward` definition, `Dataset`/`DataLoader` with `pin_memory`/`num_workers`/shuffle, `optimizer.zero_grad` → `loss.backward()` → `optimizer.step()` in a `train()`/`eval()`-aware loop, and checkpoint `.pt`/`.pth` saving** — explicit is better; the training loop is the recipe.

---

## 1. Tensors & Autograd

- **Tensors explicit: `dtype`, `device`, `requires_grad`:**

```python
import torch
x = torch.tensor([1.0, 2.0], device="cuda", dtype=torch.float32)
```

- **Autograd via `torch.no_grad()` for inference; `requires_grad_(False)` for frozen weights.**
- **Seeds: `torch.manual_seed`, `torch.cuda.manual_seed_all`, numpy seed — deterministic run property.**
- **`Tensor.item()` for scalars out of the graph; noinference via `model.eval()`.**

---

## 2. Datasets & DataLoaders
