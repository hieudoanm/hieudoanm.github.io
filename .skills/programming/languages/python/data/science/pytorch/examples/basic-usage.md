# PyTorch Best Practices: Basic Usage

Best practices for deep learning with PyTorch — the tensor/autograd and nn.Module conventions for training neural networks. Use when writing, structuring, or reviewing PyTorch — covers tensors, nn.Module, DataLoader, training loops, distributed, and checkpointing.

## Scenario

Use this example as a starting point when applying **pytorch-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Datasets & DataLoaders** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```python
from torch.utils.data import Dataset, DataLoader

class MyDataset(Dataset):
    def __len__(self): return len(self.items)
    def __getitem__(self, i): return self.items[i].to(device), labels[i]

loader = DataLoader(ds, batch_size=32, shuffle=True, num_workers=4, pin_memory=True)
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
