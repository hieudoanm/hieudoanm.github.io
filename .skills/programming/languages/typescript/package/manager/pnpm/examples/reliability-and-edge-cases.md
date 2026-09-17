# pnpm Best Practices: 6. CI & Security

## Source guidance

This example applies the **6. CI & Security** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **CI: `pnpm install --frozen-lockfile` + `pnpm audit --prod` gate:**
- **Store cache across CI runners (content-addressable = cache-friendly).**
- **Flat "shameful-hoist" off by default (strict); least-privilege registry tokens.**

## Example

```bash
pnpm install --frozen-lockfile
pnpm audit --prod
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for pnpm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
