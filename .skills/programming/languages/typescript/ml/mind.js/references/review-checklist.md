# Review checklist

Focused reference for **mind-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Determinism: seed where the API allows; test the upload→predict round trip.**
- **Overfitting on tiny datasets — small iterations + validation judgment.**
- **Normalization + decoding as the tested contract (unit tests on the mapping).**

---

## General Rules of Thumb

- **Configure at construction; learn + predict the only verbs.**
- **Normalize in, decode out — the tested contract.**
- **Own the validation split; watch the error curve.**
- **`save`/`upload` as the deploy path.**
- **Small nets; version the schema.**

---

## Quick-Start Checklist

- [ ] `new Mind(...)` configured (activator/layers) once
- [ ] Inputs normalized; predict outputs decoded consistently
- [ ] `learn` with iteration/rate caps; error log watched
- [ ] Validation slice withheld; generalization judged
- [ ] `save`/`upload` persistence round-trips verified
- [ ] Normalization mapping unit-tested; schema versioned
