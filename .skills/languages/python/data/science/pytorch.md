---
name: pytorch-best-practices
description: Best practices for deep learning with PyTorch — the tensor/autograd and nn.Module conventions for training neural networks. Use when writing, structuring, or reviewing PyTorch — covers tensors, nn.Module, DataLoader, training loops, distributed, and checkpointing.
---

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

- **Subclass `torch.utils.data.Dataset`; the `DataLoader` is the feeding contract:**

```python
from torch.utils.data import Dataset, DataLoader

class MyDataset(Dataset):
    def __len__(self): return len(self.items)
    def __getitem__(self, i): return self.items[i].to(device), labels[i]

loader = DataLoader(ds, batch_size=32, shuffle=True, num_workers=4, pin_memory=True)
```

- **`shuffle` per epoch; `num_workers` for CPU preprocessing; `pin_memory` for CUDA.**
- **Augmentation/preprocessing in `__getitem__` (or a `transform`), deterministic outside training.**
- **Split train/val/test at dataset construction; test untouched.**

---

## 3. nn.Module Models

- **Composition + `forward`:**

```python
import torch.nn as nn

class Block(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(128, 64)
        self.drop = nn.Dropout(0.2)
        self.act = nn.ReLU()
    def forward(self, x):
        return self.act(self.drop(self.fc(x)))
```

- **Register params in `__init__` only (`nn.Parameter`, submodules) — forward-time `nn.Linear` re-creation breaks checkpointing/optimizer.**
- **`model.train()`/`model.eval()` switches BN/dropout — call them per phase.**
- **Use `torch.compile`/`torch.jit` only after the loop is correct.**

---

## 4. Training Loop

- **Canonical loop — zero-grad, backward, step, optional clip:**

```python
optim = torch.optim.Adam(model.parameters(), lr=1e-3)

model.train()
for x, y in loader:
    optim.zero_grad()
    loss = criterion(model(x), y)
    loss.backward()
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)  # optional
    optim.step()
```

- **`model.eval()` + `torch.no_grad()` for validation; accumulate metrics (not raw losses) on `item()`.**
- **Schedulers (`ReduceLROnPlateau`/`CosineAnnealing`), early stop, and weight save in a loop structure — horsepower via `torch.cuda.amp`/GradScaler when slower.**
- **Save `state_dict` + metadata (epoch, optimizer) — not just weights, so resumes carry context.**

---

## 5. Checkpointing

- **Checkpoint best weights on monitored metric:**

```python
torch.save({"model": model.state_dict(),
            "optim": optim.state_dict(),
            "epoch": epoch}, "checkpoint.pth")
```

- **`StateDict` native; `torch.save` full objects only for small prototypes.**
- **Restore for resume/eval; sync to shared storage in distributed runs.**

---

## 6. Distributed & Production

- **`DistributedDataParallel` for multi-GPU; seed per-rank; `set_device` matching rank.**
- **Prepare model/data onto device consistently (`model.to(device)` + tensors `.to(device)`).**
- **Export (`torch.export`/ONNX) with a pinned version; eval parity checked before deploy.**
- **Model cards documented: data, metrics, limitations — the claim travels with the artifact.**

---

## General Rules of Thumb

- **Tensors: explicit device/dtype; seeds set end-to-end.**
- **`nn.Module` composition; params registered in `__init__`; train/eval per phase.**
- **Dataset/DataLoader explicit (shuffle, workers, pin_memory).**
- **`zero_grad → backward → step` canonical; eval under `no_grad`.**
- **Checkpoint state_dict + metadata; test set sealed; document model card.**

---

## Quick-Start Checklist

- [ ] Seeds (torch + cuda + numpy) set before model init
- [ ] `Dataset`/`DataLoader` with shuffle/workers/pin_memory; test set sealed
- [ ] `nn.Module` composition; all params in `__init__`
- [ ] `train()`/`eval()` + `no_grad` for validation; metrics via `item()`
- [ ] Canonical training loop; clip/scheduler/early-stop deliberate
- [ ] `state_dict` checkpoints with metadata; `torch.export` for deploy parity