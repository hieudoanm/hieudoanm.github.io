# NestJS Backend Best Practices: 8. Testing

## Source guidance

This example applies the **8. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`@nestjs/testing` + `Test.createTestingModule({ providers: [UsersService] })`** — unit-test services with mocked dependencies via DI overrides:
- **`supertest` + `app.getHttpServer()` for e2e** — full pipeline through controllers/guards/pipes/filters:
- **Test the contract** — validation 400s (whitelist/forbid behaviors), guard 401/403s, custom filter 500-shape.
- **App boot for tests**: `app.init()` in `beforeEach`, `app.close()` after; use a test DB + in-memory doubles.

## Example

```ts
const moduleRef = await Test.createTestingModule({
  providers: [UsersService, { provide: UserRepository, useValue: mockRepo }],
}).compile();

const service = moduleRef.get(UsersService);
expect(await service.findOne('1')).toEqual({ id: 1 });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for nest-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
