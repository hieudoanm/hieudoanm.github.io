# Overview

Focused reference for **ml5-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# ml5.js Best Practices

ml5.js is **a friendly ML layer over TensorFlow.js for the browser** — pre-trained models (image classification, object detection, pose estimation) with simple `ml5.x(..., modelReady)` callbacks. Practical ml5.js leans on **model loading once plus `ready` handlers, `p5.js`-style callbacks (`results`) for inference, async-friendly `await` patterns, and browser constraints respected (model weights → network/cache, device memory)** — the models are magic; the discipline is loading, caching, and callback structure.

---

## 1. Loading Models

- **Load once per page; act in the `ready`/`getPromise` callback:**

```js
const classifier = ml5.imageClassifier('MobileNet', () => {
  console.log('model loaded');
});
// or
const lib = ml5.imageClassifier('MobileNet');
await lib.load(); // explicit await world
```

- **Models fetched from CDN — cached; offline caps pre-bundle the weights.**
- **One classifier per model per page (no repeated loads).**

---

## 2. Inference
