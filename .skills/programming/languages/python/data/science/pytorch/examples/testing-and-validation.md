# PyTorch Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Seeds (torch + cuda + numpy) set before model init
- [ ] `Dataset`/`DataLoader` with shuffle/workers/pin_memory; test set sealed
- [ ] `nn.Module` composition; all params in `__init__`
- [ ] `train()`/`eval()` + `no_grad` for validation; metrics via `item()`
- [ ] Canonical training loop; clip/scheduler/early-stop deliberate
- [ ] `state_dict` checkpoints with metadata; `torch.export` for deploy parity

## Example

A team applying **Quick-Start Checklist** to a PyTorch Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Seeds (torch + cuda + numpy) set before model init**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for pytorch-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
