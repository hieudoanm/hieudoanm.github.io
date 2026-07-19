# Review checklist

Focused reference for **pytorch-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
