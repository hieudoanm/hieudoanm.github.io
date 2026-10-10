# LLRT Best Practices: 1. Runtime Setup

## Source guidance

This example applies the **1. Runtime Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pin the LLRT layer/version explicitly:**
- **Official pattern: image `public.ecr.aws/lambda/llrt` (or the binary in memory) pinned by SHA;**
- **Functions deployed with `Runtime: provided.al2`/custom + LLRT runtime handler — document the version parity.**

## Example

```bash
# Package the function with the LLRT binary as the container entrypoint
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for llrt-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
