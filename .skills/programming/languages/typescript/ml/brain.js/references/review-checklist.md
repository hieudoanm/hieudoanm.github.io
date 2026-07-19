# Review checklist

Focused reference for **brain-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Determinism: same seeds where supported; compare `error` curves in tests.**
- **Golden tests: serialize → load → equal outputs on fixed inputs.**
- **Overfitting: hidden-layer count + validation, not raw accuracy on training.**

---

## General Rules of Thumb

- **`input`/`output` arrays normalized; decode consistently.**
- **Watch `error`; tolerance + iteration caps.**
- **`toJSON`/`fromJSON` = deploy path.**
- **Small nets; typed-array batching.**
- **Withheld validation; schema + normalization versioned.**

---

## Quick-Start Checklist

- [ ] `brain.NeuralNetwork`/`LSTM` per task; topology deliberate
- [ ] Inputs/outputs normalized; decode identical at predict
- [ ] `train` with iterations/errorThresh; error curve tracked
- [ ] Training/validation split; generalization observed
- [ ] `toJSON`/`fromJSON` persistence; schema versioned
- [ ] Deterministic seeds; golden output tests
