# ml5.js Best Practices: 1. Loading Models

## Source guidance

This example applies the **1. Loading Models** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Load once per page; act in the `ready`/`getPromise` callback:**
- **Models fetched from CDN — cached; offline caps pre-bundle the weights.**
- **One classifier per model per page (no repeated loads).**

## Example

This excerpt is from the cited **1. Loading Models** section.

```js
const classifier = ml5.imageClassifier('MobileNet', () => {
  console.log('model loaded');
});
// or
const lib = ml5.imageClassifier('MobileNet');
await lib.load(); // explicit await world
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for ml5-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
