# NestJS Backend Best Practices: Validation Plan

Use this plan to verify work guided by [NestJS Backend Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **DTOs with class-validator in @Body()/@Query()/@Param()** — ValidationPipe (global APP_PIPE) validates and _transforms_ into class instances:
- [ ] **whitelist: true + forbidNonWhitelisted: true** on the ValidationPipe — strip/forbid unknown body fields (closed API contract)
- [ ] **Custom @Is-style or DTO-transform pipes** for cross-field rules; keep pipes small and testable
- [ ] **DTOs are typed contracts** — controllers derive from the DTO shape and the compiler enforces drift away from it
- [ ] **@nestjs/testing + Test.createTestingModule({ providers: [UsersService] })** — unit-test services with mocked dependencies via DI overrides:
- [ ] **supertest + app.getHttpServer() for e2e** — full pipeline through controllers/guards/pipes/filters:
- [ ] **Test the contract** — validation 400s (whitelist/forbid behaviors), guard 401/403s, custom filter 500-shape
- [ ] **App boot for tests**: app.init() in beforeEach, app.close() after; use a test DB + in-memory doubles

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
