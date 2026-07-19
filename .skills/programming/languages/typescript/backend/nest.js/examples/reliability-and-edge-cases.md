# NestJS Backend Best Practices: 6. Error Handling

## Source guidance

This example applies the **6. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Exceptions are the error vocabulary** — `BadRequestException`/`NotFoundException`/`UnauthorizedException`/`HttpException` map to HTTP codes; thrown from services/guards, rendered by the framework:
- **Custom `ExceptionFilter`s** (`@Catch`) for pipeline-specific shaping — map domain errors, add a consistent error envelope, and log 5xx centrally; register a global `APP_FILTER`.
- **`class-validator` failures become `BadRequestException` with the issue list** via `ValidationPipe` — no hand-rolled validation messaging.

## Example

```ts
async findOne(id: number): Promise<GetUserDto> {
    const user = await this.users.find(id);
    if (!user) throw new NotFoundException(`user ${id} not found`);
    return user;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for nest-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
