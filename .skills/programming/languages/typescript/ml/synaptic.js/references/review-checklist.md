# Review checklist

Focused reference for **synaptic-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Determinism: seed-based trainers/`random` where supported; snapshot tests on JSON.**
- **Watch overfitting — tiny datasets → validation split + early stop.**
- **Document the normalization transform; predictions interpreted in the original scale.**

---

## General Rules of Thumb

- **Architect for shape; normalize in/out.**
- **Trainer holds the loop; watch `error` convergence.**
- **Serialization is the deploy artifact (`toJSON`/`fromJSON`).**
- **Small nets — batch inference; preallocate.**
- **Withheld validation; seeds for determinism.**

---

## Quick-Start Checklist

- [ ] `Architect` network (Perceptron/LSTM) sized to the problem
- [ ] Inputs/outputs normalized to the activation range
- [ ] Trainer with small rate + iteration/error caps; convergence tracked
- [ ] Training/validation split; generalization checked
- [ ] `toJSON`/`fromJSON` persistence; shape versioned
- [ ] Deterministic seeds; normalization documented
