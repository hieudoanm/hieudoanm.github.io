# ml5.js Best Practices: Workflow Checklist

A practical run sheet for applying [ml5.js Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Loading Models: **Load once per page; act in the ready/getPromise callback:**
- [ ] 1. Loading Models: **Models fetched from CDN — cached; offline caps pre-bundle the weights.**
- [ ] 2. Inference: **classify(image, gotResult) or await:**
- [ ] 2. Inference: **Results arrays sorted by confidence — take the top-N genuinely useful.**
- [ ] 3. Transfer Learning & Feature Extraction: **featureExtractor + classifier for custom classes on top of a pretrained trunk:**
- [ ] 3. Transfer Learning & Feature Extraction: **Collect balanced samples per class; train with a small loss watch.**
- [ ] 4. Browser & Performance Constraints: **Weights load over network — bundle/cache for production; CDN pinned.**
- [ ] 4. Browser & Performance Constraints: **Inference on the main thread can jank — requestAnimationFrame throttling for video.**
- [ ] 5. p5.js Integration: **setup() loads; draw() runs inference throttled:**
- [ ] 5. p5.js Integration: **Draw overlays (keypoints/bounding boxes) via p5 primitives — keep loop cheap.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
