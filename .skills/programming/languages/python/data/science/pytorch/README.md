# PyTorch Best Practices

PyTorch is the **Python-first deep learning framework — tensors with autograd, nn.Module-based modeling, module-defined forward passes and explicit training loops.** Practical PyTorch leans on **nn.Module composition with forward definition, Dataset/DataLoader with pin_memory/num_workers/shuffle, optimizer.zero_grad → loss.backward() → optimizer.step() in a train()/eval()-aware loop, and checkpoint .pt/.pth saving** —...

## When to use

Use when writing, structuring, or reviewing PyTorch.

## Core topics

- 1. Tensors & Autograd
- 2. Datasets & DataLoaders
- 3. nn.Module Models
- 4. Training Loop
- 5. Checkpointing
- 6. Distributed & Production

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [PyTorch Best Practices: Basic Usage](./examples/basic-usage.md)
- [PyTorch Best Practices: 1. Tensors & Autograd](./examples/reliability-and-edge-cases.md)
- [PyTorch Best Practices: 3. nn.Module Models](./examples/setup-and-configuration.md)
- [PyTorch Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [PyTorch Best Practices: Decision Record](./assets/decision-record.md)
- [PyTorch Best Practices: Starter Template](./assets/starter-template.md)
- [PyTorch Best Practices: Validation Plan](./assets/validation-plan.md)
- [PyTorch Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
