# Backbone — Deployment

Deployment strategy for Backbone: static binary, Docker image, CI rolling release, and local development.

## Options

| Option | Description                                               |
| ------ | ----------------------------------------------------------|
| Local  | `go build -o bin/backbone .` then `./bin/backbone`        |
| Docker | Multi-stage `Dockerfile` into `scratch` image             |
| CI     | GitHub Actions reusable Go template (ci + publish stages) |

## Cross-references

- [`11-deployment/ci-cd-pipeline.md`](11-deployment/ci-cd-pipeline.md) — CI/CD pipeline
- [`11-deployment/local-development.md`](11-deployment/local-development.md) — local development
- [`10-implementation-plan.md`](10-implementation-plan.md) — release phase
- [`12-operations.md`](12-operations.md) — ongoing operations
