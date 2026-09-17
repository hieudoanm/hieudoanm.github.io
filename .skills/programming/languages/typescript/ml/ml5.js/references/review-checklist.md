# Review checklist

Focused reference for **ml5-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Pretrained biases documented — model cards/caveats acknowledged in projects.**
- **No real-time personal data storage without consent; demos sanitized.**
- **Version pin `ml5` + TensorFlow deps; tests machine hands-down only (no visual asserts).**

---

## General Rules of Thumb

- **Load models once; callbacks/await structure clear.**
- **`classify` results sorted; top-N read deliberately.**
- **Transfer learning for custom classes; balanced samples.**
- **Throttle inference; cache weights; destroy when idle.**
- **Bias caveats; consent for personal data.**

---

## Quick-Start Checklist

- [ ] Model loaded once with `ready`/await; pinned CDN weights
- [ ] Infer with `classify(img, results)`; errors handled
- [ ] Transfer learning with balanced per-class samples; `train` watched
- [ ] Inference throttled (`frame % N`); canvas loops cheap
- [ ] Trained classifiers saved/loaded as artifacts
- [ ] Bias caveats documented; consent respected
