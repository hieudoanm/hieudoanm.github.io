# Implementation notes

Focused reference for **ml5-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Browser & Performance Constraints

- **Weights load over network — bundle/cache for production; CDN pinned.**
- **Inference on the main thread can jank — `requestAnimationFrame` throttling for video.**
- **Memory: destroy classifiers not in use; cap continuous inference.**

---

## 5. p5.js Integration

- **`setup()` loads; `draw()` runs inference throttled:**

```js
function setup() {
  classifier = ml5.imageClassifier('MobileNet');
  classifier.classify(canvas, got);
}
function draw() {
  if (frameCount % 10 === 0) classifier.classify(canvas, got);
}
```

- **Draw overlays (keypoints/bounding boxes) via p5 primitives — keep loop cheap.**
- **Asynchronous results — never block `draw()` awaiting classify synchronously.**

---

## 6. Ethics & Pitfalls
