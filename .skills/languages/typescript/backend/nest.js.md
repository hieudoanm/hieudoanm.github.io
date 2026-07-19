---
name: nest-backend
description: Best practices for building structured, maintainable server applications with NestJS (TypeScript). Use when creating, structuring, or reviewing a NestJS app — covers modules, providers/DI, controllers, DTOs and pipes, guards/interceptors, and testing.
---

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

---

## 3. Controllers (Thin HTTP Layer)

```ts
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<GetUserDto> {
    return this.users.findOne(id); // thin: delegate, no req plumbing
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto): Promise<GetUserDto> {
    return this.users.create(dto);
  }
}
```

- **Controllers are transport** — map HTTP → service calls; no business logic, no raw `req`/`res` reaching services.
- **`@Body() dto` is validated & typed** (see §4) — the controller signature already says everything.
- **`ParseIntPipe`/`ParseUUIDPipe`/`ParseEnumPipe` at the param level** — built-in param coercion before your logic.
- **Return domain DTOs from handlers**; let interceptors/class-transformers shape the payload (or return the validated object directly and let serialization apply).

---

## 4. DTOs, Pipes & Validation

- **DTOs with `class-validator` in `@Body()/@Query()/@Param()`** — `ValidationPipe` (global `APP_PIPE`) validates and _transforms_ into class instances:

```ts
export class CreateUserDto {
    @IsString() @MinLength(1) @MaxLength(200)
    name!: string;

    @IsEmail()
    email!: string;

    @IsOptional() @IsEnum(Role)
    role?: Role;
}

// app.module provider:
{ provide: APP_PIPE, useClass: ValidationPipe },   // enableImplicitConversion, whitelist: true
```

- **`whitelist: true` + `forbidNonWhitelisted: true`** on the `ValidationPipe` — strip/forbid unknown body fields (closed API contract).
- **Custom `@Is`-style or DTO-transform pipes** for cross-field rules; keep pipes small and testable.
- **DTOs are typed contracts** — controllers derive from the DTO shape and the compiler enforces drift away from it.

---

## 5. Guards, Interceptors & Middleware

| Decorator          | Fits                                     | Do                                                                          |
| ------------------ | ---------------------------------------- | --------------------------------------------------------------------------- |
| `@UseGuards`       | AuthN/AuthZ before handlers              | Implement `CanActivate`; throw `UnauthorizedException`/`ForbiddenException` |
| `@UseInterceptors` | Cross-cutting transforms/logs            | Wrap execution; post-handle/catch via `lastValueFrom` streams               |
| `@UsePipes`        | Validation/transform                     | DTO transformation; keep at controller/route level                          |
| Middleware         | Generic request-level (CORS, request-id) | `configure(consumer)` in `Module` classes                                   |

- **Guards before pipes** — auth first, validation after: ordering is defined (guards → pipes → interceptors around handlers).
- **`ExecutionContext` + `Reflector`** let guards read route metadata (`@SetMetadata`) for role-based authz — declarative policy instead of if-chains in handlers.
- **Interceptors for transformation** (response shaping, caching via `CacheInterceptor`, timing logs) — they wrap handlers uniformly; keep them infrequent, explicit, and well-named.
- **Middleware for adapter-level concerns** (request-id, logging) — the HTTP adapter is the clearest seam; `@Module` classes wire it via `configure`.

---

## 6. Error Handling

- **Exceptions are the error vocabulary** — `BadRequestException`/`NotFoundException`/`UnauthorizedException`/`HttpException` map to HTTP codes; thrown from services/guards, rendered by the framework:

```ts
async findOne(id: number): Promise<GetUserDto> {
    const user = await this.users.find(id);
    if (!user) throw new NotFoundException(`user ${id} not found`);
    return user;
}
```

- **Custom `ExceptionFilter`s** (`@Catch`) for pipeline-specific shaping — map domain errors, add a consistent error envelope, and log 5xx centrally; register a global `APP_FILTER`.
- **`class-validator` failures become `BadRequestException` with the issue list** via `ValidationPipe` — no hand-rolled validation messaging.
- **Never let unexpected errors escape unshaped** — a global filter turns them into a generic 500 + full log (cause), keeping interns/stack traces server-side.

---

## 7. Data & Services

- **Repositories wrap the DB layer** (Prisma/Drizzle — see `orm/` skills); services orchestrate; controllers translate. The triangle keeps each layer independently testable.
- **Services throw domain exceptions; they never know about HTTP** — `NotFoundException` is the boundary, not `res.status(...)`.
- **Transactions belong in the repository/service seam** — a `dataSource.transaction`/Prisma `$transaction` wraps multi-step writes atomically (see orm skills §transactions).
- **Cache in a service wrapper** (`@nestjs/cache-manager` or `CacheInterceptor`) over expensive reads — decorate deliberately per endpoint, not globally.

---

## 8. Testing

- **`@nestjs/testing` + `Test.createTestingModule({ providers: [UsersService] })`** — unit-test services with mocked dependencies via DI overrides:

```ts
const moduleRef = await Test.createTestingModule({
  providers: [UsersService, { provide: UserRepository, useValue: mockRepo }],
}).compile();

const service = moduleRef.get(UsersService);
expect(await service.findOne('1')).toEqual({ id: 1 });
```

- **`supertest` + `app.getHttpServer()` for e2e** — full pipeline through controllers/guards/pipes/filters:

```ts
const res = await request(app.getHttpServer())
  .post('/users')
  .send({ name: 'Ada', email: 'ada@x.io' });
expect(res.status).toBe(201);
```

- **Test the contract** — validation 400s (whitelist/forbid behaviors), guard 401/403s, custom filter 500-shape.
- **App boot for tests**: `app.init()` in `beforeEach`, `app.close()` after; use a test DB + in-memory doubles.

---

## 9. General Rules of Thumb

- **Architecture is the product** — Nest's value is the shape (modules, DI, pipes/guards); keep the graph explicit and layered rather than carving shortcuts.
- **Controllers thin, services testable, repos at the edge** — the triangle that makes each layer replaceable.
- **Cross-cutting happens in decorators** — validation (pipes), auth (guards), shaping (interceptors); handlers stay declarative.
- **DTOs are contracts** — typed, validated at the edge, compiled-checked downstream.
- **Exceptions not statuses** — throw domain/exceptions; filters shape; services stay HTTP-agnostic.

---

## Quick-Start Checklist

- [ ] One concern per module; DI graph a DAG; providers exported deliberately
- [ ] Controllers thin; services throw domain exceptions (never `res`)
- [ ] DTOs + `class-validator` with global `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`)
- [ ] Guards for authN/authZ (metadata + `Reflector`); pipes for params/DTO coercion
- [ ] Interceptors used sparingly for shaping/caching; middleware for request-level concerns
- [ ] Global `ExceptionFilter` + `APP_FILTER` for consistent error envelope + 5xx logging
- [ ] Repositories wrap Prisma/Drizzle; transactions at the persistence seam
- [ ] `@nestjs/testing` unit tests with DI overrides; `supertest` e2e against `getHttpServer()`
- [ ] New components generated via `nest g` so structure stays uniform
- [ ] Secrets via `@nestjs/config`, health checks via `@nestjs/terminus`
