# Slint + Material Design Best Practices: 1. Setup

## Source guidance

This example applies the **1. Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Set the style at build time or runtime:
Prefer `material-light` / `material-dark` explicitly over generic `material` so you control which variant ships, rather than inheriting OS theme unpredictably during development.

## Example

```toml
# build.rs / Cargo config
slint_build::compile("ui/app.slint").unwrap();
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for slint-material-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
