# NestJS Backend Best Practices: Basic Usage

Best practices for building structured, maintainable server applications with NestJS (TypeScript). Use when creating, structuring, or reviewing a NestJS app — covers modules, providers/DI, controllers, DTOs and pipes, guards/interceptors, and testing.

## Scenario

Use this example as a starting point when applying **nest-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Modules & Dependency Injection** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
@Module({
  imports: [ConfigModule, DbModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
