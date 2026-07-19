# PyTorch Best Practices: Workflow Checklist

A practical run sheet for applying [PyTorch Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Tensors & Autograd: **Tensors explicit: dtype, device, requires_grad:**
- [ ] 1. Tensors & Autograd: **Autograd via torch.no_grad() for inference; requires_grad_(False) for frozen weights.**
- [ ] 2. Datasets & DataLoaders: **Subclass torch.utils.data.Dataset; the DataLoader is the feeding contract:**
- [ ] 2. Datasets & DataLoaders: **shuffle per epoch; num_workers for CPU preprocessing; pin_memory for CUDA.**
- [ ] 3. nn.Module Models: **Composition + forward:**
- [ ] 3. nn.Module Models: **Register params in __init__ only (nn.Parameter, submodules) — forward-time nn.Linear re-creation breaks checkpointing/optimizer.**
- [ ] 4. Training Loop: **Canonical loop — zero-grad, backward, step, optional clip:**
- [ ] 4. Training Loop: **model.eval() + torch.no_grad() for validation; accumulate metrics (not raw losses) on item().**
- [ ] 5. Checkpointing: **Checkpoint best weights on monitored metric:**
- [ ] 5. Checkpointing: **StateDict native; torch.save full objects only for small prototypes.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
