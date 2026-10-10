# Implementation notes

Focused reference for **pytorch-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
