# NestJS Backend Best Practices: Workflow Checklist

A practical run sheet for applying [NestJS Backend Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack: @nestjs/core, @nestjs/common, @nestjs/platform-express (or @nestjs/platform-fastify) — framework + HTTP adapter
- [ ] 1. Core Stack: class-validator + class-transformer — DTO validation/transformation (the Nest-native pairing)
- [ ] 2. Modules & Dependency Injection: **One concern per module** — each feature owns a @Module, exports its services, imports what it needs:
- [ ] 2. Modules & Dependency Injection: **@Injectable() providers by constructor injection** — constructor(private readonly usersRepo: UserRepository) — the framework resolves the graph; no service locators/globals (matches the Kotlin-style by convention: dependencies explicit at construction)
- [ ] 3. Controllers (Thin HTTP Layer): **Controllers are transport** — map HTTP → service calls; no business logic, no raw req/res reaching services
- [ ] 3. Controllers (Thin HTTP Layer): **@Body() dto is validated & typed** (see §4) — the controller signature already says everything
- [ ] 4. DTOs, Pipes & Validation: **DTOs with class-validator in @Body()/@Query()/@Param()** — ValidationPipe (global APP_PIPE) validates and _transforms_ into class instances:
- [ ] 4. DTOs, Pipes & Validation: **whitelist: true + forbidNonWhitelisted: true** on the ValidationPipe — strip/forbid unknown body fields (closed API contract)
- [ ] 5. Guards, Interceptors & Middleware: **Guards before pipes** — auth first, validation after: ordering is defined (guards → pipes → interceptors around handlers)
- [ ] 5. Guards, Interceptors & Middleware: **ExecutionContext + Reflector** let guards read route metadata (@SetMetadata) for role-based authz — declarative policy instead of if-chains in handlers

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
