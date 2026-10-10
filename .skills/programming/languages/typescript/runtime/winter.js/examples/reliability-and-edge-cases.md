# WinterJS Best Practices: 3. Deployment & Config

## Source guidance

This example applies the **3. Deployment & Config** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Deploy via wasmer (Sparkle/`wasmer deploy`) with a `wasmer.toml` describing routes/env:**
- **Env variables via the deploy platform; secrets through platform stores — never inline.**
- **Local dev: `wasmer` run or the WinterJS binary; parity checked before CI.**

## Example

```toml
[package] name = "my-app"      # wasmer deploy runs the WinterJS server
[[routes]] glob = "**" -> "http://localhost:3000"
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for winter.js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
