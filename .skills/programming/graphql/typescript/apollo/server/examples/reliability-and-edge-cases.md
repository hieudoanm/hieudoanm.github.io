# Server: 3. Advanced: Directives, Cost, and Errors

## Source guidance

This example applies the **3. Advanced: Directives, Cost, and Errors** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Custom directives: define `GraphQLDirective` (implement `visitSchema`/transform) for e.g., `@auth`, `@cache`.
- **Error shaping**: `formatError` hook to map internal errors to client-safe messages (don't leak stack traces).
- `AuthenticationError`, `ForbiddenError`, `UserInputError` etc. from `@apollo/server`/`apollo-server-errors` give meaningful status codes.
- Cost limiting: use `apollo-server-plugin-response-cache` and manual query-depth/complexity checks in `context`.

## Example

```ts
import { unwrapResolverError } from '@apollo/server/errors'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Runs on every error before it leaves the server: shape it, never leak internals
  formatError: (formatted, error) => {
    logger.warn({ err: unwrapResolverError(error) }, 'graphql error')
    return { message: formatted.message, path: formatted.path, extensions: { code: formatted.extensions?.code } }
  },
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for apollo-server.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
