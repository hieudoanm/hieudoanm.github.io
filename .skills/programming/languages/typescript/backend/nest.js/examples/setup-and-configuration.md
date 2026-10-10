# NestJS Backend Best Practices: 1. Core Stack

## Source guidance

This example applies the **1. Core Stack** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express` (or `@nestjs/platform-fastify`) — framework + HTTP adapter
- `class-validator` + `class-transformer` — DTO validation/transformation (the Nest-native pairing)
- `@nestjs/testing` — DI-aware test harness
- `@nestjs/config`, `@nestjs/terminus` (health checks), `@nestjs/swagger` — official plugins
- **`nest new` scaffolds the app**; the CLI (`nest g module/service/controller`) generates the boilerplate so structure stays uniform.

## Example

```bash
pnpm add @nestjs/core @nestjs/common @nestjs/platform-express class-validator class-transformer
pnpm add -d @nestjs/cli @nestjs/testing
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for nest-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
