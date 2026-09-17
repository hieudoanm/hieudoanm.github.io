# Workflow notes

Focused reference for **ml5-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`classify(image, gotResult)` or await:**

```js
classifier.classify(img).then((results) => {
  console.log(results[0].label, results[0].confidence);
});
// p5 mode
classifier.classify(img, (err, results) => { if (results) … });
```

- **Results arrays sorted by confidence — take the top-N genuinely useful.**
- **Error callbacks handled (never silent); inputs as elements/canvas/frames per model contract.**

---

## 3. Transfer Learning & Feature Extraction

- **`featureExtractor` + `classifier` for custom classes on top of a pretrained trunk:**

```js
const extractor = ml5.featureExtractor("MobileNet", modelReady);
const classifierFuture = extractor.classification(modelReady);
classifierFuture.addImage(images, "cat");
classifierFuture.train((loss) => …);
```

- **Collect balanced samples per class; train with a small `loss` watch.**
- **Save/load trained classifiers (`save()`/`load()` — JSON/weights artifacts).**

---
