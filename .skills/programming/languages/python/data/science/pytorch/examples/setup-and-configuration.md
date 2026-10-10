# PyTorch Best Practices: 3. nn.Module Models

## Source guidance

This example applies the **3. nn.Module Models** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Composition + `forward`:**
- **Register params in `__init__` only (`nn.Parameter`, submodules) — forward-time `nn.Linear` re-creation breaks checkpointing/optimizer.**
- **`model.train()`/`model.eval()` switches BN/dropout — call them per phase.**
- **Use `torch.compile`/`torch.jit` only after the loop is correct.**

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for pytorch-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
