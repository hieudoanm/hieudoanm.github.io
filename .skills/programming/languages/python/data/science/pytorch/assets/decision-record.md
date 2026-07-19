# PyTorch Best Practices: Decision Record

Use this record when applying [PyTorch Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for deep learning with PyTorch — the tensor/autograd and nn.Module conventions for training neural networks. Use when writing, structuring, or reviewing PyTorch — covers tensors, nn.Module, DataLoader, training loops, distributed, and checkpointing.

PyTorch is the **Python-first deep learning framework — tensors with autograd, nn.Module-based modeling, module-defined forward passes and explicit training loops.** Practical PyTorch leans on **nn.Module composition with forward definition, Dataset/DataLoader with pin_memory/num_workers/shuffle, optimizer.zero_grad → loss.backward() → optimizer.step() in a train()/eval()-aware loop, and checkpoint .pt/.pth saving** — explicit is better; the training loop is the recipe.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Tensors & Autograd
- [ ] 2. Datasets & DataLoaders
- [ ] 3. nn.Module Models
- [ ] 4. Training Loop
- [ ] 5. Checkpointing
- [ ] 6. Distributed & Production
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
