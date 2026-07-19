# Synaptic Best Practices: 2. Activation & Prediction

## Source guidance

This example applies the **2. Activation & Prediction** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`activator` on normalized inputs:**
- **Inputs normalized (scaled to the activation range); outputs interpreted via the same mapping.**
- **Bias/layers config explicit in the architect call; keep the mapping constant across train/predict.**

## Example

```js
const out = net.activate([0.1, 0.9]);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for synaptic-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
