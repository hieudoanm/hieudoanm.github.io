---
name: ml5-best-practices
description: Best practices for machine learning in the browser with ml5.js — the friendly-ML conventions for education and creative coding. Use when writing, structuring, or reviewing ml5.js — covers models (image classification, pose, transfer learning), load/ready, inference, and browser constraints.
---

# ml5.js Best Practices

ml5.js is **a friendly ML layer over TensorFlow.js for the browser** — pre-trained models (image classification, object detection, pose estimation) with simple `ml5.x(..., modelReady)` callbacks. Practical ml5.js leans on **model loading once plus `ready` handlers, `p5.js`-style callbacks (`results`) for inference, async-friendly `await` patterns, and browser constraints respected (model weights → network/cache, device memory)** — the models are magic; the discipline is loading, caching, and callback structure.

---

## 1. Loading Models

- **Load once per page; act in the `ready`/`getPromise` callback:**

```js
const classifier = ml5.imageClassifier("MobileNet", () => {
  console.log("model loaded");
});
// or
const lib = ml5.imageClassifier("MobileNet");
await lib.load();   // explicit await world
```

- **Models fetched from CDN — cached; offline caps pre-bundle the weights.**
- **One classifier per model per page (no repeated loads).**

---

## 2. Inference

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

## 4. Browser & Performance Constraints

- **Weights load over network — bundle/cache for production; CDN pinned.**
- **Inference on the main thread can jank — `requestAnimationFrame` throttling for video.**
- **Memory: destroy classifiers not in use; cap continuous inference.**

---

## 5. p5.js Integration

- **`setup()` loads; `draw()` runs inference throttled:**

```js
function setup() { classifier = ml5.imageClassifier("MobileNet"); classifier.classify(canvas, got); }
function draw() { if (frameCount % 10 === 0) classifier.classify(canvas, got); }
```

- **Draw overlays (keypoints/bounding boxes) via p5 primitives — keep loop cheap.**
- **Asynchronous results — never block `draw()` awaiting classify synchronously.**

---

## 6. Ethics & Pitfalls

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