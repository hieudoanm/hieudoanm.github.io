# PyTorch Best Practices: Starter Template

A reusable starting point derived from the **4. Training Loop** section of [PyTorch Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
