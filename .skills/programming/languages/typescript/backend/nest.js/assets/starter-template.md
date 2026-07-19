# NestJS Backend Best Practices: Starter Template

A reusable starting point derived from the **2. Modules & Dependency Injection** section of [NestJS Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
@Module({
  imports: [ConfigModule, DbModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
