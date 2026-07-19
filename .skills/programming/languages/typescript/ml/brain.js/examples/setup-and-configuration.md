# Brain.js Best Practices: 3. Training Options & Monitoring

## Source guidance

This example applies the **3. Training Options & Monitoring** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Options deliberate: `iterations`, `errorThresh`, `learningRate`, `log`:**
- **Watch `error` curve — stop when it flattens (use errorThresh + iteration cap).**
- **Small learning rates with more iterations beat spikes; seeded reproducibility documented.**

## Example

```js
net.train(data, {
  iterations: 20000,
  errorThresh: 0.005,
  learningRate: 0.2,
  log: (e) => track(e.error),
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for brain-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
