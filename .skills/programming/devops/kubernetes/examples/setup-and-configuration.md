# Kubernetes Best Practices: 2. Pod Configuration

## Source guidance

This example applies the **2. Pod Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pod specification** — define pods properly:
- **Resource requests and limits** — set resource constraints:
- **Probes** — implement health and readiness probes:

## Example

```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for kubernetes-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
