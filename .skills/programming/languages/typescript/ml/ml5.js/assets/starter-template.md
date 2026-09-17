# ml5.js Best Practices: Starter Template

A reusable starting point derived from the **5. p5.js Integration** section of [ml5.js Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
function setup() {
  classifier = ml5.imageClassifier('MobileNet');
  classifier.classify(canvas, got);
}
function draw() {
  if (frameCount % 10 === 0) classifier.classify(canvas, got);
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
