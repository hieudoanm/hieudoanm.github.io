# Review checklist

Focused reference for **nest-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
