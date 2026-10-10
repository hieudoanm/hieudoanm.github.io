# Overview

Focused reference for **nest-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# NestJS Backend Best Practices

NestJS is a batteries-included, architecture-first TypeScript framework: **modules** + dependency injection, **controllers** for HTTP, **providers** for logic, and decorator-driven **guards/pipes/interceptors**. Unlike the minimal routers (Express/Fastify adapters), Nest rewards deliberate structure — a Nest app is a graph of modules where every capability is an injectable, tested unit. Best practice here is about respecting the DI/module boundaries, letting pipes/guards do the cross-cutting work, and keeping controllers thin.

---

## 1. Core Stack

- `@nestjs/core`, `@nestjs/common`, `@nestjs/platform-express` (or `@nestjs/platform-fastify`) — framework + HTTP adapter
- `class-validator` + `class-transformer` — DTO validation/transformation (the Nest-native pairing)
- `@nestjs/testing` — DI-aware test harness
- `@nestjs/config`, `@nestjs/terminus` (health checks), `@nestjs/swagger` — official plugins

```bash
pnpm add @nestjs/core @nestjs/common @nestjs/platform-express class-validator class-transformer
pnpm add -d @nestjs/cli @nestjs/testing
```

- **`nest new` scaffolds the app**; the CLI (`nest g module/service/controller`) generates the boilerplate so structure stays uniform.
- **Choose the HTTP adapter once** (`@nestjs/platform-express` vs `@nestjs/platform-fastify`) — framework-specific APIs (e.g. Fastify's schema validator) are gated by that choice.

---

## 2. Modules & Dependency Injection

- **One concern per module** — each feature owns a `@Module`, exports its services, imports what it needs:

```ts
@Module({
  imports: [ConfigModule, DbModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
```

- **`@Injectable()` providers by constructor injection** — `constructor(private readonly usersRepo: UserRepository)` — the framework resolves the graph; no service locators/globals (matches the Kotlin-style `by` convention: dependencies explicit at construction).
- **`providers`/`exports` are the visibility story** — import modules, not classes; keep the DI graph a DAG (circular deps are a design smell to fix, not a token to force).
- **`APP_*` global construction** is a power tool — `APP_PIPE`/`APP_GUARD`/`APP_FILTER` register app-wide providers deliberately, not per-module sprinkles.
