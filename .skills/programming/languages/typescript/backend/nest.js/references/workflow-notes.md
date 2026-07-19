# Workflow notes

Focused reference for **nest-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
