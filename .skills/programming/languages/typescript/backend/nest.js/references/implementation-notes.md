# Implementation notes

Focused reference for **nest-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
