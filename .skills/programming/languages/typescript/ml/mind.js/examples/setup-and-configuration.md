# Mind.js Best Practices: 2. Training Data

## Source guidance

This example applies the **2. Training Data** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Inputs normalized (scale to the activation's sweet spot), outputs in the same scale:**
- **Withhold a validation slice — Mind.js gives no built-in split; you own it.**
- **Watch console `log` errors; increase iterations only while error actually falls.**

## Example

```js
mind.learn(data, { iterations: 200, learningRate: 0.1, log: true });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for mind-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
