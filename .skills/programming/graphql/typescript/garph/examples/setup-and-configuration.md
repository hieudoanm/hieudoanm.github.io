# Garph: 2. Setup

## Source guidance

This example applies the **2. Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Deps: `garph`, `graphql`, and a server adapter (pairs with `graphql-yoga` or an HTTP server via `graphql`).
- Build a `g.schema(...)` and a resolver map, then `g.resolve()` to get executable schema.

## Example

This excerpt is from the cited **2. Setup** section.

```ts
import { buildSchema, g } from 'garph'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

// `g` is the shared type registry; buildSchema turns types + resolvers into one executable schema
const schema = buildSchema({ g, resolvers })
const yoga = createYoga({ schema })

createServer(yoga).listen(4000)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for garph.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
