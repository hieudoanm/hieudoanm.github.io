# Workflow notes

Focused reference for **pytorch-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
